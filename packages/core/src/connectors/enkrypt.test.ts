import { describe } from 'vitest';
import { enkryptWallet } from '../config/logos/generated';
import { enkryptConnector } from './enkrypt';
import { createConnectorTestSuite } from './test-helper';

describe(
  'enkryptConnector',
  createConnectorTestSuite({
    getConnector: () => enkryptConnector(),
    expected: {
      id: 'enkrypt',
      name: 'Enkrypt',
      icon: enkryptWallet,
    },
  })
);
