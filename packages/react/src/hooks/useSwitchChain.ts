import type { Chain, Optional } from '../types';
import { useLuno } from './useLuno';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';

export interface SwitchChainVariables {
  chainId: string;
}

export type UseSwitchChainOptions = LunoMutationOptions<void, Error, SwitchChainVariables, unknown>;

export interface UseSwitchChainResult {
  switchChain: (variables: SwitchChainVariables, options?: Optional<UseSwitchChainOptions>) => void;
  switchChainAsync: (
    variables: SwitchChainVariables,
    options?: Optional<UseSwitchChainOptions>
  ) => Promise<void>;
  chains: Chain[];
  currentChain?: Chain;
  currentChainId?: string;
  data: undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  reset: () => void;
  variables: SwitchChainVariables | undefined;
}

export const useSwitchChain = (
  hookLevelConfig?: Optional<UseSwitchChainOptions>
): UseSwitchChainResult => {
  const { switchChain: storeSwitchChain, config, currentChain, currentChainId } = useLuno();

  const switchChainFn = async (variables: SwitchChainVariables): Promise<void> => {
    await storeSwitchChain(variables.chainId);
  };

  const mutationResult = useLunoMutation<void, Error, SwitchChainVariables, unknown>(
    switchChainFn,
    hookLevelConfig
  );

  return {
    switchChain: mutationResult.mutate,
    switchChainAsync: mutationResult.mutateAsync,
    chains: config?.chains ? [...config.chains] : [],
    currentChain,
    currentChainId,
    data: mutationResult.data as undefined,
    error: mutationResult.error,
    isError: mutationResult.isError,
    isIdle: mutationResult.isIdle,
    isPending: mutationResult.isPending,
    isSuccess: mutationResult.isSuccess,
    reset: mutationResult.reset,
    variables: mutationResult.variables,
  };
};
