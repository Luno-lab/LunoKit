import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { safeEvmWallet } from '../../../config/logos/generated';
import { SafeConnector, safeConnector } from './safe';

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

describe('safeConnector', () => {
  let connector: SafeConnector;
  let originalWindow: any;

  const TEST_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
  const mockWagmiConfig = { _tag: 'wagmi-config' } as any;
  const mockWagmiConnector = { uid: 'safe-uid', id: 'safe' } as any;

  beforeEach(() => {
    connector = safeConnector();
    originalWindow = globalThis.window;
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockWatchConnection.mockReturnValue(() => {});
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      writable: true,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  describe('basic properties', () => {
    it('should have correct connector metadata', () => {
      expect(connector.id).toBe('safe');
      expect(connector.name).toBe('Safe');
      expect(connector.icon).toBe(safeEvmWallet);
      expect(connector.links).toEqual({});
    });

    it('should have a wagmiFactory', () => {
      expect(connector.wagmiFactory).toBeDefined();
    });
  });

  describe('installation detection', () => {
    it('should return false in non-browser environment', () => {
      Object.defineProperty(globalThis, 'window', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      expect(connector.isInstalled()).toBe(false);
    });

    it('should return true when inside an iframe', () => {
      Object.defineProperty(globalThis, 'window', {
        value: { parent: {} },
        writable: true,
        configurable: true,
      });
      expect(connector.isInstalled()).toBe(true);
    });

    it('should return false when not in an iframe', () => {
      const win = {};
      Object.defineProperty(win, 'parent', { value: win });
      Object.defineProperty(globalThis, 'window', {
        value: win,
        writable: true,
        configurable: true,
      });
      expect(connector.isInstalled()).toBe(false);
    });
  });

  describe('availability check', () => {
    it('should delegate to isInstalled', async () => {
      vi.spyOn(connector, 'isInstalled').mockReturnValue(true);
      expect(await connector.isAvailable()).toBe(true);

      vi.spyOn(connector, 'isInstalled').mockReturnValue(false);
      expect(await connector.isAvailable()).toBe(false);
    });
  });

  describe('connection flow', () => {
    it('should throw when wagmi config is not set', async () => {
      await expect(connector.connect()).rejects.toThrow(
        'Connector Safe not initialized. Wagmi config is missing.'
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
      expect(accounts![0].source).toBe('safe');
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

    it('should rethrow connect errors', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockRejectedValue(new Error('User rejected'));

      await expect(connector.connect()).rejects.toThrow('User rejected');
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
