import { describe } from 'vitest';
import { novaMobileConnector } from './novaMobile';
import { createConnectorTestSuite } from './test-helper'
import { novaWallet } from '../config/logos/generated'

describe(
  'novaMobileConnector',
  createConnectorTestSuite({
    getConnector: () => novaMobileConnector(),
    expected: {
      id: 'nova-mobile',
      name: 'Nova Wallet',
      icon: novaWallet,
      injectorId: 'polkadot-js',
    },
    extraWindowProps: {
      walletExtension: {
        isNovaWallet: true
      }
    }
  })
)
