import { describe, expect, it } from 'vitest';
import { truncateDecimals } from './format';

describe('truncateDecimals', () => {
  it('should truncate to 4 decimal places by default', () => {
    expect(truncateDecimals('1.123456789')).toBe('1.1234');
  });

  it('should truncate to custom decimal places', () => {
    expect(truncateDecimals('1.123456789', 2)).toBe('1.12');
  });

  it('should remove trailing zeros', () => {
    expect(truncateDecimals('1.10000000')).toBe('1.1');
  });

  it('should return integer when all decimals are zeros', () => {
    expect(truncateDecimals('1.00000000')).toBe('1');
  });

  it('should return integer when no decimal part', () => {
    expect(truncateDecimals('42')).toBe('42');
  });
});
