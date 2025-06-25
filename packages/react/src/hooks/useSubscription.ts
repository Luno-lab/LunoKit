import { useState, useEffect, useRef, useMemo } from 'react';
import { useLuno } from './useLuno';
import type { Callback } from 'dedot/types'
import type { DedotClient } from 'dedot';

type SubscriptionFn<TArgs extends any[], TData> =
  (...params: [...TArgs, Callback<TData>]) => Promise<() => Promise<void>>;

export interface UseSubscriptionOptions<TData, TTransformed = TData> {
  enabled?: boolean;
  transform?: (data: TData) => TTransformed;
  defaultValue?: TTransformed;
}

type ApiBoundSubscriptionFactory<TArgs extends any[], TData> =
  (api: DedotClient) => SubscriptionFn<TArgs, TData>;

export interface UseSubscriptionProps<TArgs extends any[], TData, TTransformed = TData> {
  factory: ApiBoundSubscriptionFactory<TArgs, TData>;
  params?: TArgs | ((api: DedotClient) => TArgs);
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
    transform = defaultTransform as (data: TData) => TTransformed,
    defaultValue,
  } = options;

  const [data, setData] = useState<TTransformed | undefined>(defaultValue);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const unsubscribeRef = useRef<(() => Promise<void>) | null>(null);
  const transformRef = useRef(transform);
  useEffect(() => { transformRef.current = transform; }, [transform]);

  const resolvedParams = useMemo(() => {
    if (!params || !currentApi || !isApiReady) return undefined;
    return typeof params === 'function' ? params(currentApi) : params;
  }, [params, currentApi, isApiReady]);

  const stableParamsKey = useMemo(() =>
      resolvedParams ? JSON.stringify(resolvedParams) : '[]',
    [resolvedParams]
  );

  const factoryFn = useMemo(() => {
    if (!factory || !currentApi || !isApiReady) return
    return factory(currentApi)
  }, [factory, currentApi, isApiReady])

  useEffect(() => {
    const cleanup = async () => {
      if (unsubscribeRef.current) {
        await unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    const canSubscribe = enabled && factoryFn && resolvedParams !== undefined;

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
    const performUnsub = async () => {
      if (!unsubCalled) {
        await cleanup();
        unsubCalled = true;
      }
    };

    const callback: Callback<TData> = (result: TData) => {
      try {
        if (!unsubscribeRef.current && !unsubCalled) {
          return;
        }
        const transformedData = transformRef.current(result);
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

        const unsubscribe = await factoryFn(...resolvedParams!, callback);

        if (!unsubCalled) {
          unsubscribeRef.current = unsubscribe;
        } else {
          await unsubscribe();
        }
      } catch (subError) {
        console.error("[useSubscription] Error setting up subscription:", subError);
        setError(subError instanceof Error ? subError : new Error('Subscription setup failed'));
        setIsLoading(false);
        await performUnsub();
      }
    })();

    return () => {
      performUnsub();
    };

  }, [factoryFn, stableParamsKey, enabled, defaultValue]);

  return { data, error, isLoading };
};
