import type { Chain } from '../types'
import { paseoSVG } from '../config/logos/generated'

export const paseo: Chain = {
  genesisHash: '0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f',
  name: 'Paseo',
  nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 10 },
  rpcUrls: { webSocket: ['wss://paseo.rpc.amforc.com', 'wss://paseo-rpc.n.dwellir.com'] },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://paseo.subscan.io/' } },
  chainIconUrl: paseoSVG,
  testnet: true
};
