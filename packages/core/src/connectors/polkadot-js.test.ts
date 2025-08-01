import { describe } from 'vitest';
import { polkadotjsConnector } from './polkadot-js';
import { createConnectorTestSuite } from './test-helper'
import { polkadotjsSVG } from '../config/logos/generated'

describe(
  'polkadotjsConnector',
  createConnectorTestSuite({
    getConnector: () => polkadotjsConnector(),
    expected: {
      id: 'polkadot-js',
      name: 'Polkadot{.js}',
      icon: polkadotjsSVG,
    },
  })
)
