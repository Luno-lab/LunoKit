import { expect, afterEach, test, beforeEach, vi } from 'vitest';
import { mockConfig, MockConnector } from '../test-utils';
import { renderHook } from '../test-utils';
import { act, waitFor } from '@testing-library/react';
import { useConnect } from './useConnect';
import { useSwitchChain } from './useSwitchChain';
import { useChain } from './useChain';
import { polkadot, kusama } from '@luno-kit/core';
import {ConnectionStatus} from '../types'

const connector = mockConfig.connectors[0] as MockConnector;

vi.mock('../utils', () => ({
  createApi: vi.fn().mockResolvedValue(null),
  sleep: vi.fn().mockImplementation((ms = 1000) => Promise.resolve()),
}));

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

beforeEach(async () => {

});

test('useSwitchChain', async () => {
  const { result } = renderHook(() => ({
    useChain: useChain(),
    useSwitchChain: useSwitchChain(),
    useConnect: useConnect(),
  }), { config: mockConfig });

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id
    });
  });

  await waitFor(() => {
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected)
  });

  expect(result.current.useChain.chain?.name).toBe('Polkadot');
  expect(result.current.useSwitchChain.chains).toHaveLength(2);
  expect(result.current.useSwitchChain.currentChain?.name).toBe('Polkadot');
  expect(result.current.useSwitchChain.currentChainId).toBe(polkadot.genesisHash);

  await act(async () => {
    await result.current.useSwitchChain.switchChainAsync({
      chainId: kusama.genesisHash
    });
  });

  await waitFor(() => {
    expect(result.current.useSwitchChain.currentChain?.name).toBe('Kusama');
  });

  expect(result.current.useSwitchChain.currentChainId).toBe(kusama.genesisHash);
  expect(result.current.useSwitchChain.isSuccess).toBe(true);
  expect(result.current.useSwitchChain.error).toBeNull();

  await act(async () => {
    await result.current.useSwitchChain.switchChainAsync({
      chainId: polkadot.genesisHash
    });
  });

  await waitFor(() => {
    expect(result.current.useSwitchChain.currentChain?.name).toBe('Polkadot');
  });

  expect(result.current.useSwitchChain.currentChainId).toBe(polkadot.genesisHash);
});
