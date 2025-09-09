import { expect, afterEach, describe, it, vi } from 'vitest';
import { mockConfig, MockConnector } from '../test-utils';
import { renderHook } from '../test-utils';
import { act, waitFor } from '@testing-library/react';
import { useConnect } from './useConnect';
import { useSigner } from './useSigner';
import { usePapiSigner } from './usePapiSigner';
import { ConnectionStatus } from '../types';
import { useDisconnect } from './useDisconnect';
import { useAccount } from './useAccount'

const connector = mockConfig.connectors[0] as MockConnector;

describe('usePapiSigner', () => {
  afterEach(async () => {
    if (connector.accounts.length > 0) {
      await connector.disconnect();
    }
    vi.restoreAllMocks();
  });

  it('should handle normal connection flow', async () => {
    const { result } = renderHook(() => ({
      useDisconnect: useDisconnect(),
      useConnect: useConnect(),
      useAccount: useAccount(),
      useSigner: useSigner(),
      usePapiSigner: usePapiSigner(),
    }), {
      config: mockConfig
    });

    expect(result.current.useSigner.data).toBeUndefined();
    expect(result.current.useAccount.address).toBeUndefined();
    expect(result.current.useSigner.data).toBeUndefined();

    await act(async () => {
      await result.current.useConnect.connectAsync({
        connectorId: connector.id
      });
    });

    await waitFor(() => {
      expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
      expect(result.current.useSigner.data).toBeDefined();
      expect(result.current.useAccount.address).toBeDefined();

      expect(result.current.usePapiSigner.data).toBeDefined();
      expect(result.current.usePapiSigner.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.useDisconnect.disconnectAsync();
    });

    expect(result.current.useSigner.data).toBeUndefined();
    expect(result.current.useSigner.isLoading).toBe(false);
  });

  it('should handle createPapiSigner failure', async () => {
    const { result } = renderHook(() => ({
      useConnect: useConnect(),
      useSigner: useSigner(),
      useAccount: useAccount(),
      usePapiSigner: usePapiSigner(),
    }), {
      config: mockConfig
    });

    const coreUtils = await import('@luno-kit/core/utils');

    const mockCreatePapiSigner = vi.spyOn(coreUtils, 'createPapiSigner');
    mockCreatePapiSigner.mockRejectedValueOnce(new Error('Failed to get signer'));

    await act(async () => {
      await result.current.useConnect.connectAsync({
        connectorId: connector.id
      });
    });

    await waitFor(() => {
      expect(result.current.useSigner.data).toBeDefined();
      expect(result.current.useAccount.address).toBeDefined();

      expect(result.current.usePapiSigner.data).toBeUndefined();
      expect(result.current.usePapiSigner.isLoading).toBe(false);
    });

    mockCreatePapiSigner.mockRestore();
  });
});
