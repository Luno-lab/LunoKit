import type { Chain } from '../types';
import { defineChain } from './common';

/**
 * Polkadot主网
 */
export const polkadotChain = defineChain({
  id: 0, // Polkadot没有真正的链ID概念，使用0作为标识
  name: 'Polkadot',
  network: 'polkadot',
  nativeCurrency: {
    name: 'Polkadot',
    symbol: 'DOT',
    decimals: 10,
  },
  rpcUrls: {
    default: {
      http: ['wss://rpc.polkadot.io'],
      webSocket: ['wss://rpc.polkadot.io'],
    },
    public: {
      http: ['wss://rpc.polkadot.io'],
      webSocket: ['wss://rpc.polkadot.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Subscan',
      url: 'https://polkadot.subscan.io',
    },
    polkascan: {
      name: 'Polkascan',
      url: 'https://polkascan.io/polkadot',
    },
  },
}); 