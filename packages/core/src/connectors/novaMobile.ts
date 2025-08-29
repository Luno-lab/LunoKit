import { novaWallet } from '../config/logos/generated'
import { InjectConnector } from './inject'

export class NovaMobileConnector extends InjectConnector {
  constructor() {
    super({
      id: 'nova-mobile',
      name: 'Nova Wallet',
      icon: novaWallet,
      injectorId: 'polkadot-js',
      links: {
        deepLink: 'https://app.novawallet.io/open/dapp'
      }
    });
  }

  public isInstalled(): boolean {
    if (typeof window === 'undefined') return false;
    const injectedWeb3 = window.injectedWeb3;
    return (
      typeof injectedWeb3 === 'object' &&
      typeof injectedWeb3['polkadot-js'] !== 'undefined' &&
      window.walletExtension?.isNovaWallet === true
    );
  }

  public async isAvailable(): Promise<boolean> {
    return this.isInstalled();
  }
}

export const novaMobileConnector = () => new NovaMobileConnector()
