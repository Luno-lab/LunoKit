// packages/react/src/hooks/useRuntimeVersion.ts
import {useLuno} from './useLuno';
import type {RuntimeVersion} from '@polkadot/types/interfaces';
import {useQuery, UseQueryResult} from '@tanstack/react-query'; // 导入 useQuery

// UseQueryResult 已经包含了 data, isLoading, error 等
export type UseRuntimeVersionResult = UseQueryResult<RuntimeVersion, Error>;

export const useRuntimeVersion = (): UseRuntimeVersionResult => {
  const { currentApi, isApiReady } = useLuno();

  return useQuery<RuntimeVersion, Error, RuntimeVersion, readonly (string | boolean)[]>({
    // queryKey 需要包含所有影响查询的依赖项
    queryKey: ['luno', 'runtimeVersion', currentApi?.genesisHash.toHex(), isApiReady] as const,
    queryFn: async () => {
      if (!currentApi || !isApiReady) {
        // useQuery 的 enabled 选项会处理这个，但作为防御性编程可以保留
        throw new Error('API not ready for fetching runtime version.');
      }
      return await currentApi.rpc.state.getRuntimeVersion();
    },
    enabled: !!currentApi && isApiReady,
  });
};
