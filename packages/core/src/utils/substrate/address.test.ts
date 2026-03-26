import type { InjectedAccount } from 'dedot/types';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  convertAddress,
  getPublicKey,
  isSameAddress,
  isValidAddress,
  mapInjectedAccounts,
} from './address';

describe('address utils', () => {
  describe('isValidAddress', () => {
    it('should return true for valid Polkadot address', () => {
      expect(isValidAddress('1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg')).toBe(true);
    });

    it('should return true for valid Kusama address', () => {
      expect(isValidAddress('CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp')).toBe(true);
    });

    it('should return false for invalid address', () => {
      expect(isValidAddress('123')).toBe(false);
      expect(isValidAddress('   ')).toBe(false);
      expect(isValidAddress('')).toBe(false);
    });
  });

  describe('convertAddress', () => {
    const polkadotAddress = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';

    it('should convert address between different SS58 formats', () => {
      const kusamaFormat = convertAddress(polkadotAddress, 2);

      expect(kusamaFormat).not.toBe(polkadotAddress);
      expect(isValidAddress(kusamaFormat)).toBe(true);
    });

    it('should return EVM address unchanged', () => {
      const evmAddress = '0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97';
      expect(convertAddress(evmAddress, 0)).toBe(evmAddress);
    });

    it('should fallback to format 42 when ss58Format > 16383', () => {
      const result = convertAddress(polkadotAddress, 99999);
      const westendFormat = convertAddress(polkadotAddress, 42);

      expect(result).toBe(westendFormat);
    });

    it('should throw error for invalid address', () => {
      expect(() => convertAddress('invalid', 0)).toThrow('Failed to convert address');
      expect(() => convertAddress('', 0)).toThrow('Failed to convert address');
    });
  });

  describe('isSameAddress', () => {
    it('should return true for same address in different formats', () => {
      const polkadotAddr = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
      const kusamaAddr = convertAddress(polkadotAddr, 2);

      expect(isSameAddress(polkadotAddr, kusamaAddr)).toBe(true);
    });

    it('should return false for different addresses', () => {
      expect(
        isSameAddress(
          '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
          '12xtAYsRUrmbniiWQqJtECiBQrMn8AypQcXhnQAc6RB6XkLW'
        )
      ).toBe(false);
    });

    it('should return false for invalid addresses', () => {
      expect(isSameAddress('invalid1', 'invalid2')).toBe(false);
    });
  });

  describe('getPublicKey', () => {
    it('should extract 32-byte public key from valid address', () => {
      const publicKey = getPublicKey('1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg');

      expect(publicKey).toBeInstanceOf(Uint8Array);
      expect(publicKey.length).toBe(32);
    });

    it('should return same public key for same address in different formats', () => {
      const polkadotAddr = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
      const kusamaAddr = convertAddress(polkadotAddr, 2);

      expect(getPublicKey(polkadotAddr)).toEqual(getPublicKey(kusamaAddr));
    });

    it('should throw for invalid address', () => {
      expect(() => getPublicKey('invalid')).toThrow('Failed to get public key');
    });

    it('should throw for ethereum address (not 32 bytes)', () => {
      expect(() => getPublicKey('0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97')).toThrow(
        'Invalid public key length: expected 32 bytes'
      );
    });
  });

  describe('mapInjectedAccounts', () => {
    let consoleErrorSpy: any;

    beforeEach(() => {
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    it('should map valid account with chainType substrate', () => {
      const injectedAccounts: InjectedAccount[] = [
        {
          address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
          name: 'Test Account',
          type: 'sr25519',
          genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
        },
      ];

      const result = mapInjectedAccounts(injectedAccounts, 'polkadot-js');

      expect(result).toHaveLength(1);
      expect(result[0].address).toBe('1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg');
      expect(result[0].name).toBe('Test Account');
      expect(result[0].chainType).toBe('substrate');
      expect(result[0].meta?.source).toBe('polkadot-js');
      expect(result[0].publicKey).toMatch(/^0x[0-9a-f]+$/i);
    });

    it('should map multiple accounts with correct source', () => {
      const injectedAccounts: InjectedAccount[] = [
        {
          address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
          name: 'Account 1',
          type: 'sr25519',
        },
        {
          address: 'CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp',
          name: 'Account 2',
          type: 'ed25519',
        },
      ];

      const result = mapInjectedAccounts(injectedAccounts, 'subwallet');

      expect(result).toHaveLength(2);
      expect(result[0].meta?.source).toBe('subwallet');
      expect(result[1].meta?.source).toBe('subwallet');
    });

    it('should handle invalid address gracefully with undefined publicKey', () => {
      const injectedAccounts: InjectedAccount[] = [
        { address: 'invalid-address', name: 'Bad', type: 'sr25519' },
      ];

      const result = mapInjectedAccounts(injectedAccounts, 'test');

      expect(result).toHaveLength(1);
      expect(result[0].publicKey).toBeUndefined();
      expect(result[0].chainType).toBe('substrate');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should return empty array for null/undefined input', () => {
      expect(mapInjectedAccounts(null as any, 'test')).toEqual([]);
      expect(mapInjectedAccounts(undefined as any, 'test')).toEqual([]);
    });
  });
});
