import { describe } from 'vitest';
import { talismanWallet } from '../config/logos/generated';
import { talismanConnector } from './talisman';
import { createConnectorTestSuite } from './test-helper';

describe(
  'subwalletConnector',
  createConnectorTestSuite({
    getConnector: () => talismanConnector(),
    expected: {
      id: 'talisman',
      name: 'Talisman',
      icon: talismanWallet,
    },
  })
);
