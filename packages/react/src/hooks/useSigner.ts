import { useState, useEffect } from 'react';
import { useLuno } from './useLuno';
import { useAccount } from './useAccount';
import type { InjectedSigner } from 'dedot/types';

export interface UseSignerResult {
  signer?: InjectedSigner;
  isLoading: boolean;
}

export const useSigner = (): UseSignerResult => {
  const { activeConnector } = useLuno();
  const { account } = useAccount();

  const [signer, setSigner] = useState<InjectedSigner | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!activeConnector || !account?.address) {
      setSigner(undefined);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    activeConnector.getSigner()
      .then(signer => setSigner(signer as InjectedSigner))
      .catch(() => setSigner(undefined))
      .finally(() => setIsLoading(false));

  }, [activeConnector, account?.address]);

  return { signer, isLoading };
};
