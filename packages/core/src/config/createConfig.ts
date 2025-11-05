import type {
  Chain,
  Config,
  Connector,
  CreateConfigParameters,
  RawStorage,
  Transport,
} from '../types';
import { createStorage } from './createStorage';

const noopStorage: RawStorage = {
  getItem: async (_key: string) => null,
  setItem: async (_key: string, _value: string) => {},
  removeItem: async (_key: string) => {},
};

const defaultLunoStorage = createStorage({
  storage: typeof window !== 'undefined' && window.localStorage ? window.localStorage : noopStorage,
  keyPrefix: 'luno.',
});

function generateTransportsFromChains(chains: readonly Chain[]): Record<string, Transport> {
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

export function createConfig(parameters: CreateConfigParameters): Config {
  const {
    appName = 'My Luno App',
    chains = [],
    connectors,
    transports = {},
    storage = defaultLunoStorage,
    autoConnect = true,
    cacheMetadata,
    metadata,
    scaledResponses,
    customTypes,
    customRpc,
    subscan,
  } = parameters;

  if (!connectors || connectors.length === 0) {
    throw new Error('No connectors provided. Wallet connection features will be unavailable.');
  }

  const transportsFromChains = chains.length > 0 ? generateTransportsFromChains(chains) : {};

  const finalTransports = transports
    ? { ...transportsFromChains, ...transports }
    : transportsFromChains;

  if (chains.length > 0) {
    for (const chain of chains) {
      if (!finalTransports[chain.genesisHash]) {
        console.warn(
          `Missing transport for chain "${chain.name}" (genesisHash: ${chain.genesisHash}). Chain functionality may be limited.`
        );
      }
    }
  }

  const config = {
    customRpc,
    customTypes,
    cacheMetadata,
    metadata,
    scaledResponses,

    appName,
    chains: Object.freeze([...chains]) as readonly Chain[],
    connectors: Object.freeze([...connectors]) as readonly Connector[],
    transports: Object.freeze({ ...finalTransports }) as Readonly<Record<string, Transport>>,
    storage,
    autoConnect,

    subscan,
  };

  console.log('[createConfig]: Luno Core Config created:', config);

  return config;
}
