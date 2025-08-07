import { useLuno } from './useLuno';
import type { SubstrateRuntimeVersion } from 'dedot';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export type UseRuntimeVersionResult = UseQueryResult<SubstrateRuntimeVersion, Error>;

export const useRuntimeVersion = (): UseRuntimeVersionResult => {
  const { currentApi, isApiReady, currentChainId } = useLuno();

  return useQuery<SubstrateRuntimeVersion, Error, SubstrateRuntimeVersion, readonly (undefined | string)[]>({
    queryKey: ['luno', 'runtimeVersion', currentChainId] as const,
    queryFn: async () => {
      return await currentApi!.getRuntimeVersion()
    },
    enabled: !!currentApi && isApiReady && !!currentChainId,
  });
};
