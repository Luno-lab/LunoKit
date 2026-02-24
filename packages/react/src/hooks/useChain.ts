import {
  ChainType,
  type AnyChain,
  type SubstrateChain,
  type EvmChain,
  type HexString,
  type Optional,
} from '@luno-kit/core/types';
import { useLunoStore } from '../store';
import { useMemo } from 'react'

export interface UseChainResult<TChain = AnyChain> {
  chain?: Optional<TChain>;
  chainId?: TChain extends SubstrateChain ? HexString : number;
  chainType: ChainType;
}

export function useChain(
  parameters: { namespace: 'substrate' }
): UseChainResult<SubstrateChain>;

export function useChain(
  parameters: { namespace: 'evm' }
): UseChainResult<EvmChain>;

export function useChain<TChain extends AnyChain = AnyChain>(
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
