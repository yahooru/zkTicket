import type { FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { ZkTicketPrivateState } from '../../contract/src/index.js';
import type { EventStatus, TicketTier } from '../../contract/managed/zkticket/contract/index.js';

export const zkTicketPrivateStateKey = 'zkTicketPrivateState';
export type PrivateStateId = typeof zkTicketPrivateStateKey;

export type ZkTicketCircuitKeys =
  | 'createEvent'
  | 'setEventStatus'
  | 'buyTicket'
  | 'proveEligibility'
  | 'prepareEntry'
  | 'redeemTicket'
  | 'transferTicket'
  | 'claimEventProceeds';

export type ZkTicketProviders = MidnightProviders<ZkTicketCircuitKeys, PrivateStateId, ZkTicketPrivateState>;
export type DeployedZkTicketContract = FoundContract<any>;

export interface EventView {
  readonly id: number;
  readonly name: string;
  readonly venue: string;
  readonly dateLabel: string;
  readonly artworkUrl: string;
  readonly startsAt: number;
  readonly minAge: number;
  readonly ageCutoff: number;
  readonly capacity: number;
  readonly generalPrice: bigint;
  readonly premiumPrice: bigint;
  readonly maxTransfers: number;
  readonly issued: number;
  readonly redeemed: number;
  readonly revenue: bigint;
  readonly proceedsClaimed: bigint;
  readonly organizerHash: string;
  readonly status: EventStatus;
}

export interface TicketView {
  readonly id: number;
  readonly eventId: number;
  readonly tier: TicketTier;
  readonly ownerHash: string;
  readonly entryReady: boolean;
  readonly used: boolean;
  readonly transfers: number;
}

export interface ZkTicketDerivedState {
  readonly eventCount: number;
  readonly ticketCount: number;
  readonly events: EventView[];
  readonly tickets: TicketView[];
}

export interface CreateEventInput {
  readonly name: string;
  readonly venue: string;
  readonly dateLabel: string;
  readonly artworkUrl: string;
  readonly startsAt: bigint;
  readonly minAge: bigint;
  readonly ageCutoff: bigint;
  readonly capacity: bigint;
  readonly generalPrice: bigint;
  readonly premiumPrice: bigint;
  readonly maxTransfers: bigint;
}
