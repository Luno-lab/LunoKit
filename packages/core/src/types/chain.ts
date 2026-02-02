import type { Chain as WagmiChain } from '@wagmi/core/chains';
import type { HexString } from './account';
import type { Transport } from './config';

export namespace ChainType {
  export const SUBSTRATE = 'substrate' as const;
  export const EVM = 'evm' as const;

  export type Value = 'substrate' | 'evm';
}

export type ChainType = ChainType.Value;

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
  chainType: typeof ChainType.SUBSTRATE;
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
  chainType: typeof ChainType.EVM;
  chainIconUrl?: string;
};

export type AnyChain = SubstrateChain | EvmChain;
