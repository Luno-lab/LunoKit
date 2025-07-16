import type { Config } from '@luno-kit/core';
import { renderHook as baseRenderHook, RenderHookOptions } from '@testing-library/react';
import type { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { LunoProvider } from '../context'

export interface CustomRenderHookOptions<TProps> extends Omit<RenderHookOptions<TProps>, 'wrapper'> {
  config: Config;
}

export const queryClient = new QueryClient()

export function renderHook<TResult, TProps>(
  useHook: (props: TProps) => TResult,
  options: CustomRenderHookOptions<TProps>,
) {
  const { config, ...restOptions } = options;
  queryClient.clear()

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <LunoProvider config={config}>{children}</LunoProvider>
    </QueryClientProvider>
  );

  const result = baseRenderHook(useHook, {
    wrapper: Wrapper,
    ...restOptions,
  });

  return result;
}
