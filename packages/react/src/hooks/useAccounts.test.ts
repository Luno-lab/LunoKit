import { act, waitFor } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import { type MockConnector, mockConfig, renderHook } from '../test-utils';
import { ConnectionStatus } from '../types';
import { useAccounts } from './useAccounts';
import { useChain } from './useChain';
import { useConnect } from './useConnect';

const connector = mockConfig.connectors[0] as MockConnector;

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useAccounts', async () => {
  const { result } = renderHook(
    () => ({
      useAccounts: useAccounts(),
      useConnect: useConnect(),
      useChain: useChain(),
    }),
    {
      config: mockConfig,
    }
  );

  expect(result.current.useAccounts.accounts).toEqual([]);
  expect(result.current.useAccounts.selectAccount).toBeDefined();

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id,
    });
  });

  await waitFor(() => {
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
  });

  expect(result.current.useAccounts.accounts.length).toBe(2);
  expect(result.current.useAccounts.accounts[0].publicKey).toBeDefined();
  expect(result.current.useAccounts.accounts[0].address).toBeDefined();
});
