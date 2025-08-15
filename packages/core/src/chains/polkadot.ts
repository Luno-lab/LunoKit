import type { Chain } from '../types'
import { polkadotSVG } from '../config/logos/generated'

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
  chainIconUrl: polkadotSVG,
  testnet: false,
};
