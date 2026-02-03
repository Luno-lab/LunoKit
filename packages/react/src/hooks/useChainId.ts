import {
  ChainType,
  type HexString,
} from '@luno-kit/core/types';
import { useLunoStore } from '../store';
import type { Optional } from '../types';
import { useMemo } from 'react';

export type AnyChainId = HexString | number;

export interface UseChainIdResult<TChainId extends AnyChainId = AnyChainId> {
  chainId?: Optional<TChainId>;
  chainType: ChainType;
}

export function useChainId(
  parameters: { namespace: 'substrate' }
): UseChainIdResult<HexString>;

export function useChainId(
  parameters: { namespace: 'evm' }
): UseChainIdResult<number>;

export function useChainId<TChainId extends AnyChainId = AnyChainId>(
  parameters?: { namespace?: ChainType }
): UseChainIdResult<TChainId>;

export function useChainId(
  parameters: { namespace?: ChainType } = {}
): UseChainIdResult {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateChainId = useLunoStore((state) => state.substrate.chainId);
  const evmChainId = useLunoStore((state) => state.evm.chainId);

  const targetNamespace: ChainType.Value = namespace || activeNamespace;

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return {
          chainId: substrateChainId,
          chainType: ChainType.SUBSTRATE,
        };

      case ChainType.EVM:
        return {
          chainId: evmChainId,
          chainType: ChainType.EVM,
        };

      default:
        return {
          chainId: undefined,
          chainType: targetNamespace,
        };
    }
  }, [targetNamespace, substrateChainId, evmChainId]);
}
