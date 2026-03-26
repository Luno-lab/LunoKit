import { mainnet, sepolia } from '@wagmi/core/chains';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { kusama, polkadot } from '../chains';
import { Evm, Substrate } from '../connectors';
import type { CreateConfigParameters, SubstrateChain } from '../types';
import { createConfig } from './createConfig';

vi.mock('./createStorage', () => ({
  createStorage: vi.fn(() => ({
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  })),
}));

vi.mock('../config/logos/generated', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
  };
});

describe('createConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  describe('top-level parameters', () => {
    it('should use default values', () => {
      const config = createConfig({
        substrate: {
          connectors: [Substrate.polkadotjsConnector()],
        },
      });

      expect(config.appName).toBe('My Luno App');
      expect(config.autoConnect).toBe(true);
      expect(config.storage).toBeDefined();
    });

    it('should accept custom appName, autoConnect and storage', () => {
      const mockStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };

      const config = createConfig({
        appName: 'Custom App',
        autoConnect: false,
        storage: mockStorage,
        substrate: {
          connectors: [Substrate.polkadotjsConnector()],
        },
      });

      expect(config.appName).toBe('Custom App');
      expect(config.autoConnect).toBe(false);
      expect(config.storage).toBe(mockStorage);
    });

    it('should throw when neither substrate nor evm is provided', () => {
      expect(() => createConfig({} as CreateConfigParameters)).toThrow(
        '[LunoKit] You must provide either "substrate" or "evm" configuration.'
      );
    });
  });

  describe('substrate-only config', () => {
    it('should create config with substrate connectors and chains', () => {
      const config = createConfig({
        substrate: {
          chains: [polkadot, kusama],
          connectors: [Substrate.polkadotjsConnector(), Substrate.subwalletConnector()],
        },
      });

      expect(config.substrate).toBeDefined();
      expect(config.evm).toBeUndefined();
      expect(config.substrate!.chains).toHaveLength(2);
      expect(config.substrate!.connectors).toHaveLength(2);
      expect(config.substrate!.connectors[0].id).toBe('polkadot-js');
      expect(config.substrate!.connectors[1].id).toBe('subwallet-js');
    });

    it('should generate transports from chain WebSocket URLs', () => {
      const config = createConfig({
        substrate: {
          chains: [polkadot],
          connectors: [Substrate.polkadotjsConnector()],
        },
      });

      expect(config.substrate!.transports[polkadot.genesisHash]).toBe(polkadot.rpcUrls.webSocket);
    });

    it('should merge custom transports with generated ones', () => {
      const config = createConfig({
        substrate: {
          chains: [polkadot],
          connectors: [Substrate.polkadotjsConnector()],
          transports: {
            [polkadot.genesisHash]: ['wss://override.endpoint.com'],
          },
        },
      });

      expect(config.substrate!.transports[polkadot.genesisHash]).toEqual([
        'wss://override.endpoint.com',
      ]);
    });

    it('should warn when chain has no WebSocket URL', () => {
      const consoleSpy = vi.spyOn(console, 'warn');
      const chainWithoutWs: SubstrateChain = {
        ...polkadot,
        id: '0x0000000000000000000000000000000000000000000000000000000000000001',
        genesisHash: '0x0000000000000000000000000000000000000000000000000000000000000001',
        name: 'No WS Chain',
        rpcUrls: { webSocket: undefined as unknown as readonly string[] },
      };

      createConfig({
        substrate: {
          chains: [chainWithoutWs],
          connectors: [Substrate.polkadotjsConnector()],
          transports: {
            [chainWithoutWs.genesisHash]: ['wss://fallback.endpoint.com'],
          },
        },
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('No WebSocket URL found for chain')
      );
    });

    it('should throw when connectors array is empty', () => {
      expect(() =>
        createConfig({
          substrate: {
            connectors: [],
          },
        })
      ).toThrow('No connectors provided. Wallet connection features will be unavailable.');
    });

    it('should handle empty chains array', () => {
      const config = createConfig({
        substrate: {
          chains: [],
          connectors: [Substrate.polkadotjsConnector()],
        },
      });

      expect(config.substrate!.chains).toEqual([]);
      expect(config.substrate!.transports).toEqual({});
    });

    it('should pass through customTypes and customRpc', () => {
      const config = createConfig({
        substrate: {
          connectors: [Substrate.polkadotjsConnector()],
          customTypes: { TestType: {} as any },
          customRpc: { testMethod: {} },
        },
      });

      expect(config.substrate!.customTypes).toEqual({ TestType: {} });
      expect(config.substrate!.customRpc).toEqual({ testMethod: {} });
    });

    it('should support connector groups', () => {
      const config = createConfig({
        substrate: {
          connectors: [
            {
              groupName: 'Recommended',
              wallets: [Substrate.polkadotjsConnector()],
            },
            {
              groupName: 'Others',
              wallets: [Substrate.subwalletConnector()],
            },
          ],
        },
      });

      expect(config.substrate!.connectors).toHaveLength(2);
      expect(config.substrate!.connectorGroups).toHaveLength(2);
      expect(config.substrate!.connectorGroups![0].groupName).toBe('Recommended');
      expect(config.substrate!.connectorGroups![1].groupName).toBe('Others');
    });

    it('should filter out empty connector groups', () => {
      const config = createConfig({
        substrate: {
          connectors: [
            {
              groupName: 'Recommended',
              wallets: [Substrate.polkadotjsConnector()],
            },
            {
              groupName: 'Empty',
              wallets: [],
            },
          ],
        },
      });

      expect(config.substrate!.connectorGroups).toHaveLength(1);
      expect(config.substrate!.connectorGroups![0].groupName).toBe('Recommended');
    });
  });

  describe('evm-only config', () => {
    it('should create config with evm connectors and chains', () => {
      const config = createConfig({
        evm: {
          chains: [mainnet],
          connectors: [Evm.metamaskConnector()],
        },
      });

      expect(config.evm).toBeDefined();
      expect(config.substrate).toBeUndefined();
      expect(config.evm!.chains).toHaveLength(1);
      expect(config.evm!.chains[0].chainType).toBe('evm');
      expect(config.evm!.connectors).toHaveLength(1);
      expect(config.evm!.wagmiConfig).toBeDefined();
    });

    it('should normalize evm chains with chainType', () => {
      const config = createConfig({
        evm: {
          chains: [mainnet, sepolia],
          connectors: [Evm.metamaskConnector()],
        },
      });

      for (const chain of config.evm!.chains) {
        expect(chain.chainType).toBe('evm');
      }
    });

    it('should backfill wagmi connector into luno evm connector', () => {
      const metamask = Evm.metamaskConnector();
      const config = createConfig({
        evm: {
          chains: [mainnet],
          connectors: [metamask],
        },
      });

      expect(config.evm!.wagmiConfig.connectors.length).toBeGreaterThan(0);
    });

    it('should support evm connector groups', () => {
      const config = createConfig({
        evm: {
          chains: [mainnet],
          connectors: [
            {
              groupName: 'Popular',
              wallets: [Evm.metamaskConnector()],
            },
          ],
        },
      });

      expect(config.evm!.connectorGroups).toHaveLength(1);
      expect(config.evm!.connectorGroups![0].groupName).toBe('Popular');
    });
  });

  describe('dual-track config (substrate + evm)', () => {
    it('should create config with both substrate and evm', () => {
      const config = createConfig({
        substrate: {
          chains: [polkadot],
          connectors: [Substrate.polkadotjsConnector()],
        },
        evm: {
          chains: [mainnet],
          connectors: [Evm.metamaskConnector()],
        },
      });

      expect(config.substrate).toBeDefined();
      expect(config.evm).toBeDefined();
      expect(config.substrate!.chains).toHaveLength(1);
      expect(config.evm!.chains).toHaveLength(1);
    });
  });

  describe('immutability', () => {
    it('should freeze substrate chains, connectors and transports', () => {
      const config = createConfig({
        substrate: {
          chains: [polkadot],
          connectors: [Substrate.polkadotjsConnector()],
        },
      });

      expect(Object.isFrozen(config.substrate!.chains)).toBe(true);
      expect(Object.isFrozen(config.substrate!.connectors)).toBe(true);
      expect(Object.isFrozen(config.substrate!.transports)).toBe(true);
    });

    it('should freeze evm chains and connectors', () => {
      const config = createConfig({
        evm: {
          chains: [mainnet],
          connectors: [Evm.metamaskConnector()],
        },
      });

      expect(Object.isFrozen(config.evm!.chains)).toBe(true);
      expect(Object.isFrozen(config.evm!.connectors)).toBe(true);
    });
  });
});
