import { useLuno } from './useLuno';
import type { SubstrateRuntimeVersion } from 'dedot';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react'

export type UseRuntimeVersionResult = UseQueryResult<SubstrateRuntimeVersion, Error>;

export const useRuntimeVersion = (): UseRuntimeVersionResult => {
  const { currentApi, isApiReady, currentChain } = useLuno();

  const genesisHashForQueryKey = useMemo(() => {
    if (currentApi && isApiReady) {
      try {
        return currentApi.genesisHash;
      } catch (e) {
        console.error("Error accessing genesisHash even when isApiReady is true:", e);
        return undefined;
      }
    }
    return undefined;
  }, [currentApi, isApiReady]);

  return useQuery<SubstrateRuntimeVersion, Error, SubstrateRuntimeVersion, readonly (undefined | string)[]>({
    queryKey: ['luno', 'runtimeVersion', genesisHashForQueryKey] as const,
    queryFn: async () => {
      if (!currentApi || !isApiReady) {
        throw new Error('API not ready for fetching runtime version.');
      }
      return await currentApi.getRuntimeVersion()
    },
    enabled: !!currentApi && isApiReady && !!genesisHashForQueryKey,
  });
};
