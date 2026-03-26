import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InjectConnector } from './inject';

vi.mock('./eip6963', () => ({
  isProviderInstalled: vi.fn(),
}));

import { isProviderInstalled } from './eip6963';

const mockIsProviderInstalled = vi.mocked(isProviderInstalled);

const createConnector = (rdns?: string) =>
  new InjectConnector({
    id: 'test-inject',
    name: 'Test Inject',
    icon: 'test-icon.svg',
    links: {},
    wagmiFactory: vi.fn() as any,
    rdns,
  });

describe('InjectConnector (EVM)', () => {
  let originalWindow: any;

  beforeEach(() => {
    originalWindow = globalThis.window;
    Object.defineProperty(globalThis, 'window', {
      value: {},
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
  });

  describe('isInstalled', () => {
    it('should return false in non-browser environment', () => {
      Object.defineProperty(globalThis, 'window', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      expect(createConnector().isInstalled()).toBe(false);
    });

    it('should return false with rdns in non-browser environment', () => {
      Object.defineProperty(globalThis, 'window', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      expect(createConnector('io.metamask').isInstalled()).toBe(false);
      expect(mockIsProviderInstalled).not.toHaveBeenCalled();
    });

    it('should check EIP-6963 provider when rdns is set', () => {
      mockIsProviderInstalled.mockReturnValue(true);

      const connector = createConnector('io.metamask');

      expect(connector.isInstalled()).toBe(true);
      expect(mockIsProviderInstalled).toHaveBeenCalledWith('io.metamask');
    });

    it('should return false when EIP-6963 provider not found', () => {
      mockIsProviderInstalled.mockReturnValue(false);

      expect(createConnector('io.metamask').isInstalled()).toBe(false);
    });

    it('should fall back to window.ethereum when no rdns', () => {
      Object.defineProperty(globalThis, 'window', {
        value: { ethereum: {} },
        writable: true,
        configurable: true,
      });

      expect(createConnector().isInstalled()).toBe(true);
    });

    it('should return false when no rdns and no window.ethereum', () => {
      expect(createConnector().isInstalled()).toBe(false);
    });
  });

  describe('isAvailable', () => {
    it('should delegate to isInstalled', async () => {
      Object.defineProperty(globalThis, 'window', {
        value: { ethereum: {} },
        writable: true,
        configurable: true,
      });

      const connector = createConnector();

      expect(await connector.isAvailable()).toBe(connector.isInstalled());
    });
  });

  describe('rdns property', () => {
    it('should store rdns from options', () => {
      expect(createConnector('io.metamask').rdns).toBe('io.metamask');
    });

    it('should be undefined when not provided', () => {
      expect(createConnector().rdns).toBeUndefined();
    });
  });
});
