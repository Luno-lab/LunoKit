import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { isMobileDevice } from './device';

describe('isMobileDevice', () => {
  let originalWindow: any;
  let originalNavigator: any;

  beforeEach(() => {
    originalWindow = globalThis.window;
    originalNavigator = globalThis.navigator;
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('should return false when window is undefined', () => {
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    expect(isMobileDevice()).toBe(false);
  });

  it('should return false when navigator is undefined', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    expect(isMobileDevice()).toBe(false);
  });

  it('should return true for mobile user agents', () => {
    const mockUserAgents = [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
      'Mozilla/5.0 (Linux; Android 10; SM-G960U)',
      'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30',
      'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11',
      'Opera/9.80 (Android; Opera Mini/32.0.2254/85)',
    ];

    mockUserAgents.forEach(userAgent => {
      Object.defineProperty(globalThis, 'window', {
        value: { navigator: { userAgent } },
        writable: true,
        configurable: true,
      });

      Object.defineProperty(globalThis, 'navigator', {
        value: {
          userAgent,
          toString: () => userAgent
        },
        writable: true,
        configurable: true,
      });

      expect(isMobileDevice()).toBe(true);
    });
  });

  it('should return false for desktop user agents', () => {
    const mockUserAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      'Mozilla/5.0 (X11; Linux x86_64)',
    ];

    mockUserAgents.forEach(userAgent => {
      Object.defineProperty(globalThis, 'window', {
        value: { navigator: { userAgent } },
        writable: true,
        configurable: true,
      });

      Object.defineProperty(globalThis, 'navigator', {
        value: {
          userAgent,
          toString: () => userAgent
        },
        writable: true,
        configurable: true,
      });

      expect(isMobileDevice()).toBe(false);
    });
  });
});
