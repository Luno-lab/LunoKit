import { mainnet } from '@wagmi/core/chains';
import { describe, expect, it } from 'vitest';
import { kusama, polkadot } from '../../chains';
import { ChainType, type EvmChain } from '../../types';
import { defineChain, getChainToken, getExplorerUrl } from './chain';

const evmChain: EvmChain = {
  ...mainnet,
  chainType: ChainType.EVM,
  chainIconUrl: 'eth-icon.svg',
};

describe('chain utils', () => {
  describe('defineChain', () => {
    it('should return the same substrate chain object', () => {
      const result = defineChain(polkadot);
      expect(result).toBe(polkadot);
    });

    it('should return the same evm chain object', () => {
      const result = defineChain(evmChain);
      expect(result).toBe(evmChain);
    });
  });

  describe('getChainToken', () => {
    it('should return correct token symbol for substrate chains', () => {
      expect(getChainToken(polkadot)).toBe('DOT');
      expect(getChainToken(kusama)).toBe('KSM');
    });

    it('should return correct token symbol for evm chains', () => {
      expect(getChainToken(evmChain)).toBe('ETH');
    });
  });

  describe('getExplorerUrl', () => {
    const baseUrl = 'https://polkadot.subscan.io';
    const testData = '0x1234567890abcdef';

    it('should build correct extrinsic URL by default', () => {
      expect(getExplorerUrl(baseUrl, testData)).toBe(`${baseUrl}/extrinsic/${testData}`);
    });

    it('should build correct URL for each type', () => {
      expect(getExplorerUrl(baseUrl, testData, 'address')).toBe(`${baseUrl}/address/${testData}`);
      expect(getExplorerUrl(baseUrl, testData, 'block')).toBe(`${baseUrl}/block/${testData}`);
      expect(getExplorerUrl(baseUrl, testData, 'tx')).toBe(`${baseUrl}/tx/${testData}`);
      expect(getExplorerUrl(baseUrl, testData, 'account')).toBe(`${baseUrl}/account/${testData}`);
    });

    it('should return empty string when explorerUrl is empty or missing', () => {
      expect(getExplorerUrl('', testData)).toBe('');
      expect(getExplorerUrl()).toBe('');
    });

    it('should strip trailing slash from explorerUrl', () => {
      expect(getExplorerUrl('https://polkadot.subscan.io/', testData)).toBe(
        `${baseUrl}/extrinsic/${testData}`
      );
    });
  });
});
