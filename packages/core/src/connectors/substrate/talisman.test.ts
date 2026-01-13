import { describe } from 'vitest';
import { talismanSubstrateWallet } from '../../config/logos/generated';
import { createConnectorTestSuite } from '../test-helper';
import { talismanConnector } from './talisman';

describe(
  'subwalletConnector',
  createConnectorTestSuite({
    getConnector: () => talismanConnector(),
    expected: {
      id: 'talisman',
      name: 'Talisman',
      icon: talismanSubstrateWallet,
    },
  })
);
