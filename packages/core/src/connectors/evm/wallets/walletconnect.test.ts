import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { walletconnectEvmWallet } from '../../../config/logos/generated';
import { walletConnectConnector, WalletConnectConnector } from './walletconnect';

const mockConnect = vi.fn();
const mockDisconnect = vi.fn();
const mockSignMessage = vi.fn();
const mockGetConnection = vi.fn();
const mockGetChainId = vi.fn();
const mockGetConnectorClient = vi.fn();
const mockWatchConnection = vi.fn();

vi.mock('@wagmi/core', () => ({
  connect: (...args: any[]) => mockConnect(...args),
  disconnect: (...args: any[]) => mockDisconnect(...args),
  signMessage: (...args: any[]) => mockSignMessage(...args),
  getConnection: (...args: any[]) => mockGetConnection(...args),
  getChainId: (...args: any[]) => mockGetChainId(...args),
  getConnectorClient: (...args: any[]) => mockGetConnectorClient(...args),
  watchConnection: (...args: any[]) => mockWatchConnection(...args),
}));

describe('walletConnectConnector', () => {
  let connector: WalletConnectConnector;

  const TEST_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
  const mockWagmiConfig = { _tag: 'wagmi-config' } as any;
  const mockEmitter = { on: vi.fn(), off: vi.fn() };
  const mockWagmiConnector = { uid: 'wc-uid', id: 'walletConnect', emitter: mockEmitter } as any;

  beforeEach(() => {
    connector = walletConnectConnector({ projectId: 'test-project-id' });
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockWatchConnection.mockReturnValue(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('basic properties', () => {
    it('should have correct connector metadata', () => {
      expect(connector.id).toBe('walletConnect');
      expect(connector.name).toBe('WalletConnect');
      expect(connector.icon).toBe(walletconnectEvmWallet);
    });

    it('should have a wagmiFactory', () => {
      expect(connector.wagmiFactory).toBeDefined();
    });

    it('should always be installed', () => {
      expect(connector.isInstalled()).toBe(true);
    });

    it('should always be available', async () => {
      expect(await connector.isAvailable()).toBe(true);
    });

    it('should report hasConnectionUri as true', () => {
      expect(connector.hasConnectionUri()).toBe(true);
    });
  });

  describe('connection flow', () => {
    it('should throw when wagmi config is not set', async () => {
      await expect(connector.connect()).rejects.toThrow(
        'Connector WalletConnect not initialized. Wagmi config is missing.'
      );
    });

    it('should connect and return evm accounts', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: [TEST_ADDRESS] });

      const accounts = await connector.connect();

      expect(accounts).toHaveLength(1);
      expect(accounts![0].address).toBe(TEST_ADDRESS);
      expect(accounts![0].chainType).toBe('evm');
      expect(accounts![0].source).toBe('walletConnect');
    });

    it('should emit connect event', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: [TEST_ADDRESS] });

      const connectSpy = vi.fn();
      connector.on('connect', connectSpy);

      await connector.connect();

      expect(connectSpy).toHaveBeenCalledWith([
        expect.objectContaining({ address: TEST_ADDRESS, chainType: 'evm' }),
      ]);
    });

    it('should listen for display_uri during connect', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: [TEST_ADDRESS] });

      await connector.connect();

      expect(mockEmitter.on).toHaveBeenCalledWith('message', expect.any(Function));
      expect(mockEmitter.off).toHaveBeenCalledWith('message', expect.any(Function));
    });

    it('should emit get_uri when display_uri message received', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);

      mockConnect.mockImplementation(async () => {
        const handler = mockEmitter.on.mock.calls.find(
          (call: any[]) => call[0] === 'message'
        )?.[1];
        handler?.({ type: 'display_uri', data: 'wc:uri@2' });
        return { accounts: [TEST_ADDRESS] };
      });

      const uriSpy = vi.fn();
      connector.on('get_uri', uriSpy);

      await connector.connect();

      expect(uriSpy).toHaveBeenCalledWith('wc:uri@2');
    });

    it('should rethrow connect errors', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockRejectedValue(new Error('User rejected'));

      await expect(connector.connect()).rejects.toThrow('User rejected');
    });

    it('should cleanup message listener even if connect fails', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockRejectedValue(new Error('User rejected'));

      await expect(connector.connect()).rejects.toThrow();

      expect(mockEmitter.off).toHaveBeenCalledWith('message', expect.any(Function));
    });
  });

  describe('connection URI', () => {
    it('should resolve getConnectionUri when get_uri event fires', async () => {
      const uriPromise = connector.getConnectionUri();
      connector.emit('get_uri', 'wc:test-uri@2');

      expect(await uriPromise).toBe('wc:test-uri@2');
    });

    it('should return cached URI on subsequent calls', async () => {
      connector.emit('get_uri', 'wc:cached@2');
      const uriPromise = connector.getConnectionUri();
      connector.emit('get_uri', 'wc:cached@2');
      await uriPromise;

      expect(await connector.getConnectionUri()).toBe('wc:cached@2');
    });
  });

  describe('disconnection', () => {
    it('should do nothing when not initialized', async () => {
      await connector.disconnect();
      expect(mockDisconnect).not.toHaveBeenCalled();
    });

    it('should disconnect and clear accounts', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: [TEST_ADDRESS] });
      await connector.connect();

      mockDisconnect.mockResolvedValue(undefined);
      await connector.disconnect();

      expect(mockDisconnect).toHaveBeenCalled();
      expect(await connector.getAccounts()).toEqual([]);
    });

    it('should emit disconnect event', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockDisconnect.mockResolvedValue(undefined);

      const disconnectSpy = vi.fn();
      connector.on('disconnect', disconnectSpy);

      await connector.disconnect();

      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should cleanup even if wagmi disconnect throws', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: [TEST_ADDRESS] });
      await connector.connect();

      mockDisconnect.mockRejectedValue(new Error('disconnect failed'));
      await connector.disconnect();

      expect(await connector.getAccounts()).toEqual([]);
    });
  });

  describe('message signing', () => {
    it('should throw when not initialized', async () => {
      await expect(connector.signMessage('hello')).rejects.toThrow('Not initialized');
    });

    it('should sign message via wagmi', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockGetConnection.mockReturnValue({ address: TEST_ADDRESS });
      mockSignMessage.mockResolvedValue('0xsignature');

      const result = await connector.signMessage('hello');

      expect(result).toBe('0xsignature');
      expect(mockSignMessage).toHaveBeenCalledWith(mockWagmiConfig, {
        account: TEST_ADDRESS,
        message: 'hello',
        connector: mockWagmiConnector,
      });
    });
  });

  describe('account management', () => {
    it('should start with empty accounts', async () => {
      expect(await connector.getAccounts()).toEqual([]);
    });

    it('should return accounts after connection', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: [TEST_ADDRESS] });

      await connector.connect();

      const accounts = await connector.getAccounts();
      expect(accounts).toHaveLength(1);
      expect(accounts[0].address).toBe(TEST_ADDRESS);
    });

    it('should return a copy of accounts array', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: [TEST_ADDRESS] });
      await connector.connect();

      const accounts1 = await connector.getAccounts();
      const accounts2 = await connector.getAccounts();
      expect(accounts1).toEqual(accounts2);
      expect(accounts1).not.toBe(accounts2);
    });
  });
});
