import { type Config, wsProvider } from '@luno-kit/core';
import { LegacyClient } from 'dedot';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockClient } from '../test-utils';
import { createApi } from './createApi';

vi.mock('@luno-kit/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    wsProvider: vi.fn(),
  };
});

vi.mock('dedot', () => ({
  LegacyClient: vi.fn(),
}));

describe('createApi', () => {
  const mockWsProvider = vi.mocked(wsProvider);
  const MockClient = vi.mocked(LegacyClient);
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

    mockPolkadotClient.connect.mockResolvedValue(undefined);
    mockPolkadotClient.disconnect.mockResolvedValue(undefined);

    (mockPolkadotClient.rpc.system_properties as any) = vi
      .fn()
      .mockResolvedValue({ isEthereum: false });
    (mockPolkadotClient.rpc.chain_getBlockHash as any) = vi.fn().mockResolvedValue(validChainId);

    MockClient.mockReturnValue(mockPolkadotClient);
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
      expect(MockClient).toHaveBeenCalledWith({
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
      expect(mockPolkadotClient.rpc.system_properties).toHaveBeenCalled();
      expect(mockPolkadotClient.rpc.chain_getBlockHash).toHaveBeenCalledWith(0);
      expect(result).toBe(mockPolkadotClient);
      expect(result.isEthereum).toBe(false);
    });

    it('should correctly set isEthereum property when true', async () => {
      const config = createMockConfig();
      (mockPolkadotClient.rpc.system_properties as any).mockResolvedValue({ isEthereum: true });

      const result = await createApi({ config, chainId: validChainId });

      expect(result.isEthereum).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should throw error when chainConfig is not found', async () => {
      const config = createMockConfig();
      const invalidChainId = '0xinvalid';

      await expect(createApi({ config, chainId: invalidChainId })).rejects.toThrow(
        `Configuration missing for chainId: ${invalidChainId}`
      );

      expect(mockWsProvider).not.toHaveBeenCalled();
      expect(MockClient).not.toHaveBeenCalled();
    });

    it('should throw error when connection fails', async () => {
      const config = createMockConfig();
      mockPolkadotClient.connect.mockRejectedValueOnce(new Error('Network timeout'));

      await expect(createApi({ config, chainId: validChainId })).rejects.toThrow(
        'Failed to connect to Polkadot: Network timeout'
      );
    });

    it('should throw error and disconnect when genesis hash mismatches', async () => {
      const config = createMockConfig();
      const wrongGenesisHash = '0xwronghash';
      (mockPolkadotClient.rpc.chain_getBlockHash as any).mockResolvedValue(wrongGenesisHash);

      await expect(createApi({ config, chainId: validChainId })).rejects.toThrow(
        `Chain genesis hash mismatch. Expected: ${validChainId}, Got: ${wrongGenesisHash}`
      );

      expect(mockPolkadotClient.disconnect).toHaveBeenCalled();
    });
  });
});
