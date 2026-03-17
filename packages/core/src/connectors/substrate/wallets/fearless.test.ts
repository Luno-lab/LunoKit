import { describe } from 'vitest';
import { fearlessSubstrateWallet } from '../../../config/logos/generated';
import { createConnectorTestSuite } from '../../test-helper';
import { fearlessConnector } from './fearless';

describe(
  'fearlessConnector',
  createConnectorTestSuite({
    getConnector: () => fearlessConnector(),
    expected: {
      id: 'fearless-wallet',
      name: 'Fearless',
      icon: fearlessSubstrateWallet,
    },
  })
);
