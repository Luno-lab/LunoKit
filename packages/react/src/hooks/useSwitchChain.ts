import { useMutation } from '@tanstack/react-query';
import { useLuno } from './useLuno';
import { useCallback } from 'react';
import type { Chain } from '@luno-kit/core';

export interface UseSwitchChainResult {
  switchChain: (chainId: string) => Promise<void>;
  chains: Chain[];
  currentChain?: Chain;
  currentChainId?: string;
  error: Error | null;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export const useSwitchChain = (): UseSwitchChainResult => {
  const { switchChain: storeSwitchChain, config, currentChain, currentChainId } = useLuno();

  const {
    mutateAsync,
    error,
    isPending,
    isError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: async (chainId: string) => {
      await storeSwitchChain(chainId);
      // window.location.reload();
    },
  });

  const switchChain = useCallback(mutateAsync, [mutateAsync]);

  return {
    switchChain,
    chains: config?.chains ? [...config.chains] : [],
    currentChain,
    currentChainId,
    error: error as Error | null,
    isPending,
    isError,
    isSuccess,
    reset,
  };
};
