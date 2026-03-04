import { ChainType, type Optional } from '@luno-kit/core/types';
import { getPublicClient as getEvmPublicClient } from 'wagmi/actions';
import type { LegacyClient } from 'dedot';
import type { PublicClient } from 'viem';
import { useMemo } from 'react';
import { useLunoStore } from '../store';

export type SubstrateClient = LegacyClient;
export type EvmClient = PublicClient;

export interface UseClientResult<TClient = LegacyClient | EvmClient> {
  client?: Optional<TClient>;
  isReady: boolean;
  error: Error | null;
  chainType: ChainType;
}

export function useClient(
  parameters: { namespace: 'substrate' }
): UseClientResult<SubstrateClient>;

export function useClient(
  parameters: { namespace: 'evm' }
): UseClientResult<EvmClient>;

export function useClient(
  parameters?: { namespace?: ChainType }
): UseClientResult;

export function useClient(
  parameters: { namespace?: ChainType } = {}
): UseClientResult {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateApi = useLunoStore((state) => state.substrate.currentApi);
  const isApiReady = useLunoStore((state) => state.substrate.isApiReady);
  const apiError = useLunoStore((state) => state.substrate.apiError);

  const evmChainId = useLunoStore((state) => state.evm.chainId);
  const wagmiConfig = useLunoStore((state) => state.config?.evm?.wagmiConfig);

  const evmClient: EvmClient | undefined = useMemo(() => {
    if (!wagmiConfig || !evmChainId) return undefined;
    try {
      return getEvmPublicClient(wagmiConfig, { chainId: evmChainId });
    } catch {
      return undefined;
    }
  }, [wagmiConfig, evmChainId]);

  const targetNamespace = namespace || activeNamespace;

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return {
          client: substrateApi,
          isReady: isApiReady,
          error: apiError,
          chainType: ChainType.SUBSTRATE,
        };

      case ChainType.EVM:
        return {
          client: evmClient,
          isReady: !!evmClient,
          error: null,
          chainType: ChainType.EVM,
        };

      default:
        return {
          client: undefined,
          isReady: false,
          error: null,
          chainType: targetNamespace as ChainType,
        };
    }
  }, [targetNamespace, substrateApi, isApiReady, apiError, evmClient]);
}
