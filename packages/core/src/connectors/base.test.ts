import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BaseConnector } from './base';

interface MockAccount {
  address: string;
  name?: string;
}

interface MockSigner {
  sign: (payload: string) => string;
}

interface MockConnectOptions {
  appName: string;
}

class TestConnector extends BaseConnector<MockSigner, MockConnectOptions, MockAccount> {
  readonly id = 'test-connector';
  readonly name = 'Test Connector';
  readonly icon = 'test-icon.svg';

  async isAvailable(): Promise<boolean> {
    return true;
  }

  isInstalled(): boolean {
    return true;
  }

  async connect(_options: MockConnectOptions): Promise<MockAccount[]> {
    const accounts: MockAccount[] = [{ address: '0xabc123', name: 'Test Account' }];
    this.accounts = accounts;
    this.signer = { sign: (p: string) => `signed:${p}` };
    this.emit('connect', [...accounts]);
    return accounts;
  }

  async disconnect(): Promise<void> {
    this.accounts = [];
    this.signer = undefined;
    this.connectionUri = undefined;
    this.emit('disconnect');
  }

  async signMessage(message: string, address: string): Promise<string | undefined> {
    return `signed:${message}:${address}`;
  }

  exposeSetConnectionUri(uri: string) {
    this.connectionUri = uri;
  }

  override hasConnectionUri(): boolean {
    return this.connectionUri !== undefined;
  }
}

describe('BaseConnector', () => {
  let connector: TestConnector;

  beforeEach(() => {
    connector = new TestConnector();
  });

  describe('basic properties', () => {
    it('should have required abstract properties', () => {
      expect(connector.id).toBe('test-connector');
      expect(connector.name).toBe('Test Connector');
      expect(connector.icon).toBe('test-icon.svg');
    });

    it('should have default empty links', () => {
      expect(connector.links).toEqual({});
    });

    it('should extend EventEmitter', () => {
      expect(connector.on).toBeDefined();
      expect(connector.emit).toBeDefined();
      expect(connector.off).toBeDefined();
    });
  });

  describe('account management', () => {
    it('should start with empty accounts', async () => {
      const accounts = await connector.getAccounts();
      expect(accounts).toEqual([]);
    });

    it('should return accounts after connection', async () => {
      await connector.connect({ appName: 'test-app' });
      const accounts = await connector.getAccounts();

      expect(accounts).toHaveLength(1);
      expect(accounts[0].address).toBe('0xabc123');
    });

    it('should return a copy of accounts array', async () => {
      await connector.connect({ appName: 'test-app' });
      const accounts1 = await connector.getAccounts();
      const accounts2 = await connector.getAccounts();

      expect(accounts1).toEqual(accounts2);
      expect(accounts1).not.toBe(accounts2);
    });

    it('should clear accounts after disconnect', async () => {
      await connector.connect({ appName: 'test-app' });
      await connector.disconnect();

      expect(await connector.getAccounts()).toEqual([]);
    });
  });

  describe('signer management', () => {
    it('should start with undefined signer', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const signer = await connector.getSigner();

      expect(signer).toBeUndefined();
      consoleSpy.mockRestore();
    });

    it('should return signer after connection', async () => {
      await connector.connect({ appName: 'test-app' });
      const signer = await connector.getSigner();

      expect(signer).toBeDefined();
    });

    it('should warn when signer not available', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await connector.getSigner();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Connector test-connector: Signer not available. Connection might be incomplete or failed.'
      );
      consoleSpy.mockRestore();
    });
  });

  describe('connection URI', () => {
    it('should return false for hasConnectionUri by default', () => {
      expect(connector.hasConnectionUri()).toBe(false);
    });

    it('should return undefined connectionUri initially', async () => {
      expect(await connector.getConnectionUri()).toBeUndefined();
    });

    it('should return connectionUri when set', async () => {
      connector.exposeSetConnectionUri('wc:test-uri@1');

      expect(await connector.getConnectionUri()).toBe('wc:test-uri@1');
      expect(connector.hasConnectionUri()).toBe(true);
    });

    it('should reset connectionUri after disconnect', async () => {
      connector.exposeSetConnectionUri('wc:test@1');
      await connector.connect({ appName: 'test-app' });
      await connector.disconnect();

      expect(await connector.getConnectionUri()).toBeUndefined();
      expect(connector.hasConnectionUri()).toBe(false);
    });
  });

  describe('events', () => {
    it('should emit connect event with accounts', async () => {
      const connectSpy = vi.fn();
      connector.on('connect', connectSpy);

      await connector.connect({ appName: 'test-app' });

      expect(connectSpy).toHaveBeenCalledWith([{ address: '0xabc123', name: 'Test Account' }]);
    });

    it('should emit disconnect event', async () => {
      const disconnectSpy = vi.fn();
      connector.on('disconnect', disconnectSpy);

      await connector.connect({ appName: 'test-app' });
      await connector.disconnect();

      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should support removing event listeners', async () => {
      const spy = vi.fn();
      connector.on('connect', spy);
      connector.off('connect', spy);

      await connector.connect({ appName: 'test-app' });

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
