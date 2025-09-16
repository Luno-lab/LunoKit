import { describe } from 'vitest';
import { fearlessWallet } from '../config/logos/generated';
import { fearlessConnector } from './fearless';
import { createConnectorTestSuite } from './test-helper';

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
);
