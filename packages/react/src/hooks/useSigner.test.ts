import { act, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { type MockConnector, mockConfig, renderHook } from '../test-utils';
import { ConnectionStatus } from '../types';
import { useConnect } from './useConnect';
import { useDisconnect } from './useDisconnect';
import { useSigner } from './useSigner';

const connector = mockConfig.connectors[0] as MockConnector;

describe('useSigner', () => {
  afterEach(async () => {
    if (connector.accounts.length > 0) {
      await connector.disconnect();
    }
  });

  it('should handle normal connection flow', async () => {
    const { result } = renderHook(
      () => ({
        useDisconnect: useDisconnect(),
        useConnect: useConnect(),
        useSigner: useSigner(),
      }),
      {
        config: mockConfig,
      }
    );

    expect(result.current.useSigner.data).toBeUndefined();
    expect(result.current.useSigner.isLoading).toBe(false);

    await act(async () => {
      await result.current.useConnect.connectAsync({
        connectorId: connector.id,
      });
    });

    await waitFor(() => {
      expect(result.current.useConnect.status).toBe(ConnectionStatus.Connected);
      expect(result.current.useSigner.data).toBeDefined();
      expect(result.current.useSigner.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.useDisconnect.disconnectAsync();
    });

    expect(result.current.useSigner.data).toBeUndefined();
    expect(result.current.useSigner.isLoading).toBe(false);
  });

  it('should handle getSigner failure', async () => {
    const { result } = renderHook(
      () => ({
        useConnect: useConnect(),
        useSigner: useSigner(),
      }),
      {
        config: mockConfig,
      }
    );

    const mockGetSigner = vi.spyOn(connector, 'getSigner');
    mockGetSigner.mockRejectedValueOnce(new Error('Failed to get signer'));

    await act(async () => {
      await result.current.useConnect.connectAsync({
        connectorId: connector.id,
      });
    });

    await waitFor(() => {
      expect(result.current.useSigner.data).toBeUndefined();
      expect(result.current.useSigner.isLoading).toBe(false);
    });

    mockGetSigner.mockRestore();
  });
});
