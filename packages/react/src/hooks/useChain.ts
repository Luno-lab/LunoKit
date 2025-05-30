import type { Chain } from '@luno-kit/core';
import {useLuno} from './useLuno'

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
