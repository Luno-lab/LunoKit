import {
  assethubChain,
  collectivesChain,
  coretimeChain,
  peopleChain,
  polkadotChain,
} from '../config/logos/generated';
import type { Chain } from '../types';

export const polkadot: Chain = {
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  name: 'Polkadot',
  nativeCurrency: { name: 'Polkadot', symbol: 'DOT', decimals: 10 },
  rpcUrls: {
    webSocket: ['wss://rpc.polkadot.io', 'wss://polkadot.api.onfinality.io/public-ws'],
    http: ['https://rpc.polkadot.io'],
  },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://polkadot.subscan.io' } },
  chainIconUrl: polkadotChain,
  testnet: false,
  subscan: {
    url: 'https://polkadot.api.subscan.io',
  },
};

export const polkadotAssetHub: Chain = {
  genesisHash: '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
  name: 'AssetHub',
  nativeCurrency: { name: 'AssetHub Polkadot', symbol: 'DOT', decimals: 10 },
  rpcUrls: {
    webSocket: [
      'wss://polkadot-asset-hub-rpc.polkadot.io',
      'wss://asset-hub-polkadot-rpc.n.dwellir.com',
    ],
    http: ['https://polkadot-asset-hub-rpc.polkadot.io'],
  },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://assethub-polkadot.subscan.io' } },
  chainIconUrl: assethubChain,
  testnet: false,
  subscan: {
    url: 'https://assethub-polkadot.api.subscan.io',
  },
};

export const polkadotPeople: Chain = {
  genesisHash: '0x67fa177a097bfa18f77ea95ab56e9bcdfeb0e5b8a40e46298bb93e16b6fc5008',
  name: 'People',
  nativeCurrency: { name: 'People Polkadot', symbol: 'DOT', decimals: 10 },
  rpcUrls: {
    webSocket: ['wss://polkadot-people-rpc.polkadot.io', 'wss://people-polkadot-rpc.n.dwellir.com'],
    http: ['https://polkadot-people-rpc.polkadot.io'],
  },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://people-polkadot.subscan.io' } },
  chainIconUrl: peopleChain,
  testnet: false,
  subscan: {
    url: 'https://people-polkadot.api.subscan.io',
  },
};

export const polkadotCoretime: Chain = {
  genesisHash: '0xefb56e30d9b4a24099f88820987d0f45fb645992416535d87650d98e00f46fc4',
  name: 'Coretime',
  nativeCurrency: { name: 'Coretime Polkadot', symbol: 'DOT', decimals: 10 },
  rpcUrls: {
    webSocket: [
      'wss://polkadot-coretime-rpc.polkadot.io',
      'wss://coretime-polkadot-rpc.n.dwellir.com',
    ],
    http: ['https://polkadot-coretime-rpc.polkadot.io'],
  },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://coretime-polkadot.subscan.io' } },
  chainIconUrl: coretimeChain,
  testnet: false,
  subscan: {
    url: 'https://coretime-polkadot.api.subscan.io',
  },
};

export const polkadotCollectives: Chain = {
  genesisHash: '0x46ee89aa2eedd13e988962630ec9fb7565964cf5023bb351f2b6b25c1b68b0b2',
  name: 'Collectives',
  nativeCurrency: { name: 'Collectives Polkadot', symbol: 'DOT', decimals: 10 },
  rpcUrls: {
    webSocket: [
      'wss://collectives-polkadot-rpc.n.dwellir.com',
      'wss://polkadot-collectives-rpc.polkadot.io',
    ],
    http: ['https://collectives-polkadot-rpc.n.dwellir.com'],
  },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://collectives-polkadot.subscan.io' } },
  chainIconUrl: collectivesChain,
  testnet: false,
  subscan: {
    url: 'https://collectives-polkadot.api.subscan.io',
  },
};
