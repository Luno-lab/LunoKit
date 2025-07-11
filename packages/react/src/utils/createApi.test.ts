import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createApi } from './createApi';
import { Config, wsProvider } from '@luno-kit/core';
import { DedotClient } from 'dedot';
import { mockClient } from '../test-utils';

vi.mock('@luno-kit/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    wsProvider: vi.fn(),
  };
});

vi.mock('dedot', () => ({
  DedotClient: vi.fn(),
}));

describe('createApi', () => {
  const mockWsProvider = vi.mocked(wsProvider);
  const MockDedotClient = vi.mocked(DedotClient);
  const mockPolkadotClient = mockClient.polkadot;
  const validChainId = '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3';

  let mockProvider: any;

  const createMockConfig = (overrides: Partial<Config> = {}): Config => ({
    chains: [
      {
        genesisHash: validChainId,
        name: 'Polkadot',
        nativeCurrency: { name: 'Polkadot', symbol: 'DOT', decimals: 10 },
        rpcUrls: { webSocket: ['wss://rpc.polkadot.io'] },
        ss58Format: 0,
        chainIconUrl: 'https://example.com/polkadot.svg',
      },
    ],
    transports: {
      [validChainId]: { webSocket: ['wss://rpc.polkadot.io'] },
    },
    cacheMetadata: true,
    metadata: undefined,
    scaledResponses: {},
    customTypes: {},
    runtimeApis: {},
    cacheStorage: undefined,
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();

    mockProvider = {
      connect: vi.fn().mockResolvedValue(undefined),
      disconnect: vi.fn().mockResolvedValue(undefined),
      status: 'connected',
    };

    mockWsProvider.mockReturnValue(mockProvider);
    MockDedotClient.mockReturnValue(mockPolkadotClient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('successful flow', () => {
    it('should create and connect API successfully with correct configurations', async () => {
      const config = createMockConfig({
        scaledResponses: { response1: 'value1' },
        customTypes: { type1: 'value1' },
      });

      const result = await createApi({ config, chainId: validChainId });

      expect(mockWsProvider).toHaveBeenCalledWith(config.transports[validChainId]);
      expect(MockDedotClient).toHaveBeenCalledWith({
        provider: mockProvider,
        cacheMetadata: config.cacheMetadata,
        metadata: config.metadata,
        scaledResponses: {
          response1: 'value1',
          type1: 'value1',
        },
        runtimeApis: config.runtimeApis,
        cacheStorage: config.cacheStorage,
      });
      expect(result.connect).toHaveBeenCalledOnce();
      expect(result).toBe(mockPolkadotClient);
    });
  });

  describe('error handling', () => {
    it('should throw error when chainConfig is not found', async () => {
      const config = createMockConfig();
      const invalidChainId = '0xinvalid';

      await expect(
        createApi({ config, chainId: invalidChainId })
      ).rejects.toThrow(`Configuration missing for chainId: ${invalidChainId}`);

      expect(mockWsProvider).not.toHaveBeenCalled();
      expect(MockDedotClient).not.toHaveBeenCalled();
    });

    it('should throw error when connection fails', async () => {
      const config = createMockConfig();
      mockPolkadotClient.connect.mockRejectedValueOnce(new Error('Network timeout'));

      await expect(
        createApi({ config, chainId: validChainId })
      ).rejects.toThrow('Failed to connect to Polkadot: Network timeout');
    });
  });
});
