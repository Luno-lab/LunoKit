import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EvmConnector } from './connector';

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

class TestEvmConnector extends EvmConnector {
  isInstalled(): boolean {
    return true;
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }
}

const mockWagmiFactory = vi.fn() as any;

const createConnector = () =>
  new TestEvmConnector({
    id: 'test-evm',
    name: 'Test EVM',
    icon: 'test-icon.svg',
    links: { browserExtension: 'https://test.com' },
    wagmiFactory: mockWagmiFactory,
  });

describe('EvmConnector', () => {
  let connector: TestEvmConnector;
  const mockWagmiConfig = { _tag: 'wagmi-config' } as any;
  const mockWagmiConnector = { uid: 'test-uid', id: 'test-evm' } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    connector = createConnector();
  });

  describe('constructor', () => {
    it('should set properties from options', () => {
      expect(connector.id).toBe('test-evm');
      expect(connector.name).toBe('Test EVM');
      expect(connector.icon).toBe('test-icon.svg');
      expect(connector.links).toEqual({ browserExtension: 'https://test.com' });
      expect(connector.wagmiFactory).toBe(mockWagmiFactory);
    });
  });

  describe('setWagmiConfig / setWagmiConnector', () => {
    it('should not throw when wagmi config and connector are set', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: ['0x1234'] });

      await expect(connector.connect()).resolves.toBeDefined();
    });

    it('should not overwrite wagmi config once set', async () => {
      const anotherConfig = { _tag: 'another' } as any;
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConfig(anotherConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockConnect.mockResolvedValue({ accounts: ['0x1234'] });

      await connector.connect();

      expect(mockConnect).toHaveBeenCalledWith(mockWagmiConfig, expect.anything());
    });

    it('should allow overwriting wagmi connector', async () => {
      const anotherConnector = { uid: 'another-uid' } as any;
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      connector.setWagmiConnector(anotherConnector);
      mockConnect.mockResolvedValue({ accounts: ['0x1234'] });

      await connector.connect();

      expect(mockConnect).toHaveBeenCalledWith(
        mockWagmiConfig,
        expect.objectContaining({ connector: anotherConnector })
      );
    });
  });

  describe('connect', () => {
    beforeEach(() => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockWatchConnection.mockReturnValue(() => {});
    });

    it('should throw when wagmi config is missing', async () => {
      const freshConnector = createConnector();
      await expect(freshConnector.connect()).rejects.toThrow(
        'Connector Test EVM not initialized. Wagmi config is missing.'
      );
    });

    it('should connect and return accounts', async () => {
      mockConnect.mockResolvedValue({ accounts: ['0xabc123'] });

      const accounts = await connector.connect();

      expect(mockConnect).toHaveBeenCalledWith(mockWagmiConfig, {
        connector: mockWagmiConnector,
        chainId: undefined,
      });
      expect(accounts).toHaveLength(1);
      expect(accounts![0].address).toBe('0xabc123');
      expect(accounts![0].chainType).toBe('evm');
      expect(accounts![0].source).toBe('test-evm');
    });

    it('should pass chainId option', async () => {
      mockConnect.mockResolvedValue({ accounts: ['0xabc123'] });

      await connector.connect({ chainId: 1 });

      expect(mockConnect).toHaveBeenCalledWith(mockWagmiConfig, {
        connector: mockWagmiConnector,
        chainId: 1,
      });
    });

    it('should emit connect event', async () => {
      mockConnect.mockResolvedValue({ accounts: ['0xabc123'] });
      const connectSpy = vi.fn();
      connector.on('connect', connectSpy);

      await connector.connect();

      expect(connectSpy).toHaveBeenCalledWith([
        expect.objectContaining({ address: '0xabc123', chainType: 'evm' }),
      ]);
    });

    it('should rethrow connect errors', async () => {
      mockConnect.mockRejectedValue(new Error('User rejected'));

      await expect(connector.connect()).rejects.toThrow('User rejected');
    });
  });

  describe('disconnect', () => {
    beforeEach(() => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockWatchConnection.mockReturnValue(() => {});
    });

    it('should do nothing when not initialized', async () => {
      const freshConnector = createConnector();
      await freshConnector.disconnect();
      expect(mockDisconnect).not.toHaveBeenCalled();
    });

    it('should disconnect and clear state', async () => {
      mockConnect.mockResolvedValue({ accounts: ['0xabc123'] });
      await connector.connect();

      mockDisconnect.mockResolvedValue(undefined);
      await connector.disconnect();

      expect(mockDisconnect).toHaveBeenCalledWith(mockWagmiConfig, {
        connector: mockWagmiConnector,
      });
      expect(await connector.getAccounts()).toEqual([]);
    });

    it('should emit disconnect event', async () => {
      const disconnectSpy = vi.fn();
      connector.on('disconnect', disconnectSpy);

      mockDisconnect.mockResolvedValue(undefined);
      await connector.disconnect();

      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should still cleanup even if wagmi disconnect throws', async () => {
      mockConnect.mockResolvedValue({ accounts: ['0xabc123'] });
      await connector.connect();

      mockDisconnect.mockRejectedValue(new Error('disconnect failed'));
      const disconnectSpy = vi.fn();
      connector.on('disconnect', disconnectSpy);

      await connector.disconnect();

      expect(await connector.getAccounts()).toEqual([]);
      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe('signMessage', () => {
    it('should throw when not initialized', async () => {
      await expect(connector.signMessage('hello')).rejects.toThrow('Not initialized');
    });

    it('should sign message via wagmi', async () => {
      connector.setWagmiConfig(mockWagmiConfig);
      connector.setWagmiConnector(mockWagmiConnector);
      mockGetConnection.mockReturnValue({ address: '0xabc123' });
      mockSignMessage.mockResolvedValue('0xsignature');

      const result = await connector.signMessage('hello');

      expect(result).toBe('0xsignature');
      expect(mockSignMessage).toHaveBeenCalledWith(mockWagmiConfig, {
        account: '0xabc123',
        message: 'hello',
        connector: mockWagmiConnector,
      });
    });
  });

  describe('getSigner', () => {
    it('should warn and return undefined when config is missing', async () => {
      const consoleSpy = vi.spyOn(console, 'warn');
      const signer = await connector.getSigner();

      expect(signer).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Signer not available')
      );
    });
  });
});
