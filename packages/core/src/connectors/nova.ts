import { novaSVG } from '../config/logos/generated'
import { WalletConnectConnector } from './walletconnect'
import type { Metadata } from '@walletconnect/universal-provider'

interface WalletConnectConfig {
  projectId: string;
  relayUrl?: string;
  metadata?: Metadata;
}

export const novaConnector = (config: WalletConnectConfig) => {
  console.log('config', config)
  return new WalletConnectConnector({
    id: 'nova',
    name: 'Nova Wallet',
    icon: novaSVG,
    ...config
  });
};
