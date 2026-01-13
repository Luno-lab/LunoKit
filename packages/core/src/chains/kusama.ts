import {
  assethubKusamaChain,
  coretimeKusamaChain,
  kusamaChain,
  peopleKusamaChain,
} from '../config/logos/generated';
import { ChainType, type SubstrateChain } from '../types';

export const kusama: SubstrateChain = {
  id: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  chainType: ChainType.SUBSTRATE,
  name: 'Kusama',
  nativeCurrency: { name: 'Kusama', symbol: 'KSM', decimals: 12 },
  rpcUrls: {
    webSocket: ['wss://kusama-rpc.polkadot.io', 'wss://kusama.api.onfinality.io/public-ws'],
  },
  ss58Format: 2,
  blockExplorers: { default: { name: 'Subscan', url: 'https://kusama.subscan.io' } },
  chainIconUrl: kusamaChain,
  testnet: false,
  subscan: {
    url: 'https://kusama.subscan.io',
    api: 'https://kusama.api.subscan.io',
  },
};

export const kusamaAssetHub: SubstrateChain = {
  id: '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a',
  genesisHash: '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a',
  chainType: ChainType.SUBSTRATE,
  name: 'AssetHub Kusama',
  nativeCurrency: { name: 'AssetHub Kusama', symbol: 'KSM', decimals: 12 },
  rpcUrls: {
    webSocket: [
      'wss://kusama-asset-hub-rpc.polkadot.io',
      'wss://asset-hub-kusama-rpc.n.dwellir.com',
    ],
  },
  ss58Format: 2,
  blockExplorers: { default: { name: 'Subscan', url: 'https://assethub-kusama.subscan.io' } },
  chainIconUrl: assethubKusamaChain,
  testnet: false,
  subscan: {
    url: 'https://assethub-kusama.subscan.io',
    api: 'https://assethub-kusama.api.subscan.io',
  },
};

export const kusamaPeople: SubstrateChain = {
  id: '0xc1af4cb4eb3918e5db15086c0cc5ec17fb334f728b7c65dd44bfe1e174ff8b3f',
  genesisHash: '0xc1af4cb4eb3918e5db15086c0cc5ec17fb334f728b7c65dd44bfe1e174ff8b3f',
  chainType: ChainType.SUBSTRATE,
  name: 'People Kusama',
  nativeCurrency: { name: 'People Kusama', symbol: 'KSM', decimals: 12 },
  rpcUrls: {
    webSocket: ['wss://kusama-people-rpc.polkadot.io', 'wss://people-kusama-rpc.n.dwellir.com'],
  },
  ss58Format: 2,
  blockExplorers: { default: { name: 'Subscan', url: 'https://people-kusama.subscan.io' } },
  chainIconUrl: peopleKusamaChain,
  testnet: false,
  subscan: {
    url: 'https://people-kusama.subscan.io',
    api: 'https://people-kusama.api.subscan.io',
  },
};

export const kusamaCoretime: SubstrateChain = {
  id: '0x638cd2b9af4b3bb54b8c1f0d22711fc89924ca93300f0caf25a580432b29d050',
  genesisHash: '0x638cd2b9af4b3bb54b8c1f0d22711fc89924ca93300f0caf25a580432b29d050',
  chainType: ChainType.SUBSTRATE,
  name: 'Coretime Kusama',
  nativeCurrency: { name: 'Coretime Kusama', symbol: 'KSM', decimals: 12 },
  rpcUrls: {
    webSocket: ['wss://kusama-coretime-rpc.polkadot.io', 'wss://coretime-kusama-rpc.n.dwellir.com'],
  },
  ss58Format: 2,
  blockExplorers: { default: { name: 'Subscan', url: 'https://coretime-kusama.subscan.io' } },
  chainIconUrl: coretimeKusamaChain,
  testnet: false,
  subscan: {
    url: 'https://coretime-kusama.subscan.io',
    api: 'https://coretime-kusama.api.subscan.io',
  },
};
