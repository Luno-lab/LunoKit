import { WalletConnectConnector } from './walletconnect'
import type { Metadata } from '@walletconnect/universal-provider'
import { ledgerWallet } from '../config/logos/generated'

type WalletConnectConfig = {
  projectId: string;
  relayUrl?: string;
  metadata?: Metadata;
}

export const ledgerConnector = (config: WalletConnectConfig) => {
  return new WalletConnectConnector({
    id: 'ledger',
    name: 'Ledger',
    icon : ledgerWallet,
    links: {
      browserExtension: 'https://www.ledger.com/ledger-live'
    },
    ...config,
  })
}
