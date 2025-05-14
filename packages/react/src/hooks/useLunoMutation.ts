import {
  useMutation,
  type UseMutationOptions,
  type MutateOptions as ReactQueryMutateOptions, // Alias to avoid confusion
  type UseMutationResult,
} from '@tanstack/react-query';

/**
 * @typeParam TData - 类型：mutationFn 成功时返回的数据。
 * @typeParam TError - 类型：mutationFn 失败时返回的错误。默认为 Error。
 * @typeParam TVariables - 类型：传递给 mutationFn 的变量。
 * @typeParam TContext - 类型：由 onMutate 返回并传递给 onError 和 onSettled 的上下文。默认为 unknown。
 */

/**
 * useLunoMutation Hook 及其调用时可配置的回调函数类型。
 * 这是用户在调用 useLunoMutation 或其返回的 mutate/mutateAsync 函数时可以提供的选项。
 */
export type LunoMutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = Pick<
  ReactQueryMutateOptions<TData, TError, TVariables, TContext>,
  'onSuccess' | 'onError' | 'onSettled'
>;

/**
 * useLunoMutation Hook 返回的对象类型。
 * 它镜像了 useMutation 的大部分返回字段，但可能对 mutate/mutateAsync 的类型签名进行适配。
 */
export interface LunoMutationResult<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> {
  /**
   * 触发 mutation 的函数。
   * @param variables - 传递给 mutationFn 的变量。
   * @param options - 可选的调用时回调，可覆盖 Hook 级别的回调。
   */
  mutate: (
    variables: TVariables,
    options?: LunoMutationOptions<TData, TError, TVariables, TContext>
  ) => void;

  /**
   * 触发 mutation 并返回 Promise 的函数。
   * @param variables - 传递给 mutationFn 的变量。
   * @param options - 可选的调用时回调，可覆盖 Hook 级别的回调。
   * @returns Promise，在成功时解析为 TData，失败时拒绝 TError。
   */
  mutateAsync: (
    variables: TVariables,
    options?: LunoMutationOptions<TData, TError, TVariables, TContext>
  ) => Promise<TData>;

  data: TData | undefined;
  error: TError | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  status: 'idle' | 'pending' | 'error' | 'success';
  reset: () => void;
  variables: TVariables | undefined;
  // 如果需要，可以从 UseMutationResult 中 Pick 更多字段，如 failureCount, context 等
}

/**
 * 通用的 Luno Mutation Hook。
 * 封装了 @tanstack/react-query 的 useMutation，用于处理异步的“写”操作。
 *
 * @param mutationFn - (variables: TVariables) => Promise<TData>
 *   一个返回 Promise 的函数，执行实际的异步操作。
 * @param hookLevelOptions - 可选的 Hook 级别回调 (onSuccess, onError, onSettled)。
 *   这些回调将在每次 mutation 时被触发，除非在调用 mutate/mutateAsync 时被覆盖。
 * @returns LunoMutationResult<TData, TError, TVariables, TContext>
 *   包含 mutation 状态和触发函数。
 */
export function useLunoMutation<
  TData = unknown,
  TError = Error,
  TVariables = void, // 默认为 void，如果 mutationFn 不需要参数
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  hookLevelOptions?: LunoMutationOptions<TData, TError, TVariables, TContext>
): LunoMutationResult<TData, TError, TVariables, TContext> {

  const tanstackMutationHookOptions: Pick<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'onSuccess' | 'onError' | 'onSettled'
  > = {};

  if (hookLevelOptions?.onSuccess) {
    tanstackMutationHookOptions.onSuccess = hookLevelOptions.onSuccess;
  }
  if (hookLevelOptions?.onError) {
    tanstackMutationHookOptions.onError = hookLevelOptions.onError;
  }
  if (hookLevelOptions?.onSettled) {
    tanstackMutationHookOptions.onSettled = hookLevelOptions.onSettled;
  }

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    mutationFn, // 核心的异步函数
    ...tanstackMutationHookOptions, // 应用 Hook 级别的回调
  });

  return {
    mutate: (
      variables: TVariables,
      callTimeOptions?: LunoMutationOptions<TData, TError, TVariables, TContext>
    ) => {
      mutation.mutate(variables, callTimeOptions as ReactQueryMutateOptions<TData, TError, TVariables, TContext>);
    },
    mutateAsync: (
      variables: TVariables,
      callTimeOptions?: LunoMutationOptions<TData, TError, TVariables, TContext>
    ) => {
      return mutation.mutateAsync(variables, callTimeOptions as ReactQueryMutateOptions<TData, TError, TVariables, TContext>);
    },
    data: mutation.data,
    error: mutation.error,
    isError: mutation.isError,
    isIdle: mutation.isIdle,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
    status: mutation.status,
    variables: mutation.variables,
  };
}
