import type { HexString } from './account';
import { Transport } from './config'

export interface Chain {
  genesisHash: HexString;

  name: string;

  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };

  rpcUrls: {
    webSocket: Transport;
    http?: readonly string[];
  };

  ss58Format: number;

  blockExplorers?: {
    default?: { name: string; url: string };
    [key: string]: { name: string; url: string } | undefined;
  };

  testnet: boolean;

  chainIconUrl: string;

  subscan?: {
    url: string;
  };
}
