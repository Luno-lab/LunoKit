import { describe } from 'vitest';
import { subwalletConnector } from './subwallet';
import { createConnectorTestSuite } from './test-helper'
import { subwalletSVG } from '../config/logos/generated'

describe(
  'subwalletConnector',
  createConnectorTestSuite({
    getConnector: () => subwalletConnector(),
    expected: {
      id: 'subwallet-js',
      name: 'SubWallet',
      icon: subwalletSVG,
    },
  })
)
