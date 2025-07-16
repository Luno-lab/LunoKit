import { expect, afterEach, test } from 'vitest';
import { mockConfig, MockConnector } from '../test-utils';
import { renderHook } from '../test-utils';
import { act, waitFor } from '@testing-library/react';
import { useConnect } from './useConnect';
import { useAccount } from './useAccount';
import { ConnectionStatus } from '../types';
import { useChain } from './useChain'

const connector = mockConfig.connectors[0] as MockConnector;

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useAccount', async () => {
  const { result } = renderHook(() => ({
    useAccount: useAccount(),
    useConnect: useConnect(),
  }), {
    config: mockConfig
  });

  expect(result.current.useAccount.account).toBeUndefined();
  expect(result.current.useAccount.address).toBeUndefined();

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id
    });
  });

  await waitFor(() => {
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
  });

  expect(result.current.useAccount.address).toBeDefined();
  expect(result.current.useAccount.account?.publicKey).toBeDefined();
});
