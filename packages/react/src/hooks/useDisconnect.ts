import { useMutation } from '@tanstack/react-query';
import { useLuno } from './useLuno';
import { useCallback } from 'react';
import { ConnectionStatus } from '../types';

export interface UseDisconnectResult {
  disconnect: () => Promise<void>;
  status: ConnectionStatus;
  error: Error | null;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export const useDisconnect = (): UseDisconnectResult => {
  const { disconnect, status } = useLuno();

  const {
    mutateAsync,
    error,
    isPending,
    isError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: async () => {
      await disconnect();
    },
  });

  const disconnectWrapper = useCallback(mutateAsync, [mutateAsync]);

  return {
    disconnect: disconnectWrapper,
    status,
    error: error as Error | null,
    isPending,
    isError,
    isSuccess,
    reset,
  };
};
