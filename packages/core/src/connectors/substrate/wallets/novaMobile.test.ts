import { describe } from 'vitest';
import { novaSubstrateWallet } from '../../../config/logos/generated';
import { createConnectorTestSuite } from '../../test-helper';
import { novaMobileConnector } from './novaMobile';

describe(
  'novaMobileConnector',
  createConnectorTestSuite({
    getConnector: () => novaMobileConnector(),
    expected: {
      id: 'nova-mobile',
      name: 'Nova',
      icon: novaSubstrateWallet,
      injectorId: 'polkadot-js',
    },
    extraWindowProps: {
      walletExtension: {
        isNovaWallet: true,
      },
    },
  })
);
