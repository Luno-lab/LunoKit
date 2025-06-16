import {
  useMutation,
  type UseMutationOptions,
  type MutateOptions as ReactQueryMutateOptions, // Alias to avoid confusion
} from '@tanstack/react-query';

export type LunoMutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = Pick<
  ReactQueryMutateOptions<TData, TError, TVariables, TContext>,
  'onSuccess' | 'onError' | 'onSettled'
>;

export interface LunoMutationResult<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> {

  mutate: (
    variables: TVariables,
    options?: LunoMutationOptions<TData, TError, TVariables, TContext>
  ) => void;


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
}

export function useLunoMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
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
    mutationFn,
    ...tanstackMutationHookOptions,
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
