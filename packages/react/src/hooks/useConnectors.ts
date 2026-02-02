import {
  ChainType,
  type AnyConnector,
  type SubstrateConnectorType,
  type EvmConnectorType,
} from '@luno-kit/core/types';
import { useMemo } from 'react';
import { useLunoStore } from '../store';
import type { Optional } from '../types';

export interface UseConnectorsParameters {
  namespace?: Optional<ChainType>;
}

export function useConnectors(
  parameters: { namespace: 'substrate' }
): SubstrateConnectorType[];

export function useConnectors(
  parameters: { namespace: 'evm' }
): EvmConnectorType[];

export function useConnectors<TConnector extends AnyConnector = AnyConnector>(
  parameters?: Optional<UseConnectorsParameters>
): TConnector[];

export function useConnectors(
  parameters: UseConnectorsParameters = {}
): AnyConnector[] {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);
  const substrateConnectors = useLunoStore(
    (state) => state.config?.substrate?.connectors
  );
  const evmConnectors = useLunoStore((state) => state.config?.evm?.connectors);

  const targetNamespace = namespace || activeNamespace;

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateConnectors ? [...substrateConnectors] : [];

      case ChainType.EVM:
        return evmConnectors ? [...evmConnectors] : [];

      default:
        return [];
    }
  }, [targetNamespace, substrateConnectors, evmConnectors]);
}
