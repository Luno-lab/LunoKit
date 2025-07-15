import { useEffect, useState } from 'react';
import { useLuno } from './useLuno';
import { HexString } from 'dedot/utils'

export interface UseGenesisHashResult {
  data?: HexString;
  isLoading: boolean;
}

export const useGenesisHash = (): UseGenesisHashResult => {
  const { currentApi, isApiReady } = useLuno();
  const [data, setData] = useState<HexString | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentApi && isApiReady) {
      currentApi.chainSpec.genesisHash()
        .then((hash: HexString) => {
          setData(hash);
        })
        .catch((e: Error) => {
          console.error("[useGenesisHash] Error fetching genesisHash:", e);
          setData(undefined);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentApi, isApiReady]);

  return { data, isLoading };
};
