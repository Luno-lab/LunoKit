import { expect, afterEach, test, vi } from 'vitest';
import { mockConfig, MockConnector } from '../test-utils';
import { renderHook } from '../test-utils';
import { act, waitFor } from '@testing-library/react';
import { useConnect } from './useConnect';
import { useSendTransactionHash } from './useSendTransactionHash';
import { useApi } from './useApi';

const connector = mockConfig.connectors[0] as MockConnector;

const mockExtrinsic = {
  signAndSend: vi.fn()
};

const mockApi = {
  tx: {
    balances: {
      transferKeepAlive: vi.fn().mockReturnValue(mockExtrinsic)
    }
  }
};

vi.mock('../utils/createApi', () => ({
  createApi: () => Promise.resolve(mockApi)
}));

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
  vi.clearAllMocks();
});

test('useSendTransactionHash', async () => {
  mockExtrinsic.signAndSend.mockResolvedValue('0x123');

  const { result } = renderHook(() => ({
    useConnect: useConnect(),
    useApi: useApi(),
    useSendTransactionHash: useSendTransactionHash(),
  }), {
    config: mockConfig
  });

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id
    });
  });

  await waitFor(() => {
    expect(result.current.useApi.isApiReady).toBeTruthy();
  });

  const hash = await result.current.useSendTransactionHash.sendTransactionAsync({
    extrinsic: mockExtrinsic
  });

  await waitFor(() => {
    expect(mockExtrinsic.signAndSend).toHaveBeenCalled();
  });

  expect(hash).toBe('0x123');
  expect(result.current.useSendTransactionHash.data).toBe('0x123');
  expect(result.current.useSendTransactionHash.isSuccess).toBeTruthy();
});
