import { act } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { useConnect } from '../hooks';
import { ConnectionStatus } from '../types';
import { MockConnector, mockConfig } from './mocks';
import { renderHook } from './render';

export const setupConnection = () => {
  const { result } = renderHook(() => useConnect(), {
    config: mockConfig,
  });
  return result;
};

export const connectWallet = async (result: any, connectorId: string, targetChainId?: string) => {
  await act(async () => {
    await result.current.connectAsync({
      connectorId,
      ...(targetChainId && { targetChainId }),
    });
  });
};

export const setupErrorConnection = (onError: ReturnType<typeof vi.fn>) => {
  const errorConnector = new MockConnector();
  errorConnector.connect = vi.fn().mockRejectedValue(new Error('Connection failed'));

  const { result, rerender } = renderHook(() => useConnect({ onError }), {
    config: { ...mockConfig, connectors: [errorConnector] },
  });

  return {
    errorConnector,
    result,
    rerender,
  };
};

export const expectConnectedState = (result: any) => {
  expect(result.current.status).toBe(ConnectionStatus.Connected);
  expect(result.current.isSuccess).toBe(true);
  expect(result.current.activeConnector).toBeTruthy();
};

export const expectErrorState = (result: any, onError: ReturnType<typeof vi.fn>) => {
  expect(result.current.error).toBeTruthy();
  expect(result.current.isError).toBe(true);
  expect(onError).toHaveBeenCalled();
  expect(result.current.status).toBe(ConnectionStatus.Disconnected);
};

export const testHookLevelCallback = async (
  hookFn: any,
  mockConnector: MockConnector,
  options = {}
) => {
  const onSuccess = vi.fn();
  const onSettled = vi.fn();
  const { result } = renderHook(() => hookFn({ onSuccess, onSettled, ...options }), {
    config: mockConfig,
  });

  await act(async () => {
    await result.current.connectAsync({
      connectorId: mockConnector.id,
    });
  });

  expect(onSuccess).toHaveBeenCalled();
  expect(onSettled).toHaveBeenCalled();
  return result;
};

export const testCallTimeOptions = async (hookFn: any, mockConnector: MockConnector) => {
  const callTimeOnSuccess = vi.fn();
  const { result } = renderHook(() => hookFn(), { config: mockConfig });

  await act(async () => {
    await result.current.connectAsync(
      { connectorId: mockConnector.id },
      { onSuccess: callTimeOnSuccess }
    );
  });

  expect(callTimeOnSuccess).toHaveBeenCalled();
  return result;
};

export const testResetState = async (hookFn: any, mockConnector: MockConnector) => {
  const { result, rerender } = renderHook(() => hookFn(), {
    config: mockConfig,
  });

  await act(async () => {
    await result.current.connectAsync({
      connectorId: mockConnector.id,
    });
  });

  rerender();
  expect(result.current.isSuccess).toBe(true);

  await act(() => {
    result.current.reset();
  });

  rerender();
  expect(result.current.isIdle).toBe(true);
  expect(result.current.error).toBeNull();

  return result;
};
