import { useEffect, useMemo } from 'react';
import { useLuno } from './useLuno';
import type { Callback } from 'dedot/types'
import type { DedotClient } from 'dedot';
import type { Unsub } from 'dedot/types';
import { useQuery, useQueryClient } from '@tanstack/react-query'

type SubscriptionFn<TArgs extends any[], TData> =
  (...params: [...TArgs, Callback<TData>]) => Promise<() => Promise<void>>;

export interface UseSubscriptionOptions<TData, TTransformed = TData> {
  enabled?: boolean;
  transform?: (data: TData) => TTransformed;
  defaultValue?: TTransformed;
}

type ApiBoundSubscriptionFactory<TArgs extends any[], TData> =
  (api: DedotClient) => SubscriptionFn<TArgs, TData>;

export interface QueryMultiItem {
  fn: any;
  args: any[];
}

export interface UseSubscriptionProps<TArgs extends any[], TData, TTransformed = TData> {
  queryKey: string | number;
  factory: ApiBoundSubscriptionFactory<TArgs, TData> | ((api: DedotClient) => any);
  params?: TArgs | ((api: DedotClient) => QueryMultiItem[]);
  options?: UseSubscriptionOptions<TData, TTransformed>;
}

export interface UseSubscriptionResult<TTransformed> {
  data?: TTransformed;
  error?: Error;
  isLoading: boolean;
}

const defaultTransform = <T>(data: T): T => data;

export const useSubscription = <TArgs extends any[], TData, TTransformed = TData>(
  { queryKey: userQueryKey, factory, params, options = {} }: UseSubscriptionProps<TArgs, TData, TTransformed>
): UseSubscriptionResult<TTransformed> => {
  const { currentApi, isApiReady } = useLuno();
  const queryClient = useQueryClient();
  const {
    enabled = true,
    transform = defaultTransform as (data: TData) => TTransformed,
    defaultValue,
  } = options;

  const resolvedParams = useMemo(() => {
    if (!params || !currentApi || !isApiReady) return undefined;
    return typeof params === 'function' ? [params(currentApi)] : params;
  }, [params, currentApi, isApiReady]);

  const queryKey = useMemo(() => [
    userQueryKey,
    resolvedParams,
    currentApi?.genesisHash
  ], [userQueryKey, resolvedParams, currentApi?.genesisHash]);

  useEffect(() => {
    if (!enabled || !factory || !currentApi || !resolvedParams || !isApiReady) {
      return;
    }

    const factoryFn = factory(currentApi);
    const boundFn = typeof factoryFn === 'function' ? factoryFn.bind(currentApi) : factoryFn;

    const callback: Callback<TData> = (result: TData) => {
      try {
        const transformedData = transform(result);
        queryClient.setQueryData(queryKey, transformedData);
      } catch (err) {
        console.error('Transform error:', err);
      }
    };

    let unsubscribe: (() => Promise<void>) | null = null;

    boundFn(...resolvedParams, callback)
      .then((unsub: Unsub) => {
        unsubscribe = unsub;
      })
      .catch((err: Error) => {
        console.error('[useSubscription] error:', err);
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [queryKey, enabled, transform, queryClient]);

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      return Promise.resolve(defaultValue);
    },
    enabled: false,
    initialData: defaultValue,
  });

  return {
    data: data as TTransformed | undefined,
    error: error as Error | undefined,
    isLoading: enabled && isApiReady && !data
  };
};
