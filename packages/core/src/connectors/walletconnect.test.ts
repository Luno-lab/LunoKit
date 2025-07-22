import { describe } from 'vitest';
import { walletConnectConnector } from './walletconnect';
import { createWalletConnectTestSuite } from './test-helper';
import { walletconnectSVG } from '../config/logos/generated';

describe('WalletConnectConnector',
  createWalletConnectTestSuite({
    getConnector: walletConnectConnector,
    expected: {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: walletconnectSVG,
    },
  })
);
