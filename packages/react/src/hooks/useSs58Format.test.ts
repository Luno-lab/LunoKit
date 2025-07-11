import { expect, describe, it, vi } from 'vitest';
import { mockConfig, mockClient } from '../test-utils';
import { renderHook } from '../test-utils';
import { useSs58Format } from './useSs58Format';
import { polkadot } from '@luno-kit/core';
import { waitFor } from '@testing-library/react';
import { useLuno } from './useLuno'

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot)
}));

describe('useSs58Format', () => {
  it('should return chain ss58 format when connected', async () => {
    const { result } = renderHook(() => ({
      useSs58Format: useSs58Format(),
      useLuno: useLuno(),
    }), { config: mockConfig });

    await waitFor(() => {
      expect(result.current.useLuno.currentApi).toBeDefined();
      expect(result.current.useLuno.isApiReady).toBe(true);
    });

    expect(result.current.useSs58Format).toEqual({
      data: polkadot.ss58Format,
      isLoading: false
    });
  });

  it('should return undefined and loading when not connected', () => {
    const { result } = renderHook(() => useSs58Format(), { config: mockConfig });

    expect(result.current).toEqual({
      data: undefined,
      isLoading: true
    });
  });
});
