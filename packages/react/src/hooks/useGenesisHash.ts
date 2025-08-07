import { useQuery } from '@tanstack/react-query';
import { useLuno } from './useLuno';
import { HexString } from 'dedot/utils';

export interface UseGenesisHashResult {
  data?: HexString;
  error: Error | null;
  isLoading: boolean;
}

export const useGenesisHash = (): UseGenesisHashResult => {
  const { currentApi, currentChainId, isApiReady } = useLuno();

  const { data, isLoading, error } = useQuery({
    queryKey: ['/genesis-hash', currentChainId],
    queryFn: async () => {
      return await currentApi!.rpc.chain_getBlockHash(0);
    },
    enabled: !!currentApi && isApiReady && !!currentChainId,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });

  return { data, isLoading, error }
};
