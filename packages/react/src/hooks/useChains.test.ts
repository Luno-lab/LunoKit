import { waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { mockClient, mockConfig, renderHook } from '../test-utils';
import { useChains } from './useChains';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot),
}));

test('useChains', async () => {
  const { result } = renderHook(
    () => ({
      useChains: useChains(),
    }),
    {
      config: mockConfig,
    }
  );

  await waitFor(() => {
    expect(result.current.useChains.length).toBeGreaterThan(0);
  });

  expect(result.current.useChains).toEqual(mockConfig.chains);
});
