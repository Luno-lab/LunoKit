import { onekeyWallet } from '../config/logos/generated';
import { WalletConnectConnector } from './walletconnect';
import type { Account, Chain, WalletConnectConnectorOptions } from '../types';
import { polkadot, polkadotAssetHub, kusama } from '../chains'

export type OneKeyMobileOptions = {
  projectId: string;
}

const supportedChains = [polkadot.genesisHash, polkadotAssetHub.genesisHash, kusama.genesisHash]

export class OneKeyMobileConnector extends WalletConnectConnector {
  constructor(options: OneKeyMobileOptions) {
    super({
      id: 'onekey-mobile',
      name: 'OneKey',
      icon: onekeyWallet,
      links: {
        deepLink: 'onekey-wallet://wc',
      },
      supportedChains,
      ...options,
    });
  }

  public async connect(appName: string, chains?: Chain[]): Promise<Array<Account>> {
    const uriHandler = (uri: string) => {
      const deepLinkUri = `onekey-wallet://wc?uri=${encodeURIComponent(uri)}`;
      window.location.href = deepLinkUri;
      this.off('get_uri', uriHandler);
    };

    this.on('get_uri', uriHandler);

    return super.connect(appName, chains);
  }

  public async getConnectionUri(): Promise<string> {
    const wcUri = await super.getConnectionUri();
    return `onekey-wallet://wc?uri=${encodeURIComponent(wcUri)}`;
  }
}

export const oneKeyMobileConnector = (options: WalletConnectConnectorOptions) =>
  new OneKeyMobileConnector(options);
