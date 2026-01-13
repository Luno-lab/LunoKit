import { describe } from 'vitest';
import { polkadotjsSubstrateWallet } from '../../config/logos/generated';
import { createConnectorTestSuite } from '../test-helper';
import { polkadotjsConnector } from './polkadot-js';

describe(
  'polkadotjsConnector',
  createConnectorTestSuite({
    getConnector: () => polkadotjsConnector(),
    expected: {
      id: 'polkadot-js',
      name: 'Polkadot{.js}',
      icon: polkadotjsSubstrateWallet,
    },
  })
);
