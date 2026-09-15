import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { encodeUserAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  mainnet,
  MidnightBech32m,
  UnshieldedAddress,
} from '@midnight-ntwrk/wallet-sdk-address-format';
import { map, type Observable } from 'rxjs';
import * as ContractBindings from '../../contract/managed/zkticket/contract/index.js';
import {
  CompiledZkTicketContract,
  createZkTicketPrivateState,
  type EventStatus,
  type TicketTier,
  type ZkTicketPrivateState,
} from '../../contract/src/index.js';
import {
  type CreateEventInput,
  type DeployedZkTicketContract,
  type TicketView,
  type ZkTicketDerivedState,
  type ZkTicketProviders,
  zkTicketPrivateStateKey,
} from './common-types.js';
import { bytesToHex, decodeText, encodeArtworkUrl, encodeText, hexToBytes, isZeroBytes } from './encoding.js';

export class ZkTicketAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<ZkTicketDerivedState>;

  private constructor(
    public readonly deployedContract: DeployedZkTicketContract,
    private readonly providers: ZkTicketProviders,
    private privateState: ZkTicketPrivateState,
  ) {
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    this.providers.privateStateProvider.setContractAddress(this.deployedContractAddress);
    this.state$ = providers.publicDataProvider
      .contractStateObservable(this.deployedContractAddress, { type: 'latest' })
      .pipe(
        map((state) => ContractBindings.ledger(state.data)),
        map((ledger): ZkTicketDerivedState => ({
          eventCount: Number(ledger.nextEventId),
          ticketCount: Number(ledger.nextTicketId),
          events: Array.from(ledger.events, ([id, event]) => ({
            id: Number(id),
            name: decodeText(event.name),
            venue: decodeText(event.venue),
            dateLabel: decodeText(event.dateLabel),
            artworkUrl: decodeText(event.artworkUrl),
            startsAt: Number(event.startsAt),
            minAge: Number(event.minAge),
            ageCutoff: Number(event.ageCutoff),
            capacity: Number(event.capacity),
            generalPrice: event.generalPrice,
            premiumPrice: event.premiumPrice,
            maxTransfers: Number(event.maxTransfers),
            issued: Number(event.issued),
            redeemed: Number(event.redeemed),
            revenue: event.revenue,
            proceedsClaimed: event.proceedsClaimed,
            organizerHash: bytesToHex(event.organizerHash),
            status: event.status,
          })).sort((a, b) => a.id - b.id),
          tickets: Array.from(ledger.tickets, ([id, ticket]): TicketView => ({
            id: Number(id),
            eventId: Number(ticket.eventId),
            tier: ticket.tier,
            ownerHash: bytesToHex(ticket.ownerHash),
            entryReady: !isZeroBytes(ticket.entryCommitment),
            used: ticket.used,
            transfers: Number(ticket.transfers),
          })).sort((a, b) => b.id - a.id),
        })),
      );
  }

  private async updatePrivateState(update: Partial<ZkTicketPrivateState>): Promise<void> {
    this.privateState = { ...this.privateState, ...update };
    await this.providers.privateStateProvider.set(zkTicketPrivateStateKey, this.privateState);
  }

  getOrganizerCommitment(): string {
    return bytesToHex(ContractBindings.pureCircuits.organizerCommitment(this.privateState.secretKey));
  }

  getReceivingCode(eventId: number): string {
    return bytesToHex(ContractBindings.pureCircuits.ownerCommitment(this.privateState.secretKey, BigInt(eventId)));
  }

  ownsTicket(ticket: TicketView): boolean {
    return ticket.ownerHash === this.getReceivingCode(ticket.eventId);
  }

  async createEvent(input: CreateEventInput): Promise<void> {
    await (this.deployedContract as any).callTx.createEvent(
      encodeText(input.name),
      encodeText(input.venue),
      encodeText(input.dateLabel),
      encodeArtworkUrl(input.artworkUrl),
      input.startsAt,
      input.minAge,
      input.ageCutoff,
      input.capacity,
      input.generalPrice,
      input.premiumPrice,
      input.maxTransfers,
    );
  }

  async setEventStatus(eventId: number, status: EventStatus): Promise<void> {
    await (this.deployedContract as any).callTx.setEventStatus(BigInt(eventId), status);
  }

  async buyTicket(eventId: number, tier: TicketTier): Promise<void> {
    await (this.deployedContract as any).callTx.buyTicket(BigInt(eventId), tier);
  }

  async proveEligibility(ticketId: number, birthDate: bigint): Promise<void> {
    await this.updatePrivateState({ birthDate });
    await (this.deployedContract as any).callTx.proveEligibility(BigInt(ticketId));
  }

  async prepareEntry(ticketId: number, birthDate: bigint): Promise<Uint8Array> {
    const entrySecret = crypto.getRandomValues(new Uint8Array(32));
    await this.updatePrivateState({ birthDate, entrySecret });
    await (this.deployedContract as any).callTx.prepareEntry(BigInt(ticketId));
    return entrySecret;
  }

  async redeemTicket(ticketId: number, entrySecret: Uint8Array): Promise<void> {
    await (this.deployedContract as any).callTx.redeemTicket(BigInt(ticketId), entrySecret);
  }

  async transferTicket(ticketId: number, recipientCode: string): Promise<void> {
    await (this.deployedContract as any).callTx.transferTicket(BigInt(ticketId), hexToBytes(recipientCode));
  }

  async claimEventProceeds(eventId: number, recipientAddress: string): Promise<void> {
    const encodedAddress = MidnightBech32m.parse(recipientAddress);
    const networkId = encodedAddress.network === mainnet ? 'mainnet' : encodedAddress.network;
    const userAddress = encodedAddress.decode(UnshieldedAddress, networkId).hexString;

    await (this.deployedContract as any).callTx.claimEventProceeds(
      BigInt(eventId),
      { bytes: encodeUserAddress(userAddress) },
    );
  }

  static async deploy(providers: ZkTicketProviders, secretKey: Uint8Array): Promise<ZkTicketAPI> {
    const privateState = createZkTicketPrivateState(secretKey);
    const deployed = await deployContract(providers as any, {
      compiledContract: CompiledZkTicketContract,
      privateStateId: zkTicketPrivateStateKey,
      initialPrivateState: privateState,
    });
    return new ZkTicketAPI(deployed, providers, privateState);
  }

  static async join(
    providers: ZkTicketProviders,
    contractAddress: ContractAddress,
    secretKey: Uint8Array,
  ): Promise<ZkTicketAPI> {
    const privateState = createZkTicketPrivateState(secretKey);
    const deployed = await findDeployedContract(providers as any, {
      contractAddress,
      compiledContract: CompiledZkTicketContract,
      privateStateId: zkTicketPrivateStateKey,
      initialPrivateState: privateState,
    });
    return new ZkTicketAPI(deployed, providers, privateState);
  }
}

export * from './common-types.js';
export * from './encoding.js';
export { EventStatus, TicketTier } from '../../contract/managed/zkticket/contract/index.js';
