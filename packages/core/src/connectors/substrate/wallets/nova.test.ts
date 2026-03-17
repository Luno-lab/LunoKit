import { describe } from 'vitest';
import { novaSubstrateWallet } from '../../../config/logos/generated';
import { createWalletConnectTestSuite } from '../../test-helper';
import { novaConnector } from './nova';

describe(
  'NovaConnector',
  createWalletConnectTestSuite({
    getConnector: novaConnector,
    expected: {
      id: 'nova',
      name: 'Nova',
      icon: novaSubstrateWallet,
    },
  })
);
