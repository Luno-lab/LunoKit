import { describe } from 'vitest';
import { polkagateWallet } from '../config/logos/generated';
import { polkagateConnector } from './polkagate';
import { createConnectorTestSuite } from './test-helper';

describe(
  'polkagateConnector',
  createConnectorTestSuite({
    getConnector: () => polkagateConnector(),
    expected: {
      id: 'polkagate',
      name: 'Polkagate',
      icon: polkagateWallet,
    },
  })
);
