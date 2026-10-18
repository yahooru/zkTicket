import type { ConnectedAPI, InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { type NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { fromHex, toHex, type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  Binding,
  type FinalizedTransaction,
  Proof,
  SignatureEnabled,
  Transaction,
  type TransactionId,
} from '@midnight-ntwrk/midnight-js-protocol/ledger';
import type { UnboundTransaction } from '@midnight-ntwrk/midnight-js-types';
import { ZkTicketAPI, type ZkTicketCircuitKeys, type ZkTicketProviders } from '../../api/src/index';
import type { ZkTicketPrivateState } from 'zkticket-contract';
import { inMemoryPrivateStateProvider } from './in-memory-private-state-provider';
import { decryptPrivacyKey, encryptPrivacyKey } from './privacy-key';

const NETWORK_ID = (import.meta.env.VITE_NETWORK_ID ?? 'preprod') as NetworkId;
const PREFERRED_PROOF_SERVER = (import.meta.env.VITE_PROOF_SERVER_URL ?? '').replace(/\/$/, '');
const ZK_CONFIG_PATH = (import.meta.env.VITE_ZK_CONFIG_PATH ?? '').replace(/\/$/, '');

export interface WalletSummary {
  readonly name: string;
  readonly apiVersion: string;
  readonly networkId: string;
  readonly proofServer: string;
  readonly unshieldedAddress: string;
  readonly dustAddress: string;
}

type BrowserConnection = {
  readonly connectedAPI: ConnectedAPI;
  readonly providers: ZkTicketProviders;
  readonly wallet: InitialAPI;
  readonly summary: WalletSummary;
};

const walletConnectTimeoutMs = 120_000;

const withTimeout = <T,>(promise: Promise<T>, milliseconds: number, message: string): Promise<T> =>
  new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error(message)), milliseconds);
    promise.then(
      (value) => { window.clearTimeout(timeout); resolve(value); },
      (error: unknown) => { window.clearTimeout(timeout); reject(error); },
    );
  });

const resolveProofServer = async (configuredUri: string): Promise<string> => {
  if (!PREFERRED_PROOF_SERVER || PREFERRED_PROOF_SERVER === configuredUri.replace(/\/$/, '')) return configuredUri;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2_500);
  try {
    const response = await fetch(`${PREFERRED_PROOF_SERVER}/ready`, {
      credentials: 'omit',
      signal: controller.signal,
    });
    return response.ok ? PREFERRED_PROOF_SERVER : configuredUri;
  } catch {
    return configuredUri;
  } finally {
    window.clearTimeout(timeout);
  }
};

export class BrowserZkTicketManager {
  #connection: Promise<BrowserConnection> | undefined;

  constructor(
    private readonly wallet: InitialAPI,
    private readonly connectedAPI: Promise<ConnectedAPI>,
  ) {}

  private async secretStorageKey(): Promise<string> {
    const address = (await this.connection()).summary.unshieldedAddress;
    const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(address)));
    return `zkticket:private-secret:v2:${toHex(digest)}`;
  }

  private async getSecretKey(): Promise<Uint8Array> {
    const storageKey = await this.secretStorageKey();
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const decoded = Uint8Array.from(atob(stored), (character) => character.charCodeAt(0));
      if (decoded.length !== 32) throw new Error('Stored privacy key is damaged. Restore it from your encrypted backup.');
      return decoded;
    }
    const legacyStorageKey = 'zkticket:private-secret:v1';
    const legacy = localStorage.getItem(legacyStorageKey);
    if (legacy) {
      const decoded = Uint8Array.from(atob(legacy), (character) => character.charCodeAt(0));
      if (decoded.length !== 32) throw new Error('Stored privacy key is damaged. Restore it from your encrypted backup.');
      localStorage.setItem(storageKey, legacy);
      localStorage.removeItem(legacyStorageKey);
      return decoded;
    }
    const secret = crypto.getRandomValues(new Uint8Array(32));
    localStorage.setItem(storageKey, btoa(String.fromCharCode(...secret)));
    return secret;
  }

  private connection(): Promise<BrowserConnection> {
    if (!this.#connection) {
      const attempt = this.initialize();
      this.#connection = attempt;
      void attempt.catch(() => {
        if (this.#connection === attempt) this.#connection = undefined;
      });
    }
    return this.#connection;
  }

  private async initialize(): Promise<BrowserConnection> {
    setNetworkId(NETWORK_ID);
    const connectedAPI = await withTimeout(
      this.connectedAPI,
      walletConnectTimeoutMs,
      'The wallet connection timed out. Open your Midnight wallet, approve this site, and try again.',
    );
    const config = await connectedAPI.getConfiguration();
    if (!config.proverServerUri) {
      throw new Error('Your wallet has no proof server configured. Select its local proof server option (http://127.0.0.1:6300) and reconnect.');
    }
    if (config.networkId !== NETWORK_ID) {
      throw new Error(`${this.wallet.name} is connected to ${config.networkId}; switch it to ${NETWORK_ID}.`);
    }
    const proofServerUri = await resolveProofServer(config.proverServerUri);

    const shielded = await connectedAPI.getShieldedAddresses();
    const zkConfigRoot = `${window.location.origin}${ZK_CONFIG_PATH}`;
    const zkConfigProvider = new FetchZkConfigProvider<ZkTicketCircuitKeys>(zkConfigRoot, fetch.bind(window));
    const providers: ZkTicketProviders = {
      privateStateProvider: inMemoryPrivateStateProvider<string, ZkTicketPrivateState>(),
      zkConfigProvider,
      proofProvider: httpClientProofProvider(proofServerUri, zkConfigProvider),
      publicDataProvider: indexerPublicDataProvider(config.indexerUri, config.indexerWsUri),
      walletProvider: {
        getCoinPublicKey: () => shielded.shieldedCoinPublicKey,
        getEncryptionPublicKey: () => shielded.shieldedEncryptionPublicKey,
        balanceTx: async (tx: UnboundTransaction): Promise<FinalizedTransaction> => {
          const response = await connectedAPI.balanceUnsealedTransaction(toHex(tx.serialize()));
          return Transaction.deserialize<SignatureEnabled, Proof, Binding>(
            'signature',
            'proof',
            'binding',
            fromHex(response.tx),
          );
        },
      },
      midnightProvider: {
        submitTx: async (tx: FinalizedTransaction): Promise<TransactionId> => {
          await connectedAPI.submitTransaction(toHex(tx.serialize()));
          return tx.identifiers()[0];
        },
      },
    };

    const [{ unshieldedAddress }, { dustAddress }] = await Promise.all([
      connectedAPI.getUnshieldedAddress(),
      connectedAPI.getDustAddress(),
    ]);
    return {
      connectedAPI,
      providers,
      wallet: this.wallet,
      summary: {
        name: this.wallet.name,
        apiVersion: this.wallet.apiVersion,
        networkId: config.networkId,
        proofServer: proofServerUri,
        unshieldedAddress,
        dustAddress,
      },
    };
  }

  async getWalletSummary(): Promise<WalletSummary> {
    return (await this.connection()).summary;
  }

  async deploy(): Promise<ZkTicketAPI> {
    const { providers } = await this.connection();
    return ZkTicketAPI.deploy(providers, await this.getSecretKey());
  }

  async join(contractAddress: string): Promise<ZkTicketAPI> {
    const { providers } = await this.connection();
    return ZkTicketAPI.join(providers, contractAddress as ContractAddress, await this.getSecretKey());
  }

  async exportPrivacyKey(passphrase: string): Promise<string> {
    return encryptPrivacyKey(await this.getSecretKey(), passphrase);
  }

  async importPrivacyKey(backup: string, passphrase: string): Promise<void> {
    const secret = await decryptPrivacyKey(backup, passphrase);
    localStorage.setItem(await this.secretStorageKey(), btoa(String.fromCharCode(...secret)));
  }
}
