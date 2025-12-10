import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { LegacyClient } from 'dedot';
import type { Callback, GenericStorageQuery, Unsub } from 'dedot/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLuno } from './useLuno';
import type { Optional } from '../types';

type SubscriptionFn<TArgs extends any[], TData> = (
  ...params: [...TArgs, Callback<TData>]
) => Promise<() => Promise<void>>;

export interface UseSubscriptionOptions<TData, TTransformed = TData> {
  enabled?: Optional<boolean>;
  transform?: Optional<(data: TData) => TTransformed>;
  defaultValue?: Optional<TTransformed>;
}

type ApiBoundSubscriptionFactory<TArgs extends any[], TData> = (
  api: LegacyClient
) => SubscriptionFn<TArgs, TData>;

export interface QueryMultiItem {
  fn: GenericStorageQuery;
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

export const useSubscription = <TArgs extends any[], TData, TTransformed = TData>({
  queryKey: userQueryKey,
  factory,
  params,
  options = {},
}: UseSubscriptionProps<TArgs, TData, TTransformed>): UseSubscriptionResult<TTransformed> => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const { currentApi, isApiReady } = useLuno();
  const queryClient = useQueryClient();
  const {
    enabled = true,
    transform = defaultTransform as (data: TData) => TTransformed,
    defaultValue,
  } = options;
  const unsubscribeRef = useRef<(() => Promise<void>) | null>(null);

  const resolvedParams = useMemo(() => {
    if (!params || !currentApi || !isApiReady) return undefined;
    return typeof params === 'function' ? [params(currentApi)] : params;
  }, [params, currentApi, isApiReady]);

  const queryKey = useMemo(
    () => [userQueryKey, resolvedParams, currentApi?.genesisHash],
    [userQueryKey, resolvedParams, currentApi?.genesisHash]
  );

  useEffect(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (!enabled || !factory || !currentApi || !resolvedParams || !isApiReady) {
      return;
    }

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
          unsubscribeRef.current = unsub;
        })
        .catch((err: Error) => {
          setError(new Error(`[useSubscription]: ${err}`));
        });
    } catch (err) {
      setError(new Error(`[useSubscription]: ${err}`));
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
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
    isLoading: !!(enabled && isApiReady && !data),
  };
};
