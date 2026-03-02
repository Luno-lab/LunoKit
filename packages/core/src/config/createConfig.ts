import {
  createConfig as createWagmiConfig,
  createStorage as createWagmiStorage,
  http,
} from '@wagmi/core';
import type { Chain as WagmiChain } from '@wagmi/core/chains';
import {
  ChainType,
  type Config,
  type CreateConfigParameters,
  type SubstrateConfigParams,
  type EvmChain,
  type EvmConfigParams,
  type EvmInputChain,
  type RawStorage,
  type SubstrateChain,
  type Transport,
  type AnyConnector,
  type ConnectorGroup,
  type EvmConnectorType,
  type SubstrateConnectorType,
} from '../types';
import { createStorage } from './createStorage';
import {
  arbitrumEvmChain,
  avalancheEvmChain,
  baseEvmChain,
  bscEvmChain,
  ethereumEvmChain,
  gnosisEvmChain,
  optimismEvmChain,
  polygonEvmChain,
  zksyncEvmChain,
} from './logos/generated';

const noopStorage: RawStorage = {
  getItem: async (_key: string) => null,
  setItem: async (_key: string, _value: string) => {},
  removeItem: async (_key: string) => {},
};

const defaultLunoStorage = createStorage({
  storage: typeof window !== 'undefined' && window.localStorage ? window.localStorage : noopStorage,
  keyPrefix: 'luno.',
});

function generateSubstrateTransports(chains: readonly SubstrateChain[]): Record<string, Transport> {
  const transports: Record<string, Transport> = {};

  for (const chain of chains) {
    const wsUrl = chain.rpcUrls.webSocket;
    if (wsUrl) {
      transports[chain.genesisHash] = wsUrl;
    } else {
      console.warn(
        `No WebSocket URL found for chain "${chain.name}" (${chain.genesisHash}). Skipping transport generation.`
      );
    }
  }

  return transports;
}

function isConnectorGroupArray<T extends AnyConnector>(
  input: T[] | ConnectorGroup<T>[]
): input is ConnectorGroup<T>[] {
  return input.length > 0 && 'groupName' in input[0] && 'wallets' in input[0];
}

function createSubstrateConfigState(params: SubstrateConfigParams): Config['substrate'] {
  const chains = params.chains || [];

  const connectorsInput = params.connectors || [];

  const connectorGroups = isConnectorGroupArray(connectorsInput)
    ? connectorsInput.filter((g) => g.wallets.length > 0)
    : undefined;

  const connectors = isConnectorGroupArray(connectorsInput)
    ? connectorsInput.flatMap((g) => g.wallets)
    : connectorsInput;

  if (!connectors || connectors.length === 0) {
    throw new Error('No connectors provided. Wallet connection features will be unavailable.');
  }

  const transportsFromChains = chains.length > 0 ? generateSubstrateTransports(chains) : {};

  const finalTransports = params.transports
    ? { ...transportsFromChains, ...params.transports }
    : transportsFromChains;

  if (chains.length > 0) {
    for (const chain of chains) {
      if (!finalTransports[chain.genesisHash]) {
        console.warn(
          `Missing transport for chain "${chain.name}" (genesisHash: ${chain.genesisHash})...`
        );
      }
    }
  }

  return {
    chains: Object.freeze([...chains]),
    connectors: Object.freeze([...connectors]),
    connectorGroups: connectorGroups
      ? (Object.freeze([...connectorGroups]) as readonly ConnectorGroup<SubstrateConnectorType>[])
      : undefined,
    transports: Object.freeze(finalTransports),
    subscan: params.subscan,
    customTypes: params.customTypes,
    customRpc: params.customRpc,
  };
}

const CHAIN_ICONS: Record<number, string> = {
  1: ethereumEvmChain,
  10: optimismEvmChain,
  56: bscEvmChain,
  100: gnosisEvmChain,
  137: polygonEvmChain,
  324: zksyncEvmChain,
  8453: baseEvmChain,
  42161: arbitrumEvmChain,
  43114: avalancheEvmChain,
};

function normalizeEvmChains(chains: readonly EvmInputChain[]): EvmChain[] {
  return chains.map((chain) => ({
    ...chain,
    chainType: ChainType.EVM,
    chainIconUrl: chain.chainIconUrl || CHAIN_ICONS[chain.id],
  }));
}

function createEvmConfigState(evmParams: EvmConfigParams): Config['evm'] {
  const { connectors: connectorsInput, chains: evmInputChains, ...wagmiParams } = evmParams;

  const connectorGroups = isConnectorGroupArray(connectorsInput)
    ? connectorsInput.filter((g) => g.wallets.length > 0)
    : undefined;

  const lunoEvmConnectors = isConnectorGroupArray(connectorsInput)
    ? connectorsInput.flatMap((g) => g.wallets)
    : connectorsInput;

  const normalizedEvmChains = normalizeEvmChains(evmInputChains);
  const wagmiConnectorsFactoryList = lunoEvmConnectors.map((c) => c.wagmiFactory);

  const defaultTransports = normalizedEvmChains.reduce(
    (acc, chain) => {
      acc[chain.id] = http();
      return acc;
    },
    {} as Record<number, any>
  );

  const wagmiStorage = createWagmiStorage({
    storage: typeof window !== 'undefined' && window.localStorage ? window.localStorage : undefined,
    key: 'luno',
  });

  const wagmiConfig = createWagmiConfig({
    chains: evmInputChains as [WagmiChain, ...WagmiChain[]],
    connectors: wagmiConnectorsFactoryList,
    transports: { ...defaultTransports, ...wagmiParams.transports },
    storage: wagmiStorage,
    multiInjectedProviderDiscovery: false,
    ...wagmiParams,
  });

  lunoEvmConnectors.forEach((lunoConnector) => {
    const realWagmiConnector = wagmiConfig.connectors.find(
      (wc) => wc.id === lunoConnector.id || wc.type === lunoConnector.id
    );

    if (realWagmiConnector) {
      lunoConnector.setWagmiConfig(wagmiConfig);
      lunoConnector.setWagmiConnector(realWagmiConnector);
    } else {
      console.warn(`[LunoKit] Could not bind Wagmi connector for ${lunoConnector.id}`);
    }
  });

  return {
    chains: Object.freeze(normalizedEvmChains),
    connectors: Object.freeze(lunoEvmConnectors),
    connectorGroups: connectorGroups
      ? (Object.freeze([...connectorGroups]) as readonly ConnectorGroup<EvmConnectorType>[])
      : undefined,
    wagmiConfig,
  };
}

export function createConfig(parameters: CreateConfigParameters): Config {
  const {
    appName = 'My Luno App',
    storage = defaultLunoStorage,
    autoConnect = true,
    substrate,
    evm,
  } = parameters;

  if (!substrate && !evm) {
    throw new Error('[LunoKit] You must provide either "substrate" or "evm" configuration.');
  }

  const substrateConfigState = substrate ? createSubstrateConfigState(substrate) : undefined;

  const evmConfigState = evm ? createEvmConfigState(evm) : undefined;

  return {
    appName,
    storage,
    autoConnect,
    evm: evmConfigState,
    substrate: substrateConfigState,
  };
}
