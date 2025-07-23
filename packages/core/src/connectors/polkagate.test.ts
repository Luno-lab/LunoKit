import { describe } from 'vitest';
import { polkagateConnector } from './polkagate';
import { createConnectorTestSuite } from './test-helper'
import { polkagateSVG } from '../config/logos/generated'

describe(
  'polkagateConnector',
  createConnectorTestSuite({
    getConnector: () => polkagateConnector(),
    expected: {
      id: 'polkagate',
      name: 'Polkagate',
      icon: polkagateSVG,
    },
  })
)
