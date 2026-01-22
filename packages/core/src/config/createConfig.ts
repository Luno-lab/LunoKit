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

function createSubstrateConfigState(params: SubstrateConfigParams): Config['substrate'] {
  const chains = params.chains || [];
  const connectors = params.connectors || [];

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
  const { connectors: lunoEvmConnectors, chains: evmInputChains, ...wagmiParams } = evmParams;

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
