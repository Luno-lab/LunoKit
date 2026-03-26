import { describe } from 'vitest';
import { subwalletEvmWallet } from '../../../config/logos/generated';
import { createEvmInjectedTestSuite } from '../test-helper';
import { subwalletConnector } from './subwallet';

describe(
  'subwalletConnector',
  createEvmInjectedTestSuite({
    getConnector: () => subwalletConnector(),
    expected: {
      id: 'subwallet',
      name: 'Subwallet',
      icon: subwalletEvmWallet,
      rdns: 'app.subwallet',
    },
  })
);
