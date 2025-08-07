import { useEffect, useMemo, useRef, useState } from 'react';
import { useLuno } from './useLuno';
import type { Callback } from 'dedot/types'
import type { LegacyClient } from 'dedot';
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
  (api: LegacyClient) => SubscriptionFn<TArgs, TData>;

export interface QueryMultiItem {
  fn: any;
  args: any[];
}

export interface UseSubscriptionProps<TArgs extends any[], TData, TTransformed = TData> {
  queryKey: string | number;
  factory: ApiBoundSubscriptionFactory<TArgs, TData> | ((api: LegacyClient) => any);
  params: TArgs | ((api: LegacyClient) => QueryMultiItem[]);
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
  const [error, setError] = useState<Error | undefined>(undefined)
  const { currentApi, isApiReady } = useLuno();
  const queryClient = useQueryClient();
  const {
    enabled = true,
    transform = defaultTransform as (data: TData) => TTransformed,
    defaultValue,
  } = options;
  const isSubscribed = useRef(false)

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
    if (!enabled || !factory || !currentApi || !resolvedParams || !isApiReady || isSubscribed.current) {
      return;
    }
    let unsubscribe: (() => Promise<void>) | null = null;

    isSubscribed.current = true

    try {
      const factoryFn = factory(currentApi);
      const boundFn = typeof factoryFn === 'function' ? factoryFn.bind(currentApi) : factoryFn;

      const callback: Callback<TData> = (result: TData) => {
        try {
          const transformedData = transform(result);
          queryClient.setQueryData(queryKey, transformedData);
          setError(undefined);
        } catch (err) {
          setError(new Error(`[useSubscription]: ${err}`));
        }
      };


      boundFn(...resolvedParams, callback)
        .then((unsub: Unsub) => {
          unsubscribe = unsub;
        })
        .catch((err: Error) => {
          setError(new Error(`[useSubscription]: ${err}`));
        });
    } catch (err) {
      setError(new Error(`[useSubscription]: ${err}`));
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
        isSubscribed.current = false
        setError(undefined);
      }
    };
  }, [JSON.stringify(queryKey), enabled, queryClient]);

  const { data, isLoading } = useQuery({
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
    isLoading: !!(enabled && isApiReady && !data)
  };
};
