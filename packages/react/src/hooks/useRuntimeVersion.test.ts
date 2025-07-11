import { expect, afterEach, test, vi } from 'vitest';
import { mockConfig, MockConnector, mockClient } from '../test-utils';
import { renderHook } from '../test-utils';
import { waitFor } from '@testing-library/react';
import { useRuntimeVersion } from './useRuntimeVersion';
import { useApi } from './useApi'

const connector = mockConfig.connectors[0] as MockConnector;

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockClient.polkadot)
}));

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useRuntimeVersion', async () => {
  const { result } = renderHook(() => ({
    useApi: useApi(),
    useRuntimeVersion: useRuntimeVersion(),
  }), {
    config: mockConfig
  });

  expect(result.current.useRuntimeVersion.data).toBeUndefined();
  expect(result.current.useRuntimeVersion.isLoading).toBe(false);
  expect(result.current.useRuntimeVersion.error).toBeNull();

  await waitFor(() => {
    expect(result.current.useApi.api).toBeDefined();
    expect(result.current.useApi.isApiReady).toBe(true);
  });

  await waitFor(() => {
    expect(result.current.useRuntimeVersion.data).toBeDefined();
    expect(result.current.useRuntimeVersion.data?.specName).toBe('Polkadot');
    expect(result.current.useRuntimeVersion.isLoading).toBe(false);
  });
});
