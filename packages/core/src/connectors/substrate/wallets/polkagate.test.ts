import { describe } from 'vitest';
import { polkagateSubstrateWallet } from '../../../config/logos/generated';
import { createConnectorTestSuite } from '../test-helper';
import { polkagateConnector } from './polkagate';

describe(
  'polkagateConnector',
  createConnectorTestSuite({
    getConnector: () => polkagateConnector(),
    expected: {
      id: 'polkagate',
      name: 'Polkagate',
      icon: polkagateSubstrateWallet,
    },
  })
);
