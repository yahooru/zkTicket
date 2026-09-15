import { describe, expect, it, vi } from 'vitest';
import type { InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import { beginWalletConnection, findCompatibleWallet, listCompatibleWallets } from './wallet-connector';

const wallet = (apiVersion: string, connect = vi.fn()) => ({
  apiVersion,
  connect,
  icon: '',
  name: 'Test wallet',
  rdns: 'test.wallet',
}) as unknown as InitialAPI;

describe('wallet connector discovery', () => {
  it('selects a Connector API 4.x wallet', () => {
    const compatible = wallet('4.0.1');
    expect(findCompatibleWallet({ legacy: wallet('3.2.0'), compatible })).toBe(compatible);
  });

  it('deduplicates friendly and generated keys for the same wallet', () => {
    const compatible = wallet('4.0.1');
    expect(listCompatibleWallets({ '1am': compatible, generated: compatible })).toEqual([{ id: '1am', wallet: compatible }]);
  });

  it('rejects missing and incompatible wallets', () => {
    expect(findCompatibleWallet(undefined)).toBeUndefined();
    expect(() => beginWalletConnection({ legacy: wallet('3.2.0') }, 'preprod')).toThrow('No compatible Midnight wallet');
  });

  it('starts authorization immediately for the requested network', () => {
    const connectedAPI = Promise.resolve({});
    const connect = vi.fn(() => connectedAPI);
    const compatible = wallet('4.1.0', connect);

    const attempt = beginWalletConnection({ compatible, other: wallet('4.0.1') }, 'preprod', 'compatible');

    expect(connect).toHaveBeenCalledOnce();
    expect(connect).toHaveBeenCalledWith('preprod');
    expect(attempt.connectedAPI).toBe(connectedAPI);
  });
});
