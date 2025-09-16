import { novaWallet } from '../config/logos/generated';
import type { WalletConnectConnectorOptions } from '../types';
import { isMobileDevice } from '../utils';
import { novaMobileConnector } from './novaMobile';
import { WalletConnectConnector } from './walletconnect';

type WalletConnectConfig = Pick<
  WalletConnectConnectorOptions,
  'projectId' | 'relayUrl' | 'metadata' | 'supportedChains'
>;

type MobileOnlyConfig = {
  mobileOnly: true;
};

type NovaConnectorConfig = WalletConnectConfig | MobileOnlyConfig;

export const novaConnector = (config: NovaConnectorConfig) => {
  if (isMobileDevice()) {
    return novaMobileConnector();
  }

  if (!isMobileDevice() && 'mobileOnly' in config && config.mobileOnly) {
    console.error(
      'Nova Wallet mobile connector is being used on a desktop device. This may not work as expected.'
    );
    return novaMobileConnector();
  }

  return new WalletConnectConnector({
    id: 'nova',
    name: 'Nova',
    icon: novaWallet,
    links: {
      browserExtension: 'https://novawallet.io',
    },
    ...(config as WalletConnectConfig),
  });
};
