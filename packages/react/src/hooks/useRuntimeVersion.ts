import { useQuery } from '@tanstack/react-query';
import type { SubstrateRuntimeVersion } from 'dedot';
import { useLunoStore } from '../store';

export interface UseRuntimeVersionResult {
  data: SubstrateRuntimeVersion | undefined;
  error: Error | null;
  isPending: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  refetch: () => void;
}

export const useRuntimeVersion = (): UseRuntimeVersionResult => {
  const currentApi = useLunoStore((state) => state.substrate.currentApi);
  const isApiReady = useLunoStore((state) => state.substrate.isApiReady);
  const currentChainId = useLunoStore((state) => state.substrate.chainId);

  const queryResult = useQuery<
    SubstrateRuntimeVersion,
    Error,
    SubstrateRuntimeVersion,
    readonly (undefined | string)[]
  >({
    queryKey: ['luno', 'runtimeVersion', currentChainId] as const,
    queryFn: async () => {
      return await currentApi!.getRuntimeVersion();
    },
    enabled: !!currentApi && isApiReady && !!currentChainId,
  });

  return {
    data: queryResult.data,
    error: queryResult.error,
    isPending: queryResult.isPending,
    isLoading: queryResult.isLoading,
    isSuccess: queryResult.isSuccess,
    refetch: queryResult.refetch,
  };
};
