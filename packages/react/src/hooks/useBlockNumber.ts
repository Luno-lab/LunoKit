import { ChainType, type Optional } from '@luno-kit/core/types';
import type { BlockNumber } from 'dedot/codecs';
import { useBlockNumber as useWagmiBlockNumber } from 'wagmi';
import { useMemo } from 'react';
import { useLunoStore } from '../store';
import { useSubscription } from './useSubscription';

export interface UseBlockNumberResult {
  data?: Optional<bigint>;
  isLoading: boolean;
  error?: Optional<Error>;
  chainType: ChainType;
}

export function useBlockNumber(
  parameters: { namespace: 'substrate' }
): UseBlockNumberResult;

export function useBlockNumber(
  parameters: { namespace: 'evm' }
): UseBlockNumberResult;

export function useBlockNumber(
  parameters?: { namespace?: ChainType }
): UseBlockNumberResult;

export function useBlockNumber(
  parameters: { namespace?: ChainType } = {}
): UseBlockNumberResult {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);
  const substrateApi = useLunoStore((state) => state.substrate.currentApi);
  const isApiReady = useLunoStore((state) => state.substrate.isApiReady);

  const targetNamespace = namespace || activeNamespace;

  const substrateResult = useSubscription<[], BlockNumber, BlockNumber>({
    queryKey: '/block-number',
    factory: (api) => api.query.system.number,
    params: [],
    options: {
      enabled: targetNamespace === ChainType.SUBSTRATE && !!substrateApi && isApiReady,
    },
  });

  const evmResult = useWagmiBlockNumber({
    watch: true,
    query: {
      enabled: targetNamespace === ChainType.EVM,
    },
  });

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return {
          data: substrateResult.data != null ? BigInt(substrateResult.data) : undefined,
          isLoading: substrateResult.isLoading,
          error: substrateResult.error,
          chainType: ChainType.SUBSTRATE,
        };

      case ChainType.EVM:
        return {
          data: evmResult.data,
          isLoading: evmResult.isLoading,
          error: evmResult.error ?? undefined,
          chainType: ChainType.EVM,
        };

      default:
        return {
          data: undefined,
          isLoading: false,
          error: undefined,
          chainType: targetNamespace as ChainType,
        };
    }
  }, [
    targetNamespace,
    substrateResult.data,
    substrateResult.isLoading,
    substrateResult.error,
    evmResult.data,
    evmResult.isLoading,
    evmResult.error,
  ]);
}
