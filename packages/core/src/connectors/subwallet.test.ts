import { describe } from 'vitest';
import { subwalletWallet } from '../config/logos/generated';
import { subwalletConnector } from './subwallet';
import { createConnectorTestSuite } from './test-helper';

describe(
  'subwalletConnector',
  createConnectorTestSuite({
    getConnector: () => subwalletConnector(),
    expected: {
      id: 'subwallet-js',
      name: 'SubWallet',
      icon: subwalletWallet,
    },
  })
);
