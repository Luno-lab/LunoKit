import { ChainType, type EvmSigner, type SubstrateSigner } from '@luno-kit/core/types';
import { useEffect, useMemo, useState } from 'react';
import { useLunoStore } from '../store';
import type { Optional } from '../types';
import type { WalletSigner } from '@luno-kit/core/types';

export interface UseSignerParameters {
  namespace?: Optional<ChainType>;
}

export interface UseSignerResult<TSigner = WalletSigner> {
  data?: TSigner;
  isLoading: boolean;
}

export function useSigner(
  parameters: { namespace: 'substrate' }
): UseSignerResult<SubstrateSigner>;

export function useSigner(
  parameters: { namespace: 'evm' }
): UseSignerResult<EvmSigner>;

export function useSigner<TSigner extends WalletSigner = WalletSigner>(
  parameters?: Optional<UseSignerParameters>
): UseSignerResult<TSigner>;

export function useSigner(
  parameters: UseSignerParameters = {}
): UseSignerResult {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);
  const substrateConnector = useLunoStore((state) => state.substrate.connector);
  const evmConnector = useLunoStore((state) => state.evm.connector);

  const [signer, setSigner] = useState<WalletSigner | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const targetNamespace = namespace || activeNamespace;

  const { connector } = useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return { connector: substrateConnector };

      case ChainType.EVM:
        return { connector: evmConnector };

      default:
        return { connector: undefined };
    }
  }, [targetNamespace, substrateConnector, evmConnector]);

  useEffect(() => {
    if (!connector) {
      setSigner(undefined);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    connector
      .getSigner()
      .then((signer) => setSigner(signer))
      .catch((error) => {
        console.error('[useSigner] Failed to get signer:', error);
        setSigner(undefined);
      })
      .finally(() => setIsLoading(false));
  }, [connector]);

  return useMemo(() => ({ data: signer, isLoading }), [signer, isLoading]);
}
