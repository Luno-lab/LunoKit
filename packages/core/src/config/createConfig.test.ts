import { beforeEach, describe, expect, it, vi } from 'vitest';
import { kusama, polkadot } from '../chains';
import { polkadotjsConnector, subwalletConnector } from '../connectors';
import type { Chain, CreateConfigParameters, LunoStorage } from '../types';
import { createConfig } from './createConfig';

vi.mock('./createStorage', () => ({
  createStorage: vi.fn(() => ({
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  })),
}));

vi.mock('../config/logos/generated', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
  };
});

describe('createConfig', () => {
  const mockConnectors = [polkadotjsConnector(), subwalletConnector()];

  const mockChains = [polkadot, kusama];

  const mockChainWithoutWs: Chain = {
    genesisHash: '0x123456789abcdef',
    name: 'Test Chain',
    nativeCurrency: {
      name: 'Test Token',
      symbol: 'TEST',
      decimals: 18,
    },
    rpcUrls: {
      http: ['https://test-chain.rpc.com'],
    },
    ss58Format: 42,
    blockExplorers: {
      default: {
        name: 'Test Explorer',
        url: 'https://test-explorer.com',
      },
    },
    chainIconUrl: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
    testnet: true,
  };

  const mockStorage: LunoStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  describe('successful config creation', () => {
    it('should create config with valid parameters', () => {
      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
      };

      const config = createConfig(params);

      expect(config).toEqual({
        appName: 'My Luno App',
        chains: [polkadot],
        connectors: [
          expect.objectContaining({
            id: 'polkadot-js',
            name: 'Polkadot{.js}',
            icon: expect.any(String),
          }),
        ],
        transports: {
          [polkadot.genesisHash]: polkadot.rpcUrls.webSocket,
        },
        storage: expect.any(Object),
        autoConnect: true,
        customRpc: undefined,
        customTypes: undefined,
        cacheMetadata: true,
        metadata: undefined,
        scaledResponses: undefined,
      });
    });

    it('should work with multiple real connectors and chains', () => {
      const params: CreateConfigParameters = {
        chains: mockChains,
        connectors: mockConnectors,
      };

      const config = createConfig(params);

      expect(config.chains).toHaveLength(2);
      expect(config.connectors).toHaveLength(2);
      expect(config.connectors[0].id).toBe('polkadot-js');
      expect(config.connectors[1].id).toBe('subwallet-js');
      expect(config.transports).toHaveProperty(polkadot.genesisHash);
      expect(config.transports).toHaveProperty(kusama.genesisHash);
    });

    it('should use provided custom values', () => {
      const params: CreateConfigParameters = {
        appName: 'Custom App',
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
        storage: mockStorage,
        autoConnect: false,
        cacheMetadata: true,
        metadata: { test: 'metadata' } as any,
        scaledResponses: true,
        customTypes: { TestType: {} as any },
        customRpc: { testMethod: {} },
      };

      const config = createConfig(params);

      expect(config.appName).toBe('Custom App');
      expect(config.storage).toBe(mockStorage);
      expect(config.autoConnect).toBe(false);
      expect(config.cacheMetadata).toBe(true);
      expect(config.metadata).toEqual({ test: 'metadata' });
      expect(config.scaledResponses).toBe(true);
      expect(config.customTypes).toEqual({ TestType: {} });
      expect(config.customRpc).toEqual({ testMethod: {} });
    });

    it('should merge custom transports with generated ones', () => {
      const customTransports = {
        'custom-hash': 'wss://custom.endpoint.com',
        [polkadot.genesisHash]: 'wss://override.endpoint.com',
      };

      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
        transports: customTransports,
      };

      const config = createConfig(params);

      expect(config.transports).toEqual({
        [polkadot.genesisHash]: 'wss://override.endpoint.com',
        'custom-hash': 'wss://custom.endpoint.com',
      });
    });
  });

  describe('parameter validation', () => {
    it('should throw error when connectors array is empty', () => {
      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [],
      };

      expect(() => createConfig(params)).toThrow(
        'No connectors provided. Wallet connection features will be unavailable.'
      );
    });
  });

  describe('transport generation', () => {
    it('should generate transports from chain WebSocket URLs', () => {
      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
      };

      const config = createConfig(params);

      expect(config.transports[polkadot.genesisHash]).toBe(polkadot.rpcUrls.webSocket);
    });

    it('should warn when chain has no WebSocket URL', () => {
      const consoleSpy = vi.spyOn(console, 'warn');

      const params: CreateConfigParameters = {
        chains: [mockChainWithoutWs],
        connectors: [polkadotjsConnector()],
        transports: {
          [mockChainWithoutWs.genesisHash]: 'wss://custom.endpoint.com',
        },
      };

      createConfig(params);

      expect(consoleSpy).toHaveBeenCalledWith(
        'No WebSocket URL found for chain "Test Chain" (0x123456789abcdef). Skipping transport generation.'
      );
    });

    it('should handle multiple chains with mixed WebSocket availability', () => {
      const chainWithWs = polkadot;
      const chainWithoutWs = mockChainWithoutWs;

      const params: CreateConfigParameters = {
        chains: [chainWithWs, chainWithoutWs],
        connectors: [polkadotjsConnector()],
        transports: {
          [chainWithoutWs.genesisHash]: 'wss://fallback.endpoint.com',
        },
      };

      const config = createConfig(params);

      expect(config.transports).toEqual({
        [chainWithWs.genesisHash]: polkadot.rpcUrls.webSocket,
        [chainWithoutWs.genesisHash]: 'wss://fallback.endpoint.com',
      });
    });
  });

  describe('empty chains handling', () => {
    it('should create config with empty chains array', () => {
      const params: CreateConfigParameters = {
        chains: [],
        connectors: [polkadotjsConnector()],
      };

      const config = createConfig(params);

      expect(config.chains).toEqual([]);
      expect(config.transports).toEqual({});
    });

    it('should create config with undefined chains', () => {
      const params: CreateConfigParameters = {
        connectors: [polkadotjsConnector()],
      } as CreateConfigParameters;

      const config = createConfig(params);

      expect(config.chains).toEqual([]);
      expect(config.transports).toEqual({});
    });

    it('should handle custom transports without chains', () => {
      const customTransports = {
        'custom-hash': 'wss://custom.endpoint.com',
      };

      const params: CreateConfigParameters = {
        chains: [],
        connectors: [polkadotjsConnector()],
        transports: customTransports,
      };

      const config = createConfig(params);

      expect(config.chains).toEqual([]);
      expect(config.transports).toEqual(customTransports);
    });
  });

  describe('immutability', () => {
    it('should freeze chains array', () => {
      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
      };

      const config = createConfig(params);

      expect(Object.isFrozen(config.chains)).toBe(true);
    });

    it('should freeze connectors array', () => {
      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
      };

      const config = createConfig(params);

      expect(Object.isFrozen(config.connectors)).toBe(true);
    });

    it('should freeze transports object', () => {
      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
      };

      const config = createConfig(params);

      expect(Object.isFrozen(config.transports)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle undefined optional parameters gracefully', () => {
      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
        customTypes: undefined,
        customRpc: undefined,
        cacheMetadata: undefined,
        metadata: undefined,
        scaledResponses: undefined,
      };

      const config = createConfig(params);

      expect(config.customTypes).toBeUndefined();
      expect(config.customRpc).toBeUndefined();
      expect(config.cacheMetadata).toBe(true);
      expect(config.metadata).toBeUndefined();
      expect(config.scaledResponses).toBeUndefined();
    });

    it('should handle chains with testnet property', () => {
      const params: CreateConfigParameters = {
        chains: [mockChainWithoutWs],
        connectors: [polkadotjsConnector()],
        transports: {
          [mockChainWithoutWs.genesisHash]: 'wss://testnet.endpoint.com',
        },
      };

      const config = createConfig(params);

      expect(config.chains[0].testnet).toBe(true);
    });
  });

  describe('real-world scenarios', () => {
    it('should work with typical production configuration', () => {
      const params: CreateConfigParameters = {
        appName: 'My dApp',
        chains: [polkadot, kusama],
        connectors: [polkadotjsConnector(), subwalletConnector()],
        autoConnect: true,
        cacheMetadata: true,
      };

      const config = createConfig(params);

      expect(config.appName).toBe('My dApp');
      expect(config.chains).toHaveLength(2);
      expect(config.connectors).toHaveLength(2);
      expect(config.autoConnect).toBe(true);
      expect(config.cacheMetadata).toBe(true);
      expect(Object.keys(config.transports)).toHaveLength(2);
    });
  });

  describe('default storage behavior', () => {
    it('should use localStorage when available', () => {
      const mockLocalStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };

      Object.defineProperty(globalThis, 'window', {
        value: { localStorage: mockLocalStorage },
        writable: true,
        configurable: true,
      });

      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
      };

      const config = createConfig(params);

      expect(config.storage).toBeDefined();
      expect(config.storage).toHaveProperty('getItem');
      expect(config.storage).toHaveProperty('setItem');
      expect(config.storage).toHaveProperty('removeItem');
    });

    it('should use noopStorage when localStorage unavailable', () => {
      Object.defineProperty(globalThis, 'window', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      const params: CreateConfigParameters = {
        chains: [polkadot],
        connectors: [polkadotjsConnector()],
      };

      const config = createConfig(params);

      expect(config.storage).toBeDefined();
      expect(config.storage).toHaveProperty('getItem');
      expect(config.storage).toHaveProperty('setItem');
      expect(config.storage).toHaveProperty('removeItem');
    });
  });
});
