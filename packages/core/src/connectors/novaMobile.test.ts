import { describe } from 'vitest';
import { novaMobileConnector } from './novaMobile';
import { createConnectorTestSuite } from './test-helper'
import { novaSVG } from '../config/logos/generated'

describe(
  'novaMobileConnector',
  createConnectorTestSuite({
    getConnector: () => novaMobileConnector(),
    expected: {
      id: 'polkadot-js',
      name: 'Nova Wallet (Mobile)',
      icon: novaSVG,
    },
    extraWindowProps: {
      walletExtension: {
        isNovaWallet: true
      }
    }
  })
)
