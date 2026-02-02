import {
  ChainType,
  type AnyChain,
  type SubstrateChain,
  type EvmChain,
} from '@luno-kit/core/types';
import { useMemo } from 'react';
import { useLunoStore } from '../store';
import type { Optional } from '../types';

export interface UseChainsParameters {
  namespace?: Optional<ChainType>;
}

export function useChains(
  parameters: { namespace: 'substrate' }
): SubstrateChain[];

export function useChains(
  parameters: { namespace: 'evm' }
): EvmChain[];

export function useChains<TChain extends AnyChain = AnyChain>(
  parameters?: Optional<UseChainsParameters>
): TChain[];

export function useChains(
  parameters: UseChainsParameters = {}
): AnyChain[] {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);
  const substrateChains = useLunoStore((state) => state.config?.substrate?.chains);
  const evmChains = useLunoStore((state) => state.config?.evm?.chains);

  const targetNamespace = namespace || activeNamespace;

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateChains ? [...substrateChains] : [];

      case ChainType.EVM:
        return evmChains ? [...evmChains] : [];

      default:
        return [];
    }
  }, [targetNamespace, substrateChains, evmChains]);
}
