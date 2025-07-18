import { describe } from 'vitest'
import { CommonConnector } from './common'
import { createConnectorTestSuite } from './test-helper'

const options = {
  id: 'mock-connector',
  name: 'Mock connector',
  icon: 'mock-connector-icon',
};

describe(
  'CommonConnector',
  createConnectorTestSuite({
    getConnector: () => new CommonConnector(options),
    expected: options,
  })
);
