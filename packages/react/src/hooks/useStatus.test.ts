import { act, waitFor } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import { type MockConnector, mockConfig, renderHook } from '../test-utils';
import { ConnectionStatus } from '../types';
import { useConnect } from './useConnect';
import { useDisconnect } from './useDisconnect';
import { useStatus } from './useStatus';

const connector = mockConfig.connectors[0] as MockConnector;

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useStatus', async () => {
  const { result } = renderHook(
    () => ({
      useStatus: useStatus(),
      useConnect: useConnect(),
      useDisconnect: useDisconnect(),
    }),
    {
      config: mockConfig,
    }
  );

  expect(result.current.useStatus).toBe(ConnectionStatus.Disconnected);

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id,
    });
  });

  await waitFor(() => {
    expect(result.current.useStatus).toBe(ConnectionStatus.Connected);
  });

  await act(async () => {
    await result.current.useDisconnect.disconnectAsync();
  });

  await waitFor(() => {
    expect(result.current.useStatus).toBe(ConnectionStatus.Disconnected);
  });
});
