import { describe } from 'vitest';
import { createWalletConnectTestSuite } from './test-helper';
import { ledgerWallet } from '../config/logos/generated';
import { ledgerConnector } from './ledger'

describe('ledgerConnector',
  createWalletConnectTestSuite({
    getConnector: ledgerConnector,
    expected: {
      id: 'ledger',
      name: 'Ledger',
      icon: ledgerWallet,
    },
  })
);
