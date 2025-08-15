import type { Chain } from '../types'
import { kusamaSVG } from '../config/logos/generated'

export const kusama: Chain = {
  genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  name: 'Kusama',
  nativeCurrency: { name: 'Kusama', symbol: 'KSM', decimals: 12 },
  rpcUrls: { webSocket: ['wss://kusama-rpc.polkadot.io', 'wss://kusama.api.onfinality.io/public-ws'] },
  ss58Format: 2,
  blockExplorers: { default: { name: 'Subscan', url: 'https://kusama.subscan.io' } },
  chainIconUrl: kusamaSVG,
  testnet: false,
};
