import { describe, it, expect } from 'vitest'
import type { Chain } from '../types'
import { polkadot } from './polkadot'
import { kusama } from './kusama'
import { paseo } from './paseo'
import { westend } from './westend'

describe('Chain Configurations', () => {
  const chains: Record<string, Chain> = {
    polkadot,
    kusama,
    paseo,
    westend
  }

  describe('Type Compliance', () => {
    Object.entries(chains).forEach(([chainName, chain]) => {
      describe(`${chainName} chain`, () => {
        it('should have all required fields', () => {
          expect(chain.genesisHash).toBeDefined()
          expect(typeof chain.genesisHash).toBe('string')
          expect(chain.genesisHash).toMatch(/^0x[a-fA-F0-9]{64}$/)

          expect(chain.name).toBeDefined()
          expect(typeof chain.name).toBe('string')
          expect(chain.name.length).toBeGreaterThan(0)

          expect(chain.ss58Format).toBeDefined()
          expect(typeof chain.ss58Format).toBe('number')
          expect(chain.ss58Format).toBeGreaterThanOrEqual(0)

          expect(chain.chainIconUrl).toBeDefined()
          expect(typeof chain.chainIconUrl).toBe('string')
        })

        it('should have valid nativeCurrency structure', () => {
          expect(chain.nativeCurrency).toBeDefined()
          expect(typeof chain.nativeCurrency).toBe('object')

          expect(chain.nativeCurrency.name).toBeDefined()
          expect(typeof chain.nativeCurrency.name).toBe('string')
          expect(chain.nativeCurrency.name.length).toBeGreaterThan(0)

          expect(chain.nativeCurrency.symbol).toBeDefined()
          expect(typeof chain.nativeCurrency.symbol).toBe('string')
          expect(chain.nativeCurrency.symbol.length).toBeGreaterThan(0)

          expect(chain.nativeCurrency.decimals).toBeDefined()
          expect(typeof chain.nativeCurrency.decimals).toBe('number')
          expect(chain.nativeCurrency.decimals).toBeGreaterThanOrEqual(0)
          expect(chain.nativeCurrency.decimals).toBeLessThanOrEqual(18)
        })

        it('should have valid rpcUrls structure', () => {
          expect(chain.rpcUrls).toBeDefined()
          expect(typeof chain.rpcUrls).toBe('object')

          const hasWebSocket = Array.isArray(chain.rpcUrls.webSocket)
          const hasHttp = Array.isArray(chain.rpcUrls.http)
          expect(hasWebSocket || hasHttp).toBe(true)

          if (chain.rpcUrls.webSocket) {
            expect(Array.isArray(chain.rpcUrls.webSocket)).toBe(true)
            expect(chain.rpcUrls.webSocket.length).toBeGreaterThan(0)
            chain.rpcUrls.webSocket.forEach(url => {
              expect(typeof url).toBe('string')
              expect(url).toMatch(/^wss?:\/\//)
            })
          }

          if (chain.rpcUrls.http) {
            expect(Array.isArray(chain.rpcUrls.http)).toBe(true)
            expect(chain.rpcUrls.http.length).toBeGreaterThan(0)
            chain.rpcUrls.http.forEach(url => {
              expect(typeof url).toBe('string')
              expect(url).toMatch(/^https?:\/\//)
            })
          }
        })

        it('should have valid blockExplorers structure if present', () => {
          if (chain.blockExplorers) {
            expect(typeof chain.blockExplorers).toBe('object')

            if (chain.blockExplorers.default) {
              expect(typeof chain.blockExplorers.default.name).toBe('string')
              expect(chain.blockExplorers.default.name.length).toBeGreaterThan(0)
              expect(typeof chain.blockExplorers.default.url).toBe('string')
              expect(chain.blockExplorers.default.url).toMatch(/^https?:\/\//)
            }

            Object.entries(chain.blockExplorers).forEach(([key, explorer]) => {
              if (key !== 'default' && explorer) {
                expect(typeof explorer.name).toBe('string')
                expect(explorer.name.length).toBeGreaterThan(0)
                expect(typeof explorer.url).toBe('string')
                expect(explorer.url).toMatch(/^https?:\/\//)
              }
            })
          }
        })

        it('should have valid optional fields if present', () => {
          if (chain.testnet !== undefined) {
            expect(typeof chain.testnet).toBe('boolean')
          }

          if (chain.meta !== undefined) {
            expect(typeof chain.meta).toBe('object')
            expect(chain.meta).not.toBeNull()
          }
        })
      })
    })
  })

  describe('Chain Collection Validation', () => {
    it('should have unique genesis hashes', () => {
      const genesisHashes = Object.values(chains).map(chain => chain.genesisHash)
      const uniqueHashes = new Set(genesisHashes)
      expect(uniqueHashes.size).toBe(genesisHashes.length)
    })

    it('should have unique chain names', () => {
      const chainNames = Object.values(chains).map(chain => chain.name)
      const uniqueNames = new Set(chainNames)
      expect(uniqueNames.size).toBe(chainNames.length)
    })

    it('should have unique currency symbols', () => {
      const symbols = Object.values(chains).map(chain => chain.nativeCurrency.symbol)
      const uniqueSymbols = new Set(symbols)
      expect(uniqueSymbols.size).toBe(symbols.length)
    })

    it('should export all expected chains', () => {
      expect(chains.polkadot).toBeDefined()
      expect(chains.kusama).toBeDefined()
      expect(chains.paseo).toBeDefined()
      expect(chains.westend).toBeDefined()
    })
  })

  describe('Business Logic Validation', () => {
    it('should mark testnets correctly', () => {
      expect(chains.paseo.testnet).toBe(true)
      expect(chains.westend.testnet).toBe(true)

      expect(chains.polkadot.testnet).toBeFalsy()
      expect(chains.kusama.testnet).toBeFalsy()
    })

    it('should have appropriate ss58 formats', () => {
      expect(chains.polkadot.ss58Format).toBe(0)
      expect(chains.kusama.ss58Format).toBe(2)
    })
  })
})
