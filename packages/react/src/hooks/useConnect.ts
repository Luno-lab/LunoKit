import { useLuno } from './useLuno';
import type { Connector } from '@luno-kit/core';
import { ConnectionStatus } from '../types'
import { useLunoMutation, type LunoMutationOptions } from './useLunoMutation';
import { sleep } from '../utils'

export interface ConnectVariables {
  connectorId: string;
  targetChainId?: string;
}

export type UseConnectOptions = LunoMutationOptions<
  void,
  Error,
  ConnectVariables,
  unknown
>;

export interface UseConnectResult {
  connect: (
    variables: ConnectVariables,
    options?: UseConnectOptions
  ) => void;
  connectAsync: (
    variables: ConnectVariables,
    options?: UseConnectOptions
  ) => Promise<void>;
  connectors: Connector[];
  activeConnector?: Connector;
  status: ConnectionStatus;
  data: void | undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  reset: () => void;
  variables: ConnectVariables | undefined;
}

export const useConnect = (hookLevelConfig?: UseConnectOptions): UseConnectResult => {
  const { connect, config, activeConnector, status } = useLuno();

  const connectFn = async (variables: ConnectVariables): Promise<void> => {
    await connect(variables.connectorId, variables.targetChainId);
    await sleep()
  };

  const mutationResult = useLunoMutation<
    void,
    Error,
    ConnectVariables,
    unknown
  >(connectFn, hookLevelConfig);

  return {
    connect: mutationResult.mutate,
    connectAsync: mutationResult.mutateAsync,
    connectors: config?.connectors ? [...config.connectors] : [],
    activeConnector,
    status,
    data: mutationResult.data,
    error: mutationResult.error,
    isError: mutationResult.isError,
    isIdle: mutationResult.isIdle,
    isPending: mutationResult.isPending,
    isSuccess: mutationResult.isSuccess,
    reset: mutationResult.reset,
    variables: mutationResult.variables,
  };
};
