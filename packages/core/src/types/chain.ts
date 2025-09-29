import type { HexString } from './account';

export interface Chain {
  genesisHash: HexString;

  name: string;

  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };

  rpcUrls: {
    webSocket: readonly string[];
    http?: readonly string[];
  };

  ss58Format: number;

  blockExplorers?: {
    default?: { name: string; url: string };
    [key: string]: { name: string; url: string } | undefined;
  };

  testnet: boolean;

  chainIconUrl: string;
}
