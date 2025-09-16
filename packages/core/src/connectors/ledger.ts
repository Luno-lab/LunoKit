import { ledgerWallet } from '../config/logos/generated';
import type { WalletConnectConnectorOptions } from '../types';
import { WalletConnectConnector } from './walletconnect';

type WalletConnectConfig = Pick<
  WalletConnectConnectorOptions,
  'projectId' | 'relayUrl' | 'metadata'
>;

export const ledgerConnector = (config: WalletConnectConfig) => {
  return new WalletConnectConnector({
    id: 'ledger',
    name: 'Ledger',
    icon: ledgerWallet,
    links: {
      browserExtension: 'https://www.ledger.com/ledger-live',
    },
    ...config,
  });
};
