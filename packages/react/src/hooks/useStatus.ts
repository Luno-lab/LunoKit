import { ChainType } from '@luno-kit/core/types';
import { useMemo } from 'react';
import { useLunoStore } from '../store';
import { ConnectionStatus, type Optional } from '../types';

export interface UseStatusParameters {
  namespace?: Optional<ChainType>;
}

export const useStatus = (parameters: UseStatusParameters = {}): ConnectionStatus => {
  const { namespace } = parameters;

  const globalStatus = useLunoStore((state) => state.status);
  const substrateStatus = useLunoStore((state) => state.substrate.status);
  const evmStatus = useLunoStore((state) => state.evm.status);

  return useMemo(() => {
    if (!namespace) {
      return globalStatus;
    }

    switch (namespace) {
      case ChainType.SUBSTRATE:
        return substrateStatus;
      case ChainType.EVM:
        return evmStatus;
      default:
        return ConnectionStatus.Disconnected;
    }
  }, [namespace, globalStatus, substrateStatus, evmStatus]);
};
