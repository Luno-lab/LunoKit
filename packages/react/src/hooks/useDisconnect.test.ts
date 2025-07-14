import { expect, afterEach, test, beforeEach } from 'vitest';
import { mockConfig, MockConnector } from '../test-utils';
import { renderHook } from '../test-utils';
import { act, waitFor } from '@testing-library/react';
import { useConnect } from './useConnect';
import { useDisconnect } from './useDisconnect';
import { useAccount } from './useAccount';
import { ConnectionStatus } from '../types';

const connector = mockConfig.connectors[0] as MockConnector;

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useDisconnect', async () => {
  const { result } = renderHook(() => ({
    useAccount: useAccount(),
    useDisconnect: useDisconnect(),
    useConnect: useConnect(),
  }), {
    config: mockConfig
  });

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id
    });
  });

  await waitFor(() =>
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected)
  );

  expect(result.current.useAccount.address).toBeDefined();
  expect(result.current.useAccount.account).toBeDefined();

  await act(async () => {
    await result.current.useDisconnect.disconnectAsync();
  });

  await waitFor(() =>
    expect(result.current.useDisconnect.status).toBe(ConnectionStatus.Disconnected),
  );

  expect(result.current.useAccount.address).toBeUndefined();
  expect(result.current.useAccount.account).toBeUndefined();
});
