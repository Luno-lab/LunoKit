import type { HexString } from './account';
import type { Transport } from './config';

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
    http?: Optional<readonly string[]>;
  };

  ss58Format: number;

  blockExplorers?: Optional<{
    default?: Optional<{ name: string; url: string }>;
    [key: string]: Optional<{ name: string; url: string }>;
  }>;

  testnet: boolean;

  chainIconUrl: string;

  subscan?: Optional<{
    api: string;
    url: string;
  }>;
}
