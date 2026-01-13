import type { Chain as WagmiChain } from '@wagmi/core/chains';
import type { HexString } from './account';
import type { Transport } from './config';

export enum ChainType {
  SUBSTRATE = 'substrate',
  EVM = 'evm',
}

export interface BaseChain {
  id: HexString | number;
  name: string;
  chainType: ChainType;
  chainIconUrl: string;
  testnet: boolean;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorers?: Optional<{
    default?: Optional<{ name: string; url: string }>;
    [key: string]: Optional<{ name: string; url: string }>;
  }>;
}

export interface SubstrateChain extends BaseChain {
  chainType: ChainType.SUBSTRATE;
  id: HexString;
  genesisHash: HexString;
  ss58Format: number;
  rpcUrls: {
    webSocket: Transport;
    http?: Optional<readonly string[]>;
  };
  subscan?: Optional<{
    api: string;
    url: string;
  }>;
}

export type EvmChain = WagmiChain & {
  chainType: ChainType.EVM;
  chainIconUrl?: string;
};
