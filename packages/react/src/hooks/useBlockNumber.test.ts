import { waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { type MockConnector, mockClient, mockConfig, renderHook } from '../test-utils';
import { useBlockNumber } from './useBlockNumber';
import { useLuno } from './useLuno';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot),
}));

const connector = mockConfig.connectors[0] as MockConnector;

describe('useBlockNumber', () => {
  afterEach(async () => {
    if (connector.accounts.length > 0) {
      await connector.disconnect();
    }
  });

  it('should handle block number subscription when connected', async () => {
    const { result } = renderHook(
      () => ({
        useLuno: useLuno(),
        useBlockNumber: useBlockNumber(),
      }),
      {
        config: mockConfig,
      }
    );

    expect(result.current.useBlockNumber.data).toBeUndefined();
    expect(result.current.useBlockNumber.isLoading).toBe(false);

    await waitFor(() => {
      expect(result.current.useLuno.currentApi).toBeDefined();
      expect(result.current.useLuno.isApiReady).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.useBlockNumber.data).toBeDefined();
    });

    expect(result.current.useBlockNumber).toMatchInlineSnapshot(`
      {
        "data": 1000,
        "error": undefined,
        "isLoading": false,
      }
    `);
  });

  it('should be disabled when API is not ready', () => {
    const { result } = renderHook(() => useBlockNumber(), {
      config: mockConfig,
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});
