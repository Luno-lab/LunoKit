import {
  ChainType,
  type AnyConnector,
  type SubstrateConnectorType,
  type EvmConnectorType,
} from '@luno-kit/core/types';
import { useMemo } from 'react';
import { useLunoStore } from '../store';
import type { Optional } from '../types';

export interface UseActiveConnectorParameters {
  namespace?: Optional<ChainType>;
}

export function useActiveConnector(
  parameters: { namespace: 'substrate' }
): SubstrateConnectorType | undefined;

export function useActiveConnector(
  parameters: { namespace: 'evm' }
): EvmConnectorType | undefined;

export function useActiveConnector<TConnector extends AnyConnector = AnyConnector>(
  parameters?: Optional<UseActiveConnectorParameters>
): TConnector | undefined;

export function useActiveConnector(
  parameters: UseActiveConnectorParameters = {}
): AnyConnector | undefined {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);
  const substrateConnector = useLunoStore((state) => state.substrate.connector);
  const evmConnector = useLunoStore((state) => state.evm.connector);

  const targetNamespace = namespace || activeNamespace;

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateConnector;

      case ChainType.EVM:
        return evmConnector;

      default:
        return undefined;
    }
  }, [targetNamespace, substrateConnector, evmConnector]);
}
