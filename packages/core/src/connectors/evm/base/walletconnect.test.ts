import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WalletConnectConnector } from './walletconnect';

const mockConnect = vi.fn();
const mockDisconnect = vi.fn();
const mockWatchConnection = vi.fn();

vi.mock('@wagmi/core', () => ({
  connect: (...args: any[]) => mockConnect(...args),
  disconnect: (...args: any[]) => mockDisconnect(...args),
  signMessage: vi.fn(),
  getConnection: vi.fn().mockReturnValue({}),
  getChainId: vi.fn().mockReturnValue(1),
  getConnectorClient: vi.fn(),
  watchConnection: (...args: any[]) => mockWatchConnection(...args),
}));

const createConnector = () =>
  new WalletConnectConnector({
    id: 'walletConnect',
    name: 'WalletConnect',
    icon: 'wc-icon.svg',
    wagmiFactory: vi.fn() as any,
  });

describe('WalletConnectConnector (EVM)', () => {
  let connector: WalletConnectConnector;
  const mockWagmiConfig = { _tag: 'wagmi-config' } as any;
  const mockEmitter = { on: vi.fn(), off: vi.fn() };
  const mockWagmiConnector = { uid: 'wc-uid', emitter: mockEmitter } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockWatchConnection.mockReturnValue(() => {});
    connector = createConnector();
  });

  describe('constructor', () => {
    it('should set links to empty object', () => {
      expect(connector.links).toEqual({});
    });
  });

  describe('isInstalled / isAvailable', () => {
    it('should always return true for isInstalled', () => {
      expect(connector.isInstalled()).toBe(true);
    });

    it('should always return true for isAvailable', async () => {
      expect(await connector.isAvailable()).toBe(true);
    });
  });

  describe('connection URI', () => {
    it('should report hasConnectionUri as true', () => {
      expect(connector.hasConnectionUri()).toBe(true);
    });

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

  describe('connect', () => {
    it('should throw when wagmi config is missing', async () => {
      await expect(connector.connect()).rejects.toThrow(
        'Connector WalletConnect not initialized. Wagmi config is missing.'
      );
    });

    it('should listen for display_uri message during connect', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: ['0xabc'] });

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
        return { accounts: ['0xabc'] };
      });

      const uriSpy = vi.fn();
      connector.on('get_uri', uriSpy);

      await connector.connect();

      expect(uriSpy).toHaveBeenCalledWith('wc:uri@2');
    });

    it('should cleanup message listener even if connect fails', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockRejectedValue(new Error('User rejected'));

      await expect(connector.connect()).rejects.toThrow('User rejected');

      expect(mockEmitter.off).toHaveBeenCalledWith('message', expect.any(Function));
    });
  });
});
