import { useMemo } from 'react';
import { useLuno } from './useLuno';
import type { BlockHash } from 'dedot/codecs';

export interface UseGenesisHashResult {
  data?: string;
  isLoading: boolean;
}

export const useGenesisHash = (): UseGenesisHashResult => {
  const { currentApi, isApiReady } = useLuno();

  return useMemo(() => {
    if (currentApi && isApiReady) {
      try {
        const hash = currentApi.genesisHash;
        return { data: hash, isLoading: false };
      } catch (e) {
        console.error("[useGenesisHash] Error fetching genesisHash:", e);
        return { data: undefined, isLoading: false };
      }
    }
    return { data: undefined, isLoading: true };
  }, [currentApi, isApiReady]);
};
