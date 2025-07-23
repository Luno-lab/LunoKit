import { novaSVG } from '../config/logos/generated'
import { CommonConnector } from './common'

export class NovaMobileConnector extends CommonConnector {
  constructor() {
    super({
      id: 'polkadot-js',
      name: 'Nova Wallet (Mobile)',
      icon: novaSVG,
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
