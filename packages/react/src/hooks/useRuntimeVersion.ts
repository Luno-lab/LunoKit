import {useLuno} from './useLuno';
import type {RuntimeVersion} from '@polkadot/types/interfaces';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {HexString} from '@polkadot/util/types'

export type UseRuntimeVersionResult = UseQueryResult<RuntimeVersion, Error>;

export const useRuntimeVersion = (): UseRuntimeVersionResult => {
  const { currentApi, isApiReady } = useLuno();

  return useQuery<RuntimeVersion, Error, RuntimeVersion, readonly (string | undefined | HexString | boolean)[]>({
    queryKey: ['luno', 'runtimeVersion', currentApi?.genesisHash.toHex(), isApiReady] as const,
    queryFn: async () => {
      if (!currentApi || !isApiReady) {
        throw new Error('API not ready for fetching runtime version.');
      }
      return await currentApi.rpc.state.getRuntimeVersion();
    },
    enabled: !!currentApi && isApiReady,
  });
};
