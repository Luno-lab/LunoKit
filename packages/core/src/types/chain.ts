export interface Chain {
  genesisHash: string;

  name: string;

  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };

  rpcUrls: {
    webSocket?: readonly string[];
    http?: readonly string[];
  };

  ss58Format: number;

  blockExplorers?: {
    default?: { name: string; url: string };
    [key: string]: { name: string; url: string } | undefined;
  };


  testnet?: boolean;

  meta?: Record<string, any>;

  chainIconUrl?: string
}
