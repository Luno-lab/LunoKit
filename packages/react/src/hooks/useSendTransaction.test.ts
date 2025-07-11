import { expect, afterEach, test, vi } from 'vitest';
import { mockConfig, MockConnector } from '../test-utils';
import { renderHook } from '../test-utils';
import { act, waitFor } from '@testing-library/react';
import { useConnect } from './useConnect';
import { useSendTransaction } from './useSendTransaction';
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

test('useSendTransaction', async () => {
  let resolveSignAndSend: (value: any) => void;
  let statusCallback: Function;

  mockExtrinsic.signAndSend.mockImplementation((address, { signer }, callback) => {
    statusCallback = callback;
    return new Promise((resolve) => {
      resolveSignAndSend = resolve;
    });
  });

  const { result } = renderHook(() => ({
    useConnect: useConnect(),
    useApi: useApi(),
    useSendTransaction: useSendTransaction(),
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

  const sendPromise = result.current.useSendTransaction.sendTransactionAsync({
    extrinsic: mockExtrinsic
  });

  await waitFor(() => {
    expect(mockExtrinsic.signAndSend).toHaveBeenCalled();
  });

  await act(async () => {
    statusCallback({
      status: { type: 'Finalized', value: { blockHash: '0xabc', blockNumber: 123 } },
      events: [],
      txHash: '0x123'
    });
    resolveSignAndSend(() => {});
  });

  const receipt = await sendPromise;

  expect(receipt.status).toBe('success');
  expect(receipt.transactionHash).toBe('0x123');
  expect(receipt.blockNumber).toBe(123);
  expect(result.current.useSendTransaction.detailedStatus).toBe('finalized');
});


test('should handle transaction error states', async () => {
  let resolveSignAndSend: (value: any) => void;
  let statusCallback: Function;

  mockExtrinsic.signAndSend.mockImplementation((address, { signer }, callback) => {
    statusCallback = callback;
    return new Promise((resolve) => {
      resolveSignAndSend = resolve;
    });
  });

  const { result } = renderHook(() => ({
    useConnect: useConnect(),
    useApi: useApi(),
    useSendTransaction: useSendTransaction(),
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

  result.current.useSendTransaction.sendTransactionAsync({
    extrinsic: mockExtrinsic
  }).catch(e => {})

  await waitFor(() => {
    expect(mockExtrinsic.signAndSend).toHaveBeenCalled();
  });

  await act(async () => {
    statusCallback({
      status: { type: 'Invalid' },
      txHash: '0x123'
    });
    resolveSignAndSend(() => {});
  });

  await waitFor(() => {
    expect(result.current.useSendTransaction.isError).toBeTruthy();
    expect(result.current.useSendTransaction.error.message).toContain('Transaction invalid: 0x123');
    expect(result.current.useSendTransaction.txStatus).toBe('failed');
    expect(result.current.useSendTransaction.detailedStatus).toBe('invalid');
  });
});
