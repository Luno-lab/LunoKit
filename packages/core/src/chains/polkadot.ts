import { defineChain } from './common';
import {SS58_FORMAT} from '../types'

/**
 * Polkadot主网
 */
export const polkadotChain = defineChain({
  id: SS58_FORMAT.POLKADOT,
  name: 'Polkadot',
  network: 'polkadot',
  ss58Format: SS58_FORMAT.POLKADOT,
  nativeCurrency: {
    name: 'Polkadot',
    symbol: 'DOT',
    decimals: 10,
  },
  rpcUrls: {
    default: 'wss://rpc.polkadot.io',
    http: 'https://rpc.polkadot.io',
    alternative: [
      'wss://polkadot.api.onfinality.io/public-ws',
      'wss://polkadot-rpc.dwellir.com'
    ]
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
