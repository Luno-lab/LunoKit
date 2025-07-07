import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createApi } from './createApi';
import { Config, wsProvider } from '@luno-kit/core';
import { DedotClient } from 'dedot';

vi.mock('@luno-kit/core', () => ({
  wsProvider: vi.fn(),
}));

vi.mock('dedot', () => ({
  DedotClient: vi.fn(),
}));

describe('createApi', () => {
  const mockWsProvider = vi.mocked(wsProvider);
  const MockDedotClient = vi.mocked(DedotClient);
  let mockProvider: any;
  let mockClient: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockProvider = {
      connect: vi.fn().mockResolvedValue(undefined),
      disconnect: vi.fn().mockResolvedValue(undefined),
      status: 'connected',
    };

    mockClient = {
      connect: vi.fn().mockResolvedValue(undefined),
      disconnect: vi.fn().mockResolvedValue(undefined),
      rpc: {},
    };

    mockWsProvider.mockReturnValue(mockProvider);
    MockDedotClient.mockReturnValue(mockClient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createMockConfig = (overrides: Partial<Config> = {}): Config => ({
    chains: [
      {
        genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
        name: 'Polkadot',
        nativeCurrency: {
          name: 'Polkadot',
          symbol: 'DOT',
          decimals: 10,
        },
        rpcUrls: {
          webSocket: ['wss://rpc.polkadot.io'],
        },
        ss58Format: 0,
        chainIconUrl: 'https://example.com/polkadot.svg',
      },
    ],
    transports: {
      '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3': {
        webSocket: ['wss://rpc.polkadot.io'],
      },
    },
    cacheMetadata: true,
    metadata: undefined,
    scaledResponses: {},
    customTypes: {},
    runtimeApis: {},
    cacheStorage: undefined,
    ...overrides,
  });

  const validChainId = '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3';

  describe('successful flow', () => {
    it('should create and connect API successfully', async () => {
      const config = createMockConfig();

      const result = await createApi({ config, chainId: validChainId });

      expect(mockWsProvider).toHaveBeenCalledWith(
        config.transports[validChainId]
      );

      expect(MockDedotClient).toHaveBeenCalledWith({
        provider: mockProvider,
        cacheMetadata: config.cacheMetadata,
        metadata: config.metadata,
        scaledResponses: {
          ...config.scaledResponses,
          ...config.customTypes,
        },
        runtimeApis: config.runtimeApis,
        cacheStorage: config.cacheStorage,
      });

      expect(mockClient.connect).toHaveBeenCalledOnce();
      expect(result).toBe(mockClient);
    });

    it('should correctly merge scaledResponses and customTypes', async () => {
      const config = createMockConfig({
        scaledResponses: { response1: 'value1' },
        customTypes: { type1: 'value1' },
      });

      await createApi({ config, chainId: validChainId });

      expect(MockDedotClient).toHaveBeenCalledWith(
        expect.objectContaining({
          scaledResponses: {
            response1: 'value1',
            type1: 'value1',
          },
        })
      );
    });

    it('should handle undefined optional configurations', async () => {
      const config = createMockConfig({
        metadata: undefined,
        cacheStorage: undefined,
      });

      await createApi({ config, chainId: validChainId });

      expect(MockDedotClient).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: undefined,
          cacheStorage: undefined,
        })
      );
    });
  });

  describe('configuration errors', () => {
    it('should throw error when chainConfig is not found', async () => {
      const config = createMockConfig();
      const nonExistentChainId = '0xnonexistent';

      await expect(
        createApi({ config, chainId: nonExistentChainId })
      ).rejects.toThrow(`Configuration missing for chainId: ${nonExistentChainId}`);

      expect(mockWsProvider).not.toHaveBeenCalled();
      expect(MockDedotClient).not.toHaveBeenCalled();
    });

    it('should throw error when transportConfig is not found', async () => {
      const config = createMockConfig({
        transports: {},
      });

      await expect(
        createApi({ config, chainId: validChainId })
      ).rejects.toThrow(`Configuration missing for chainId: ${validChainId}`);
    });

    it('should throw error when chains array is empty', async () => {
      const config = createMockConfig({
        chains: [],
      });

      await expect(
        createApi({ config, chainId: validChainId })
      ).rejects.toThrow(`Configuration missing for chainId: ${validChainId}`);
    });
  });

  describe('connection errors', () => {
    it('should throw error with chain name when connection fails', async () => {
      const config = createMockConfig();
      const originalError = new Error('Network timeout');
      mockClient.connect.mockRejectedValue(originalError);

      await expect(
        createApi({ config, chainId: validChainId })
      ).rejects.toThrow('Failed to connect to Polkadot: Network timeout');
    });

    it('should handle connection failure with empty error message', async () => {
      const config = createMockConfig();
      mockClient.connect.mockRejectedValue(new Error(''));

      await expect(
        createApi({ config, chainId: validChainId })
      ).rejects.toThrow('Failed to connect to Polkadot: ');
    });

    it('should handle connection failure with error object without message', async () => {
      const config = createMockConfig();
      const errorWithoutMessage = { code: 'NETWORK_ERROR' };
      mockClient.connect.mockRejectedValue(errorWithoutMessage);

      await expect(
        createApi({ config, chainId: validChainId })
      ).rejects.toThrow('Failed to connect to Polkadot: [object Object]');
    });

    it('should handle non-Error objects being thrown', async () => {
      const config = createMockConfig();
      mockClient.connect.mockRejectedValue('String error');

      await expect(
        createApi({ config, chainId: validChainId })
      ).rejects.toThrow('Failed to connect to Polkadot: String error');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string chainId', async () => {
      const config = createMockConfig();

      await expect(
        createApi({ config, chainId: '' })
      ).rejects.toThrow('Configuration missing for chainId: ');
    });

    it('should handle chainId with special characters', async () => {
      const config = createMockConfig();
      const specialChainId = '0x123!@#$%^&*()';

      await expect(
        createApi({ config, chainId: specialChainId })
      ).rejects.toThrow(`Configuration missing for chainId: ${specialChainId}`);
    });

    it('should handle config with multiple chains', async () => {
      const config = createMockConfig({
        chains: [
          {
            genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
            name: 'Polkadot',
            nativeCurrency: { name: 'Polkadot', symbol: 'DOT', decimals: 10 },
            rpcUrls: { webSocket: ['wss://rpc.polkadot.io'] },
            ss58Format: 0,
            chainIconUrl: 'https://example.com/polkadot.svg',
          },
          {
            genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
            name: 'Kusama',
            nativeCurrency: { name: 'Kusama', symbol: 'KSM', decimals: 12 },
            rpcUrls: { webSocket: ['wss://kusama-rpc.polkadot.io'] },
            ss58Format: 2,
            chainIconUrl: 'https://example.com/kusama.svg',
          },
        ],
        transports: {
          '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3': {
            webSocket: ['wss://rpc.polkadot.io'],
          },
          '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe': {
            webSocket: ['wss://kusama-rpc.polkadot.io'],
          },
        },
      });

      const result = await createApi({ config, chainId: validChainId });
      expect(result).toBe(mockClient);
    });
  });
});
