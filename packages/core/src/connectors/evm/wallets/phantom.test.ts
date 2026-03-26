import { describe } from 'vitest';
import { phatomEvmWallet } from '../../../config/logos/generated';
import { createEvmInjectedTestSuite } from '../test-helper';
import { phatomConnector } from './phantom';

describe(
  'phatomConnector',
  createEvmInjectedTestSuite({
    getConnector: () => phatomConnector(),
    expected: {
      id: 'phatom',
      name: 'Phatom',
      icon: phatomEvmWallet,
      rdns: 'app.phantom',
    },
  })
);
