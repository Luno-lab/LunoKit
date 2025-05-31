import type { Chain } from '../types'
import { westendSVG } from './logos/generated'

export const westend: Chain = {
  genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
  name: 'Westend',
  nativeCurrency: { name: 'Westend', symbol: 'WND', decimals: 12 },
  rpcUrls: { webSocket: ['wss://westend-rpc.polkadot.io'] },
  ss58Format: 42,
  blockExplorers: { default: { name: 'Subscan', url: 'https://westend.subscan.io' } },
  chainIconUrl: westendSVG,
  testnet: true,
};
