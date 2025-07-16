import { expect, describe, it, vi } from 'vitest';
import { mockConfig, mockClient } from '../test-utils';
import { renderHook } from '../test-utils';
import { waitFor } from '@testing-library/react';
import { useApi } from './useApi';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot)
}));

describe('useApi', () => {
  it('should handle API initialization', async () => {
    const { result } = renderHook(() => ({
      useApi: useApi()
    }), {
      config: mockConfig
    });

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
