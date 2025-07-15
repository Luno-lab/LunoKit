import { expect, test, vi } from 'vitest';
import { mockConfig, mockClient } from '../test-utils';
import { renderHook } from '../test-utils';
import { useChain } from './useChain';
import { waitFor } from '@testing-library/react';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot)
}));

test('useChain', async () => {
  const { result } = renderHook(() => ({
    useChain: useChain(),
  }), {
    config: mockConfig
  });

  await waitFor(() => {
    expect(result.current.useChain.chain).toBeDefined();
  });

  expect(result.current.useChain.chainId).toBe(mockConfig.chains[0].genesisHash);
  expect(result.current.useChain.chain).toEqual(mockConfig.chains[0]);
});
