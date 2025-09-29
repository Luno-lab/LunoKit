import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Chain, WalletConnectConnectorOptions } from '../types';
import type { BaseConnector } from './base';

interface ConnectorTestConfig<T> {
  getConnector: () => T;
  expected: {
    id: string;
    name: string;
    icon: string;
    injectorId?: string;
  };
  extraWindowProps?: Record<string, any>;
}

interface MockInjector {
  accounts: {
    get: any;
    subscribe: any;
  };
  signer: {
    signRaw: any;
  };
}

export function createConnectorTestSuite<T extends BaseConnector>(config: ConnectorTestConfig<T>) {
  return () => {
    let connector: T;
    let mockInjectedWeb3: Record<string, any>;
    let mockInjector: MockInjector;
    let originalWindow: any;

    const TEST_ADDRESS = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';

    const { id, name, icon, injectorId } = config.expected;
    const actualInjectorId = injectorId || id;

    beforeEach(() => {
      connector = config.getConnector();
      originalWindow = globalThis.window;

      mockInjector = {
        accounts: {
          get: vi.fn(),
          subscribe: vi.fn(),
        },
        signer: {
          signRaw: vi.fn(),
        },
      };

      mockInjectedWeb3 = {
        [actualInjectorId]: {
          enable: vi.fn(),
        },
      };

      Object.defineProperty(globalThis, 'window', {
        value: { injectedWeb3: mockInjectedWeb3, ...config.extraWindowProps },
        writable: true,
        configurable: true,
      });

      vi.clearAllMocks();
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
        expect(connector.id).toBe(id);
        expect(connector.name).toBe(name);
        expect(connector.icon).toBe(icon);
      });
    });

    describe('installation detection', () => {
      it('should detect when extension is installed', () => {
        expect(connector.isInstalled()).toBe(true);
      });

      it('should return false in non-browser environment', () => {
        Object.defineProperty(globalThis, 'window', {
          value: undefined,
          writable: true,
          configurable: true,
        });
        expect(connector.isInstalled()).toBe(false);
      });

      it('should return false when injectedWeb3 is undefined', () => {
        Object.defineProperty(globalThis, 'window', {
          value: {},
          writable: true,
          configurable: true,
        });
        expect(connector.isInstalled()).toBe(false);
      });

      it('should return false when extension not found', () => {
        Object.defineProperty(globalThis, 'window', {
          value: { injectedWeb3: {} },
          writable: true,
          configurable: true,
        });
        expect(connector.isInstalled()).toBe(false);
      });
    });

    describe('availability check', () => {
      it('should be available when installed', async () => {
        expect(await connector.isAvailable()).toBe(true);
      });

      it('should not be available when not installed', async () => {
        vi.spyOn(connector, 'isInstalled').mockReturnValue(false);
        expect(await connector.isAvailable()).toBe(false);
      });
    });

    describe('connection flow', () => {
      beforeEach(() => {
        mockInjectedWeb3[actualInjectorId].enable.mockResolvedValue(mockInjector);
        mockInjector.accounts.get.mockResolvedValue([
          { address: TEST_ADDRESS, name: 'Test Account' },
        ]);
        mockInjector.accounts.subscribe.mockReturnValue(() => {});
      });

      it('should connect successfully with valid setup', async () => {
        const accounts = await connector.connect('test-app');

        expect(mockInjectedWeb3[actualInjectorId].enable).toHaveBeenCalledWith('test-app');
        expect(mockInjector.accounts.get).toHaveBeenCalled();
        expect(accounts).toHaveLength(1);
        expect(accounts[0].address).toBe(TEST_ADDRESS);
      });

      it('should handle already connected state', async () => {
        await connector.connect('test-app');
        const accounts = await connector.connect('test-app');
        expect(accounts).toHaveLength(1);
        expect(mockInjectedWeb3[actualInjectorId].enable).toHaveBeenCalledTimes(1);
      });

      it('should throw error when extension not available', async () => {
        vi.spyOn(connector, 'isAvailable').mockResolvedValue(false);
        await expect(connector.connect('test-app')).rejects.toThrow(
          `${name} extension not found or not enabled.`
        );
      });

      it('should throw error when injectedWeb3 not found', async () => {
        Object.defineProperty(globalThis, 'window', {
          value: {
            injectedWeb3: {
              'other-wallet': { enable: vi.fn() },
              'another-wallet': { enable: vi.fn() },
            },
          },
          writable: true,
          configurable: true,
        });

        await expect(connector.connect('test-app')).rejects.toThrow(
          `${name} extension not found or not enabled.`
        );
      });

      it('should throw error when enable fails', async () => {
        mockInjectedWeb3[actualInjectorId].enable.mockResolvedValue(null);

        await expect(connector.connect('test-app')).rejects.toThrow(
          `Failed to enable the '${id}' extension.`
        );
      });

      it('should throw error when no accounts found', async () => {
        mockInjector.accounts.get.mockResolvedValue([]);

        await expect(connector.connect('test-app')).rejects.toThrow(
          `No accounts found in ${name}. Make sure accounts are visible and access is granted.`
        );
      });

      it('should cleanup on connection failure', async () => {
        mockInjectedWeb3[actualInjectorId].enable.mockRejectedValue(new Error('Enable failed'));

        await expect(connector.connect('test-app')).rejects.toThrow('Enable failed');

        const accounts = await connector.getAccounts();
        const signer = await connector.getSigner();
        expect(accounts).toEqual([]);
        expect(signer).toBeUndefined();
      });

      it('should setup account subscription on successful connection', async () => {
        await connector.connect('test-app');
        expect(mockInjector.accounts.subscribe).toHaveBeenCalled();
      });

      it('should emit connect event', async () => {
        const connectSpy = vi.fn();
        connector.on('connect', connectSpy);

        await connector.connect('test-app');

        expect(connectSpy).toHaveBeenCalledWith([
          expect.objectContaining({
            address: TEST_ADDRESS,
          }),
        ]);
      });

      it('should set correct source metadata for accounts', async () => {
        const accounts = await connector.connect('test-app');
        accounts.forEach((account) => {
          expect(account.meta?.source).toBe(id);
        });
      });
    });

    describe('message signing', () => {
      beforeEach(async () => {
        mockInjectedWeb3[actualInjectorId].enable.mockResolvedValue(mockInjector);
        mockInjector.accounts.get.mockResolvedValue([{ address: TEST_ADDRESS, name: 'Test' }]);
        mockInjector.accounts.subscribe.mockReturnValue(() => {});
        await connector.connect('test-app');
      });

      it('should sign message successfully', async () => {
        mockInjector.signer.signRaw.mockResolvedValue({ signature: '0xsignature123' });

        const signature = await connector.signMessage('hello world', TEST_ADDRESS);

        expect(signature).toBe('0xsignature123');
        expect(mockInjector.signer.signRaw).toHaveBeenCalledWith({
          address: TEST_ADDRESS,
          data: expect.any(String),
          type: 'bytes',
        });
      });

      it('should throw error when signing fails', async () => {
        mockInjector.signer.signRaw.mockRejectedValue(new Error('User rejected signing'));

        await expect(connector.signMessage('hello', TEST_ADDRESS)).rejects.toThrow(
          `Connector ${id}: Failed to sign message: User rejected signing`
        );
      });

      it('should throw error when signer not available', async () => {
        await connector.disconnect();

        await expect(connector.signMessage('hello', TEST_ADDRESS)).rejects.toThrow(
          'Signer is not available or does not support signRaw.'
        );
      });

      it('should throw error when signer does not support signRaw', async () => {
        const signerWithoutSignRaw = {};
        vi.spyOn(connector, 'getSigner').mockResolvedValue(signerWithoutSignRaw as any);

        await expect(connector.signMessage('hello', TEST_ADDRESS)).rejects.toThrow(
          'Signer is not available or does not support signRaw.'
        );
      });

      it('should return undefined for invalid parameters', async () => {
        expect(await connector.signMessage('', TEST_ADDRESS)).toBeUndefined();
        expect(await connector.signMessage('hello world', '')).toBeUndefined();
        expect(await connector.signMessage(null as any, TEST_ADDRESS)).toBeUndefined();
        expect(await connector.signMessage('hello', null as any)).toBeUndefined();
        expect(await connector.signMessage(undefined as any, TEST_ADDRESS)).toBeUndefined();
        expect(await connector.signMessage('hello', undefined as any)).toBeUndefined();
        expect(await connector.signMessage('', '')).toBeUndefined();
        expect(await connector.signMessage(null as any, null as any)).toBeUndefined();
      });

      it('should throw error when signing with unmanaged address', async () => {
        await expect(
          connector.signMessage('hello world', 'unmanaged-address-12345')
        ).rejects.toThrow(`Address unmanaged-address-12345 is not managed by ${name}.`);
      });

      it('should handle case-insensitive address validation', async () => {
        mockInjector.signer.signRaw.mockResolvedValue({ signature: '0xsignature123' });

        const upperCaseAddress = TEST_ADDRESS.toUpperCase();
        const signature = await connector.signMessage('hello world', upperCaseAddress);

        expect(signature).toBe('0xsignature123');
      });
    });

    describe('disconnection', () => {
      it('should cleanup all resources on disconnect', async () => {
        mockInjectedWeb3[actualInjectorId].enable.mockResolvedValue(mockInjector);
        mockInjector.accounts.get.mockResolvedValue([{ address: TEST_ADDRESS, name: 'Test' }]);
        const unsubscribeFn = vi.fn();
        mockInjector.accounts.subscribe.mockReturnValue(unsubscribeFn);

        await connector.connect('test-app');
        await connector.disconnect();

        const accounts = await connector.getAccounts();
        const signer = await connector.getSigner();
        expect(accounts).toEqual([]);
        expect(signer).toBeUndefined();
        expect(unsubscribeFn).toHaveBeenCalled();
      });

      it('should emit disconnect event', async () => {
        const disconnectSpy = vi.fn();
        connector.on('disconnect', disconnectSpy);

        await connector.disconnect();

        expect(disconnectSpy).toHaveBeenCalled();
      });
    });

    describe('account subscription', () => {
      it('should handle account changes', async () => {
        let subscriptionCallback: any;

        mockInjectedWeb3[actualInjectorId].enable.mockResolvedValue(mockInjector);
        mockInjector.accounts.get.mockResolvedValue([{ address: TEST_ADDRESS, name: 'Test' }]);
        mockInjector.accounts.subscribe.mockImplementation((callback: any) => {
          subscriptionCallback = callback;
          return () => {};
        });

        const accountsChangedSpy = vi.fn();
        connector.on('accountsChanged', accountsChangedSpy);

        await connector.connect('test-app');

        const newAccounts = [{ address: TEST_ADDRESS, name: 'Updated Test' }];
        subscriptionCallback(newAccounts);

        expect(accountsChangedSpy).toHaveBeenCalled();
      });
    });
  };
}

interface WalletConnectTestConfig<T> {
  getConnector: (options: WalletConnectConnectorOptions) => T;
  expected: {
    id: string;
    name: string;
    icon: string;
  };
}

interface MockWalletConnectProvider {
  init: any;
  disconnect: any;
  client?: {
    connect: any;
    request: any;
  };
  session?: {
    topic: string;
    namespaces: {
      polkadot: {
        accounts: string[];
      };
    };
  };
}

export function createWalletConnectTestSuite<T extends BaseConnector>(
  config: WalletConnectTestConfig<T>
) {
  return () => {
    let connector: T;
    let mockProvider: MockWalletConnectProvider;
    let originalWindow: any;

    const TEST_ADDRESS = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
    const TEST_PROJECT_ID = 'test-project-id';
    const TEST_CHAINS = [
      {
        genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
        name: 'Polkadot',
      },
    ] as Chain[];
    const TEST_SESSION = {
      topic: 'test-topic',
      namespaces: {
        polkadot: {
          accounts: [`polkadot:e143f23803ac50e8f6f8e62695d1ce9e:${TEST_ADDRESS}`],
        },
      },
    };

    const { id, name, icon } = config.expected;

    beforeEach(() => {
      originalWindow = globalThis.window;

      Object.defineProperty(globalThis, 'window', {
        value: {
          location: { origin: 'http://localhost:3000' },
        },
        writable: true,
        configurable: true,
      });

      mockProvider = {
        init: vi.fn(),
        disconnect: vi.fn().mockResolvedValue(undefined),
        client: {
          connect: vi.fn(),
          request: vi.fn(),
        },
        session: undefined,
      };

      vi.doMock('@walletconnect/universal-provider', () => ({
        UniversalProvider: {
          init: mockProvider.init,
        },
      }));

      mockProvider.init.mockResolvedValue(mockProvider);

      connector = config.getConnector({
        projectId: TEST_PROJECT_ID,
        relayUrl: 'wss://relay.walletconnect.com',
      });

      vi.clearAllMocks();
    });

    afterEach(() => {
      Object.defineProperty(globalThis, 'window', {
        value: originalWindow,
        writable: true,
        configurable: true,
      });
      vi.restoreAllMocks();
      vi.doUnmock('@walletconnect/universal-provider');
    });

    describe('basic properties', () => {
      it('should have correct connector metadata', () => {
        expect(connector.id).toBe(id);
        expect(connector.name).toBe(name);
        expect(connector.icon).toBe(icon);
      });
    });

    describe('installation and availability', () => {
      it('should always be installed', () => {
        expect(connector.isInstalled()).toBe(false);
      });

      it('should always be available', async () => {
        expect(await connector.isAvailable()).toBe(true);
      });
    });

    describe('connection flow', () => {
      it('should throw error when projectId missing', async () => {
        const connectorWithoutProject = config.getConnector({
          projectId: '',
        });

        await expect(connectorWithoutProject.connect('test-app', TEST_CHAINS)).rejects.toThrow(
          `${name} requires a projectId`
        );
      });

      it('should throw error when chains missing', async () => {
        await expect(connector.connect('test-app', [])).rejects.toThrow(
          `${name} requires chains configuration`
        );
      });

      it('should connect with existing session', async () => {
        mockProvider.session = TEST_SESSION;

        const accounts = await connector.connect('test-app', TEST_CHAINS);

        expect(mockProvider.client!.connect).not.toHaveBeenCalled();
        expect(accounts).toHaveLength(1);
        expect(accounts[0].address).toBe(TEST_ADDRESS);
        expect(accounts[0].meta?.source).toBe(id);
      });

      it('should connect with new session and emit events', async () => {
        mockProvider.session = undefined;
        mockProvider.client!.connect.mockResolvedValue({
          uri: 'wc:test-uri@1',
          approval: () => Promise.resolve(TEST_SESSION),
        });

        const connectSpy = vi.fn();
        const getUriSpy = vi.fn();
        connector.on('connect', connectSpy);
        connector.on('get_uri', getUriSpy);

        const accounts = await connector.connect('test-app', TEST_CHAINS);

        expect(mockProvider.init).toHaveBeenCalledWith({
          projectId: TEST_PROJECT_ID,
          relayUrl: 'wss://relay.walletconnect.com',
          metadata: expect.objectContaining({
            name: 'test-app',
          }),
        });
        expect(mockProvider.client!.connect).toHaveBeenCalled();
        expect(getUriSpy).toHaveBeenCalledWith('wc:test-uri@1');
        expect(connectSpy).toHaveBeenCalledWith([
          expect.objectContaining({
            address: TEST_ADDRESS,
          }),
        ]);
        expect(accounts).toHaveLength(1);
        expect(accounts[0].address).toBe(TEST_ADDRESS);
      });
    });

    describe('connection URI management', () => {
      it('should always have connection URI capability', () => {
        expect(connector.hasConnectionUri()).toBe(true);
      });

      it('should return connection URI for new connection', async () => {
        mockProvider.session = undefined;
        mockProvider.client!.connect.mockResolvedValue({
          uri: 'wc:test-uri@1',
          approval: () => Promise.resolve(TEST_SESSION),
        });

        const connectPromise = connector.connect('test-app', TEST_CHAINS);
        const uriPromise = connector.getConnectionUri();

        await connectPromise;
        const uri = await uriPromise;

        expect(uri).toBe('wc:test-uri@1');
      });
    });

    describe('account management', () => {
      beforeEach(async () => {
        mockProvider.session = TEST_SESSION;
        await connector.connect('test-app', TEST_CHAINS);
      });

      it('should return connected accounts', async () => {
        const accounts = await connector.getAccounts();
        expect(accounts).toHaveLength(1);
        expect(accounts[0].address).toBe(TEST_ADDRESS);
      });
    });

    describe('signing', () => {
      beforeEach(async () => {
        mockProvider.session = TEST_SESSION;
        await connector.connect('test-app', TEST_CHAINS);
      });

      it('should sign message successfully', async () => {
        mockProvider.client!.request.mockResolvedValue({
          signature: '0xtest-signature',
        });

        const signature = await connector.signMessage('hello world', TEST_ADDRESS);

        expect(signature).toBe('0xtest-signature');
        expect(mockProvider.client!.request).toHaveBeenCalledWith({
          topic: 'test-topic',
          chainId: expect.stringContaining('polkadot:'),
          request: {
            method: 'polkadot_signMessage',
            params: {
              address: TEST_ADDRESS,
              message: 'hello world',
              type: 'bytes',
            },
          },
        });
      });

      it('should get signer for transaction signing', async () => {
        const signer = await connector.getSigner();

        expect(signer).toBeDefined();
        expect(signer!.signPayload).toBeDefined();
      });

      it('should sign transaction payload', async () => {
        mockProvider.client!.request.mockResolvedValue({
          signature: '0xtest-tx-signature',
        });

        const signer = await connector.getSigner();
        const mockPayload = {
          address: TEST_ADDRESS,
          genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
          method: '0x123',
          nonce: '0x00',
          specVersion: '0x1234',
          transactionVersion: '0x01',
          blockHash: '0xabc',
          blockNumber: '0x123',
          era: '0x00',
        };

        const result = await signer!.signPayload(mockPayload);

        expect(result.signature).toBe('0xtest-tx-signature');
        expect(mockProvider.client!.request).toHaveBeenCalledWith({
          topic: 'test-topic',
          chainId: expect.stringContaining('polkadot:e143f23803ac50e8f6f8e62695d1ce9e'),
          request: {
            method: 'polkadot_signTransaction',
            params: {
              address: TEST_ADDRESS,
              transactionPayload: mockPayload,
            },
          },
        });
      });

      it('should throw error when signing without connection', async () => {
        await connector.disconnect();

        await expect(connector.signMessage('hello', TEST_ADDRESS)).rejects.toThrow(
          'Provider not initialized or not connected'
        );
      });
    });

    describe('disconnection', () => {
      it('should disconnect when connected', async () => {
        mockProvider.session = TEST_SESSION;
        await connector.connect('test-app', TEST_CHAINS);

        const disconnectSpy = vi.fn();
        connector.on('disconnect', disconnectSpy);

        await connector.disconnect();

        expect(mockProvider.disconnect).toHaveBeenCalled();
        expect(disconnectSpy).toHaveBeenCalled();

        const accounts = await connector.getAccounts();
        const signer = await connector.getSigner();
        expect(accounts).toEqual([]);
        expect(signer).toBeUndefined();
      });

      it('should handle disconnect when not connected', async () => {
        await connector.disconnect();
        expect(mockProvider.disconnect).not.toHaveBeenCalled();
      });
    });
  };
}
