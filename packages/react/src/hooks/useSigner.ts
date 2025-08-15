import { useState, useEffect } from 'react';
import { useLuno } from './useLuno';
import { useAccount } from './useAccount';
import { Signer } from '@luno-kit/core'

export interface UseSignerResult {
  data?: Signer;
  isLoading: boolean;
}

export const useSigner = (): UseSignerResult => {
  const { activeConnector } = useLuno();
  const { account } = useAccount();

  const [signer, setSigner] = useState<Signer | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!activeConnector || !account?.address) {
      setSigner(undefined);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    activeConnector.getSigner()
      .then(signer => setSigner(signer as Signer))
      .catch(() => setSigner(undefined))
      .finally(() => setIsLoading(false));

  }, [activeConnector, account?.address]);

  return { data: signer, isLoading };
};
