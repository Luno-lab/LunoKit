import {useLuno} from './useLuno';
import type {RuntimeVersion} from '@polkadot/types/interfaces';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {HexString} from '@polkadot/util/types'
import {useMemo} from 'react'

export type UseRuntimeVersionResult = UseQueryResult<RuntimeVersion, Error>;

export const useRuntimeVersion = (): UseRuntimeVersionResult => {
  const { currentApi, isApiReady, currentChain } = useLuno();

  const genesisHashForQueryKey = useMemo(() => {
    if (currentApi && isApiReady) {
      try {
        return currentApi.genesisHash.toHex();
      } catch (e) {
        console.error("Error accessing genesisHash even when isApiReady is true:", e);
        return undefined;
      }
    }
    return undefined;
  }, [currentApi, isApiReady]);

  return useQuery<RuntimeVersion, Error, RuntimeVersion, readonly (undefined | string)[]>({
    queryKey: ['luno', 'runtimeVersion', genesisHashForQueryKey] as const,
    queryFn: async () => {
      if (!currentApi || !isApiReady) {
        throw new Error('API not ready for fetching runtime version.');
      }
      return await currentApi.rpc.state.getRuntimeVersion();
    },
    enabled: !!currentApi && isApiReady && !!genesisHashForQueryKey,
  });
};
