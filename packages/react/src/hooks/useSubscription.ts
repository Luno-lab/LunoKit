import { useState, useEffect, useRef, useMemo } from 'react';
import { useLuno } from './useLuno';
import type { ApiPromise } from '@polkadot/api';
import type { Callback } from '@polkadot/types/types'

type SubscriptionFn<TArgs extends any[], TData> =
  (...params: [...TArgs, Callback<TData>]) => Promise<() => void>;

export interface UseSubscriptionOptions<TData, TTransformed = TData> {
  enabled?: boolean;
  transform?: (data: TData, api: ApiPromise) => TTransformed;
  defaultValue?: TTransformed;
}

type ApiBoundSubscriptionFactory<TArgs extends any[], TData> =
  (api: ApiPromise) => SubscriptionFn<TArgs, TData>;

export interface UseSubscriptionProps<TArgs extends any[], TData, TTransformed = TData> {
  factory: ApiBoundSubscriptionFactory<TArgs, TData>;
  params?: TArgs;
  options?: UseSubscriptionOptions<TData, TTransformed>;
}

export interface UseSubscriptionResult<TTransformed> {
  data?: TTransformed;
  error?: Error;
  isLoading: boolean;
}

const defaultTransform = <T>(data: T): T => data;

export const useSubscription = <TArgs extends any[], TData, TTransformed = TData>(
  { factory, params, options = {} }: UseSubscriptionProps<TArgs, TData, TTransformed>
): UseSubscriptionResult<TTransformed> => {
  const { currentApi, isApiReady } = useLuno();
  const {
    enabled = true,
    transform = defaultTransform as (data: TData, api: ApiPromise) => TTransformed,
    defaultValue,
  } = options;

  const [data, setData] = useState<TTransformed | undefined>(defaultValue);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const transformRef = useRef(transform);
  useEffect(() => { transformRef.current = transform; }, [transform]);

  const stableParamsKey = useMemo(() => params ? JSON.stringify(params) : '[]', [params]);

  const factoryFn = useMemo(() => {
    if (!factory || !currentApi || !isApiReady) return
    return factory(currentApi)
  }, [factory, currentApi, isApiReady])

  useEffect(() => {
    const cleanup = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    const canSubscribe = enabled && factoryFn && params !== undefined;

    if (!canSubscribe) {
      cleanup();
      setIsLoading(enabled && defaultValue === undefined);
      setData(defaultValue);
      setError(undefined);
      return;
    }

    cleanup();
    setIsLoading(true);
    setError(undefined);
    setData(defaultValue);

    let unsubCalled = false;
    const performUnsub = () => {
      if (!unsubCalled) {
        cleanup();
        unsubCalled = true;
      }
    };

    const callback: Callback<TData> = (result) => {
      try {
        if (!unsubscribeRef.current && !unsubCalled) {
          return;
        }
        const transformedData = transformRef.current(result, currentApi!);
        setData(transformedData);
        setError(undefined);
        setIsLoading(false);
      } catch (transformError) {
        console.error("[useSubscription] Error during data transformation:", transformError);
        setError(transformError instanceof Error ? transformError : new Error('Data transformation failed'));
        setIsLoading(false);
      }
    };

    (async () => {
      try {
        if (!factoryFn) {
          console.error("Factory became undefined unexpectedly");
          return;
        }

        const unsubscribe = await factoryFn(...params!, callback);

        if (!unsubCalled) {
          unsubscribeRef.current = unsubscribe;
        } else {
          unsubscribe();
        }
      } catch (subError) {
        console.error("[useSubscription] Error setting up subscription:", subError);
        setError(subError instanceof Error ? subError : new Error('Subscription setup failed'));
        setIsLoading(false);
        performUnsub();
      }
    })();

    return performUnsub;

  }, [factoryFn, stableParamsKey, enabled, defaultValue]);

  return { data, error, isLoading };
};
