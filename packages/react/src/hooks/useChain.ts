import type { Chain } from '@luno/core';

export interface UseChainResult {
  chain?: Chain;
  chainId?: string;
}

export const useChain = (): UseChainResult => {
  const { currentChain, currentChainId } = useLuno();
  return {
    chain: currentChain,
    chainId: currentChainId,
  };
};
