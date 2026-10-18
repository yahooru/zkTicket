import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum EventStatus { ACTIVE = 0, PAUSED = 1, CLOSED = 2 }

export enum TicketTier { GENERAL = 0, PREMIUM = 1 }

export type EventRecord = { name: Uint8Array;
                            venue: Uint8Array;
                            dateLabel: Uint8Array;
                            artworkUrl: Uint8Array;
                            startsAt: bigint;
                            minAge: bigint;
                            ageCutoff: bigint;
                            capacity: bigint;
                            generalPrice: bigint;
                            premiumPrice: bigint;
                            maxTransfers: bigint;
                            issued: bigint;
                            redeemed: bigint;
                            refunded: bigint;
                            refundsOpen: boolean;
                            revenue: bigint;
                            refundsPaid: bigint;
                            proceedsClaimed: bigint;
                            organizerHash: Uint8Array;
                            status: EventStatus
                          };

export type TicketRecord = { eventId: bigint;
                             tier: TicketTier;
                             ownerHash: Uint8Array;
                             entryCommitment: Uint8Array;
                             used: boolean;
                             refunded: boolean;
                             transfers: bigint
                           };

export type Witnesses<PS> = {
  localSecretKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  localBirthDate(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  localEntrySecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  createEvent(context: __compactRuntime.CircuitContext<PS>,
              name_0: Uint8Array,
              venue_0: Uint8Array,
              dateLabel_0: Uint8Array,
              artworkUrl_0: Uint8Array,
              startsAt_0: bigint,
              minAge_0: bigint,
              ageCutoff_0: bigint,
              capacity_0: bigint,
              generalPrice_0: bigint,
              premiumPrice_0: bigint,
              maxTransfers_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setEventStatus(context: __compactRuntime.CircuitContext<PS>,
                 eventId_0: bigint,
                 status_0: EventStatus): __compactRuntime.CircuitResults<PS, []>;
  setRefundPolicy(context: __compactRuntime.CircuitContext<PS>,
                  eventId_0: bigint,
                  refundsOpen_0: boolean): __compactRuntime.CircuitResults<PS, []>;
  buyTicket(context: __compactRuntime.CircuitContext<PS>,
            eventId_0: bigint,
            tier_0: TicketTier): __compactRuntime.CircuitResults<PS, []>;
  proveEligibility(context: __compactRuntime.CircuitContext<PS>,
                   ticketId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  prepareEntry(context: __compactRuntime.CircuitContext<PS>, ticketId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  redeemTicket(context: __compactRuntime.CircuitContext<PS>,
               ticketId_0: bigint,
               presentedSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferTicket(context: __compactRuntime.CircuitContext<PS>,
                 ticketId_0: bigint,
                 newOwnerHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  claimEventProceeds(context: __compactRuntime.CircuitContext<PS>,
                     eventId_0: bigint,
                     recipient_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  claimRefund(context: __compactRuntime.CircuitContext<PS>,
              ticketId_0: bigint,
              recipient_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  createEvent(context: __compactRuntime.CircuitContext<PS>,
              name_0: Uint8Array,
              venue_0: Uint8Array,
              dateLabel_0: Uint8Array,
              artworkUrl_0: Uint8Array,
              startsAt_0: bigint,
              minAge_0: bigint,
              ageCutoff_0: bigint,
              capacity_0: bigint,
              generalPrice_0: bigint,
              premiumPrice_0: bigint,
              maxTransfers_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setEventStatus(context: __compactRuntime.CircuitContext<PS>,
                 eventId_0: bigint,
                 status_0: EventStatus): __compactRuntime.CircuitResults<PS, []>;
  setRefundPolicy(context: __compactRuntime.CircuitContext<PS>,
                  eventId_0: bigint,
                  refundsOpen_0: boolean): __compactRuntime.CircuitResults<PS, []>;
  buyTicket(context: __compactRuntime.CircuitContext<PS>,
            eventId_0: bigint,
            tier_0: TicketTier): __compactRuntime.CircuitResults<PS, []>;
  proveEligibility(context: __compactRuntime.CircuitContext<PS>,
                   ticketId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  prepareEntry(context: __compactRuntime.CircuitContext<PS>, ticketId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  redeemTicket(context: __compactRuntime.CircuitContext<PS>,
               ticketId_0: bigint,
               presentedSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferTicket(context: __compactRuntime.CircuitContext<PS>,
                 ticketId_0: bigint,
                 newOwnerHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  claimEventProceeds(context: __compactRuntime.CircuitContext<PS>,
                     eventId_0: bigint,
                     recipient_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  claimRefund(context: __compactRuntime.CircuitContext<PS>,
              ticketId_0: bigint,
              recipient_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  organizerCommitment(sk_0: Uint8Array): Uint8Array;
  ownerCommitment(sk_0: Uint8Array, eventId_0: bigint): Uint8Array;
  entryCommitment(entrySecret_0: Uint8Array, ticketId_0: bigint): Uint8Array;
  priceForTier(event_0: EventRecord, tier_0: TicketTier): bigint;
}

export type Circuits<PS> = {
  organizerCommitment(context: __compactRuntime.CircuitContext<PS>,
                      sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  ownerCommitment(context: __compactRuntime.CircuitContext<PS>,
                  sk_0: Uint8Array,
                  eventId_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  entryCommitment(context: __compactRuntime.CircuitContext<PS>,
                  entrySecret_0: Uint8Array,
                  ticketId_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  priceForTier(context: __compactRuntime.CircuitContext<PS>,
               event_0: EventRecord,
               tier_0: TicketTier): __compactRuntime.CircuitResults<PS, bigint>;
  createEvent(context: __compactRuntime.CircuitContext<PS>,
              name_0: Uint8Array,
              venue_0: Uint8Array,
              dateLabel_0: Uint8Array,
              artworkUrl_0: Uint8Array,
              startsAt_0: bigint,
              minAge_0: bigint,
              ageCutoff_0: bigint,
              capacity_0: bigint,
              generalPrice_0: bigint,
              premiumPrice_0: bigint,
              maxTransfers_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setEventStatus(context: __compactRuntime.CircuitContext<PS>,
                 eventId_0: bigint,
                 status_0: EventStatus): __compactRuntime.CircuitResults<PS, []>;
  setRefundPolicy(context: __compactRuntime.CircuitContext<PS>,
                  eventId_0: bigint,
                  refundsOpen_0: boolean): __compactRuntime.CircuitResults<PS, []>;
  buyTicket(context: __compactRuntime.CircuitContext<PS>,
            eventId_0: bigint,
            tier_0: TicketTier): __compactRuntime.CircuitResults<PS, []>;
  proveEligibility(context: __compactRuntime.CircuitContext<PS>,
                   ticketId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  prepareEntry(context: __compactRuntime.CircuitContext<PS>, ticketId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  redeemTicket(context: __compactRuntime.CircuitContext<PS>,
               ticketId_0: bigint,
               presentedSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferTicket(context: __compactRuntime.CircuitContext<PS>,
                 ticketId_0: bigint,
                 newOwnerHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  claimEventProceeds(context: __compactRuntime.CircuitContext<PS>,
                     eventId_0: bigint,
                     recipient_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  claimRefund(context: __compactRuntime.CircuitContext<PS>,
              ticketId_0: bigint,
              recipient_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  events: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): EventRecord;
    [Symbol.iterator](): Iterator<[bigint, EventRecord]>
  };
  tickets: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): TicketRecord;
    [Symbol.iterator](): Iterator<[bigint, TicketRecord]>
  };
  readonly nextEventId: bigint;
  readonly nextTicketId: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
