import { waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockClient, mockConfig, renderHook } from '../test-utils';
import { useClient } from './useClient';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot),
}));

describe('useClient', () => {
  it('should handle API initialization', async () => {
    const { result } = renderHook(
      () => ({
        useApi: useClient(),
      }),
      {
        config: mockConfig,
      }
    );

    expect(result.current.useApi.api).toBeUndefined();
    expect(result.current.useApi.isApiReady).toBe(false);
    expect(result.current.useApi.apiError).toBeNull();

    await waitFor(() => {
      expect(result.current.useApi.api).toBeDefined();
      expect(result.current.useApi.isApiReady).toBe(true);
    });

    expect(result.current.useApi.api).toBe(mockClient.polkadot);
    expect(result.current.useApi.isApiReady).toBe(true);
    expect(result.current.useApi.apiError).toBeNull();
  });
});
