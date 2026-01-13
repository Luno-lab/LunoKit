import { describe } from 'vitest';
import { enkryptSubstrateWallet } from '../../config/logos/generated';
import { createConnectorTestSuite } from '../test-helper';
import { enkryptConnector } from './enkrypt';

describe(
  'enkryptConnector',
  createConnectorTestSuite({
    getConnector: () => enkryptConnector(),
    expected: {
      id: 'enkrypt',
      name: 'Enkrypt',
      icon: enkryptSubstrateWallet,
    },
  })
);
