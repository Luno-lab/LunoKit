import { act, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { type MockConnector, mockConfig, renderHook } from '../test-utils';
import { ConnectionStatus } from '../types';
import { useActiveConnector } from './useActiveConnector';
import { useConnect } from './useConnect';

const connector = mockConfig.connectors[0] as MockConnector;

test('useActiveConnector', async () => {
  const { result } = renderHook(
    () => ({
      useActiveConnector: useActiveConnector(),
      useConnect: useConnect(),
    }),
    {
      config: mockConfig,
    }
  );

  expect(result.current.useActiveConnector).toBeUndefined();

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id,
    });
  });

  await waitFor(() => {
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
  });

  expect(result.current.useActiveConnector).toBe(connector);
});
