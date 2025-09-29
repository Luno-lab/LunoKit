import type { PapiSigner } from '@luno-kit/core/types';
import { createPapiSigner } from '@luno-kit/core/utils';
import { useEffect, useState } from 'react';
import { useAccount } from './useAccount';
import { useSigner } from './useSigner';

export interface UsePapiSignerResult {
  data?: PapiSigner;
  isLoading: boolean;
}

export function usePapiSigner(): UsePapiSignerResult {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [papiSigner, setPapiSigner] = useState<PapiSigner | undefined>(undefined);

  useEffect(() => {
    if (!signer || !address) {
      setPapiSigner(undefined);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    createPapiSigner(address, signer)
      .then((papiSigner: PapiSigner | undefined) => setPapiSigner(papiSigner))
      .catch(() => setPapiSigner(undefined))
      .finally(() => setIsLoading(false));
  }, [signer, address]);

  return { data: papiSigner, isLoading };
}
