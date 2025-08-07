import { novaSVG } from '../config/logos/generated'
import { WalletConnectConnector } from './walletconnect'
import type { Metadata } from '@walletconnect/universal-provider'
import { novaMobileConnector } from './novaMobile'
import { isMobileDevice } from '../utils'

type WalletConnectConfig = {
  projectId: string;
  relayUrl?: string;
  metadata?: Metadata;
}

type MobileOnlyConfig = {
  mobileOnly: true;
}

type NovaConnectorConfig = WalletConnectConfig | MobileOnlyConfig;

export const novaConnector = (config: NovaConnectorConfig) => {
  if ((config as MobileOnlyConfig).mobileOnly && !isMobileDevice()) {
    throw new Error('Nova Wallet mobile connector cannot be used on desktop devices');
  }

  if ((config as MobileOnlyConfig).mobileOnly) {
    throw new Error('Nova Wallet is not installed. Please install Nova Wallet to continue.');
  }

  if (isMobileDevice()) {
    return novaMobileConnector();
  }

  return new WalletConnectConnector({
    id: 'nova',
    name: 'Nova Wallet',
    icon: novaSVG,
    links: {
      browserExtension: 'https://novawallet.io',
    },
    ...config as WalletConnectConfig,
  });
};
