import { describe } from 'vitest';
import { novaConnector } from './nova';
import { createWalletConnectTestSuite } from './test-helper';
import { novaSVG } from '../config/logos/generated';

describe('NovaConnector',
  createWalletConnectTestSuite({
    getConnector: novaConnector,
    expected: {
      id: 'nova',
      name: 'Nova Wallet',
      icon: novaSVG,
    },
  })
);
