import { describe, expect, it } from 'vitest';
import { cutoffForAge, dateToCompact, encodeArtworkUrl, nightToRaw } from '../../api/src/encoding';

describe('protocol input encoding', () => {
  it('rejects calendar dates that JavaScript would silently normalize', () => {
    expect(() => dateToCompact('2026-02-29')).toThrow('valid date');
    expect(dateToCompact('2028-02-29')).toBe(20280229n);
  });

  it('handles leap-day age cutoffs deterministically', () => {
    expect(cutoffForAge('2028-02-29', 18)).toBe(20100228n);
  });

  it('converts NIGHT exactly and rejects Uint64 overflow', () => {
    expect(nightToRaw('1.000001')).toBe(1_000_001n);
    expect(() => nightToRaw('18446744073709.551616')).toThrow('protocol limit');
  });

  it('encodes secure artwork URLs into the fixed on-chain field', () => {
    const encoded = encodeArtworkUrl('https://images.example.com/event.webp');
    expect(encoded).toHaveLength(128);
    expect(new TextDecoder().decode(encoded).replace(/\0+$/g, '')).toBe('https://images.example.com/event.webp');
    expect(() => encodeArtworkUrl('http://images.example.com/event.webp')).toThrow('HTTPS');
    expect(() => encodeArtworkUrl(`https://example.com/${'x'.repeat(120)}`)).toThrow('128');
  });
});
