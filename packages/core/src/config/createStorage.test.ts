import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createStorage } from './createStorage'
import type { RawStorage, LunoStorage } from '../types'

describe('createStorage', () => {
  let mockRawStorage: RawStorage
  let storage: LunoStorage

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})

    mockRawStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    }
  })

  describe('basic functionality', () => {
    it('should create storage with default prefix', () => {
      storage = createStorage({ storage: mockRawStorage })

      expect(storage).toHaveProperty('getItem')
      expect(storage).toHaveProperty('setItem')
      expect(storage).toHaveProperty('removeItem')
    })

    it('should create storage with custom prefix', () => {
      storage = createStorage({
        storage: mockRawStorage,
        keyPrefix: 'custom.'
      })

      expect(storage).toHaveProperty('getItem')
      expect(storage).toHaveProperty('setItem')
      expect(storage).toHaveProperty('removeItem')
    })
  })

  describe('key prefix handling', () => {
    it('should add default prefix to keys', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue('test-value')
      storage = createStorage({ storage: mockRawStorage })

      await storage.getItem('test-key')

      expect(mockRawStorage.getItem).toHaveBeenCalledWith('luno.test-key')
    })

    it('should add custom prefix to keys', async () => {
      mockRawStorage.setItem = vi.fn().mockResolvedValue(undefined)
      storage = createStorage({
        storage: mockRawStorage,
        keyPrefix: 'myapp.'
      })

      await storage.setItem('user-data', 'test-value')

      expect(mockRawStorage.setItem).toHaveBeenCalledWith('myapp.user-data', 'test-value')
    })

    it('should handle empty prefix', async () => {
      mockRawStorage.removeItem = vi.fn().mockResolvedValue(undefined)
      storage = createStorage({
        storage: mockRawStorage,
        keyPrefix: ''
      })

      await storage.removeItem('test-key')

      expect(mockRawStorage.removeItem).toHaveBeenCalledWith('test-key')
    })

    it('should handle prefix with special characters', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue('test-value')
      storage = createStorage({
        storage: mockRawStorage,
        keyPrefix: 'my-app_v1.0:'
      })

      await storage.getItem('test-key')

      expect(mockRawStorage.getItem).toHaveBeenCalledWith('my-app_v1.0:test-key')
    })

    it('should handle prefix ending without separator', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue('test-value')
      storage = createStorage({
        storage: mockRawStorage,
        keyPrefix: 'myapp'
      })

      await storage.getItem('test-key')

      expect(mockRawStorage.getItem).toHaveBeenCalledWith('myapptest-key')
    })
  })

  describe('getItem', () => {
    beforeEach(() => {
      storage = createStorage({ storage: mockRawStorage })
    })

    it('should return string value from storage', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue('test-value')

      const result = await storage.getItem('test-key')

      expect(result).toBe('test-value')
      expect(mockRawStorage.getItem).toHaveBeenCalledWith('luno.test-key')
    })

    it('should return null when storage returns null', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue(null)

      const result = await storage.getItem('test-key')

      expect(result).toBe(null)
    })

    it('should return null when storage returns undefined', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue(undefined)

      const result = await storage.getItem('test-key')

      expect(result).toBe(null)
    })

    it('should convert non-string values to strings', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue(123)

      const result = await storage.getItem('test-key')

      expect(result).toBe('123')
    })

    it('should return null and log error when getItem throws', async () => {
      const error = new Error('Storage error')
      mockRawStorage.getItem = vi.fn().mockRejectedValue(error)
      const consoleSpy = vi.spyOn(console, 'error')

      const result = await storage.getItem('test-key')

      expect(result).toBe(null)
      expect(consoleSpy).toHaveBeenCalledWith(
        '[LunoStorage] Error getting item "test-key" (full key: "luno.test-key"):',
        error
      )
    })
  })

  describe('setItem', () => {
    beforeEach(() => {
      storage = createStorage({ storage: mockRawStorage })
    })

    it('should set item in storage', async () => {
      mockRawStorage.setItem = vi.fn().mockResolvedValue(undefined)

      await storage.setItem('test-key', 'test-value')

      expect(mockRawStorage.setItem).toHaveBeenCalledWith('luno.test-key', 'test-value')
    })

    it('should log error when setItem throws but not rethrow', async () => {
      const error = new Error('Storage error')
      mockRawStorage.setItem = vi.fn().mockRejectedValue(error)
      const consoleSpy = vi.spyOn(console, 'error')

      await expect(storage.setItem('test-key', 'test-value')).resolves.toBeUndefined()

      expect(consoleSpy).toHaveBeenCalledWith(
        '[LunoStorage] Error setting item "test-key" (full key: "luno.test-key"):',
        error
      )
    })
  })

  describe('removeItem', () => {
    beforeEach(() => {
      storage = createStorage({ storage: mockRawStorage })
    })

    it('should remove item from storage', async () => {
      mockRawStorage.removeItem = vi.fn().mockResolvedValue(undefined)

      await storage.removeItem('test-key')

      expect(mockRawStorage.removeItem).toHaveBeenCalledWith('luno.test-key')
    })

    it('should log error when removeItem throws but not rethrow', async () => {
      const error = new Error('Storage error')
      mockRawStorage.removeItem = vi.fn().mockRejectedValue(error)
      const consoleSpy = vi.spyOn(console, 'error')

      await expect(storage.removeItem('test-key')).resolves.toBeUndefined()

      expect(consoleSpy).toHaveBeenCalledWith(
        '[LunoStorage] Error removing item "test-key" (full key: "luno.test-key"):',
        error
      )
    })
  })

  describe('edge cases', () => {
    it('should handle empty key suffix', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue('value')
      storage = createStorage({ storage: mockRawStorage })

      await storage.getItem('')

      expect(mockRawStorage.getItem).toHaveBeenCalledWith('luno.')
    })

    it('should handle special characters in key suffix', async () => {
      mockRawStorage.setItem = vi.fn().mockResolvedValue(undefined)
      storage = createStorage({ storage: mockRawStorage })

      await storage.setItem('user:123/data', 'test-value')

      expect(mockRawStorage.setItem).toHaveBeenCalledWith('luno.user:123/data', 'test-value')
    })

    it('should handle multiple consecutive operations', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue('value')
      mockRawStorage.setItem = vi.fn().mockResolvedValue(undefined)
      mockRawStorage.removeItem = vi.fn().mockResolvedValue(undefined)
      storage = createStorage({ storage: mockRawStorage })

      await storage.setItem('key1', 'value1')
      await storage.getItem('key1')
      await storage.removeItem('key1')

      expect(mockRawStorage.setItem).toHaveBeenCalledWith('luno.key1', 'value1')
      expect(mockRawStorage.getItem).toHaveBeenCalledWith('luno.key1')
      expect(mockRawStorage.removeItem).toHaveBeenCalledWith('luno.key1')
    })

    it('should handle very long keys', async () => {
      const longKey = 'user_session_data_with_timestamp_and_details'.repeat(2)
      mockRawStorage.setItem = vi.fn().mockResolvedValue(undefined)
      storage = createStorage({ storage: mockRawStorage })

      await storage.setItem(longKey, 'test-value')

      expect(mockRawStorage.setItem).toHaveBeenCalledWith(`luno.${longKey}`, 'test-value')
    })

    it('should handle values with special characters', async () => {
      const specialValue = '{"test": "value with\nnewline and\ttab"}'
      mockRawStorage.setItem = vi.fn().mockResolvedValue(undefined)
      storage = createStorage({ storage: mockRawStorage })

      await storage.setItem('test-key', specialValue)

      expect(mockRawStorage.setItem).toHaveBeenCalledWith('luno.test-key', specialValue)
    })

  })

  describe('type compatibility', () => {
    it('should work with localStorage-like storage', async () => {
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue('localStorage-value'),
        setItem: vi.fn(),
        removeItem: vi.fn()
      }

      storage = createStorage({ storage: mockLocalStorage })

      const result = await storage.getItem('test-key')
      expect(result).toBe('localStorage-value')
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('luno.test-key')
    })
  })

  describe('data normalization', () => {
    beforeEach(() => {
      storage = createStorage({ storage: mockRawStorage })
    })

    it('should convert number to string', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue(123)
      const result = await storage.getItem('test-key')
      expect(result).toBe('123')
    })

    it('should convert boolean to string', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue(true)
      const result = await storage.getItem('test-key')
      expect(result).toBe('true')
    })

    it('should convert object to string', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue({ key: 'value' })
      const result = await storage.getItem('test-key')
      expect(result).toBe('[object Object]')
    })

    it('should handle zero value', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue(0)
      const result = await storage.getItem('test-key')
      expect(result).toBe('0')
    })

    it('should handle empty string value', async () => {
      mockRawStorage.getItem = vi.fn().mockResolvedValue('')
      const result = await storage.getItem('test-key')
      expect(result).toBe('')
    })
  })
})
