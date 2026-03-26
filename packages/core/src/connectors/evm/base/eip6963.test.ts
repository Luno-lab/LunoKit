import { describe, expect, it } from 'vitest';
import { createEip6963Target, getAnnouncedProviders, isProviderInstalled } from './eip6963';

describe('EIP-6963', () => {
  describe('isProviderInstalled', () => {
    it('should return false for unknown rdns', () => {
      expect(isProviderInstalled('io.unknown.wallet')).toBe(false);
    });
  });

  describe('getAnnouncedProviders', () => {
    it('should return a copy of announced providers', () => {
      const providers = getAnnouncedProviders();
      expect(Array.isArray(providers)).toBe(true);
    });
  });

  describe('createEip6963Target', () => {
    it('should return undefined when rdns is undefined', () => {
      expect(createEip6963Target(undefined, 'test', 'Test')).toBeUndefined();
    });

    it('should return a function when rdns is provided', () => {
      const target = createEip6963Target('io.metamask', 'metamask', 'MetaMask');
      expect(typeof target).toBe('function');
    });

    it('should return undefined from target function when provider not announced', () => {
      const target = createEip6963Target('io.unknown', 'unknown', 'Unknown');
      expect(target!()).toBeUndefined();
    });
  });
});
