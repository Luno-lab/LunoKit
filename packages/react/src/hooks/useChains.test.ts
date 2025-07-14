import { expect, test, vi } from 'vitest';
import { mockConfig, mockClient } from '../test-utils';
import { renderHook } from '../test-utils';
import { useChains } from './useChains';
import { waitFor } from '@testing-library/react';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot)
}));

test('useChains', async () => {
  const { result } = renderHook(() => ({
    useChains: useChains()
  }), {
    config: mockConfig
  });

  await waitFor(() => {
    expect(result.current.useChains.length).toBeGreaterThan(0);
  });

  expect(result.current.useChains).toEqual(mockConfig.chains);
});
