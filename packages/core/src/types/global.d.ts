import { Injected } from 'dedot/types';

declare global {
  interface Window {
    injectedWeb3?: Record<
      string,
      {
        enable: (appName: string) => Promise<Injected>;
        version: string;
      }
    >;
    walletExtension: {
      isNovaWallet: boolean;
    };
  }

  type Optional<T> = T | undefined;
}

