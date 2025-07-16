import { expect, afterEach, test, vi } from 'vitest';
import { mockConfig, MockConnector, renderHook } from '../test-utils';
import { act, waitFor } from '@testing-library/react';
import { useConnect } from './useConnect';
import { useSignMessage } from './useSignMessage';
import { ConnectionStatus } from '../types';
import { useLuno } from './useLuno'

const connector = mockConfig.connectors[0] as MockConnector;
const TEST_MESSAGE = 'Hello Polkadot';

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useSignMessage', async () => {
  const { result } = renderHook(() => ({
    useConnect: useConnect(),
    useSignMessage: useSignMessage(),
    useLuno: useLuno(),
  }), {
    config: mockConfig
  });

  expect(result.current.useSignMessage.data).toBeUndefined();
  expect(result.current.useSignMessage.isIdle).toBe(true);
  expect(result.current.useSignMessage.error).toBeNull();

  await act(async () => {
    try {
      await result.current.useSignMessage.signMessageAsync({
        message: TEST_MESSAGE
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toContain('[useSignMessage]: No active connector found');
    }
  });

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id
    });
  });

  await waitFor(() => {
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
  });

  await act(async () => {
    try {
      await result.current.useSignMessage.signMessageAsync({
        message: ''
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toContain('No message provided');
    }
  });

  const mockSignMessage = vi.spyOn(connector, 'signMessage');
  mockSignMessage.mockRejectedValueOnce(new Error('User rejected'));

  await act(async () => {
    try {
      await result.current.useSignMessage.signMessageAsync({
        message: TEST_MESSAGE
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toContain('User rejected');
    }
  });

  mockSignMessage.mockRestore();

  await act(async () => {
    await result.current.useSignMessage.signMessageAsync({
      message: TEST_MESSAGE
    });
  });

  await waitFor(() => {
    expect(result.current.useSignMessage.isSuccess).toBe(true);
  });

  expect(result.current.useSignMessage.data).toBeDefined();
  expect(result.current.useSignMessage.data?.rawMessage).toBe(TEST_MESSAGE);
  expect(result.current.useSignMessage.data?.addressUsed).toBe(result.current.useLuno.account.address);
  expect(result.current.useSignMessage.data?.signature).toContain('signed_by_mock');

  await act(async () => {
    result.current.useSignMessage.reset();
  });

  await waitFor(() => {
    expect(result.current.useSignMessage.data).toBeUndefined();
    expect(result.current.useSignMessage.isIdle).toBe(true);
  });
});
