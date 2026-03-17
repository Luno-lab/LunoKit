import { type WalletConnectParameters, walletConnect } from '@wagmi/connectors';
import { walletconnectEvmWallet } from '../../../config/logos/generated';
import type { EvmAccount, EvmConnectOptions } from '../../../types';
import { EvmConnector, type EvmConnectorOptions } from '../base/connector';

export class WalletConnectConnector extends EvmConnector {
  constructor(options: Omit<EvmConnectorOptions, 'links'>) {
    super({ ...options, links: {} });
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

  async connect(options?: EvmConnectOptions): Promise<EvmAccount[] | undefined> {
    if (!this.wagmiConfig || !this.wagmiConnector) {
      throw new Error(`Connector ${this.name} not initialized. Wagmi config is missing.`);
    }

    const handler = ({ type, data }: { type: string; data?: unknown }) => {
      if (type === 'display_uri' && typeof data === 'string') {
        this.emit('get_uri', data);
      }
    };
    this.wagmiConnector.emitter.on('message', handler);

    try {
      return await super.connect(options);
    } finally {
      this.wagmiConnector.emitter.off('message', handler);
    }
  }
}

export const walletConnectConnector = (options: WalletConnectParameters) => {
  return new WalletConnectConnector({
    id: 'walletConnect',
    name: 'WalletConnect',
    icon: walletconnectEvmWallet,
    wagmiFactory: walletConnect({ ...options, showQrModal: false }),
  });
};
