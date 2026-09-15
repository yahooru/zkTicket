import { hexToBytes } from '../../api/src/encoding';

export const QR_TTL_MS = 60_000;

export interface EntryProofPayload {
  readonly v: 1;
  readonly network: string;
  readonly contract: string;
  readonly ticketId: number;
  readonly eventId: number;
  readonly secret: string;
  readonly expiresAt: number;
}

export const encodeEntryProof = (payload: EntryProofPayload): string => JSON.stringify(payload);

export const parseEntryProof = (
  value: string,
  expectedNetwork: string,
  expectedContract: string,
  now = Date.now(),
): EntryProofPayload => {
  let payload: unknown;
  try {
    payload = JSON.parse(value);
  } catch {
    throw new Error('This QR code is not a zkTicket entry proof.');
  }
  if (!payload || typeof payload !== 'object') throw new Error('Entry proof payload is invalid.');
  const proof = payload as Partial<EntryProofPayload>;
  if (proof.v !== 1) throw new Error('Unsupported entry proof version.');
  if (proof.network !== expectedNetwork) throw new Error(`This proof belongs to ${proof.network ?? 'another network'}.`);
  if (proof.contract !== expectedContract) throw new Error('This proof belongs to a different zkTicket contract.');
  if (!Number.isSafeInteger(proof.ticketId) || !Number.isSafeInteger(proof.eventId) || Number(proof.ticketId) < 1 || Number(proof.eventId) < 1) throw new Error('Ticket identifiers are invalid.');
  if (typeof proof.expiresAt !== 'number' || proof.expiresAt <= now) throw new Error('This entry proof has expired. Ask the guest to generate a new one.');
  if (proof.expiresAt > now + QR_TTL_MS + 5_000) throw new Error('This entry proof has an invalid expiry.');
  if (typeof proof.secret !== 'string') throw new Error('Entry proof secret is missing.');
  hexToBytes(proof.secret);
  return proof as EntryProofPayload;
};
