import { describe } from 'vitest';
import { novaWallet } from '../config/logos/generated';
import { novaConnector } from './nova';
import { createWalletConnectTestSuite } from './test-helper';

describe(
  'NovaConnector',
  createWalletConnectTestSuite({
    getConnector: novaConnector,
    expected: {
      id: 'nova',
      name: 'Nova',
      icon: novaWallet,
    },
  })
);
