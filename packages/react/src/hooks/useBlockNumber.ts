import { ChainType, type Optional } from '@luno-kit/core/types';
import {watchBlockNumber as watchEvmBlockNumber } from 'wagmi/actions';
import type { BlockNumber } from 'dedot/codecs';
import { useEffect, useMemo, useState } from 'react';
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
  const wagmiConfig = useLunoStore((state) => state.config?.evm?.wagmiConfig);
  const evmChainId = useLunoStore((state) => state.evm.chainId);

  const targetNamespace = namespace || activeNamespace;

  const substrateResult = useSubscription<[], BlockNumber, BlockNumber>({
    queryKey: '/block-number',
    factory: (api) => api.query.system.number,
    params: [],
    options: {
      enabled: targetNamespace === ChainType.SUBSTRATE && !!substrateApi && isApiReady,
    },
  });

  const [evmBlockNumber, setEvmBlockNumber] = useState<bigint | undefined>();
  const [evmError, setEvmError] = useState<Error | undefined>();
  const [evmLoading, setEvmLoading] = useState(false);

  const shouldWatchEvm = targetNamespace === ChainType.EVM && !!wagmiConfig;

  useEffect(() => {
    if (!shouldWatchEvm) {
      setEvmBlockNumber(undefined);
      setEvmLoading(false);
      setEvmError(undefined);
      return;
    }

    setEvmLoading(true);

    return watchEvmBlockNumber(wagmiConfig!, {
      chainId: evmChainId,
      onBlockNumber: (blockNumber: bigint) => {
        setEvmBlockNumber(blockNumber);
        setEvmLoading(false);
        setEvmError(undefined);
      },
      onError: (error: any) => {
        setEvmError(error);
        setEvmLoading(false);
      },
    });
  }, [shouldWatchEvm, wagmiConfig, evmChainId]);

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
          data: evmBlockNumber,
          isLoading: evmLoading,
          error: evmError,
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
    evmBlockNumber,
    evmLoading,
    evmError,
  ]);
}
