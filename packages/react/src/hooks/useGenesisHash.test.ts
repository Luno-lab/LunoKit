import { expect, describe, it, vi } from 'vitest';
import { mockConfig, mockClient } from '../test-utils';
import { renderHook } from '../test-utils';
import { waitFor } from '@testing-library/react';
import { useGenesisHash } from './useGenesisHash';
import { useLuno } from './useLuno';
import { polkadot } from '@luno-kit/core/chains';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot)
}));

describe('useGenesisHash', () => {
  it('should return genesis hash when API is ready', async () => {
    const { result } = renderHook(() => ({
      useGenesisHash: useGenesisHash(),
      useLuno: useLuno(),
    }), {
      config: mockConfig
    });

    expect(result.current.useGenesisHash.data).toBeUndefined();
    expect(result.current.useGenesisHash.isLoading).toBe(false);

    await waitFor(() => {
      expect(result.current.useLuno.currentApi).toBeDefined();
      expect(result.current.useLuno.isApiReady).toBe(true);
    });
    console.log('result.current.useGenesisHash', result.current.useGenesisHash)

    await waitFor(() => {
      expect(result.current.useGenesisHash.isLoading).toBe(false);
    });

    expect(result.current.useGenesisHash).toEqual({
      data: polkadot.genesisHash,
      isLoading: false,
      error: null,
    });
  });

  it('should return undefined and loading when API is not ready', () => {
    const { result } = renderHook(() => useGenesisHash(), {
      config: mockConfig
    });

    expect(result.current).toEqual({
      data: undefined,
      isLoading: true,
      error: null,
    });
  });
});
