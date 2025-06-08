import type { Chain } from '../types'
import { paseoSVG } from '../config/logos/generated'

export const paseo: Chain = {
  genesisHash: '0x74300973617e2936e22d46e94fee5016a1a514747ae108277b770d02b47d37d9',
  name: 'Paseo',
  nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 10 },
  rpcUrls: { webSocket: ['wss://paseo.rpc.amforc.com'] },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://paseo.subscan.io/' } },
  chainIconUrl: paseoSVG,
  testnet: true
};
