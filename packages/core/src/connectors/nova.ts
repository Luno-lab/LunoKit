import { novaSVG } from '../config/logos/generated'
import { WalletConnectConnector } from './walletconnect'
import type { Metadata } from '@walletconnect/universal-provider'
import { novaMobileConnector } from './novaMobile'

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
  const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
  };

  const isNovaWalletInstalled = () => {
    if (typeof window === 'undefined') return false;
    return (
      typeof window.injectedWeb3 === 'object' &&
      typeof window.injectedWeb3['polkadot-js'] !== 'undefined' &&
      window.walletExtension?.isNovaWallet === true
    );
  };

  if ((config as MobileOnlyConfig).mobileOnly && !isMobileDevice()) {
    throw new Error('Nova Wallet mobile connector cannot be used on desktop devices');
  }

  if (isMobileDevice() && isNovaWalletInstalled()) {
    return novaMobileConnector();
  }

  if ((config as MobileOnlyConfig).mobileOnly) {
    throw new Error('Nova Wallet is not installed. Please install Nova Wallet to continue.');
  }

  return new WalletConnectConnector({
    id: 'nova',
    name: 'Nova Wallet',
    icon: novaSVG,
    ...config as WalletConnectConfig,
  });
};
