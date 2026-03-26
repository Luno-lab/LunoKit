import { describe } from 'vitest';
import { metamaskEvmWallet } from '../../../config/logos/generated';
import { createEvmInjectedTestSuite } from '../test-helper';
import { metamaskConnector } from './metamask';

describe(
  'metamaskConnector',
  createEvmInjectedTestSuite({
    getConnector: () => metamaskConnector(),
    expected: {
      id: 'metaMask',
      name: 'MetaMask',
      icon: metamaskEvmWallet,
      rdns: 'io.metamask',
    },
  })
);
