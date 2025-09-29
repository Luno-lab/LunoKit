import { waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { mockClient, mockConfig, renderHook } from '../test-utils';
import { useConfig } from './useConfig';

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot),
}));

test('useConfig', async () => {
  const { result } = renderHook(
    () => ({
      useConfig: useConfig(),
    }),
    {
      config: mockConfig,
    }
  );

  await waitFor(() => {
    expect(result.current.useConfig).toBeDefined();
  });

  expect(result.current.useConfig).toEqual(mockConfig);
});
