import { describe } from 'vitest';
import { createConnectorTestSuite } from '../../test-helper';
import { InjectConnector } from './inject';

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
