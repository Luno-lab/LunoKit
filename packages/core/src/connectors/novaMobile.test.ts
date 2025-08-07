import { describe } from 'vitest';
import { novaMobileConnector } from './novaMobile';
import { createConnectorTestSuite } from './test-helper'
import { novaSVG } from '../config/logos/generated'

describe(
  'novaMobileConnector',
  createConnectorTestSuite({
    getConnector: () => novaMobileConnector(),
    expected: {
      id: 'nova-mobile',
      name: 'Nova Wallet (Mobile)',
      icon: novaSVG,
      injectorId: 'polkadot-js',
    },
    extraWindowProps: {
      walletExtension: {
        isNovaWallet: true
      }
    }
  })
)
