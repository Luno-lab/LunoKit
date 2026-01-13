import { type WalletConnectParameters, walletConnect } from '@wagmi/connectors';
import { walletconnectEvmWallet } from '../../config/logos/generated';
import { EvmConnector, type EvmConnectorOptions } from './connector';

export class WalletConnectConnector extends EvmConnector {
  constructor(options: EvmConnectorOptions) {
    super(options);
  }

  public isInstalled(): boolean {
    return true;
  }

  public async isAvailable(): Promise<boolean> {
    return true;
  }

  public hasConnectionUri(): boolean {
    return true;
  }

  public async getConnectionUri(): Promise<string> {
    if (this.connectionUri) {
      return this.connectionUri;
    }

    return new Promise<string>((resolve) => {
      this.once('get_uri', (uri: string) => {
        this.connectionUri = uri;
        resolve(uri);
      });
    });
  }
}

export const walletConnectConnector = (options: WalletConnectParameters) => {
  return new WalletConnectConnector({
    id: 'walletConnect',
    name: 'WalletConnect',
    icon: walletconnectEvmWallet,
    links: {},
    wagmiFactory: walletConnect({ ...options }),
  });
};
