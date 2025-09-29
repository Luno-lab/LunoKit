import { describe, expect, it } from 'vitest';
import { formatAddress, formatBalance, formatBalanceWithUnit } from './format';

const longAddress = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
const shortAddress = '1ABC2def';
describe('format utils', () => {
  describe('formatBalance', () => {
    describe('basic functionality', () => {
      it('should format integer values correctly', () => {
        expect(formatBalance('1000000000000', 10)).toBe('100');
        expect(formatBalance(BigInt('1000000000000'), 10)).toBe('100');
        expect(formatBalance(1000000000000, 10)).toBe('100');
      });

      it('should handle decimal values with default precision', () => {
        expect(formatBalance('1234567890123', 10)).toBe('123.4567');
        expect(formatBalance('1005000000000', 10)).toBe('100.5');
      });

      it('should respect custom fixedDecimals parameter', () => {
        expect(formatBalance('1234567890123', 10, 2)).toBe('123.45');
        expect(formatBalance('1234567890123', 10, 6)).toBe('123.456789');
        expect(formatBalance('1234567890123', 10, 0)).toBe('123');
      });

      it('should handle zero decimals', () => {
        expect(formatBalance('123', 0)).toBe('123');
        expect(formatBalance(BigInt(456), 0)).toBe('456');
      });
    });

    describe('edge cases', () => {
      it('should handle zero values', () => {
        expect(formatBalance('0', 10)).toBe('0');
        expect(formatBalance(0, 10)).toBe('0');
        expect(formatBalance(BigInt(0), 10)).toBe('0');
      });

      it('should handle values with no fractional part', () => {
        expect(formatBalance('10000000000', 10)).toBe('1');
        expect(formatBalance('20000000000', 10)).toBe('2');
      });

      it('should remove trailing zeros from decimals', () => {
        expect(formatBalance('10050000000', 10)).toBe('1.005');
        expect(formatBalance('10000000001', 10)).toBe('1');
        expect(formatBalance('10000000001', 10, 10)).toBe('1.0000000001');
      });

      it('should handle very large numbers', () => {
        const largeValue = '123456789012345678901234567890';
        expect(() => formatBalance(largeValue, 10)).not.toThrow();
      });

      it('should handle very small fractions', () => {
        expect(formatBalance('1', 18, 18)).toBe('0.000000000000000001');
        expect(formatBalance('1', 18, 2)).toBe('0');
      });
    });

    describe('boundary conditions', () => {
      it('should handle null and undefined', () => {
        expect(formatBalance(null, 10)).toBe('0');
        expect(formatBalance(undefined, 10)).toBe('0');
      });

      it('should handle negative values', () => {
        expect(formatBalance('-1000000000000', 10)).toBe('-100');
        expect(formatBalance(BigInt(-1000000000000), 10)).toBe('-100');
      });

      it('should handle edge decimal parameters', () => {
        expect(formatBalance('123', 0, 10)).toBe('123');
        expect(formatBalance('123456', 6, 0)).toBe('0');
      });
    });

    describe('parameter validation', () => {
      it('should handle invalid string numbers gracefully', () => {
        expect(formatBalance('', 10)).toBe('0');
        expect(() => formatBalance('abc', 10)).toThrow();
      });

      it('should handle negative decimals', () => {
        expect(() => formatBalance('123', -1)).toThrow();
      });
    });
  });

  describe('formatAddress', () => {
    describe('basic functionality', () => {
      it('should format long addresses with default parameters', () => {
        const result = formatAddress(longAddress);
        expect(result).toBe('1FRM...24fg');
        expect(result.length).toBe(11);
      });

      it('should format with custom prefix and suffix lengths', () => {
        expect(formatAddress(longAddress, 6, 6)).toBe('1FRMM8...hV24fg');
        expect(formatAddress(longAddress, 2, 2)).toBe('1F...fg');
        expect(formatAddress(longAddress, 8, 8)).toBe('1FRMM8PE...VYhV24fg');
      });

      it('should return full address when length is within limits', () => {
        expect(formatAddress(shortAddress, 4, 4)).toBe(shortAddress);
        expect(formatAddress('1234', 2, 2)).toBe('1234');
        expect(formatAddress('123', 2, 2)).toBe('123');
      });
    });

    describe('edge cases', () => {
      it('should handle empty and undefined addresses', () => {
        expect(formatAddress('')).toBe('');
        expect(formatAddress(undefined)).toBe('');
        expect(formatAddress(null as any)).toBe('');
      });

      it('should handle zero length parameters', () => {
        expect(formatAddress(longAddress, 0, 0)).toBe('...');
        expect(formatAddress(longAddress, 0, 4)).toBe('...24fg');
        expect(formatAddress(longAddress, 4, 0)).toBe('1FRM...');
      });

      it('should handle parameters larger than address length', () => {
        expect(formatAddress('12345', 10, 10)).toBe('12345');
        expect(formatAddress('abc', 5, 5)).toBe('abc');
      });
    });

    describe('boundary conditions', () => {
      it('should handle single character address', () => {
        expect(formatAddress('A', 1, 1)).toBe('A');
        expect(formatAddress('A', 2, 2)).toBe('A');
      });

      it('should handle exactly minimum length addresses', () => {
        expect(formatAddress('12345678', 4, 4)).toBe('12345678');
        expect(formatAddress('123456789', 4, 4)).toBe('1234...6789');
      });
    });

    describe('special characters', () => {
      it('should handle addresses with special characters', () => {
        const addressWithSpecial = '0x1234!@#$%^&*()abcdef';
        expect(formatAddress(addressWithSpecial, 4, 4)).toBe('0x12...cdef');
      });

      it('should handle unicode characters', () => {
        const unicodeAddress = '🚀1234567890abcdef🌙';
        expect(formatAddress(unicodeAddress, 2, 2)).toBe('🚀...🌙');
      });
    });
  });

  describe('formatBalanceWithUnit', () => {
    describe('export validation', () => {
      it('should be properly exported from dedot/utils', () => {
        expect(typeof formatBalanceWithUnit).toBe('function');
      });

      it('should be defined and callable', () => {
        expect(formatBalanceWithUnit).toBeDefined();
        expect(() => formatBalanceWithUnit).not.toThrow();
      });
    });

    describe('basic functionality', () => {
      it('should be callable with basic parameters', () => {
        expect(() => formatBalanceWithUnit('1000000000000', 10)).not.toThrow();
      });

      it('should return string type result', () => {
        const result = formatBalanceWithUnit('1000000000000', 10);
        expect(typeof result).toBe('string');
      });

      it('should handle different parameter types', () => {
        expect(() => formatBalanceWithUnit(BigInt(1000000000000), 10)).not.toThrow();
        expect(() => formatBalanceWithUnit(1000000000000, 10)).not.toThrow();
      });
    });

    describe('boundary conditions', () => {
      it('should handle null and undefined gracefully', () => {
        expect(() => formatBalanceWithUnit(null as any, 10)).not.toThrow();
        expect(() => formatBalanceWithUnit(undefined as any, 10)).not.toThrow();
      });

      it('should handle edge case parameters', () => {
        expect(() => formatBalanceWithUnit('0', 0)).not.toThrow();
        expect(() => formatBalanceWithUnit('1', 18)).not.toThrow();
      });
    });
  });
});
