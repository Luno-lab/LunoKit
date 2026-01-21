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
      const validAddress = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
      expect(isValidAddress(validAddress)).toBe(true);
    });

    it('should return true for valid Kusama address', () => {
      const validAddress = 'CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp';
      expect(isValidAddress(validAddress)).toBe(true);
    });

    it('should return false for invalid address', () => {
      expect(isValidAddress('   ')).toBe(false);
      expect(isValidAddress('\n\t')).toBe(false);

      expect(isValidAddress('123')).toBe(false);
      expect(isValidAddress('a'.repeat(100))).toBe(false);
      expect(isValidAddress('1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg@')).toBe(false);

      expect(isValidAddress('0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97')).toBe(false);
    });
  });

  describe('convertAddress', () => {
    it('should convert address between different SS58 formats', () => {
      const polkadotAddress = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
      const kusamaFormat = convertAddress(polkadotAddress, 2);

      expect(kusamaFormat).toBeDefined();
      expect(kusamaFormat).not.toBe(polkadotAddress);
      expect(isValidAddress(kusamaFormat)).toBe(true);
    });

    it('should return EVM address as-is without error', () => {
      const evmAddress = '0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97';
      expect(convertAddress(evmAddress, 0)).toBe(evmAddress);
    });

    it('should throw error for invalid address (non-EVM)', () => {
      expect(() => convertAddress('invalid', 0)).toThrow('Failed to convert address');
      expect(() => convertAddress('', 0)).toThrow('Failed to convert address');
    });

    it('should throw error for negative SS58 format', () => {
      const validAddress = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
      expect(() => convertAddress(validAddress, -1)).toThrow('Failed to convert address');
    });

    it('should fallback to default (42) for out-of-range SS58 format', () => {
      const validAddress = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';

      const result = convertAddress(validAddress, 99999);
      const expectedFallback = convertAddress(validAddress, 42);

      expect(result).toBe(expectedFallback);
    });
  });

  describe('isSameAddress', () => {
    it('should return true for same address in different formats', () => {
      const polkadotAddr = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
      const kusamaAddr = convertAddress(polkadotAddr, 2);

      expect(isSameAddress(polkadotAddr, kusamaAddr)).toBe(true);
    });

    it('should return false for different addresses', () => {
      const addr1 = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
      const addr2 = '12xtAYsRUrmbniiWQqJtECiBQrMn8AypQcXhnQAc6RB6XkLW';

      expect(isSameAddress(addr1, addr2)).toBe(false);
    });

    it('should handle invalid addresses gracefully', () => {
      expect(isSameAddress('invalid1', 'invalid2')).toBe(false);
    });
  });

  describe('getPublicKey', () => {
    describe('valid addresses', () => {
      it('should extract 32-byte public key from valid Polkadot address', () => {
        const address = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
        const publicKey = getPublicKey(address);

        expect(publicKey).toBeInstanceOf(Uint8Array);
        expect(publicKey.length).toBe(32);
      });

      it('should extract public key from valid Kusama address', () => {
        const address = 'CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp';
        const publicKey = getPublicKey(address);

        expect(publicKey).toBeInstanceOf(Uint8Array);
        expect(publicKey.length).toBe(32);
      });
    });

    describe('consistency across different formats', () => {
      it('should return same public key for same address in different SS58 formats', () => {
        const polkadotAddr = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
        const kusamaAddr = convertAddress(polkadotAddr, 2);
        const westendAddr = convertAddress(polkadotAddr, 42);

        const publicKey1 = getPublicKey(polkadotAddr);
        const publicKey2 = getPublicKey(kusamaAddr);
        const publicKey3 = getPublicKey(westendAddr);

        expect(publicKey1).toEqual(publicKey2);
        expect(publicKey2).toEqual(publicKey3);
        expect(publicKey1).toEqual(publicKey3);

        expect(Array.from(publicKey1)).toEqual(Array.from(publicKey2));
        expect(Array.from(publicKey2)).toEqual(Array.from(publicKey3));
      });

      it('should return identical public key for same address across all supported formats', () => {
        const baseAddress = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
        const formats = [0, 2, 42];

        const publicKeys = formats.map((format) => {
          const convertedAddr = convertAddress(baseAddress, format);
          return getPublicKey(convertedAddr);
        });

        for (let i = 1; i < publicKeys.length; i++) {
          expect(publicKeys[i]).toEqual(publicKeys[0]);
          expect(Array.from(publicKeys[i])).toEqual(Array.from(publicKeys[0]));
        }
      });
    });

    describe('error handling', () => {
      it('should throw error for invalid address', () => {
        expect(() => getPublicKey('invalid')).toThrow('Failed to get public key');
        expect(() => getPublicKey('123')).toThrow('Failed to get public key');
        expect(() => getPublicKey('this-is-definitely-invalid')).toThrow(
          'Failed to get public key'
        );
      });

      it('should handle ethereum addresses appropriately', () => {
        const ethAddress = '0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97';
        expect(() => getPublicKey(ethAddress)).toThrow(
          'Invalid public key length: expected 32 bytes'
        );
      });

      it('should throw error for malformed addresses', () => {
        expect(() => getPublicKey('1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg@')).toThrow(
          'Failed to get public key'
        );

        expect(() => getPublicKey('1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg123')).toThrow(
          'Failed to get public key'
        );

        expect(() => getPublicKey('!@#$%^&*()')).toThrow('Failed to get public key');
      });
    });

    describe('public key properties', () => {
      it('should return immutable Uint8Array', () => {
        const address = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
        const publicKey = getPublicKey(address);

        const originalFirst = publicKey[0];
        publicKey[0] = 0;

        const publicKey2 = getPublicKey(address);
        expect(publicKey2[0]).toBe(originalFirst);
      });
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

    describe('valid account mapping', () => {
      it('should map single valid account correctly', () => {
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
        expect(result[0]).toEqual({
          address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
          name: 'Test Account',
          publicKey: expect.any(String),
          meta: {
            source: 'polkadot-js',
            genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
          },
          type: 'sr25519',
        });

        expect(result[0].publicKey).toBeDefined();
        expect(result[0].publicKey).toMatch(/^0x[0-9a-f]+$/i);
        expect(result[0].publicKey?.length).toBe(66);
      });

      it('should map multiple valid accounts correctly', () => {
        const injectedAccounts: InjectedAccount[] = [
          {
            address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
            name: 'Account 1',
            type: 'sr25519',
            genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
          },
          {
            address: 'CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp',
            name: 'Account 2',
            type: 'ed25519',
            genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
          },
        ];

        const result = mapInjectedAccounts(injectedAccounts, 'subwallet');

        expect(result).toHaveLength(2);
        expect(result[0].meta?.source).toBe('subwallet');
        expect(result[1].meta?.source).toBe('subwallet');
        expect(result[0].address).toBe(injectedAccounts[0].address);
        expect(result[1].address).toBe(injectedAccounts[1].address);
      });
    });

    describe('account with missing optional fields', () => {
      it('should handle account without name', () => {
        const injectedAccounts: InjectedAccount[] = [
          {
            address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
            type: 'sr25519',
          },
        ];

        const result = mapInjectedAccounts(injectedAccounts, 'test-source');

        expect(result).toHaveLength(1);
        expect(result[0].name).toBeUndefined();
        expect(result[0].meta?.genesisHash).toBeUndefined();
        expect(result[0].meta?.source).toBe('test-source');
      });
    });

    describe('error handling for invalid addresses', () => {
      it('should handle invalid address gracefully', () => {
        const injectedAccounts: InjectedAccount[] = [
          {
            address: 'invalid-address',
            name: 'Invalid Account',
            type: 'sr25519',
          },
        ];

        const result = mapInjectedAccounts(injectedAccounts, 'test-source');

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
          address: 'invalid-address',
          name: 'Invalid Account',
          publicKey: undefined,
          meta: {
            source: 'test-source',
            genesisHash: undefined,
          },
          type: 'sr25519',
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to decode address "invalid-address" to extract public key:',
          expect.any(Error)
        );
      });

      it('should handle mixed valid and invalid addresses', () => {
        const injectedAccounts: InjectedAccount[] = [
          {
            address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
            name: 'Valid Account',
            type: 'sr25519',
          },
          {
            address: 'invalid-address',
            name: 'Invalid Account',
            type: 'sr25519',
          },
          {
            address: 'CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp',
            name: 'Another Valid Account',
            type: 'ed25519',
          },
        ];

        const result = mapInjectedAccounts(injectedAccounts, 'test-source');

        expect(result).toHaveLength(3);

        expect(result[0].publicKey).toBeDefined();
        expect(result[2].publicKey).toBeDefined();

        expect(result[1].publicKey).toBeUndefined();

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('source id handling', () => {
      it('should correctly set source in meta for all accounts', () => {
        const injectedAccounts: InjectedAccount[] = [
          {
            address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg',
            name: 'Account 1',
            type: 'sr25519',
          },
        ];

        const sourceIds = ['polkadot-js', 'subwallet', 'talisman'];

        sourceIds.forEach((sourceId) => {
          const result = mapInjectedAccounts(injectedAccounts, sourceId);
          expect(result[0].meta?.source).toBe(sourceId);
        });
      });
    });

    describe('public key extraction', () => {
      it('should extract consistent public key for same address', () => {
        const address = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
        const injectedAccounts: InjectedAccount[] = [
          { address, name: 'Test 1', type: 'sr25519' },
          { address, name: 'Test 2', type: 'sr25519' },
        ];

        const result = mapInjectedAccounts(injectedAccounts, 'test-source');

        expect(result[0].publicKey).toBe(result[1].publicKey);
        expect(result[0].publicKey).toBeDefined();
      });
    });
  });

  describe('boundary conditions - unified null/empty input handling across all functions', () => {
    const nullishInputs = [
      { input: null, description: 'null' },
      { input: undefined, description: 'undefined' },
      { input: '', description: 'empty string' },
    ];

    const invalidStringInputs = [
      { input: '   ', description: 'whitespace' },
      { input: '\n\t', description: 'newline and tab' },
    ];

    nullishInputs.forEach(({ input, description }) => {
      it(`should handle ${description} input correctly`, () => {
        expect(isValidAddress(input as any)).toBe(false);
        expect(() => getPublicKey(input as any)).toThrow('Failed to get public key');
        expect(() => convertAddress(input as any, 0)).toThrow('Failed to convert address');
        expect(mapInjectedAccounts(input as any, 'test-source')).toEqual([]);
      });
    });

    invalidStringInputs.forEach(({ input, description }) => {
      it(`should handle ${description} input correctly`, () => {
        expect(isValidAddress(input as any)).toBe(false);
        expect(() => getPublicKey(input as any)).toThrow('Failed to get public key');
        expect(() => convertAddress(input as any, 0)).toThrow('Failed to convert address');
        expect(() => mapInjectedAccounts(input as any, 'test-source')).toThrow(
          'Failed to map injected accounts'
        );
      });
    });
  });
});
