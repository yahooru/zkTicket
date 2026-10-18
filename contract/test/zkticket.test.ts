import { beforeEach, describe, expect, it } from 'vitest';
import * as Runtime from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  Contract,
  EventStatus,
  TicketTier,
  ledger,
  pureCircuits,
  type Circuits,
} from '../managed/zkticket/contract/index.js';
import {
  createWitnesses,
  createZkTicketPrivateState,
  type ZkTicketPrivateState,
} from '../src/witnesses.js';

const COIN = '0'.repeat(64);
const bytes = (value: number): Uint8Array => new Uint8Array(32).fill(value);
const text = (value: string): Uint8Array => {
  const encoded = new Uint8Array(32);
  encoded.set(new TextEncoder().encode(value));
  return encoded;
};
const url = (value: string): Uint8Array => {
  const encoded = new Uint8Array(128);
  encoded.set(new TextEncoder().encode(value));
  return encoded;
};

describe('zkTicket compiled Compact contract', () => {
  let contract: Contract<ZkTicketPrivateState>;
  let context: Runtime.CircuitContext<ZkTicketPrivateState>;
  const organizerSecret = bytes(1);

  const call = <K extends keyof Circuits<ZkTicketPrivateState>>(
    name: K,
    ...args: Parameters<Circuits<ZkTicketPrivateState>[K]> extends [unknown, ...infer Rest] ? Rest : never
  ): void => {
    const result = (contract.impureCircuits[name] as (...values: unknown[]) => Runtime.CircuitResults<ZkTicketPrivateState, unknown>)(
      context,
      ...args,
    );
    context = result.context;
  };

  const usePrivateState = (secretKey: Uint8Array, birthDate = 0n, entrySecret = bytes(0)): void => {
    context = {
      ...context,
      currentPrivateState: createZkTicketPrivateState(secretKey, birthDate, entrySecret),
    };
  };

  beforeEach(() => {
    contract = new Contract(createWitnesses());
    const privateState = createZkTicketPrivateState(organizerSecret);
    const initial = contract.initialState(Runtime.createConstructorContext(privateState, COIN));
    context = Runtime.createCircuitContext(
      Runtime.sampleContractAddress(),
      COIN,
      initial.currentContractState,
      initial.currentPrivateState,
    );
    call(
      'createEvent',
      text('Midnight Sessions'),
      text('Bangalore'),
      text('25 Oct 2026'),
      url('https://images.example/event.webp'),
      1_793_024_400n,
      18n,
      20081025n,
      2n,
      1_000_000n,
      2_000_000n,
      1n,
    );
  });

  it('stores organizer-created event configuration entirely in ledger state', () => {
    const state = ledger(context.currentQueryContext.state);
    const event = state.events.lookup(1n);
    expect(state.nextEventId).toBe(1n);
    expect(new TextDecoder().decode(event.name).replace(/\0/g, '')).toBe('Midnight Sessions');
    expect(new TextDecoder().decode(event.artworkUrl).replace(/\0/g, '')).toBe('https://images.example/event.webp');
    expect(event.generalPrice).toBe(1_000_000n);
    expect(event.premiumPrice).toBe(2_000_000n);
    expect(event.minAge).toBe(18n);
    expect(event.organizerHash).toEqual(pureCircuits.organizerCommitment(organizerSecret));
  });

  it('rejects invalid event configuration before mutating ledger counters', () => {
    expect(() => call(
      'createEvent', text('Invalid'), text('Nowhere'), text('25 Oct 2026'), url('https://images.example/invalid.webp'),
      1_793_024_400n, 0n, 0n, 0n, 1n, 2n, 0n,
    )).toThrow('capacity');
    expect(() => call(
      'createEvent', text('Invalid age'), text('Nowhere'), text('25 Oct 2026'), url('https://images.example/invalid.webp'),
      1_793_024_400n, 18n, 0n, 1n, 1n, 2n, 0n,
    )).toThrow('age policy');
    expect(ledger(context.currentQueryContext.state).nextEventId).toBe(1n);
  });

  it('takes tier-priced NIGHT, creates an anonymous ticket, and enforces capacity', () => {
    call('buyTicket', 1n, TicketTier.PREMIUM);
    call('buyTicket', 1n, TicketTier.GENERAL);
    const state = ledger(context.currentQueryContext.state);
    expect(state.nextTicketId).toBe(2n);
    expect(state.events.lookup(1n).issued).toBe(2n);
    expect(state.events.lookup(1n).revenue).toBe(3_000_000n);
    expect(state.tickets.lookup(1n).ownerHash).toEqual(pureCircuits.ownerCommitment(organizerSecret, 1n));
    expect(() => call('buyTicket', 1n, TicketTier.GENERAL)).toThrow('sold out');
  });

  it('proves age eligibility without writing the private birth date', () => {
    call('buyTicket', 1n, TicketTier.GENERAL);
    usePrivateState(organizerSecret, 20000101n);
    expect(() => call('proveEligibility', 1n)).not.toThrow();

    usePrivateState(organizerSecret, 20120101n);
    expect(() => call('proveEligibility', 1n)).toThrow('age requirement not met');
    const serializedLedger = JSON.stringify(ledger(context.currentQueryContext.state), (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
    expect(serializedLedger).not.toContain('20000101');
    expect(serializedLedger).not.toContain('20120101');
  });

  it('creates a rotating QR commitment and rejects invalid or repeated redemption', () => {
    call('buyTicket', 1n, TicketTier.GENERAL);
    const entrySecret = bytes(7);
    usePrivateState(organizerSecret, 20000101n, entrySecret);
    call('prepareEntry', 1n);
    expect(ledger(context.currentQueryContext.state).tickets.lookup(1n).entryCommitment)
      .toEqual(pureCircuits.entryCommitment(entrySecret, 1n));

    expect(() => call('redeemTicket', 1n, bytes(8))).toThrow('entry proof is invalid');
    call('redeemTicket', 1n, entrySecret);
    const state = ledger(context.currentQueryContext.state);
    expect(state.tickets.lookup(1n).used).toBe(true);
    expect(state.events.lookup(1n).redeemed).toBe(1n);
    expect(() => call('redeemTicket', 1n, entrySecret)).toThrow('already redeemed');
  });

  it('transfers ownership by commitment and invalidates the previous holder', () => {
    call('buyTicket', 1n, TicketTier.GENERAL);
    const recipientSecret = bytes(2);
    const recipient = pureCircuits.ownerCommitment(recipientSecret, 1n);
    call('transferTicket', 1n, recipient);

    usePrivateState(organizerSecret, 20000101n, bytes(5));
    expect(() => call('prepareEntry', 1n)).toThrow('ownership proof failed');

    usePrivateState(recipientSecret, 20000101n, bytes(6));
    expect(() => call('prepareEntry', 1n)).not.toThrow();
    expect(() => call('transferTicket', 1n, pureCircuits.ownerCommitment(bytes(3), 1n))).toThrow('transfer limit reached');
  });

  it('enforces paused sales and closed entry at the contract boundary', () => {
    call('buyTicket', 1n, TicketTier.GENERAL);
    call('setEventStatus', 1n, EventStatus.PAUSED);
    expect(() => call('buyTicket', 1n, TicketTier.GENERAL)).toThrow('not accepting tickets');

    usePrivateState(organizerSecret, 20000101n, bytes(6));
    expect(() => call('prepareEntry', 1n)).not.toThrow();
    call('setEventStatus', 1n, EventStatus.CLOSED);
    expect(() => call('prepareEntry', 1n)).toThrow('entry is closed');
    expect(() => call('redeemTicket', 1n, bytes(6))).toThrow('entry is closed');
  });

  it('refuses no-op ownership transfers and all transfers after redemption', () => {
    call('buyTicket', 1n, TicketTier.GENERAL);
    expect(() => call('transferTicket', 1n, pureCircuits.ownerCommitment(organizerSecret, 1n))).toThrow('different');
    usePrivateState(organizerSecret, 20000101n, bytes(6));
    call('prepareEntry', 1n);
    call('redeemTicket', 1n, bytes(6));
    expect(() => call('transferTicket', 1n, pureCircuits.ownerCommitment(bytes(2), 1n))).toThrow('redeemed');
  });

  it('enforces organizer-only controls and refuses unfunded proceeds claims', () => {
    call('buyTicket', 1n, TicketTier.PREMIUM);
    usePrivateState(bytes(9));
    expect(() => call('setEventStatus', 1n, EventStatus.PAUSED)).toThrow('organizer authorization failed');

    usePrivateState(organizerSecret);
    call('setEventStatus', 1n, EventStatus.PAUSED);
    expect(ledger(context.currentQueryContext.state).events.lookup(1n).status).toBe(EventStatus.PAUSED);

    // The pure runtime does not finalize receiveUnshielded effects into a new
    // block. Until settlement supplies a contract balance, payout must fail.
    expect(() => call('claimEventProceeds', 1n, { bytes: bytes(4) })).toThrow('contract balance is insufficient');
    expect(ledger(context.currentQueryContext.state).events.lookup(1n).proceedsClaimed).toBe(0n);
  });

  it('requires organizer authorization to configure refunds and blocks closed ones', () => {
    call('buyTicket', 1n, TicketTier.PREMIUM);
    call('setRefundPolicy', 1n, false);

    expect(() => call('claimRefund', 1n, { bytes: bytes(4) })).toThrow('refunds are not open');
    usePrivateState(bytes(9));
    expect(() => call('setRefundPolicy', 1n, true)).toThrow('organizer authorization failed');
    usePrivateState(organizerSecret);
    call('setRefundPolicy', 1n, true);

    const state = ledger(context.currentQueryContext.state);
    expect(state.events.lookup(1n).refundsOpen).toBe(true);
    // Pure runtime cannot settle the received ticket payment into a balance.
    expect(() => call('claimRefund', 1n, { bytes: bytes(4) })).toThrow('contract balance is insufficient');
    expect(state.tickets.lookup(1n).refunded).toBe(false);
  });
});
