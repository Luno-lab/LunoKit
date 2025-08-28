import { describe } from 'vitest';
import { enkryptConnector } from './enkrypt';
import { createConnectorTestSuite } from './test-helper'
import { enkryptWallet } from '../config/logos/generated'

describe(
  'enkryptConnector',
  createConnectorTestSuite({
    getConnector: () => enkryptConnector(),
    expected: {
      id: 'enkrypt',
      name: 'Enkrypt Wallet',
      icon: enkryptWallet,
    },
  })
)
