import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { BaseConnector } from './base'

interface ConnectorTestConfig<T> {
  getConnector: () => T;
  expected: {
    id: string;
    name: string;
    icon: string;
  };
}

interface MockInjector {
  accounts: {
    get: any
    subscribe: any
  }
  signer: {
    signRaw: any
  }
}

export function createConnectorTestSuite<T extends BaseConnector>(
  config: ConnectorTestConfig<T>
) {
  return () => {
    let connector: T;
    let mockInjectedWeb3: Record<string, any>
    let mockInjector: MockInjector
    let originalWindow: any

    const TEST_ADDRESS = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg'

    const { id, name, icon} = config.expected

    beforeEach(() => {
      connector = config.getConnector();
      originalWindow = globalThis.window

      mockInjector = {
        accounts: {
          get: vi.fn(),
          subscribe: vi.fn(),
        },
        signer: {
          signRaw: vi.fn(),
        },
      }

      mockInjectedWeb3 = {
        [id]: {
          enable: vi.fn(),
        }
      }

      Object.defineProperty(globalThis, 'window', {
        value: { injectedWeb3: mockInjectedWeb3 },
        writable: true,
        configurable: true,
      })

      vi.clearAllMocks()
    })

    afterEach(() => {
      Object.defineProperty(globalThis, 'window', {
        value: originalWindow,
        writable: true,
        configurable: true,
      })
      vi.restoreAllMocks()
    })

    describe('basic properties', () => {
      it('should have correct connector metadata', () => {
        expect(connector.id).toBe(id)
        expect(connector.name).toBe(name)
        expect(connector.icon).toBe(icon)
      })
    })

    describe('installation detection', () => {
      it('should detect when extension is installed', () => {
        expect(connector.isInstalled()).toBe(true)
      })

      it('should return false in non-browser environment', () => {
        Object.defineProperty(globalThis, 'window', {
          value: undefined,
          writable: true,
          configurable: true,
        })
        expect(connector.isInstalled()).toBe(false)
      })

      it('should return false when injectedWeb3 is undefined', () => {
        Object.defineProperty(globalThis, 'window', {
          value: {},
          writable: true,
          configurable: true,
        })
        expect(connector.isInstalled()).toBe(false)
      })

      it('should return false when extension not found', () => {
        Object.defineProperty(globalThis, 'window', {
          value: { injectedWeb3: {} },
          writable: true,
          configurable: true,
        })
        expect(connector.isInstalled()).toBe(false)
      })
    })

    describe('availability check', () => {
      it('should be available when installed', async () => {
        expect(await connector.isAvailable()).toBe(true)
      })

      it('should not be available when not installed', async () => {
        vi.spyOn(connector, 'isInstalled').mockReturnValue(false)
        expect(await connector.isAvailable()).toBe(false)
      })
    })

    describe('connection flow', () => {
      beforeEach(() => {
        mockInjectedWeb3[id].enable.mockResolvedValue(mockInjector)
        mockInjector.accounts.get.mockResolvedValue([
          { address: TEST_ADDRESS, name: 'Test Account' }
        ])
        mockInjector.accounts.subscribe.mockReturnValue(() => {})
      })

      it('should connect successfully with valid setup', async () => {
        const accounts = await connector.connect('test-app')

        expect(mockInjectedWeb3[id].enable).toHaveBeenCalledWith('test-app')
        expect(mockInjector.accounts.get).toHaveBeenCalled()
        expect(accounts).toHaveLength(1)
        expect(accounts[0].address).toBe(TEST_ADDRESS)
      })

      it('should handle already connected state', async () => {
        await connector.connect('test-app')
        const accounts = await connector.connect('test-app')
        expect(accounts).toHaveLength(1)
        expect(mockInjectedWeb3[id].enable).toHaveBeenCalledTimes(1)
      })

      it('should throw error when extension not available', async () => {
        vi.spyOn(connector, 'isAvailable').mockResolvedValue(false)
        await expect(connector.connect('test-app')).rejects.toThrow(
          `${name} extension not found or not enabled.`
        )
      })

      it('should throw error when injectedWeb3 not found', async () => {
        Object.defineProperty(globalThis, 'window', {
          value: {
            injectedWeb3: {
              'other-wallet': { enable: vi.fn() },
              'another-wallet': { enable: vi.fn() }
            }
          },
          writable: true,
          configurable: true,
        })

        await expect(connector.connect('test-app')).rejects.toThrow(
          `${name} extension not found or not enabled.`
        )
      })

      it('should throw error when enable fails', async () => {
        mockInjectedWeb3[id].enable.mockResolvedValue(null)

        await expect(connector.connect('test-app')).rejects.toThrow(
          `Failed to enable the '${id}' extension.`
        )
      })

      it('should throw error when no accounts found', async () => {
        mockInjector.accounts.get.mockResolvedValue([])

        await expect(connector.connect('test-app')).rejects.toThrow(
          `No accounts found in ${name}. Make sure accounts are visible and access is granted.`
        )
      })

      it('should cleanup on connection failure', async () => {
        mockInjectedWeb3[id].enable.mockRejectedValue(new Error('Enable failed'))

        await expect(connector.connect('test-app')).rejects.toThrow('Enable failed')

        const accounts = await connector.getAccounts()
        const signer = await connector.getSigner()
        expect(accounts).toEqual([])
        expect(signer).toBeUndefined()
      })

      it('should setup account subscription on successful connection', async () => {
        await connector.connect('test-app')
        expect(mockInjector.accounts.subscribe).toHaveBeenCalled()
      })

      it('should emit connect event', async () => {
        const connectSpy = vi.fn()
        connector.on('connect', connectSpy)

        await connector.connect('test-app')

        expect(connectSpy).toHaveBeenCalledWith([
          expect.objectContaining({
            address: TEST_ADDRESS
          })
        ])
      })

      it('should set correct source metadata for accounts', async () => {
        const accounts = await connector.connect('test-app')
        accounts.forEach(account => {
          expect(account.meta?.source).toBe(id)
        })
      })
    })

    describe('message signing', () => {
      beforeEach(async () => {
        mockInjectedWeb3[id].enable.mockResolvedValue(mockInjector)
        mockInjector.accounts.get.mockResolvedValue([
          { address: TEST_ADDRESS, name: 'Test' }
        ])
        mockInjector.accounts.subscribe.mockReturnValue(() => {})
        await connector.connect('test-app')
      })

      it('should sign message successfully', async () => {
        mockInjector.signer.signRaw.mockResolvedValue({ signature: '0xsignature123' })

        const signature = await connector.signMessage('hello world', TEST_ADDRESS)

        expect(signature).toBe('0xsignature123')
        expect(mockInjector.signer.signRaw).toHaveBeenCalledWith({
          address: TEST_ADDRESS,
          data: expect.any(String),
          type: 'bytes'
        })
      })

      it('should throw error when signing fails', async () => {
        mockInjector.signer.signRaw.mockRejectedValue(new Error('User rejected signing'))

        await expect(
          connector.signMessage('hello', TEST_ADDRESS)
        ).rejects.toThrow(`Connector ${id}: Failed to sign message: User rejected signing`)
      })

      it('should throw error when signer not available', async () => {
        await connector.disconnect()

        await expect(
          connector.signMessage('hello', TEST_ADDRESS)
        ).rejects.toThrow('Signer is not available or does not support signRaw.')
      })

      it('should throw error when signer does not support signRaw', async () => {
        const signerWithoutSignRaw = {}
        vi.spyOn(connector, 'getSigner').mockResolvedValue(signerWithoutSignRaw as any)

        await expect(
          connector.signMessage('hello', TEST_ADDRESS)
        ).rejects.toThrow('Signer is not available or does not support signRaw.')
      })

      it('should return undefined for invalid parameters', async () => {
        expect(await connector.signMessage('', TEST_ADDRESS)).toBeUndefined()
        expect(await connector.signMessage('hello world', '')).toBeUndefined()
        expect(await connector.signMessage(null as any, TEST_ADDRESS)).toBeUndefined()
        expect(await connector.signMessage('hello', null as any)).toBeUndefined()
        expect(await connector.signMessage(undefined as any, TEST_ADDRESS)).toBeUndefined()
        expect(await connector.signMessage('hello', undefined as any)).toBeUndefined()
        expect(await connector.signMessage('', '')).toBeUndefined()
        expect(await connector.signMessage(null as any, null as any)).toBeUndefined()
      })

      it('should throw error when signing with unmanaged address', async () => {
        await expect(
          connector.signMessage('hello world', 'unmanaged-address-12345')
        ).rejects.toThrow(`Address unmanaged-address-12345 is not managed by ${name}.`)
      })

      it('should handle case-insensitive address validation', async () => {
        mockInjector.signer.signRaw.mockResolvedValue({ signature: '0xsignature123' })

        const upperCaseAddress = TEST_ADDRESS.toUpperCase()
        const signature = await connector.signMessage('hello world', upperCaseAddress)

        expect(signature).toBe('0xsignature123')
      })
    })

    describe('disconnection', () => {
      it('should cleanup all resources on disconnect', async () => {
        mockInjectedWeb3[id].enable.mockResolvedValue(mockInjector)
        mockInjector.accounts.get.mockResolvedValue([
          { address: TEST_ADDRESS, name: 'Test' }
        ])
        const unsubscribeFn = vi.fn()
        mockInjector.accounts.subscribe.mockReturnValue(unsubscribeFn)

        await connector.connect('test-app')
        await connector.disconnect()

        const accounts = await connector.getAccounts()
        const signer = await connector.getSigner()
        expect(accounts).toEqual([])
        expect(signer).toBeUndefined()
        expect(unsubscribeFn).toHaveBeenCalled()
      })

      it('should emit disconnect event', async () => {
        const disconnectSpy = vi.fn()
        connector.on('disconnect', disconnectSpy)

        await connector.disconnect()

        expect(disconnectSpy).toHaveBeenCalled()
      })
    })

    describe('account subscription', () => {
      it('should handle account changes', async () => {
        let subscriptionCallback: any

        mockInjectedWeb3[id].enable.mockResolvedValue(mockInjector)
        mockInjector.accounts.get.mockResolvedValue([
          { address: TEST_ADDRESS, name: 'Test' }
        ])
        mockInjector.accounts.subscribe.mockImplementation((callback: any) => {
          subscriptionCallback = callback
          return () => {}
        })

        const accountsChangedSpy = vi.fn()
        connector.on('accountsChanged', accountsChangedSpy)

        await connector.connect('test-app')

        const newAccounts = [
          { address: TEST_ADDRESS, name: 'Updated Test' }
        ]
        subscriptionCallback(newAccounts)

        expect(accountsChangedSpy).toHaveBeenCalled()
      })
    })
  }
}

export function createConnectorFactoryTestSuite(
  factoryFunction: () => BaseConnector,
  expectedClass: any,
  expectedId: string,
  expectedName: string
) {
  return () => {
    it('should create new connector instance', () => {
      const connector = factoryFunction()
      expect(connector).toBeInstanceOf(expectedClass)
    })

    it('should create different instances each time', () => {
      const connector1 = factoryFunction()
      const connector2 = factoryFunction()
      expect(connector1).not.toBe(connector2)
    })

    it('should create instances with correct configuration', () => {
      const connector = factoryFunction()
      expect(connector.id).toBe(expectedId)
      expect(connector.name).toBe(expectedName)
    })
  }
}
