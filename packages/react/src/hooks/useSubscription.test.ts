import { waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockConfig, renderHook } from '../test-utils';
import { ConnectionStatus } from '../types';
import { useLuno } from './useLuno';
import { useSubscription } from './useSubscription';

vi.mock('./useLuno');
const mockUseLuno = vi.mocked(useLuno);

describe('useSubscription', () => {
  let mockApi: any;

  beforeEach(() => {
    mockApi = {
      genesisHash: '0x123',
      query: {
        system: {
          number: vi.fn().mockImplementation((callback) => {
            setTimeout(() => callback('12345'), 0);
            return Promise.resolve(() => Promise.resolve());
          }),
          account: vi.fn().mockImplementation((address, callback) => {
            setTimeout(() => callback('1000000000000'), 0);
            return Promise.resolve(() => Promise.resolve());
          }),
        },
        balances: {
          locks: vi.fn().mockImplementation((address, callback) => {
            setTimeout(() => callback([]), 0);
            return Promise.resolve(() => Promise.resolve());
          }),
        },
      },
      queryMulti: vi.fn().mockImplementation((queries, callback) => {
        setTimeout(() => callback(['1000000000000', []]), 0);
        return Promise.resolve(() => Promise.resolve());
      }),
    };

    mockUseLuno.mockReturnValue({
      config: mockConfig,
      currentApi: mockApi,
      isApiReady: true,
      status: ConnectionStatus.Connected,
      activeConnector: undefined,
      accounts: [],
      account: undefined,
      currentChainId: '0x123',
      currentChain: mockConfig.chains[0],
      apiError: null,
      connect: vi.fn(),
      disconnect: vi.fn(),
      setAccount: vi.fn(),
      switchChain: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Subscriptions', () => {
    it('should handle block number subscription', async () => {
      const { result } = renderHook(
        () =>
          useSubscription({
            queryKey: '/block-number',
            factory: (api) => api.query.system.number,
            params: [],
          }),
        {
          config: mockConfig,
        }
      );

      await waitFor(() => expect(result.current.data).toBeDefined());
      expect(result.current.data).toBe('12345');
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle balance subscription with transform', async () => {
      const { result } = renderHook(
        () =>
          useSubscription({
            queryKey: '/balance',
            factory: (api) => api.query.system.account,
            params: ['5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'],
            options: {
              transform: (data: string) => ({
                free: data,
                formatted: `${parseInt(data, 10) / 10 ** 10} DOT`,
              }),
            },
          }),
        {
          config: mockConfig,
        }
      );

      await waitFor(() => expect(result.current.data).toBeDefined());
      expect(result.current.data).toEqual({
        free: '1000000000000',
        formatted: '100 DOT',
      });
    });
  });

  describe('Multi Query', () => {
    it('should handle multi query subscription', async () => {
      const { result } = renderHook(
        () =>
          useSubscription({
            queryKey: '/account-details',
            factory: (api) => api.queryMulti,
            params: (api) => [
              {
                fn: api.query.system.account,
                args: ['5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'],
              },
              {
                fn: api.query.balances.locks,
                args: ['5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'],
              },
            ],
          }),
        {
          config: mockConfig,
        }
      );

      await waitFor(() => expect(result.current.data).toBeDefined());
      expect(result.current.data).toEqual(['1000000000000', []]);
    });
  });

  describe('Error Handling', () => {
    it('should handle subscription errors', async () => {
      const { result } = renderHook(
        () =>
          useSubscription({
            queryKey: '/error',
            factory: () => {
              throw new Error('Subscription failed');
            },
            params: [],
          }),
        {
          config: mockConfig,
        }
      );

      await waitFor(() => expect(result.current.error).toBeDefined());
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toContain('Subscription failed');
    });

    it('should not subscribe when disabled', async () => {
      const { result } = renderHook(
        () =>
          useSubscription({
            queryKey: '/block-number',
            factory: (api) => api.query.system.number,
            params: [],
            options: { enabled: false },
          }),
        {
          config: mockConfig,
        }
      );

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  });
});
