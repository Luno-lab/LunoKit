import { expect, afterEach, describe, it, vi } from 'vitest';
import { mockConfig, MockConnector, mockClient } from '../test-utils';
import { renderHook } from '../test-utils';
import { act, waitFor } from '@testing-library/react';
import { useConnect } from './useConnect';
import { useBalance } from './useBalance';
import { useAccount } from './useAccount';
import { ConnectionStatus } from '../types';
import { useLuno } from './useLuno';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot)
}));

const connector = mockConfig.connectors[0] as MockConnector;

describe('useBalance', () => {
  afterEach(async () => {
    if (connector.accounts.length > 0) {
      await connector.disconnect();
    }
  });

  it('should handle balance query when connected', async () => {
    const { result } = renderHook(() => ({
      useAccount: useAccount(),
      useConnect: useConnect(),
      useLuno: useLuno(),
      useBalance: useBalance({ address: undefined })
    }), {
      config: mockConfig
    });

    expect(result.current.useBalance.data).toBeUndefined();
    expect(result.current.useBalance.isLoading).toBe(false);
    expect(result.current.useBalance.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.useLuno.currentApi).toBeDefined();
      expect(result.current.useLuno.isApiReady).toBe(true);
    });

    await act(async () => {
      await result.current.useConnect.connectAsync({
        connectorId: connector.id
      });
    });

    await waitFor(() => {
      expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
    });

    const { result: balanceResult } = renderHook(() =>
        useBalance({
          address: result.current.useAccount.address
        }), {
        config: mockConfig
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

  it('should be disabled when API is not ready', async () => {
    const { result } = renderHook(() => ({
      useBalance: useBalance({ address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' })
    }), {
      config: mockConfig
    });

    expect(result.current.useBalance.data).toBeUndefined();
    expect(result.current.useBalance.isLoading).toBe(false);
    expect(result.current.useBalance.error).toBeUndefined();
  });
});
