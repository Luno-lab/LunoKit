import { expect, test, afterEach } from 'vitest';
import { mockConfig, MockConnector } from '../test-utils';
import { renderHook } from '../test-utils';
import { useStatus } from './useStatus';
import { useConnect } from './useConnect';
import { act, waitFor } from '@testing-library/react';
import { ConnectionStatus } from '../types';
import { useDisconnect } from './useDisconnect'

const connector = mockConfig.connectors[0] as MockConnector;

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useStatus', async () => {
  const { result } = renderHook(() => ({
    useStatus: useStatus(),
    useConnect: useConnect(),
    useDisconnect: useDisconnect()
  }), {
    config: mockConfig
  });

  expect(result.current.useStatus).toBe(ConnectionStatus.Disconnected);

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id
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
