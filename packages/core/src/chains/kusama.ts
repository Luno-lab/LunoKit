import { defineChain } from './common';
import {SS58_FORMAT} from '../types'

/**
 * Kusama网络
 */
export const kusamaChain = defineChain({
  id: SS58_FORMAT.KUSAMA,
  name: 'Kusama',
  network: 'kusama',
  ss58Format: SS58_FORMAT.KUSAMA,
  nativeCurrency: {
    name: 'Kusama',
    symbol: 'KSM',
    decimals: 12,
  },
  rpcUrls: {
    default: 'wss://kusama-rpc.polkadot.io',
    http: 'https://kusama-rpc.polkadot.io',
    alternative: [
      'wss://kusama.api.onfinality.io/public-ws',
      'wss://kusama-rpc.dwellir.com'
    ]
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
