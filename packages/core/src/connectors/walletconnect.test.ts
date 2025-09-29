import { describe } from 'vitest';
import { walletconnectWallet } from '../config/logos/generated';
import { createWalletConnectTestSuite } from './test-helper';
import { walletConnectConnector } from './walletconnect';

describe(
  'WalletConnectConnector',
  createWalletConnectTestSuite({
    getConnector: walletConnectConnector,
    expected: {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: walletconnectWallet,
    },
  })
);
