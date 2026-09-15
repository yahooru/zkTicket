import { describe, expect, it } from 'vitest';
import { encodeEntryProof, parseEntryProof, type EntryProofPayload } from './qr';

const proof: EntryProofPayload = {
  v: 1,
  network: 'preprod',
  contract: '0200contract',
  ticketId: 7,
  eventId: 2,
  secret: 'ab'.repeat(32),
  expiresAt: 20_000,
};

describe('entry proof QR payload', () => {
  it('round-trips a valid scoped proof', () => {
    expect(parseEntryProof(encodeEntryProof(proof), 'preprod', proof.contract, 10_000)).toEqual(proof);
  });

  it('rejects expired proofs', () => {
    expect(() => parseEntryProof(encodeEntryProof(proof), 'preprod', proof.contract, 20_001)).toThrow('expired');
  });

  it('rejects a proof for another contract', () => {
    expect(() => parseEntryProof(encodeEntryProof(proof), 'preprod', 'other', 10_000)).toThrow('different');
  });

  it('rejects malformed secrets', () => {
    expect(() => parseEntryProof(JSON.stringify({ ...proof, secret: 'nope' }), 'preprod', proof.contract, 10_000)).toThrow('32-byte');
  });

  it('rejects non-positive identifiers and expiry values outside the QR window', () => {
    expect(() => parseEntryProof(JSON.stringify({ ...proof, ticketId: 0 }), 'preprod', proof.contract, 10_000)).toThrow('identifiers');
    expect(() => parseEntryProof(JSON.stringify({ ...proof, expiresAt: 80_000 }), 'preprod', proof.contract, 10_000)).toThrow('invalid expiry');
  });
});
