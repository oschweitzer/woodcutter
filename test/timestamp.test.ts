import { describe, expect, it } from 'vitest';
import { formatTimestamp } from '../src/timestamp.js';

describe('formatTimestamp', () => {
  const date = new Date(2026, 10, 4, 9, 5, 7, 42); // 4 November 2026, 09:05:07.042 local time

  it('formats the default pattern', () => {
    expect(formatTimestamp(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2026-11-04 09:05:07');
  });

  it('supports the short and padded tokens', () => {
    expect(formatTimestamp(date, 'YY/M/D H:m:s')).toBe('26/11/4 9:5:7');
  });

  it('supports milliseconds', () => {
    expect(formatTimestamp(date, 'HH:mm:ss.SSS')).toBe('09:05:07.042');
  });

  it('keeps bracketed text as is', () => {
    expect(formatTimestamp(date, '[YYYY] HH[h]')).toBe('YYYY 09h');
  });

  it('keeps unknown characters', () => {
    expect(formatTimestamp(date, 'DD.MM.YYYY @ HH:mm')).toBe('04.11.2026 @ 09:05');
  });

  it('pads a short year', () => {
    const early = new Date(2026, 0, 1);
    early.setFullYear(5);
    expect(formatTimestamp(early, 'YYYY')).toBe('0005');
  });
});
