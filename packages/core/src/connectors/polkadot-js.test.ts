import { describe } from 'vitest';
import { polkadotjsWallet } from '../config/logos/generated';
import { polkadotjsConnector } from './polkadot-js';
import { createConnectorTestSuite } from './test-helper';

describe(
  'polkadotjsConnector',
  createConnectorTestSuite({
    getConnector: () => polkadotjsConnector(),
    expected: {
      id: 'polkadot-js',
      name: 'Polkadot{.js}',
      icon: polkadotjsWallet,
    },
  })
);
