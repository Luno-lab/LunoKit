import { useLuno } from './useLuno';
import { ConnectionStatus } from '../types';
import { useLunoMutation, type LunoMutationOptions } from './useLunoMutation';

export type UseDisconnectOptions = LunoMutationOptions<
  void,
  Error,
  void,
  unknown
>;

export interface UseDisconnectResult {
  disconnect: (options?: UseDisconnectOptions) => void;
  disconnectAsync: (options?: UseDisconnectOptions) => Promise<void>;
  status: ConnectionStatus;
  data: void | undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  reset: () => void;
  variables: void | undefined;
}

export const useDisconnect = (hookLevelConfig?: UseDisconnectOptions): UseDisconnectResult => {
  const { disconnect, status } = useLuno();

  const disconnectFn = async (): Promise<void> => {
    await disconnect();
  };

  const mutationResult = useLunoMutation<
    void,
    Error,
    void,
    unknown
  >(disconnectFn, hookLevelConfig);

  return {
    disconnect: (options?: UseDisconnectOptions) => mutationResult.mutate(undefined, options),
    disconnectAsync: (options?: UseDisconnectOptions) => mutationResult.mutateAsync(undefined, options),
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
