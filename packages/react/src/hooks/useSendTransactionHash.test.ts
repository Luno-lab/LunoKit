import { act, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { type MockConnector, mockConfig, renderHook } from '../test-utils';
import { useApi } from './useApi';
import { useConnect } from './useConnect';
import { useSendTransactionHash } from './useSendTransactionHash';

const connector = mockConfig.connectors[0] as MockConnector;

const mockExtrinsic = {
  signAndSend: vi.fn(),
};

const mockApi = {
  tx: {
    balances: {
      transferKeepAlive: vi.fn().mockReturnValue(mockExtrinsic),
    },
  },
};

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockApi),
}));

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
  vi.clearAllMocks();
});

test('useSendTransactionHash', async () => {
  mockExtrinsic.signAndSend.mockResolvedValue('0x123');

  const { result } = renderHook(
    () => ({
      useConnect: useConnect(),
      useApi: useApi(),
      useSendTransactionHash: useSendTransactionHash(),
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

  await waitFor(() => {
    expect(result.current.useApi.isApiReady).toBeTruthy();
  });

  const hash = await result.current.useSendTransactionHash.sendTransactionAsync({
    extrinsic: mockExtrinsic,
  });

  await waitFor(() => {
    expect(mockExtrinsic.signAndSend).toHaveBeenCalled();
  });

  expect(hash).toBe('0x123');
  expect(result.current.useSendTransactionHash.data).toBe('0x123');
  expect(result.current.useSendTransactionHash.isSuccess).toBeTruthy();
});
