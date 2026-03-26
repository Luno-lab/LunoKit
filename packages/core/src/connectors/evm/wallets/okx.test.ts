import { describe } from 'vitest';
import { okxEvmWallet } from '../../../config/logos/generated';
import { createEvmInjectedTestSuite } from '../test-helper';
import { okxConnector } from './okx';

describe(
  'okxConnector',
  createEvmInjectedTestSuite({
    getConnector: () => okxConnector(),
    expected: {
      id: 'okxwallet',
      name: 'OKX Wallet',
      icon: okxEvmWallet,
      rdns: 'com.okex.wallet',
    },
  })
);
