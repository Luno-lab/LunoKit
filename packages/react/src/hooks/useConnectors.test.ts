import { expect, test } from 'vitest';
import { mockConfig } from '../test-utils';
import { renderHook } from '../test-utils';
import { useConnectors } from './useConnectors';
import { waitFor } from '@testing-library/react';

test('useConnectors', async () => {
  const { result } = renderHook(() => ({
    useConnectors: useConnectors()
  }), {
    config: mockConfig
  });

  await waitFor(() => {
    expect(result.current.useConnectors.length).toBeGreaterThan(0);
  });

  expect(result.current.useConnectors).toEqual(mockConfig.connectors);
});
