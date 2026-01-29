import {
  ChainType,
  type SubstrateChain,
  type EvmChain,
  type HexString,
} from '@luno-kit/core/types';
import { useLunoStore } from '../store';
import type { Optional } from '../types';
import { useMemo } from 'react'

type ChainTypes = SubstrateChain | EvmChain;

export interface UseChainResult<TChain = ChainTypes> {
  chain?: Optional<TChain>;
  chainId?: TChain extends SubstrateChain ? HexString : number;
  chainType: ChainType;
}

export function useChain(
  parameters: { namespace: ChainType.SUBSTRATE }
): UseChainResult<SubstrateChain>;

export function useChain(
  parameters: { namespace: ChainType.EVM }
): UseChainResult<EvmChain>;

export function useChain<TChain extends ChainTypes = ChainTypes>(
  parameters?: Optional<{ namespace?: Optional<ChainType> }>
): UseChainResult<TChain>;

export function useChain(
  parameters: { namespace?: Optional<ChainType> } = {}
): UseChainResult {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateChain = useLunoStore((state) => state.substrate.chain);
  const substrateChainId = useLunoStore((state) => state.substrate.chainId);

  const evmChain = useLunoStore((state) => state.evm.chain);
  const evmChainId = useLunoStore((state) => state.evm.chainId);

  const targetNamespace = namespace || activeNamespace;

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return {
          chain: substrateChain,
          chainId: substrateChainId,
          chainType: ChainType.SUBSTRATE,
        };

      case ChainType.EVM:
        return {
          chain: evmChain,
          chainId: evmChainId,
          chainType: ChainType.EVM,
        };

      default:
        return {
          chain: undefined,
          chainId: undefined,
          chainType: targetNamespace as ChainType,
        };
    }
  }, [targetNamespace, substrateChain, substrateChainId, evmChain, evmChainId]);
}
