import { render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { LunoProvider } from './LunoProvider';
import type { Chain, Config } from '@luno-kit/core/types';
import { BaseConnector } from '@luno-kit/core/connectors';
import { createConfig } from '@luno-kit/core';
import type { LunoState } from '../types';
import { ConnectionStatus } from '../types'
import { createApi, sleep } from '../utils';
import { useIsInitialized } from '../hooks/useIsInitialized'
import { useLunoStore } from '../store'

vi.mock('../utils/createApi');
vi.mock('../hooks/useIsInitialized');
vi.mock('../store');

vi.mock('../utils', () => ({
  createApi: vi.fn(),
  sleep: vi.fn().mockResolvedValue(undefined)
}));

const mockCreateApi = vi.mocked(createApi);
const mockUseIsInitialized = vi.mocked(useIsInitialized);
const mockUseLunoStore = vi.mocked(useLunoStore);
const mockSleep = vi.mocked(sleep);

const mockStorage = {
  getItem: vi.fn().mockResolvedValue(null),
  setItem: vi.fn().mockResolvedValue(undefined),
  removeItem: vi.fn().mockResolvedValue(undefined),
};

const mockApi = {
  status: 'connected' as const,
  disconnect: vi.fn().mockResolvedValue(undefined),
  chainSpec: {
    chainName: () => 'Test Chain',
  },
  consts: {
    system: {
      ss58Prefix: 42,
    },
  },
  runtimeVersion: {
    specName: 'Test Chain'
  },
};

class DummyConnector extends BaseConnector {
  id = 'test-connector';
  name = 'Test Connector';
  icon = 'test-icon.svg';
  isInstalled = () => true;
  async isAvailable() { return true; }
  async connect() { return []; }
  async disconnect() {}
  async getAccounts() { return []; }
  async getSigner() { return undefined; }
  async signMessage() { return undefined; }
}

const mockConnector = new DummyConnector();

const mockChain: Chain = {
  name: 'Test Chain',
  genesisHash: '0x123',
  ss58Format: 42,
  nativeCurrency: {
    name: 'Test Token',
    symbol: 'TEST',
    decimals: 12,
  },
  rpcUrls: {
    webSocket: ['ws://test.com'],
  },
  chainIconUrl: 'test-icon.svg',
  testnet: false,
};

const mockStore: LunoState = {
  _setConfig: vi.fn().mockResolvedValue(undefined),
  _setApi: vi.fn(),
  _setIsApiReady: vi.fn(),
  _setApiError: vi.fn(),
  setAccount: vi.fn().mockResolvedValue(undefined),
  currentChainId: '0x123',
  config: undefined,
  currentApi: undefined,
  connect: vi.fn().mockResolvedValue(undefined),
  status: ConnectionStatus.Disconnected,
  activeConnector: undefined,
  accounts: [],
  account: undefined,
  currentChain: mockChain,
  isApiReady: false,
  apiError: null,
  disconnect: vi.fn().mockResolvedValue(undefined),
  switchChain: vi.fn().mockResolvedValue(undefined),
};

vi.mocked(await import('../store')).useLunoStore.mockReturnValue(mockStore);

describe('LunoProvider', () => {
  let mockConfig: Config;
  let mockMarkAsInitialized: ReturnType<typeof vi.fn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {

    mockMarkAsInitialized = vi.fn();
    mockApi.disconnect = vi.fn().mockResolvedValue(undefined);

    mockUseIsInitialized.mockReturnValue({
      markAsInitialized: mockMarkAsInitialized,
      isInitialized: false,
    });

    mockUseLunoStore.mockReturnValue(mockStore);

    mockConfig = createConfig({
      appName: 'Test App',
      chains: [mockChain],
      connectors: [mockConnector],
      transports: {
        '0x123': 'ws://test.com',
      },
      storage: mockStorage,
      autoConnect: true,
    });

    mockCreateApi.mockResolvedValue(mockApi);

    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.clearAllMocks();

  });

  afterEach(() => {
    consoleLogSpy?.mockRestore();
    consoleWarnSpy?.mockRestore();
    consoleErrorSpy?.mockRestore();
    vi.resetAllMocks();
  });

  describe('API Initialization Effect - Only runs once after page refresh', () => {
    it('should create API when config and chainId are provided and not initialized', async () => {
      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(mockCreateApi).toHaveBeenCalledWith({
          config: mockConfig,
          chainId: '0x123',
        });
      });

      await waitFor(() => {
        expect(mockMarkAsInitialized).toHaveBeenCalledWith();
        expect(mockMarkAsInitialized).toHaveBeenCalledTimes(1);
      });
    });

    it('should not create API when already initialized', async () => {
      vi.mocked(await import('../hooks/useIsInitialized')).useIsInitialized.mockReturnValue({
        markAsInitialized: mockMarkAsInitialized,
        isInitialized: true,
      });

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(mockCreateApi).not.toHaveBeenCalled();
      });
    });

    it('should clear API state when config is missing', async () => {
      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={null as any}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(mockCreateApi).not.toHaveBeenCalled();
        expect(mockStore._setApi).toHaveBeenCalledWith(undefined);
        expect(mockStore._setIsApiReady).toHaveBeenCalledWith(false);
      });
    });

    it('should handle API creation failure', async () => {
      const error = new Error('API creation failed');
      mockCreateApi.mockRejectedValueOnce(error);

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(mockStore._setApiError).toHaveBeenCalledWith(error);
        expect(mockMarkAsInitialized).toHaveBeenCalled();
      });
    });

    it('should disconnect existing API before creating new one', async () => {
      mockUseLunoStore.mockReturnValue({
        ...mockStore,
        currentApi: mockApi,
        currentChainId: '0x123',
      });

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );


      await waitFor(() => {
        console.error('All console.log calls:', consoleLogSpy.mock.calls);

        expect(mockApi.disconnect).toHaveBeenCalled();
        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('[LunoProvider]: Disconnecting API from previous render cycle:'),
          'Test Chain'
        );
      });
    });
  });

  describe('Auto Connect Effect - Runs once when config changes', () => {
    it('should attempt auto-connect when enabled and storage available', async () => {
      mockStorage.getItem.mockImplementation(async (key: string) => {
        if (key === 'lastConnectorId') return 'test-connector';
        if (key === 'lastChainId') return '0x123';
        return null;
      });

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      expect(mockSleep).toHaveBeenCalledWith(500);

      await waitFor(() => {
        expect(mockStorage.getItem).toHaveBeenCalledWith('lastConnectorId');
        expect(mockStorage.getItem).toHaveBeenCalledWith('lastChainId');
        expect(mockStore.connect).toHaveBeenCalledWith('test-connector', '0x123');
      }, { timeout: 3000 });
    });

    it('should not attempt auto-connect when disabled', async () => {
      const configWithoutAutoConnect = createConfig({
        ...mockConfig,
        autoConnect: false,
      });

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={configWithoutAutoConnect}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          '[LunoProvider]: AutoConnect disabled or config not set.'
        );
      });

      expect(mockStorage.getItem).not.toHaveBeenCalled();
    });

    it('should warn when storage is not available', async () => {
      const configWithoutStorage = {
        appName: 'Test App',
        chains: [mockChain],
        connectors: [mockConnector],
        transports: { '0x123': 'ws://test.com' },
        storage: undefined as any,
        autoConnect: true,
      };

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={configWithoutStorage}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          '[LunoProvider]: AutoConnect Storage not available, cannot auto-connect.'
        );
      });
    });

    it('should handle auto-connect errors gracefully', async () => {
      mockStorage.getItem.mockRejectedValue(new Error('Storage error'));

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[LunoProvider]: AutoConnect Error during auto-connect process:',
          expect.any(Error)
        );
      });
    });

    it('should log when no persisted session found', async () => {
      mockStorage.getItem.mockResolvedValue(null);

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('[LunoProvider]: AutoConnect No persisted session found or missing data.')
        );
      });
    });
  });

  describe('SS58 Format Validation Effect', () => {
    beforeEach(() => {
      mockStore.isApiReady = true;
      mockStore.currentApi = mockApi;
      mockStore.currentChain = mockChain;
    });

    it('should not log error when SS58 formats match', async () => {
      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(
          expect.stringContaining('[LunoProvider]: SS58 Format Mismatch')
        );
      });
    });

    it('should log error when SS58 formats mismatch', async () => {
      const mismatchChain: Chain = {
        ...mockChain,
        ss58Format: 0,
      };

      mockStore.currentChain = mismatchChain;

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining('[LunoProvider]: SS58 Format Mismatch for chain')
        );
      });
    });

    it('should warn when API SS58 format is not available', async () => {
      const mockApiWithoutSS58 = {
        ...mockApi,
        consts: {
          system: {
            ss58Prefix: undefined,
          },
        },
      };
      mockStore.currentApi = mockApiWithoutSS58;

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining('[LunoProvider]: Could not determine SS58 format from the API')
        );
      });
    });

    it('should handle SS58 validation errors gracefully', async () => {
      const mockApiWithError = {
        ...mockApi,
        get consts() {
          throw new Error('API access error');
        },
      };

      mockStore.currentApi = mockApiWithError;

      const TestComponent = () => <div>Test Child</div>;

      render(
        <LunoProvider config={mockConfig}>
          <TestComponent />
        </LunoProvider>
      );

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining('[LunoProvider]: Error retrieving SS58 format from API'),
          expect.any(Error)
        );
      });
    });
  });
});
