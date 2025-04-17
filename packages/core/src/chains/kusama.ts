import { defineChain } from './common';

/**
 * Kusama网络
 */
export const kusamaChain = defineChain({
  id: 1, // Kusama没有真正的链ID概念，使用1作为标识
  name: 'Kusama',
  network: 'kusama',
  nativeCurrency: {
    name: 'Kusama',
    symbol: 'KSM',
    decimals: 12,
  },
  rpcUrls: {
    default: {
      http: ['wss://kusama-rpc.polkadot.io'],
      webSocket: ['wss://kusama-rpc.polkadot.io'],
    },
    public: {
      http: ['wss://kusama-rpc.polkadot.io'],
      webSocket: ['wss://kusama-rpc.polkadot.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Subscan',
      url: 'https://kusama.subscan.io',
    },
    polkascan: {
      name: 'Polkascan',
      url: 'https://polkascan.io/kusama',
    },
  },
});
