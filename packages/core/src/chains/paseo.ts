import { assethubPaseoChain, paseoChain } from '../config/logos/generated';
import type { Chain } from '../types';

export const paseo: Chain = {
  genesisHash: '0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f',
  name: 'Paseo',
  nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 10 },
  rpcUrls: { webSocket: ['wss://rpc.ibp.network/paseo', 'wss://paseo.rpc.amforc.com'] },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://paseo.subscan.io/' } },
  chainIconUrl: paseoChain,
  testnet: true,
  subscan: {
    url: 'https://paseo.api.subscan.io',
  },
};

export const paseoAssetHub: Chain = {
  genesisHash: '0xd6eec26135305a8ad257a20d003357284c8aa03d0bdb2b357ab0a22371e11ef2',
  name: 'AssetHub Paseo',
  nativeCurrency: { name: 'AssetHub Paseo', symbol: 'PAS', decimals: 10 },
  rpcUrls: {
    webSocket: ['wss://pas-rpc.stakeworld.io/assethub', 'wss://asset-hub-paseo-rpc.n.dwellir.com'],
  },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://assethub-paseo.subscan.io' } },
  chainIconUrl: assethubPaseoChain,
  testnet: true,
  subscan: {
    url: 'https://assethub-paseo.api.subscan.io',
  },
};

export const paseoPassetHub: Chain = {
  genesisHash: '0xfd974cf9eaf028f5e44b9fdd1949ab039c6cf9cc54449b0b60d71b042e79aeb6',
  name: 'PAassetHub',
  nativeCurrency: { name: 'PassetHub', symbol: 'PAS', decimals: 10 },
  rpcUrls: {
    webSocket: ['wss://testnet-passet-hub.polkadot.io', 'wss://passet-hub-paseo.ibp.network'],
  },
  ss58Format: 42,
  chainIconUrl: assethubPaseoChain,
  testnet: true,
};
