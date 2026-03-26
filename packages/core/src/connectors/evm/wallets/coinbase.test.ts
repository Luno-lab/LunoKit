import { describe } from 'vitest';
import { coinbaseEvmWallet } from '../../../config/logos/generated';
import { createEvmInjectedTestSuite } from '../test-helper';
import { coinbaseConnector } from './coinbase';

describe(
  'coinbaseConnector',
  createEvmInjectedTestSuite({
    getConnector: () => coinbaseConnector(),
    expected: {
      id: 'coinbase',
      name: 'Coinbase',
      icon: coinbaseEvmWallet,
      rdns: 'com.coinbase.wallet',
    },
  })
);
