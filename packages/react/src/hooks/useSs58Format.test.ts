import { polkadot } from '@luno-kit/core/chains';
import { waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockClient, mockConfig, renderHook } from '../test-utils';
import { useLuno } from './useLuno';
import { useSs58Format } from './useSs58Format';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot),
}));

describe('useSs58Format', () => {
  it('should return chain ss58 format when connected', async () => {
    const { result } = renderHook(
      () => ({
        useSs58Format: useSs58Format(),
        useLuno: useLuno(),
      }),
      { config: mockConfig }
    );

    await waitFor(() => {
      expect(result.current.useLuno.currentApi).toBeDefined();
      expect(result.current.useLuno.isApiReady).toBe(true);
    });

    expect(result.current.useSs58Format).toEqual({
      data: polkadot.ss58Format,
      isLoading: false,
    });
  });

  it('should return undefined and loading when not connected', () => {
    const { result } = renderHook(() => useSs58Format(), { config: mockConfig });

    expect(result.current).toEqual({
      data: undefined,
      isLoading: true,
    });
  });
});
