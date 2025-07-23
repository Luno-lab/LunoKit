import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BaseConnector } from './base'
import type { Account, Signer } from '../types'

class TestConnector extends BaseConnector {
  readonly id = 'test-connector'
  readonly name = 'Test Connector'
  readonly icon = 'test-icon.svg'

  async isAvailable(): Promise<boolean> {
    return true
  }

  isInstalled(): boolean {
    return true
  }

  async connect(appName: string): Promise<Account[]> {
    const testAccounts: Account[] = [
      { address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg', name: 'Test Account' }
    ]
    this.accounts = testAccounts
    this.signer = {} as Signer
    this.emit('connect', [...testAccounts])
    return testAccounts
  }

  async disconnect(): Promise<void> {
    this.accounts = []
    this.signer = undefined
    this.connectionUri = undefined
    this.emit('disconnect')
  }

  async signMessage(message: string, address: string): Promise<string | undefined> {
    return `signed:${message}:${address}`
  }

  setConnectionUri(uri: string) {
    this.connectionUri = uri
  }

  hasConnectionUri(): boolean {
    return this.connectionUri !== undefined
  }

  async updateAccountsForChain(chainId: string): Promise<Account[]> {
    return [...this.accounts]
  }
}

describe('BaseConnector', () => {
  let connector: TestConnector

  beforeEach(() => {
    connector = new TestConnector()
  })

  describe('basic properties', () => {
    it('should have required abstract properties', () => {
      expect(connector.id).toBe('test-connector')
      expect(connector.name).toBe('Test Connector')
      expect(connector.icon).toBe('test-icon.svg')
    })

    it('should extend EventEmitter', () => {
      expect(connector.on).toBeDefined()
      expect(connector.emit).toBeDefined()
      expect(connector.off).toBeDefined()
    })
  })

  describe('account management', () => {
    it('should start with empty accounts', async () => {
      const accounts = await connector.getAccounts()
      expect(accounts).toEqual([])
    })

    it('should return accounts after connection', async () => {
      await connector.connect('test-app')
      const accounts = await connector.getAccounts()

      expect(accounts).toHaveLength(1)
      expect(accounts[0].address).toBe('1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg')
    })

    it('should return copied array of accounts', async () => {
      await connector.connect('test-app')
      const accounts1 = await connector.getAccounts()
      const accounts2 = await connector.getAccounts()

      expect(accounts1).toEqual(accounts2)
      expect(accounts1).not.toBe(accounts2)
    })

    it('should handle multiple connect calls gracefully', async () => {
      await connector.connect('test-app')
      const accounts1 = await connector.getAccounts()

      const accounts2 = await connector.connect('test-app')
      expect(accounts2).toEqual(accounts1)
    })
  })

  describe('signer management', () => {
    it('should start with undefined signer', async () => {
      const signer = await connector.getSigner()
      expect(signer).toBeUndefined()
    })

    it('should return signer after connection', async () => {
      await connector.connect('test-app')
      const signer = await connector.getSigner()

      expect(signer).toBeDefined()
    })

    it('should warn when signer not available', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      await connector.getSigner()

      expect(consoleSpy).toHaveBeenCalledWith(
        'Connector test-connector: Signer not available. Connection might be incomplete or failed.'
      )

      consoleSpy.mockRestore()
    })
  })

  describe('connection URI management', () => {
    it('should start with undefined connectionUri', async () => {
      const uri = await connector.getConnectionUri()
      expect(uri).toBeUndefined()
    })

    it('should return false for hasConnectionUri by default', () => {
      expect(connector.hasConnectionUri()).toBe(false)
    })

    it('should return connectionUri when set', async () => {
      const testUri = 'wc:test-connection-uri@1'
      connector.setConnectionUri(testUri)

      const uri = await connector.getConnectionUri()
      expect(uri).toBe(testUri)
      expect(connector.hasConnectionUri()).toBe(true)
    })

    it('should reset connectionUri after disconnect', async () => {
      connector.setConnectionUri('wc:test@1')
      await connector.connect('test-app')
      await connector.disconnect()

      const uri = await connector.getConnectionUri()
      expect(uri).toBeUndefined()
      expect(connector.hasConnectionUri()).toBe(false)
    })
  })

  describe('chain-specific account management', () => {
    it('should return current accounts by default for updateAccountsForChain', async () => {
      await connector.connect('test-app')
      const originalAccounts = await connector.getAccounts()

      const chainAccounts = await connector.updateAccountsForChain('polkadot:test-chain-id')

      expect(chainAccounts).toEqual(originalAccounts)
    })

    it('should handle updateAccountsForChain when not connected', async () => {
      const chainAccounts = await connector.updateAccountsForChain('polkadot:test-chain-id')
      expect(chainAccounts).toEqual([])
    })
  })

  describe('events', () => {
    it('should emit connect event', async () => {
      const connectSpy = vi.fn()
      connector.on('connect', connectSpy)

      await connector.connect('test-app')

      expect(connectSpy).toHaveBeenCalledWith([
        { address: '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg', name: 'Test Account' }
      ])
    })

    it('should emit disconnect event', async () => {
      const disconnectSpy = vi.fn()
      connector.on('disconnect', disconnectSpy)

      await connector.connect('test-app')
      await connector.disconnect()

      expect(disconnectSpy).toHaveBeenCalled()
    })
  })
})
