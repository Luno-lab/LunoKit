import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLunoMutation } from './useLunoMutation';

describe('useLunoMutation', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient.clear();
  });

  it('should return correct mutation interface', () => {
    const mockMutationFn = vi.fn();

    const { result } = renderHook(() => useLunoMutation(mockMutationFn), { wrapper });

    expect(result.current).toEqual(
      expect.objectContaining({
        mutate: expect.any(Function),
        mutateAsync: expect.any(Function),
        data: undefined,
        error: null,
        isError: expect.any(Boolean),
        isIdle: expect.any(Boolean),
        isPending: expect.any(Boolean),
        isSuccess: expect.any(Boolean),
        status: expect.any(String),
        reset: expect.any(Function),
        variables: undefined,
      })
    );
  });

  it('should pass mutation options correctly', () => {
    const mockMutationFn = vi.fn();
    const mockOptions = {
      onSuccess: vi.fn(),
      onError: vi.fn(),
      onSettled: vi.fn(),
    };

    const { result } = renderHook(() => useLunoMutation(mockMutationFn, mockOptions), { wrapper });

    expect(result.current.mutate).toBeDefined();
    expect(result.current.mutateAsync).toBeDefined();
  });
});
