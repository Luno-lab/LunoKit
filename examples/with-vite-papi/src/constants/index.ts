import type { HexString } from '@luno-kit/react/types';
import { dot, ksm, paseo, wnd } from '@polkadot-api/descriptors';

export interface Chain {
  name: string;
  id: string;
  genesisHash: HexString;
  endpoint: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  descriptors: any;
}

export const CHAINS: Record<string, Chain> = {
  polkadot: {
    name: 'Polkadot',
    id: 'polkadot',
    genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    endpoint: 'wss://polkadot-rpc.dwellir.com',
    nativeCurrency: {
      name: 'DOT',
      symbol: 'DOT',
      decimals: 10,
    },
    descriptors: dot,
  },
  kusama: {
    name: 'Kusama',
    id: 'kusama',
    genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    endpoint: 'wss://kusama-rpc.dwellir.com',
    nativeCurrency: {
      name: 'KSM',
      symbol: 'KSM',
      decimals: 12,
    },
    descriptors: ksm,
  },
  paseo: {
    name: 'Paseo',
    id: 'paseo',
    genesisHash: '0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f',
    endpoint: 'wss://paseo.rpc.amforc.com',
    nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 10 },
    descriptors: paseo,
  },
  westend: {
    name: 'Westend',
    id: 'westend',
    genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
    endpoint: 'wss://westend-rpc.polkadot.io',
    nativeCurrency: { name: 'Westend', symbol: 'WND', decimals: 12 },
    descriptors: wnd,
  },
};
