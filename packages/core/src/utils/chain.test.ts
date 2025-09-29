import { describe, expect, it } from 'vitest';
import { kusamaSVG, polkadotSVG } from '../config/logos/generated';
import { defineChain, getChainToken, getExplorerUrl } from './chain';

const mockChains = {
  polkadot: {
    genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    name: 'Polkadot',
    nativeCurrency: { name: 'Polkadot', symbol: 'DOT', decimals: 10 },
    rpcUrls: {
      webSocket: ['wss://rpc.polkadot.io', 'wss://polkadot.api.onfinality.io/public-ws'],
      http: ['https://rpc.polkadot.io'],
    },
    ss58Format: 0,
    blockExplorers: { default: { name: 'Subscan', url: 'https://polkadot.subscan.io' } },
    chainIconUrl: polkadotSVG,
  },
  kusama: {
    genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    name: 'Kusama',
    nativeCurrency: { name: 'Kusama', symbol: 'KSM', decimals: 12 },
    rpcUrls: {
      webSocket: ['wss://kusama-rpc.polkadot.io', 'wss://kusama.api.onfinality.io/public-ws'],
    },
    ss58Format: 2,
    chainIconUrl: kusamaSVG,
  },
};

describe('chain utils', () => {
  describe('defineChain', () => {
    it('should return the same chain object passed as argument', () => {
      const mockChain = mockChains.polkadot;

      const result = defineChain(mockChain);
      expect(result).toBe(mockChain);
      expect(result).toEqual(mockChain);
    });

    it('should work with minimal chain object', () => {
      const mockChain = mockChains.kusama;

      const result = defineChain(mockChain);
      expect(result).toBe(mockChain);
      expect(result).toEqual(mockChain);
    });
  });

  describe('getChainToken', () => {
    it('should return correct token symbol for Polkadot', () => {
      expect(getChainToken(mockChains.polkadot)).toBe('DOT');
    });

    it('should return correct token symbol for Kusama', () => {
      expect(getChainToken(mockChains.kusama)).toBe('KSM');
    });

    it('should handle empty string symbol', () => {
      const chainWithEmptySymbol = {
        ...mockChains.polkadot,
        nativeCurrency: { ...mockChains.polkadot.nativeCurrency, symbol: '' },
      };
      expect(getChainToken(chainWithEmptySymbol)).toBe('');
    });

    it('should handle missing nativeCurrency gracefully', () => {
      const chainWithoutCurrency = { ...mockChains.polkadot };
      delete (chainWithoutCurrency as any).nativeCurrency;

      expect(() => getChainToken(chainWithoutCurrency as any)).toThrow();
    });
  });

  describe('getExplorerUrl', () => {
    const baseUrl = 'https://polkadot.subscan.io';
    const testData = '0x1234567890abcdef';

    describe('URL building by type', () => {
      it('should build correct transaction URL', () => {
        const result = getExplorerUrl(baseUrl, testData, 'transaction');
        expect(result).toBe(`${baseUrl}/extrinsic/${testData}`);
      });

      it('should build correct address URL', () => {
        const result = getExplorerUrl(baseUrl, testData, 'address');
        expect(result).toBe(`${baseUrl}/account/${testData}`);
      });

      it('should build correct block URL', () => {
        const result = getExplorerUrl(baseUrl, testData, 'block');
        expect(result).toBe(`${baseUrl}/block/${testData}`);
      });

      it('should use transaction as default type', () => {
        const result = getExplorerUrl(baseUrl, testData);
        expect(result).toBe(`${baseUrl}/extrinsic/${testData}`);
      });
    });

    describe('edge cases', () => {
      it('should return empty string when explorerUrl is empty', () => {
        expect(getExplorerUrl('', testData, 'transaction')).toBe('');
        expect(getExplorerUrl()).toBe('');
      });

      it('should handle empty data parameter', () => {
        const result = getExplorerUrl(baseUrl, '', 'transaction');
        expect(result).toBe(`${baseUrl}/extrinsic/`);
      });

      it('should fallback to base URL for unknown type', () => {
        const result = getExplorerUrl(baseUrl, testData, 'unknown' as any);
        expect(result).toBe(baseUrl);
      });
    });

    describe('boundary conditions', () => {
      it('should handle null/undefined parameters', () => {
        expect(getExplorerUrl(null as any, testData)).toBe('');
        expect(getExplorerUrl(undefined, testData)).toBe('');
      });
    });

    describe('parameter validation', () => {
      it('should handle special characters in URL data', () => {
        const specialData = '0x123!@#$%^&*()';
        const result = getExplorerUrl(baseUrl, specialData, 'transaction');
        expect(result).toBe(`${baseUrl}/extrinsic/${specialData}`);
      });

      it('should handle very long data strings', () => {
        const longData = 'x'.repeat(1000);
        const result = getExplorerUrl(baseUrl, longData, 'transaction');
        expect(result).toBe(`${baseUrl}/extrinsic/${longData}`);
      });
    });
  });
});
