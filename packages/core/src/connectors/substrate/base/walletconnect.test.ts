import { describe } from 'vitest';
import { walletconnectSubstrateWallet } from '../../../config/logos/generated';
import { createWalletConnectTestSuite } from '../test-helper';
import { WalletConnectConnector } from './walletconnect';

describe(
  'WalletConnectConnector',
  createWalletConnectTestSuite({
    getConnector: (options) => new WalletConnectConnector(options),
    expected: {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: walletconnectSubstrateWallet,
    },
  })
);
