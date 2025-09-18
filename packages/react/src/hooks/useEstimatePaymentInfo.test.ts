import { act, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { type MockConnector, mockConfig, renderHook } from '../test-utils';
import { useEstimatePaymentInfo } from './useEstimatePaymentInfo';
import { useConnect } from './useConnect';
import { ConnectionStatus } from '../types'

const connector = mockConfig.connectors[0] as MockConnector;

vi.mock('@luno-kit/core/utils', () => ({
  formatBalance: vi.fn((value: bigint, decimals: number) => {
    return `${(Number(value) / Math.pow(10, decimals)).toFixed(4)}`;
  }),
}));

afterEach(async () => {
  if (connector.accounts.length > 0) {
    await connector.disconnect();
  }
});

test('useEstimatePaymentInfo - should estimate payment info successfully', async () => {
  const { result } = renderHook(
    () => ({
      useEstimatePaymentInfo: useEstimatePaymentInfo(),
      useConnect: useConnect(),
    }),
    { config: mockConfig }
  );

  await act(async () => {
    await result.current.useConnect.connectAsync({
      connectorId: connector.id,
    });
  });

  await waitFor(() => {
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
  });

  const mockExtrinsic = {
    paymentInfo: vi.fn().mockResolvedValue({
      partialFee: 1000000000n,
      weight: {
        proofSize: 10779n,
        refTime: 485747000n,
      },
      class: 'Normal',
    }),
  } as any;

  let paymentInfo: any;
  await act(async () => {
    paymentInfo = await result.current.useEstimatePaymentInfo.estimate(mockExtrinsic);
  });

  await waitFor(() => {
    expect(result.current.useEstimatePaymentInfo.isLoading).toBe(false);
  });

  expect(paymentInfo).toBeDefined();
  expect(paymentInfo.partialFee).toBe(1000000000n);
  expect(paymentInfo.weight).toEqual({
    proofSize: 10779n,
    refTime: 485747000n,
  });
  expect(paymentInfo.class).toBe('Normal');

  expect(result.current.useEstimatePaymentInfo.data).toEqual(paymentInfo);
  expect(result.current.useEstimatePaymentInfo.error).toBeNull();
});

test('useEstimatePaymentInfo - should return undefined when no extrinsic or sender', async () => {
  const { result } = renderHook(
    () => ({
      useEstimatePaymentInfo: useEstimatePaymentInfo(),
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

  await waitFor(() => {
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
  });

  let result1: any;
  await act(async () => {
    result1 = await result.current.useEstimatePaymentInfo.estimate(null as any);
  });
  expect(result1).toBeUndefined();

  let result2: any;
  await act(async () => {
    result2 = await result.current.useEstimatePaymentInfo.estimate({} as any, '');
  });
  expect(result2).toBeUndefined();
});

test('useEstimatePaymentInfo - should use custom sender address', async () => {
  const { result } = renderHook(
    () => ({
      useEstimatePaymentInfo: useEstimatePaymentInfo(),
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

  await waitFor(() => {
    expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
  });

  const customSender = '5CustomAddress123456789';
  const mockExtrinsic = {
    paymentInfo: vi.fn().mockResolvedValue({
      partialFee: 2000000000n,
      weight: {
        proofSize: 15000n,
        refTime: 600000000n,
      },
      class: 'Normal',
    }),
  } as any;

  await act(async () => {
    await result.current.useEstimatePaymentInfo.estimate(mockExtrinsic, customSender);
  });

  await waitFor(() => {
    expect(result.current.useEstimatePaymentInfo.isLoading).toBe(false);
  });

  expect(mockExtrinsic.paymentInfo).toHaveBeenCalledWith(customSender);
  expect(result.current.useEstimatePaymentInfo.data).toBeDefined();
});
