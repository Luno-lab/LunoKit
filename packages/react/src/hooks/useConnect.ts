import { useMutation } from '@tanstack/react-query';
import { useLuno } from './useLuno';
import type { Connector } from '@luno-kit/core';
import {ConnectionStatus} from '../types'
import {useCallback} from 'react'

export interface UseConnectResult {
  connect: (connectorId: string, targetChainId?: string) => Promise<void>;
  connectors: Connector[];
  activeConnector?: Connector;
  status: ConnectionStatus;
  error: Error | null;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export const useConnect = (): UseConnectResult => {
  const { connect, config, activeConnector, status } = useLuno();

  const {
    mutateAsync,
    error,
    isPending,
    isError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: async ({ connectorId, targetChainId }: { connectorId: string; targetChainId?: string; }) => {
      await connect(connectorId, targetChainId);
    },
  });

  const connectWrapper = useCallback(
    (connectorId: string, targetChainId?: string) =>
      mutateAsync({ connectorId, targetChainId }),
    [mutateAsync]
  );

  return {
    connect: connectWrapper,
    connectors: config?.connectors ? [...config.connectors] : [],
    activeConnector,
    status,
    error: error as Error | null,
    isPending,
    isError,
    isSuccess,
    reset,
  };
};
