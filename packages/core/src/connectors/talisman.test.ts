import { describe } from 'vitest';
import { talismanConnector } from './talisman';
import { createConnectorTestSuite } from './test-helper'
import { talismanWallet } from '../config/logos/generated'

describe(
  'subwalletConnector',
  createConnectorTestSuite({
    getConnector: () => talismanConnector(),
    expected: {
      id: 'talisman',
      name: 'Talisman',
      icon: talismanWallet,
    },
  })
)
