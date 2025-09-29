import { assethubWestendChain, westendChain } from '../config/logos/generated';
import type { Chain } from '../types';

export const westend: Chain = {
  genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
  name: 'Westend',
  nativeCurrency: { name: 'Westend', symbol: 'WND', decimals: 12 },
  rpcUrls: { webSocket: ['wss://westend-rpc.polkadot.io', 'wss://westend-rpc.n.dwellir.com'] },
  ss58Format: 42,
  blockExplorers: { default: { name: 'Subscan', url: 'https://westend.subscan.io' } },
  chainIconUrl: westendChain,
  testnet: true,
};

export const westendAssetHub: Chain = {
  genesisHash: '0x67f9723393ef76214df0118c34bbbd3dbebc8ed46a10973a8c969d48fe7598c9',
  name: 'AssetHub Westend',
  nativeCurrency: { name: 'AssetHub Westend', symbol: 'WND', decimals: 12 },
  rpcUrls: {
    webSocket: [
      'wss://westend-asset-hub-rpc.polkadot.io',
      'wss://asset-hub-westend-rpc.n.dwellir.com',
    ],
  },
  ss58Format: 42,
  blockExplorers: { default: { name: 'Subscan', url: 'https://assethub-westend.subscan.io' } },
  chainIconUrl: assethubWestendChain,
  testnet: true,
};
