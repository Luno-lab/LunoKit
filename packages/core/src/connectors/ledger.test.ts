import { describe } from 'vitest';
import { ledgerWallet } from '../config/logos/generated';
import { ledgerConnector } from './ledger';
import { createWalletConnectTestSuite } from './test-helper';

describe(
  'ledgerConnector',
  createWalletConnectTestSuite({
    getConnector: ledgerConnector,
    expected: {
      id: 'ledger',
      name: 'Ledger',
      icon: ledgerWallet,
    },
  })
);
