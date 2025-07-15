import { expect, test } from 'vitest';
import { mockConfig, MockConnector } from '../test-utils';
import { renderHook } from '../test-utils';
import { useActiveConnector } from './useActiveConnector';
import { useConnect } from './useConnect';
import { act, waitFor } from '@testing-library/react';
import { ConnectionStatus } from '../types';

const connector = mockConfig.connectors[0] as MockConnector;

test('useActiveConnector', async () => {
  const { result } = renderHook(() => ({
    useActiveConnector: useActiveConnector(),
    useConnect: useConnect(),
  }), {
    config: mockConfig
  });

  expect(result.current.useActiveConnector).toBeUndefined();

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id
    });
  });

  await waitFor(() => {
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
  });

  expect(result.current.useActiveConnector).toBe(connector);
});
