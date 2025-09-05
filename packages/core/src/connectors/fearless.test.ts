import { describe } from 'vitest';
import { fearlessConnector } from './fearless';
import { createConnectorTestSuite } from './test-helper'
import { fearlessWallet } from '../config/logos/generated'

describe(
  'fearlessConnector',
  createConnectorTestSuite({
    getConnector: () => fearlessConnector(),
    expected: {
      id: 'fearless-wallet',
      name: 'Fearless',
      icon: fearlessWallet,
    },
  })
)
