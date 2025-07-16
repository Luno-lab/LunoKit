import { describe } from 'vitest';
import { talismanConnector } from './talisman';
import { createConnectorTestSuite } from './test-helper'
import { talismanSVG } from '../config/logos/generated'

describe(
  'subwalletConnector',
  createConnectorTestSuite({
    getConnector: () => talismanConnector(),
    expected: {
      id: 'talisman',
      name: 'Talisman',
      icon: talismanSVG,
    },
  })
)
