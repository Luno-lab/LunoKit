import { describe } from 'vitest';
import { subwalletConnector } from './subwallet';
import { createConnectorTestSuite } from './test-helper'
import { subwalletWallet } from '../config/logos/generated'

describe(
  'subwalletConnector',
  createConnectorTestSuite({
    getConnector: () => subwalletConnector(),
    expected: {
      id: 'subwallet-js',
      name: 'SubWallet',
      icon: subwalletWallet,
    },
  })
)
