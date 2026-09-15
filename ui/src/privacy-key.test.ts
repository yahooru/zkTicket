import { describe, expect, it } from 'vitest';
import { decryptPrivacyKey, encryptPrivacyKey } from './privacy-key';

const PASSPHRASE = 'Midnight-Tickets-2026';

describe('encrypted privacy-key backup', () => {
  it('round-trips a 32-byte identity key without exposing it in plaintext', async () => {
    const secret = new Uint8Array(32).fill(7);
    const backup = await encryptPrivacyKey(secret, PASSPHRASE);
    expect(backup).toMatch(/^zkticket-key:v1:/);
    expect(backup).not.toContain('07'.repeat(32));
    await expect(decryptPrivacyKey(backup, PASSPHRASE)).resolves.toEqual(secret);
  });

  it('rejects weak passphrases and incorrect recovery credentials', async () => {
    await expect(encryptPrivacyKey(new Uint8Array(32), 'short')).rejects.toThrow('16 characters');
    const backup = await encryptPrivacyKey(new Uint8Array(32).fill(1), PASSPHRASE);
    await expect(decryptPrivacyKey(backup, 'Incorrect-Phrase-2026')).rejects.toThrow('incorrect');
  });

  it('rejects malformed backup data', async () => {
    await expect(decryptPrivacyKey('not-a-backup', PASSPHRASE)).rejects.toThrow('not valid');
  });
});
