import { act, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { type MockConnector, mockConfig, renderHook } from '../test-utils';
import { ConnectionStatus } from '../types';
import { useAccount } from './useAccount';
import { useConnect } from './useConnect';
import { useDisconnect } from './useDisconnect';

const connector = mockConfig.connectors[0] as MockConnector;

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useDisconnect', async () => {
  const { result } = renderHook(
    () => ({
      useAccount: useAccount(),
      useDisconnect: useDisconnect(),
      useConnect: useConnect(),
    }),
    {
      config: mockConfig,
    }
  );

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id,
    });
  });

  await waitFor(() => expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected));

  expect(result.current.useAccount.address).toBeDefined();
  expect(result.current.useAccount.account).toBeDefined();

  await act(async () => {
    await result.current.useDisconnect.disconnectAsync();
  });

  await waitFor(() =>
    expect(result.current.useDisconnect.status).toBe(ConnectionStatus.Disconnected)
  );

  expect(result.current.useAccount.address).toBeUndefined();
  expect(result.current.useAccount.account).toBeUndefined();
});
