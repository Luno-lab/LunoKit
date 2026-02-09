import type { PapiSigner } from '@luno-kit/core/types';
import { Substrate } from '@luno-kit/core/utils';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from './useAccount';
import { useSigner } from './useSigner';

export interface UsePapiSignerResult {
  data: PapiSigner | undefined;
  error: Error | null;
  isPending: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

export function usePapiSigner(): UsePapiSignerResult {
  const { data: signer } = useSigner({ namespace: 'substrate' });
  const { address } = useAccount({ namespace: 'substrate' });

  const queryResult = useQuery({
    queryKey: ['luno', 'papiSigner', address],
    queryFn: async () => {
      return await Substrate.createPapiSigner(address!, signer!);
    },
    enabled: !!signer && !!address,
  });

  return {
    data: queryResult.data,
    error: queryResult.error,
    isPending: queryResult.isPending,
    isLoading: queryResult.isLoading,
    isSuccess: queryResult.isSuccess,
  };
}
