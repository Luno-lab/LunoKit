import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLunoStore } from './createLunoStore';
import { ConnectionStatus } from '../types';
import { PERSIST_KEY } from '../constants';
import { createApi } from '../utils';
import { isSameAddress } from '@luno-kit/core';

vi.mock('../utils', () => ({
  createApi: vi.fn(),
}));

vi.mock('@luno-kit/core', () => ({
  isSameAddress: vi.fn(),
}));

describe('createLunoStore', () => {
  let store: ReturnType<typeof useLunoStore.getState>;
  let mockConfig: any;
  let mockConnector: any;
  let mockStorage: any;
  let mockApi: any;

  beforeEach(() => {
    vi.clearAllMocks();

    useLunoStore.setState({
      config: undefined,
      status: ConnectionStatus.Disconnected,
      activeConnector: undefined,
      accounts: [],
      account: undefined,
      currentChainId: undefined,
      currentChain: undefined,
      currentApi: undefined,
      isApiReady: false,
      apiError: null,
    });

    store = useLunoStore.getState();

    mockStorage = {
      getItem: vi.fn().mockResolvedValue(null),
      setItem: vi.fn().mockResolvedValue(undefined),
      removeItem: vi.fn().mockResolvedValue(undefined),
    };

    mockConnector = {
      id: 'test-connector',
      name: 'Test Connector',
      connect: vi.fn(),
      disconnect: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
    };

    mockApi = {
      connect: vi.fn(),
      disconnect: vi.fn(),
      status: 'connected',
    };

    mockConfig = {
      appName: 'Test App',
      chains: [
        {
          genesisHash: '0x123',
          name: 'Test Chain',
          nativeCurrency: { name: 'Test', symbol: 'TST', decimals: 12 },
          rpcUrls: { webSocket: ['wss://test.com'] },
          ss58Format: 0,
          chainIconUrl: 'https://test.com/icon.svg',
        },
      ],
      connectors: [mockConnector],
      storage: mockStorage,
      transports: {
        '0x123': { webSocket: ['wss://test.com'] },
      },
    };

    vi.mocked(createApi).mockResolvedValue(mockApi);
    vi.mocked(isSameAddress).mockReturnValue(false);
  });

  describe('_setConfig', () => {
    it('should initialize config and set default chain', async () => {
      await store._setConfig(mockConfig);

      const state = useLunoStore.getState();
      expect(state.config).toBe(mockConfig);
      expect(state.currentChainId).toBe('0x123');
      expect(state.currentChain).toBe(mockConfig.chains[0]);
      expect(state.status).toBe(ConnectionStatus.Disconnected);
    });

    it('should restore previous chain from storage', async () => {
      mockStorage.getItem.mockResolvedValue('0x123');

      await store._setConfig(mockConfig);

      const state = useLunoStore.getState();
      expect(state.currentChainId).toBe('0x123');
      expect(mockStorage.getItem).toHaveBeenCalledWith(PERSIST_KEY.LAST_CHAIN_ID);
    });

    it('should fallback to default chain when stored chain not found', async () => {
      mockStorage.getItem.mockResolvedValue('0xnonexistent');

      await store._setConfig(mockConfig);

      const state = useLunoStore.getState();
      expect(state.currentChainId).toBe('0x123');
    });

    it('should handle case insensitive chain matching', async () => {
      mockStorage.getItem.mockResolvedValue('0X123');

      await store._setConfig(mockConfig);

      const state = useLunoStore.getState();
      expect(state.currentChainId).toBe('0X123'.toLowerCase());
    });

    it('should handle storage read failure gracefully', async () => {
      mockStorage.getItem.mockRejectedValue(new Error('Storage read failed'));

      await store._setConfig(mockConfig);

      const state = useLunoStore.getState();
      expect(state.currentChainId).toBe('0x123');
    });
  });

  describe('setAccount', () => {
    const mockAccounts = [
      { publicKey: '0xabc', address: 'addr1', name: 'Account 1', meta: { source: 'test' } },
      { publicKey: '0xdef', address: 'addr2', name: 'Account 2', meta: { source: 'test' } },
    ];

    beforeEach(() => {
      useLunoStore.setState({
        config: mockConfig,
        accounts: mockAccounts,
        account: mockAccounts[0],
      });
    });

    it('should set account by publicKey string', async () => {
      await store.setAccount('0xdef');

      const state = useLunoStore.getState();
      expect(state.account?.publicKey).toBe('0xdef');
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO,
        expect.stringContaining('0xdef')
      );
    });

    it('should set account by account object', async () => {
      await store.setAccount(mockAccounts[1]);

      const state = useLunoStore.getState();
      expect(state.account?.publicKey).toBe('0xdef');
    });

    it('should handle case insensitive publicKey matching', async () => {
      await store.setAccount('0XaBc');

      const state = useLunoStore.getState();
      expect(state.account?.publicKey).toBe('0xabc');
    });

    it('should throw error and preserve current account when account not found', async () => {
      const initialAccount = mockAccounts[0];

      const initialState = useLunoStore.getState();
      expect(initialState.account).toBe(initialAccount);

      await expect(store.setAccount('0xnotfound'))
        .rejects.toThrow('[LunoStore] setAccount: The provided account or address is not in the current accounts list');

      const finalState = useLunoStore.getState();
      expect(finalState.account).toBe(initialAccount);
      expect(finalState.account?.publicKey).toBe('0xabc');
    });

    it('should throw error and preserve current account when switching from one account to nonexistent', async () => {
      await store.setAccount(mockAccounts[1]);
      expect(useLunoStore.getState().account?.publicKey).toBe('0xdef');

      await expect(store.setAccount('0xnonexistent')).rejects.toThrow(
        '[LunoStore] setAccount: The provided account or address is not in the current accounts list'
      );
      const state = useLunoStore.getState();
      expect(state.account?.publicKey).toBe('0xdef');
    });

    it('should handle null/undefined account parameter', async () => {
      const initialAccount = mockAccounts[0];

      await store.setAccount(null);
      await store.setAccount(undefined);

      const state = useLunoStore.getState();
      expect(state.account).toBe(initialAccount);
    });

    it('should throw error when accounts list is empty', async () => {
      useLunoStore.setState({
        config: mockConfig,
        accounts: [],
        account: undefined,
      });

      await expect(store.setAccount('0xabc')).rejects.toThrow(
        '[LunoStore] setAccount: The provided account or address is not in the current accounts list'
      );

      const state = useLunoStore.getState();
      expect(state.account).toBeUndefined();
    });

    it('should handle storage write failure gracefully', async () => {
      mockStorage.setItem.mockRejectedValue(new Error('Storage write failed'));
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await store.setAccount('0xabc');

      await new Promise(resolve => setTimeout(resolve, 0));

      const state = useLunoStore.getState();
      expect(state.account?.publicKey).toBe('0xabc');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to persist selected account'),
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle missing config gracefully', async () => {
      useLunoStore.setState({ config: undefined });

      await store.setAccount('0xabc');

      expect(mockStorage.setItem).not.toHaveBeenCalled();
    });

    it('should handle storage write failure when persisting account', async () => {
      mockStorage.setItem.mockRejectedValue(new Error('Storage write failed'));

      await store.setAccount(mockAccounts[1]);

      const state = useLunoStore.getState();
      expect(state.account).toBe(mockAccounts[1]);
    });

    it('should handle invalid JSON in stored account info', async () => {
      mockStorage.getItem.mockResolvedValue('invalid json');

      await store.setAccount(mockAccounts[0]);

      const state = useLunoStore.getState();
      expect(state.account).toBe(mockAccounts[0]);
    });
  });

  describe('connect', () => {
    const mockAccounts = [
      { publicKey: '0xabc', address: 'addr1', name: 'Account 1', meta: { source: 'test' } },
      { publicKey: '0xdef', address: 'addr2', name: 'Account 2', meta: { source: 'test' } },
    ];

    beforeEach(() => {
      useLunoStore.setState({ config: mockConfig });
    });

    it('should connect successfully and setup event listeners', async () => {
      mockConnector.connect.mockResolvedValue(mockAccounts);

      await store.connect('test-connector');

      const state = useLunoStore.getState();
      expect(state.status).toBe(ConnectionStatus.Connected);
      expect(state.activeConnector).toBe(mockConnector);
      expect(state.accounts).toEqual(mockAccounts);
      expect(state.account).toBe(mockAccounts[0]);

      expect(mockConnector.on).toHaveBeenCalledWith('accountsChanged', expect.any(Function));
      expect(mockConnector.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
      expect(mockStorage.setItem).toHaveBeenCalledWith(PERSIST_KEY.LAST_CONNECTOR_ID, 'test-connector');
    });

    it('should restore previously selected account', async () => {
      mockConnector.connect.mockResolvedValue(mockAccounts);
      mockStorage.getItem.mockImplementation((key) => {
        if (key === PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO) {
          return Promise.resolve(JSON.stringify({
            publicKey: '0xdef',
            address: 'addr2',
            name: 'Account 2',
            source: 'test',
          }));
        }
        return Promise.resolve(null);
      });

      await store.connect('test-connector');

      const state = useLunoStore.getState();
      expect(state.account?.publicKey).toBe('0xdef');
    });

    it('should restore account by address when publicKey not available', async () => {
      mockConnector.connect.mockResolvedValue(mockAccounts);
      mockStorage.getItem.mockImplementation((key) => {
        if (key === PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO) {
          return Promise.resolve(JSON.stringify({
            address: 'addr2',
            name: 'Account 2',
            source: 'test',
          }));
        }
        return Promise.resolve(null);
      });

      vi.mocked(isSameAddress).mockImplementation((addr1, addr2) => {
        return addr1 === 'addr2' && addr2 === 'addr2';
      });

      await store.connect('test-connector');

      const state = useLunoStore.getState();
      expect(state.account?.address).toBe('addr2');
    });

    it('should throw error when config not initialized', async () => {
      useLunoStore.setState({ config: undefined });

      await expect(store.connect('test-connector')).rejects.toThrow(
        'LunoConfig has not been initialized'
      );

      const state = useLunoStore.getState();
      expect(state.status).toBe(ConnectionStatus.Disconnected);
    });

    it('should throw error when connector not found', async () => {
      await expect(store.connect('nonexistent-connector')).rejects.toThrow(
        'Connector with ID "nonexistent-connector" not found'
      );

      const state = useLunoStore.getState();
      expect(state.status).toBe(ConnectionStatus.Disconnected);
    });

    it('should handle connection failure and cleanup', async () => {
      mockConnector.connect.mockRejectedValue(new Error('Connection failed'));

      await expect(store.connect('test-connector')).rejects.toThrow(
        '[LunoStore] Error connecting with Test Connector: Connection failed'
      );

      const state = useLunoStore.getState();
      expect(state.status).toBe(ConnectionStatus.Disconnected);
      expect(state.activeConnector).toBeUndefined();
      expect(state.accounts).toEqual([]);
    });

    it('should handle accounts without publicKey', async () => {
      const accountsWithoutPublicKey = [
        { address: 'addr1', name: 'Account 1', meta: { source: 'test' } },
      ];
      mockConnector.connect.mockResolvedValue(accountsWithoutPublicKey);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await store.connect('test-connector');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('CRITICAL WARNING')
      );

      consoleSpy.mockRestore();
    });
  });

  describe('disconnect', () => {
    beforeEach(() => {
      useLunoStore.setState({
        config: mockConfig,
        status: ConnectionStatus.Connected,
        activeConnector: mockConnector,
        accounts: [{ publicKey: '0xabc', address: 'addr1', name: 'Account 1', meta: { source: 'test' } }],
        account: { publicKey: '0xabc', address: 'addr1', name: 'Account 1', meta: { source: 'test' } },
      });
    });

    it('should disconnect successfully and clean up state', async () => {
      mockConnector.disconnect.mockResolvedValue(undefined);

      await store.disconnect();

      const state = useLunoStore.getState();
      expect(state.status).toBe(ConnectionStatus.Disconnected);
      expect(state.activeConnector).toBeUndefined();
      expect(state.accounts).toEqual([]);
      expect(state.account).toBeUndefined();

      expect(mockStorage.removeItem).toHaveBeenCalledWith(PERSIST_KEY.LAST_CONNECTOR_ID);
      expect(mockStorage.removeItem).toHaveBeenCalledWith(PERSIST_KEY.LAST_CHAIN_ID);
      expect(mockStorage.removeItem).toHaveBeenCalledWith(PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO);
    });

    it('should handle no active connector gracefully', async () => {
      useLunoStore.setState({ activeConnector: undefined });
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await store.disconnect();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('No active connector or already disconnected')
      );
      consoleSpy.mockRestore();
    });

    it('should handle disconnect failure', async () => {
      mockConnector.disconnect.mockRejectedValue(new Error('Disconnect failed'));

      await expect(store.disconnect()).rejects.toThrow(
        '[LunoStore] Error disconnecting from Test Connector: Disconnect failed'
      );

      const state = useLunoStore.getState();
      expect(state.status).toBe(ConnectionStatus.Connected);
    });
  });

  describe('switchChain', () => {
    const newChain = {
      genesisHash: '0x456',
      name: 'New Chain',
      nativeCurrency: { name: 'New', symbol: 'NEW', decimals: 18 },
      rpcUrls: { webSocket: ['wss://new.com'] },
      ss58Format: 1,
      chainIconUrl: 'https://new.com/icon.svg',
    };

    beforeEach(() => {
      const configWithNewChain = {
        ...mockConfig,
        chains: [mockConfig.chains[0], newChain],
        transports: {
          ...mockConfig.transports,
          '0x456': { webSocket: ['wss://new.com'] },
        },
      };

      useLunoStore.setState({
        config: configWithNewChain,
        currentChainId: '0x123',
        currentChain: mockConfig.chains[0],
        currentApi: mockApi,
        isApiReady: true,
      });
    });

    it('should switch chain successfully', async () => {
      await store.switchChain('0x456');

      const state = useLunoStore.getState();
      expect(state.currentChainId).toBe('0x456');
      expect(state.currentChain).toBe(newChain);
      expect(state.isApiReady).toBe(true);
      expect(mockApi.disconnect).toHaveBeenCalled();
      expect(mockStorage.setItem).toHaveBeenCalledWith(PERSIST_KEY.LAST_CHAIN_ID, '0x456');
    });

    it('should skip when already on target chain', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await store.switchChain('0x123');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Already on chain 0x123')
      );
      consoleSpy.mockRestore();
    });

    it('should throw error when config not initialized', async () => {
      useLunoStore.setState({ config: undefined });

      await expect(store.switchChain('0x456')).rejects.toThrow(
        'LunoConfig has not been initialized'
      );
    });

    it('should throw error when chain not found', async () => {
      await expect(store.switchChain('0xnonexistent')).rejects.toThrow(
        'Chain with ID "0xnonexistent" not found'
      );
    });

    it('should handle API creation failure', async () => {
      vi.mocked(createApi).mockRejectedValue(new Error('API creation failed'));

      await store.switchChain('0x456');

      const state = useLunoStore.getState();
      expect(state.currentChainId).toBe('0x456');
      expect(state.currentChain).toBe(newChain);
      expect(state.isApiReady).toBe(false);
      expect(state.apiError).toBeInstanceOf(Error);
    });

    it('should disconnect current API before switching', async () => {
      await store.switchChain('0x456');

      expect(mockApi.disconnect).toHaveBeenCalled();
    });

    it('should handle API disconnect failure during chain switch', async () => {
      const mockApi = {
        status: 'connected',
        disconnect: vi.fn().mockRejectedValue(new Error('Disconnect failed'))
      };
      useLunoStore.setState({ currentApi: mockApi });

      await store.switchChain('0x456');

      const state = useLunoStore.getState();
      expect(state.currentChainId).toBe('0x456');
    });
  });

  describe('event handler behavior', () => {
    let accountsChangedHandler: any;
    let disconnectHandler: any;

    beforeEach(async () => {
      useLunoStore.setState({ config: mockConfig });
      mockConnector.connect.mockResolvedValue([
        { publicKey: '0xabc', address: 'addr1', name: 'Account 1', meta: { source: 'test' } },
      ]);

      mockConnector.on.mockImplementation((event, handler) => {
        if (event === 'accountsChanged') {
          accountsChangedHandler = handler;
        } else if (event === 'disconnect') {
          disconnectHandler = handler;
        }
      });

      await store.connect('test-connector');
    });

    it('should handle accountsChanged event', async () => {
      const newAccounts = [
        { publicKey: '0xnew', address: 'newAddr', name: 'New Account', meta: { source: 'test' } },
      ];

      await accountsChangedHandler(newAccounts);

      const state = useLunoStore.getState();
      expect(state.accounts).toEqual(newAccounts);
      expect(state.account).toBe(newAccounts[0]);
    });

    it('should handle disconnect event', async () => {
      disconnectHandler();

      const state = useLunoStore.getState();
      expect(state.status).toBe(ConnectionStatus.Disconnected);
      expect(state.activeConnector).toBeUndefined();
      expect(state.accounts).toEqual([]);
    });
  });
});
