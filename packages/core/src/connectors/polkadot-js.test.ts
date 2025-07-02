import { describe, vi } from 'vitest'
import { PolkadotJsConnector, polkadotjs } from './polkadot-js'
import { createConnectorTestSuite, createConnectorFactoryTestSuite } from './test-helper'

vi.mock('dedot/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('dedot/utils')>()
  return {
    ...actual,
    stringToHex: vi.fn((str: string) => `0x${Buffer.from(str).toString('hex')}`),
  }
})

vi.mock('../config/logos/generated', () => ({
  polkadotjsSVG: 'mocked-polkadot-logo'
}))

describe('PolkadotJsConnector', createConnectorTestSuite({
  id: 'polkadot-js',
  name: 'Polkadot{.js}',
  iconMockValue: 'mocked-polkadot-logo',
  createConnector: () => new PolkadotJsConnector(),
  factoryFunction: polkadotjs
}))

describe('polkadotjs factory function', createConnectorFactoryTestSuite(
  polkadotjs,
  PolkadotJsConnector,
  'polkadot-js',
  'Polkadot{.js}'
))
