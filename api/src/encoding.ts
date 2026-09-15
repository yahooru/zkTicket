const BYTE_LENGTH = 32;
export const ARTWORK_URL_BYTE_LENGTH = 128;
const MAX_UINT_64 = (1n << 64n) - 1n;

const parseISODate = (value: string): { year: number; month: number; day: number } => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error('A valid date is required.');
  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new Error('A valid date is required.');
  }
  return { year, month, day };
};

export const encodeText = (value: string): Uint8Array => {
  const bytes = new TextEncoder().encode(value.trim());
  if (bytes.length > BYTE_LENGTH) throw new Error('Text fields are limited to 32 UTF-8 bytes.');
  const result = new Uint8Array(BYTE_LENGTH);
  result.set(bytes);
  return result;
};

export const decodeText = (value: Uint8Array): string =>
  new TextDecoder().decode(value).replace(/\0+$/g, '');

export const encodeArtworkUrl = (value: string): Uint8Array => {
  const normalized = value.trim();
  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    throw new Error('Enter a valid artwork URL.');
  }
  if (parsed.protocol !== 'https:') throw new Error('Artwork must use a secure HTTPS URL.');
  const bytes = new TextEncoder().encode(parsed.toString());
  if (bytes.length > ARTWORK_URL_BYTE_LENGTH) throw new Error(`Artwork URL is limited to ${ARTWORK_URL_BYTE_LENGTH} UTF-8 bytes.`);
  const result = new Uint8Array(ARTWORK_URL_BYTE_LENGTH);
  result.set(bytes);
  return result;
};

export const bytesToHex = (value: Uint8Array): string =>
  Array.from(value, (byte) => byte.toString(16).padStart(2, '0')).join('');

export const hexToBytes = (value: string): Uint8Array => {
  const normalized = value.trim().replace(/^0x/, '');
  if (!/^[\da-f]{64}$/i.test(normalized)) throw new Error('Expected a 32-byte hexadecimal code.');
  return Uint8Array.from(normalized.match(/.{2}/g)!, (byte) => Number.parseInt(byte, 16));
};

export const isZeroBytes = (value: Uint8Array): boolean => value.every((byte) => byte === 0);

export const dateToCompact = (date: string): bigint => {
  const { year, month, day } = parseISODate(date);
  return BigInt(`${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`);
};

export const cutoffForAge = (eventDate: string, minAge: number): bigint => {
  if (minAge === 0) return 0n;
  if (!Number.isInteger(minAge) || minAge < 0 || minAge > 255) throw new Error('Age policy is invalid.');
  const { year, month, day } = parseISODate(eventDate);
  const cutoffYear = year - minAge;
  const date = new Date(Date.UTC(cutoffYear, month - 1, day));
  if (date.getUTCMonth() !== month - 1) date.setUTCDate(0);
  return BigInt(`${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, '0')}${String(date.getUTCDate()).padStart(2, '0')}`);
};

export const nightToRaw = (night: string | number): bigint => {
  const value = typeof night === 'number' ? String(night) : night.trim();
  if (!/^\d+(\.\d{1,6})?$/.test(value)) throw new Error('NIGHT amount must have at most 6 decimals.');
  const [whole, fraction = ''] = value.split('.');
  const raw = BigInt(whole) * 1_000_000n + BigInt(fraction.padEnd(6, '0'));
  if (raw > MAX_UINT_64) throw new Error('NIGHT amount exceeds the protocol limit.');
  return raw;
};

export const formatNight = (raw: bigint): string => {
  const whole = raw / 1_000_000n;
  const fraction = (raw % 1_000_000n).toString().padStart(6, '0').replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole.toString();
};
