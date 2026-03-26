import { describe } from 'vitest';
import { talismanEvmWallet } from '../../../config/logos/generated';
import { createEvmInjectedTestSuite } from '../test-helper';
import { talismanConnector } from './talisman';

describe(
  'talismanConnector',
  createEvmInjectedTestSuite({
    getConnector: () => talismanConnector(),
    expected: {
      id: 'talisman',
      name: 'Talisman',
      icon: talismanEvmWallet,
      rdns: 'xyz.talisman',
    },
  })
);
