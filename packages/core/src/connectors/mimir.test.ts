import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MimirConnector, mimirConnector } from './mimir';
import { mimirWallet } from '../config/logos/generated';

vi.mock('@mimirdev/apps-inject', () => ({
  isMimirReady: vi.fn(),
  inject: vi.fn(),
  MIMIR_REGEXP: /^https:\/\/(app|dev)\.mimir\.global$/
}));

describe('MimirConnector', () => {
  let connector: MimirConnector;
  let originalWindow: any;

  beforeEach(() => {
    originalWindow = globalThis.window;
    connector = mimirConnector();
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      writable: true,
      configurable: true
    });
    vi.restoreAllMocks();
  });

  describe('basic properties', () => {
    it('should have correct connector metadata', () => {
      expect(connector.id).toBe('mimir');
      expect(connector.name).toBe('Mimir');
      expect(connector.icon).toBe(mimirWallet);
    });
  });

  describe('installation detection', () => {
    it('should return false when not in iframe', () => {
      Object.defineProperty(globalThis, 'window', {
        value: {
          parent: window
        },
        writable: true,
        configurable: true
      });

      expect(connector.isInstalled()).toBe(false);
    });

    it('should return true after successful injection', async () => {
      Object.defineProperty(globalThis, 'window', {
        value: {
          parent: {},
          injectedWeb3: { mimir: {} }
        },
        writable: true,
        configurable: true
      });

      const { isMimirReady } = await import('@mimirdev/apps-inject');
      (isMimirReady as any).mockResolvedValue('https://app.mimir.global');

      await (connector as any).mimirInject();

      expect(connector.isInstalled()).toBe(true);
    });
  });

  describe('inherited functionality', () => {
    it('should inherit isAvailable method from CommonConnector', async () => {
      vi.spyOn(connector, 'isInstalled').mockReturnValue(true);

      expect(await connector.isAvailable()).toBe(true);

      (connector.isInstalled as any).mockReturnValue(false);

      expect(await connector.isAvailable()).toBe(false);
    });
  });

  describe('connection behavior', () => {
    it('should redirect to Mimir when not in Mimir environment', async () => {
      Object.defineProperty(globalThis, 'window', {
        value: {
          parent: {},
          origin: 'https://example.com',
          open: vi.fn()
        },
        writable: true,
        configurable: true
      });

      (connector as any).mimirReady = false;
      const { MIMIR_REGEXP } = await import('@mimirdev/apps-inject');

      vi.spyOn(MIMIR_REGEXP, 'test').mockReturnValue(false);

      const connectPromise = await connector.connect('test-app');

      const expectedUrl = `https://app.mimir.global/explorer/${encodeURIComponent('https://example.com')}`;

      expect(window.open).toHaveBeenCalledWith(expectedUrl);

      expect(await connectPromise).toBeUndefined();
    });

    it('should call super.connect when in Mimir environment', async () => {
      Object.defineProperty(globalThis, 'window', {
        value: {
          parent: {},
          origin: 'https://app.mimir.global',
          injectedWeb3: {
            mimir: {
              enable: vi.fn().mockResolvedValue({
                accounts: { get: vi.fn().mockResolvedValue([]), subscribe: vi.fn() },
                signer: {}
              })
            }
          }
        },
        writable: true,
        configurable: true
      });

      (connector as any).mimirReady = true;

      const superConnectSpy = vi.spyOn(Object.getPrototypeOf(MimirConnector.prototype), 'connect');
      superConnectSpy.mockResolvedValue([{ address: '123', meta: { name: 'Test' } }]);

      const accounts = await connector.connect('test-app');

      expect(superConnectSpy).toHaveBeenCalledWith('test-app');

      expect(accounts).toEqual([{ address: '123', meta: { name: 'Test' } }]);
    });

    it('should check MIMIR_REGEXP against window.origin', async () => {
      Object.defineProperty(globalThis, 'window', {
        value: {
          parent: {},
          origin: 'https://not-mimir.example.com',
          open: vi.fn()
        },
        writable: true,
        configurable: true
      });

      (connector as any).mimirReady = false;

      await connector.connect('test-app');

      expect(window.open).toHaveBeenCalled();
    });
  });
});
