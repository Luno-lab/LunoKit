import { ChainType, type EvmSigner, type SubstrateSigner, type WalletSigner } from '@luno-kit/core/types';
import { useMemo } from 'react';
import { useLunoStore } from '../store';
import { useQuery } from '@tanstack/react-query';

export interface UseSignerResult<TSigner extends WalletSigner = WalletSigner> {
  data: TSigner | undefined;
  error: Error | null;
  isPending: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
  refetch: () => Promise<TSigner>;
}

export function useSigner(
  parameters: { namespace: 'substrate' }
): UseSignerResult<SubstrateSigner>;

export function useSigner(
  parameters: { namespace: 'evm' }
): UseSignerResult<EvmSigner>;

export function useSigner<TSigner extends WalletSigner = WalletSigner>(
  parameters?: { namespace?: ChainType }
): UseSignerResult<TSigner>;

export function useSigner(parameters: { namespace?: ChainType } = {}): UseSignerResult {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);
  const substrateConnector = useLunoStore((state) => state.substrate.connector);
  const evmConnector = useLunoStore((state) => state.evm.connector);

  const targetNamespace = namespace || activeNamespace;

  const connector = useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateConnector;
      case ChainType.EVM:
        return evmConnector;
      default:
        return undefined;
    }
  }, [targetNamespace, substrateConnector, evmConnector]);

  const queryResult = useQuery({
    queryKey: ['signer', targetNamespace, connector?.id],
    queryFn: async (): Promise<WalletSigner | undefined> => {
      return await connector!.getSigner();
    },
    enabled: !!connector,
    retry: false,
  });

  return {
    data: queryResult.data as WalletSigner | undefined,
    error: queryResult.error,
    isPending: queryResult.isPending,
    isLoading: queryResult.isLoading,
    isSuccess: queryResult.isSuccess,
    reset: queryResult.reset,
    refetch: queryResult.refetch,
  }
}
