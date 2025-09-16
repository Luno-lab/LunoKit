import { act, waitFor } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import { type MockConnector, mockConfig, renderHook } from '../test-utils';
import { ConnectionStatus } from '../types';
import { useAccount } from './useAccount';
import { useConnect } from './useConnect';

const connector = mockConfig.connectors[0] as MockConnector;

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useConnect', async () => {
  const { result } = renderHook(
    () => ({
      useAccount: useAccount(),
      useConnect: useConnect(),
    }),
    {
      config: mockConfig,
    }
  );

  expect(result.current.useAccount.address).toBeUndefined();
  expect(result.current.useAccount.account).toBeUndefined();
  expect(result.current.useConnect.status).toBe(ConnectionStatus.Disconnected);

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id,
    });
  });

  await waitFor(() => expect(result.current.useConnect.isSuccess).toBeTruthy());

  expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
  expect(result.current.useAccount.address).toBeDefined();
  expect(result.current.useAccount.account).toBeDefined();
});
