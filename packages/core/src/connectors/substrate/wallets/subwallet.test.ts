import { describe } from 'vitest';
import { subwalletSubstrateWallet } from '../../../config/logos/generated';
import { createConnectorTestSuite } from '../../test-helper';
import { subwalletConnector } from './subwallet';

describe(
  'subwalletConnector',
  createConnectorTestSuite({
    getConnector: () => subwalletConnector(),
    expected: {
      id: 'subwallet-js',
      name: 'SubWallet',
      icon: subwalletSubstrateWallet,
    },
  })
);
