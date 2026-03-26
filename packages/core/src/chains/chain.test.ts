import { describe, expect, it } from 'vitest';
import { ChainType, type SubstrateChain } from '../types';
import { kusama, kusamaAssetHub, kusamaCoretime, kusamaPeople } from './kusama';
import { paseo, paseoAssetHub, paseoPassetHub } from './paseo';
import {
  polkadot,
  polkadotAssetHub,
  polkadotCollectives,
  polkadotCoretime,
  polkadotPeople,
} from './polkadot';
import { westend, westendAssetHub } from './westend';

const allChains: Record<string, SubstrateChain> = {
  polkadot,
  polkadotAssetHub,
  polkadotPeople,
  polkadotCoretime,
  polkadotCollectives,
  kusama,
  kusamaAssetHub,
  kusamaPeople,
  kusamaCoretime,
  westend,
  westendAssetHub,
  paseo,
  paseoAssetHub,
  paseoPassetHub,
};

const relayChains: Record<string, SubstrateChain> = {
  polkadot,
  kusama,
  westend,
  paseo,
};

describe('Chain Configurations', () => {
  describe('Type Compliance', () => {
    Object.entries(allChains).forEach(([chainName, chain]) => {
      describe(`${chainName}`, () => {
        it('should have chainType set to substrate', () => {
          expect(chain.chainType).toBe(ChainType.SUBSTRATE);
        });

        it('should have id equal to genesisHash', () => {
          expect(chain.id).toBe(chain.genesisHash);
        });

        it('should have a valid genesisHash (0x-prefixed 64-char hex)', () => {
          expect(chain.genesisHash).toMatch(/^0x[a-f0-9]{64}$/);
        });

        it('should have a non-empty name', () => {
          expect(chain.name.length).toBeGreaterThan(0);
        });

        it('should have a non-negative ss58Format', () => {
          expect(chain.ss58Format).toBeGreaterThanOrEqual(0);
        });

        it('should have a chainIconUrl', () => {
          expect(chain.chainIconUrl).toBeDefined();
          expect(typeof chain.chainIconUrl).toBe('string');
        });

        it('should have valid nativeCurrency', () => {
          const { name, symbol, decimals } = chain.nativeCurrency;
          expect(name.length).toBeGreaterThan(0);
          expect(symbol.length).toBeGreaterThan(0);
          expect(decimals).toBeGreaterThanOrEqual(0);
          expect(decimals).toBeLessThanOrEqual(18);
        });

        it('should have at least one WebSocket RPC URL', () => {
          expect(chain.rpcUrls.webSocket.length).toBeGreaterThan(0);
          for (const url of chain.rpcUrls.webSocket) {
            expect(url).toMatch(/^wss?:\/\//);
          }
        });

        it('should have valid HTTP RPC URLs if present', () => {
          if (chain.rpcUrls.http) {
            expect(chain.rpcUrls.http.length).toBeGreaterThan(0);
            for (const url of chain.rpcUrls.http) {
              expect(url).toMatch(/^https?:\/\//);
            }
          }
        });

        it('should have valid blockExplorers if present', () => {
          if (chain.blockExplorers?.default) {
            expect(chain.blockExplorers.default.name.length).toBeGreaterThan(0);
            expect(chain.blockExplorers.default.url).toMatch(/^https?:\/\//);
          }
        });

        it('should have valid subscan config if present', () => {
          if (chain.subscan) {
            expect(chain.subscan.url).toMatch(/^https?:\/\//);
            expect(chain.subscan.api).toMatch(/^https?:\/\//);
          }
        });

        it('should have testnet as a boolean', () => {
          expect(typeof chain.testnet).toBe('boolean');
        });
      });
    });
  });

  describe('Chain Collection Validation', () => {
    const chains = Object.values(allChains);

    it('should have unique genesis hashes', () => {
      const hashes = chains.map((c) => c.genesisHash);
      expect(new Set(hashes).size).toBe(hashes.length);
    });

    it('should have unique chain names', () => {
      const names = chains.map((c) => c.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('should export all expected relay chains', () => {
      expect(relayChains.polkadot).toBeDefined();
      expect(relayChains.kusama).toBeDefined();
      expect(relayChains.westend).toBeDefined();
      expect(relayChains.paseo).toBeDefined();
    });

    it('should have 14 total chains', () => {
      expect(chains.length).toBe(14);
    });
  });

  describe('Business Logic', () => {
    it('should mark mainnets as non-testnet', () => {
      const mainnets = [
        polkadot,
        polkadotAssetHub,
        polkadotPeople,
        polkadotCoretime,
        polkadotCollectives,
        kusama,
        kusamaAssetHub,
        kusamaPeople,
        kusamaCoretime,
      ];
      for (const chain of mainnets) {
        expect(chain.testnet).toBe(false);
      }
    });

    it('should mark testnets correctly', () => {
      const testnets = [westend, westendAssetHub, paseo, paseoAssetHub, paseoPassetHub];
      for (const chain of testnets) {
        expect(chain.testnet).toBe(true);
      }
    });

    it('should have correct ss58 formats for relay chains', () => {
      expect(polkadot.ss58Format).toBe(0);
      expect(kusama.ss58Format).toBe(2);
      expect(westend.ss58Format).toBe(42);
      expect(paseo.ss58Format).toBe(0);
    });

    it('should have parachains inherit ss58Format from their relay chain', () => {
      expect(polkadotAssetHub.ss58Format).toBe(polkadot.ss58Format);
      expect(polkadotPeople.ss58Format).toBe(polkadot.ss58Format);
      expect(polkadotCoretime.ss58Format).toBe(polkadot.ss58Format);
      expect(polkadotCollectives.ss58Format).toBe(polkadot.ss58Format);

      expect(kusamaAssetHub.ss58Format).toBe(kusama.ss58Format);
      expect(kusamaPeople.ss58Format).toBe(kusama.ss58Format);
      expect(kusamaCoretime.ss58Format).toBe(kusama.ss58Format);

      expect(westendAssetHub.ss58Format).toBe(westend.ss58Format);
    });

    it('should have correct native currency symbols per network', () => {
      expect(polkadot.nativeCurrency.symbol).toBe('DOT');
      expect(kusama.nativeCurrency.symbol).toBe('KSM');
      expect(westend.nativeCurrency.symbol).toBe('WND');
      expect(paseo.nativeCurrency.symbol).toBe('PAS');
    });

    it('should have correct decimals per network', () => {
      expect(polkadot.nativeCurrency.decimals).toBe(10);
      expect(kusama.nativeCurrency.decimals).toBe(12);
      expect(westend.nativeCurrency.decimals).toBe(12);
      expect(paseo.nativeCurrency.decimals).toBe(10);
    });

    it('should have parachains use the same currency as their relay chain', () => {
      expect(polkadotAssetHub.nativeCurrency.symbol).toBe('DOT');
      expect(kusamaAssetHub.nativeCurrency.symbol).toBe('KSM');
      expect(westendAssetHub.nativeCurrency.symbol).toBe('WND');
      expect(paseoAssetHub.nativeCurrency.symbol).toBe('PAS');
    });
  });
});
