import { useState, useEffect, useRef, useMemo } from 'react';
import { useLuno } from './useLuno';
import type { ApiPromise } from '@polkadot/api';
import type { UnsubscribePromise } from '@polkadot/api/types';
import type { Callback } from '@polkadot/types/types'
// import type { Callback, UnsubscribePromise } from '@polkadot/api/types'; // Callback 和 UnsubscribePromise 很关键

// 定义一个通用的 Polkadot API 订阅函数类型
// 它接受参数 TArgs 和一个回调函数 Callback<TData>
// 返回一个 Promise，该 Promise 解析为取消订阅函数 () => void
type SubscriptionFn<TArgs extends any[], TData> =
  (...params: [...TArgs, Callback<TData>]) => UnsubscribePromise;

export interface UseSubscriptionOptions<TData, TTransformed = TData> {
  enabled?: boolean; // 是否启用订阅 (默认为 true)
  transform?: (data: TData, api: ApiPromise) => TTransformed; // 数据转换函数
  defaultValue?: TTransformed; // 默认值
  // onError?: (error: Error) => void; // 可以考虑加错误回调，但 hook 返回 error 通常足够
}

export interface UseSubscriptionProps<TArgs extends any[], TData, TTransformed = TData> {
  /** Polkadot API 的订阅函数引用，例如 api.query.system.account */
  factory?: SubscriptionFn<TArgs, TData>;
  /** API 函数所需的参数数组 (不包括回调) */
  params?: TArgs;
  /** Hook 的选项 */
  options?: UseSubscriptionOptions<TData, TTransformed>;
}

export interface UseSubscriptionResult<TTransformed> {
  data?: TTransformed; // 最新数据 (已转换)
  error?: Error;       // 错误状态
  isLoading: boolean; // 是否正在加载初始数据
}

const defaultTransform = <T>(data: T): T => data;

export const useSubscription = <TArgs extends any[], TData, TTransformed = TData>(
  { factory, params, options = {} }: UseSubscriptionProps<TArgs, TData, TTransformed>
): UseSubscriptionResult<TTransformed> => {
  const { currentApi, isApiReady } = useLuno();
  const {
    enabled = true,
    transform = defaultTransform as (data: TData, api: ApiPromise) => TTransformed, // 类型断言
    defaultValue,
  } = options;

  const [data, setData] = useState<TTransformed | undefined>(defaultValue);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(enabled); // 初始 loading 状态取决于 enabled
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const transformRef = useRef(transform); // 确保 transform 函数引用稳定
  useEffect(() => { transformRef.current = transform; }, [transform]);

  // 使用 JSON.stringify 稳定 params 依赖，类似 useCall
  const stableParamsKey = useMemo(() => params ? JSON.stringify(params) : '[]', [params]);

  useEffect(() => {
    const cleanup = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    // 检查条件
    const canSubscribe = enabled && !!currentApi && isApiReady && !!factory && params !== undefined;

    if (!canSubscribe) {
      cleanup();
      // 如果未启用，根据是否有默认值判断 loading
      setIsLoading(enabled && defaultValue === undefined);
      // 重置状态 (保留 defaultValue)
      setData(defaultValue);
      setError(undefined);
      return;
    }

    // 条件满足，准备订阅
    cleanup(); // 清理旧订阅
    setIsLoading(true); // 开始加载
    setError(undefined);
    setData(defaultValue); // 重置为默认值

    let unsubCalled = false;
    const performUnsub = () => {
      if (!unsubCalled) {
        cleanup();
        unsubCalled = true;
      }
    };

    // 定义回调函数
    const callback: Callback<TData> = (result) => {
      try {
        // 检查是否还需要处理（防止异步回调时组件已卸载或重新订阅）
        if (!unsubscribeRef.current && !unsubCalled) { // 检查是否还处于活跃订阅状态
          // 如果已经取消订阅了（unsubscribeRef为空），就不处理新数据
          // console.warn('[useSubscription] Received data after unsubscribe.');
          return;
        }
        const transformedData = transformRef.current(result, currentApi);
        setData(transformedData);
        setError(undefined);
        setIsLoading(false);
      } catch (transformError) {
        console.error("[useSubscription] Error during data transformation:", transformError);
        setError(transformError instanceof Error ? transformError : new Error('Data transformation failed'));
        setIsLoading(false); // 转换出错，也停止 loading
      }
    };

    // 执行订阅
    (async () => {
      try {
        if (!factory) {
          console.error("Factory became undefined unexpectedly");
          return;
        }

        const unsubscribe = await factory(...params!, callback);

        if (!unsubCalled) { // 检查在 await 期间是否被清理
          unsubscribeRef.current = unsubscribe;
        } else {
          unsubscribe();
        }
      } catch (subError) {
        console.error("[useSubscription] Error setting up subscription:", subError);
        setError(subError instanceof Error ? subError : new Error('Subscription setup failed'));
        setIsLoading(false);
        performUnsub(); // 确保清理
      }
    })();

    return performUnsub; // 返回清理函数

    // 依赖项：API 状态、factory 引用、序列化的 params、enabled 状态
  }, [currentApi, isApiReady, factory, stableParamsKey, enabled, defaultValue]); // 加入 defaultValue

  return { data, error, isLoading };
};
