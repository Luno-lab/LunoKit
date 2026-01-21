import { act, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { type MockConnector, mockClient, mockConfig, renderHook } from '../test-utils';
import { ConnectionStatus } from '../types';
import { useAccount } from './useAccount';
import { useBalance } from './useBalance';
import { useConnect } from './useConnect';
import { useLuno } from './useLuno';

vi.mock('../utils/createApi', () => ({
  createApi: () => {
    const api = mockClient.polkadot;
    (api as any).isEthereum = false;
    return Promise.resolve(api);
  },
}));

const connector = mockConfig.connectors[0] as MockConnector;

describe('useBalance', () => {
  afterEach(async () => {
    if (connector.accounts.length > 0) {
      await connector.disconnect();
    }
  });

  it('should handle balance query when connected', async () => {
    const { result } = renderHook(
      () => ({
        useAccount: useAccount(),
        useConnect: useConnect(),
        useLuno: useLuno(),
        useBalance: useBalance({ address: undefined }),
      }),
      {
        config: mockConfig,
      }
    );

    expect(result.current.useBalance.data).toBeUndefined();
    expect(result.current.useBalance.isLoading).toBe(false);
    expect(result.current.useBalance.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.useLuno.currentApi).toBeDefined();
      expect(result.current.useLuno.isApiReady).toBe(true);
    });

    await act(async () => {
      await result.current.useConnect.connectAsync({
        connectorId: connector.id,
      });
    });

    await waitFor(() => {
      expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
    });

    const { result: balanceResult } = renderHook(
      () =>
        useBalance({
          address: result.current.useAccount.address,
        }),
      {
        config: mockConfig,
      }
    );

    await waitFor(() => {
      expect(balanceResult.current.data).toBeDefined();
    });

    expect(balanceResult.current).toMatchInlineSnapshot(`
      {
        "data": {
          "formattedTotal": "100",
          "formattedTransferable": "100",
          "free": "1000000000000",
          "locks": [
            {
              "amount": "1000000000",
              "id": "vesting",
              "lockHuman": "0.1",
              "reason": "misc",
            },
          ],
          "reserved": "0",
          "total": 1000000000000n,
          "transferable": 1000000000000n,
        },
        "error": undefined,
        "isLoading": false,
      }
    `);
  });

  it('should return zero balance for EVM address on Substrate chain', async () => {
    const { result } = renderHook(
      () => ({
        useLuno: useLuno(),
        useBalance: useBalance({ address: '0xd200b69B88855eB5342a14993B84acfcA6829D6e' }), // EVM address
      }),
      {
        config: mockConfig,
      }
    );

    await waitFor(() => {
      expect(result.current.useLuno.isApiReady).toBe(true);
    });

    expect(result.current.useBalance.isLoading).toBe(false);
    expect(result.current.useBalance.data).toEqual({
      free: 0n,
      reserved: 0n,
      total: 0n,
      transferable: 0n,
      formattedTransferable: '0',
      formattedTotal: '0',
      locks: [],
    });
  });

  it('should be disabled when API is not ready', async () => {
    const { result } = renderHook(
      () => ({
        useBalance: useBalance({ address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' }),
      }),
      {
        config: mockConfig,
      }
    );

    expect(result.current.useBalance.data).toBeUndefined();
    expect(result.current.useBalance.isLoading).toBe(false);
    expect(result.current.useBalance.error).toBeUndefined();
  });
});
