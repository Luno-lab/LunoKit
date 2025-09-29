import { describe } from 'vitest';
import { novaWallet } from '../config/logos/generated';
import { novaMobileConnector } from './novaMobile';
import { createConnectorTestSuite } from './test-helper';

describe(
  'novaMobileConnector',
  createConnectorTestSuite({
    getConnector: () => novaMobileConnector(),
    expected: {
      id: 'nova-mobile',
      name: 'Nova',
      icon: novaWallet,
      injectorId: 'polkadot-js',
    },
    extraWindowProps: {
      walletExtension: {
        isNovaWallet: true,
      },
    },
  })
);
