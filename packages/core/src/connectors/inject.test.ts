import { describe } from 'vitest';
import { InjectConnector } from './inject';
import { createConnectorTestSuite } from './test-helper';

const options = {
  id: 'mock-connector',
  name: 'Mock connector',
  icon: 'mock-connector-icon',
  injectorId: 'mock-injector',
  links: {},
};

describe(
  'InjectConnector',
  createConnectorTestSuite({
    getConnector: () => new InjectConnector(options),
    expected: options,
  })
);
