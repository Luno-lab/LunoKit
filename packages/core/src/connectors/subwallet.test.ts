import { describe, vi } from 'vitest'
import { SubWalletConnector, subwallet } from './subwallet'
import { createConnectorTestSuite, createConnectorFactoryTestSuite } from './test-helper'

vi.mock('dedot/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('dedot/utils')>()
  return {
    ...actual,
    stringToHex: vi.fn((str: string) => `0x${Buffer.from(str).toString('hex')}`),
  }
})

vi.mock('../config/logos/generated', () => ({
  subwalletSVG: 'mocked-subwallet-logo'
}))

describe('SubWalletConnector', createConnectorTestSuite({
  id: 'subwallet-js',
  name: 'SubWallet',
  iconMockValue: 'mocked-subwallet-logo',
  createConnector: () => new SubWalletConnector(),
  factoryFunction: subwallet
}))

describe('subwallet factory function', createConnectorFactoryTestSuite(
  subwallet,
  SubWalletConnector,
  'subwallet-js',
  'SubWallet'
))
