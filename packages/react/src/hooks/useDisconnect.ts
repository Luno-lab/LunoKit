import { ChainType } from '@luno-kit/core/types';
import { PERSIST_KEY } from '../constants';
import { useLunoStore } from '../store';
import { ConnectionStatus, type Optional } from '../types';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';
import { useMemo } from 'react';

export type UseDisconnectOptions = LunoMutationOptions<void, Error, void, unknown>;

export interface UseDisconnectResult {
  disconnect: (options?: Optional<UseDisconnectOptions>) => void;
  disconnectAsync: (options?: Optional<UseDisconnectOptions>) => Promise<void>;
  status: ConnectionStatus;
  data: undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export const useDisconnect = (
  parameters: { namespace?: Optional<ChainType> } = {},
  hookLevelConfig?: Optional<UseDisconnectOptions>
): UseDisconnectResult => {
  const { namespace } = parameters;

  const config = useLunoStore((state) => state.config);
  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateConnector = useLunoStore((state) => state.substrate.connector);
  const substrateStatus = useLunoStore((state) => state.substrate.status);
  const setSubstrateState = useLunoStore((state) => state.setSubstrateState);

  const evmConnector = useLunoStore((state) => state.evm.connector);
  const evmStatus = useLunoStore((state) => state.evm.status);

  const targetNamespace = namespace || activeNamespace;

  const disconnectFn = async (): Promise<void> => {
    if (targetNamespace === ChainType.SUBSTRATE) {
      if (!substrateConnector || substrateStatus === ConnectionStatus.Disconnected) {
        return;
      }

      setSubstrateState({ status: ConnectionStatus.Disconnecting });

      try {
        await substrateConnector.disconnect();

        if (config?.storage) {
          try {
            await config.storage.removeItem(PERSIST_KEY.LAST_CONNECTOR_ID);
            await config.storage.removeItem(PERSIST_KEY.LAST_CHAIN_ID);
            await config.storage.removeItem(PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO);
          } catch (e) {
            console.error(
              '[LunoStore] Failed to remove connection info from storage during disconnect action:',
              e
            );
          }
        }

        setSubstrateState({
          status: ConnectionStatus.Disconnected,
          connector: undefined,
          allAccounts: [],
          account: undefined,
        });

      } catch (err: any) {
        setSubstrateState({ status: ConnectionStatus.Connected });
        throw new Error(
          `[LunoStore] Error disconnecting from ${substrateConnector.name}: ${err?.message || err}`
        );
      }
    } else if (targetNamespace === ChainType.EVM) {
      if (!evmConnector || evmStatus === ConnectionStatus.Disconnected) {
        return;
      }

      try {
        await evmConnector.disconnect();
      } catch (err: any) {
        console.error('[LunoKit] EVM Disconnect Error:', err);
        throw err;
      }
    }
  };

  const mutationResult = useLunoMutation<void, Error, void, unknown>(
    disconnectFn,
    hookLevelConfig
  );

  const status = useMemo(() => {
    if (targetNamespace === ChainType.SUBSTRATE) return substrateStatus;
    if (targetNamespace === ChainType.EVM) return evmStatus;
    return ConnectionStatus.Disconnected;
  }, [targetNamespace]);

  return {
    disconnect: (options?: UseDisconnectOptions) => mutationResult.mutate(undefined, options),
    disconnectAsync: (options?: UseDisconnectOptions) => mutationResult.mutateAsync(undefined, options),
    status,
    data: mutationResult.data as undefined,
    error: mutationResult.error,
    isError: mutationResult.isError,
    isIdle: mutationResult.isIdle,
    isPending: mutationResult.isPending,
    isSuccess: mutationResult.isSuccess,
    reset: mutationResult.reset,
  };
};
