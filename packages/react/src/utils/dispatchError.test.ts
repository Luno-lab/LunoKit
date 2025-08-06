import { describe, it, expect, vi } from 'vitest'
import { getReadableDispatchError } from './dispatchError'
import { LegacyClient } from 'dedot'
import { DispatchError } from 'dedot/codecs'

const mockApi = {
  registry: {
    findErrorMeta: vi.fn()
  }
} as unknown as LegacyClient

const createMockDispatchError = {
  module: (index: number, error: string): DispatchError => ({
    type: 'Module',
    value: { index, error }
  } as DispatchError),

  token: (value: string): DispatchError => ({
    type: 'Token',
    value
  } as DispatchError),

  arithmetic: (value: string): DispatchError => ({
    type: 'Arithmetic',
    value
  } as DispatchError),

  transactional: (value: string): DispatchError => ({
    type: 'Transactional',
    value
  } as DispatchError),

  badOrigin: (): DispatchError => ({
    type: 'BadOrigin'
  } as DispatchError),

  cannotLookup: (): DispatchError => ({
    type: 'CannotLookup'
  } as DispatchError),

  other: (): DispatchError => ({
    type: 'Other'
  } as DispatchError)
}

describe('getReadableDispatchError', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Module errors', () => {
    it('should return decoded error message when findErrorMeta succeeds', () => {
      const mockErrorMeta = {
        pallet: 'Balances',
        name: 'InsufficientBalance',
        docs: ['The account balance is too low.'],
        fields: [],
        fieldCodecs: [],
        index: 0,
        palletIndex: 5
      }

      mockApi.registry.findErrorMeta.mockReturnValue(mockErrorMeta)

      const dispatchError = createMockDispatchError.module(5, '0x00000000')
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(mockApi.registry.findErrorMeta).toHaveBeenCalledWith(dispatchError)
      expect(result).toBe('[useSendTransaction]: Balances.InsufficientBalance error,  The account balance is too low.')
    })

    it('should handle empty docs array', () => {
      const mockErrorMeta = {
        pallet: 'System',
        name: 'InvalidTransaction',
        docs: [],
        fields: [],
        fieldCodecs: [],
        index: 1,
        palletIndex: 0
      }

      mockApi.registry.findErrorMeta.mockReturnValue(mockErrorMeta)

      const dispatchError = createMockDispatchError.module(0, '0x00000001')
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: System.InvalidTransaction error,  ')
    })

    it('should handle multiple docs entries', () => {
      const mockErrorMeta = {
        pallet: 'Assets',
        name: 'NoPermission',
        docs: ['The account does not have permission.', 'Check your account privileges.'],
        fields: [],
        fieldCodecs: [],
        index: 2,
        palletIndex: 50
      }

      mockApi.registry.findErrorMeta.mockReturnValue(mockErrorMeta)

      const dispatchError = createMockDispatchError.module(50, '0x00000002')
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Assets.NoPermission error,  The account does not have permission. Check your account privileges.')
    })

    it('should return raw error when findErrorMeta returns null', () => {
      mockApi.registry.findErrorMeta.mockReturnValue(null)

      const dispatchError = createMockDispatchError.module(5, '0x00000000')
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Module Error (index: 5, error: 0x00000000)')
    })

    it('should handle findErrorMeta throwing an error', () => {
      const error = new Error('Failed to decode error metadata')
      mockApi.registry.findErrorMeta.mockImplementation(() => {
        throw error
      })

      const dispatchError = createMockDispatchError.module(5, '0x00000000')
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Module Error (index: 5, error: 0x00000000) - Failed to decode: Failed to decode error metadata')
    })

    it('should handle findErrorMeta throwing non-Error object', () => {
      mockApi.registry.findErrorMeta.mockImplementation(() => {
        throw 'String error'
      })

      const dispatchError = createMockDispatchError.module(10, '0x00000005')
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Module Error (index: 10, error: 0x00000005) - Failed to decode: Unknown error')
    })
  })

  describe('Token errors', () => {
    it('should return token error message', () => {
      const dispatchError = createMockDispatchError.token('FundsUnavailable')
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Token Error: FundsUnavailable')
    })

    it('should handle different token error types', () => {
      const errorTypes = ['BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen']

      errorTypes.forEach(errorType => {
        const dispatchError = createMockDispatchError.token(errorType)
        const result = getReadableDispatchError(mockApi, dispatchError)

        expect(result).toBe(`[useSendTransaction]: Token Error: ${errorType}`)
      })
    })
  })

  describe('Other error types with value', () => {
    it('should handle Arithmetic errors', () => {
      const dispatchError = createMockDispatchError.arithmetic('Overflow')
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Arithmetic Error: Overflow')
    })

    it('should handle Transactional errors', () => {
      const dispatchError = createMockDispatchError.transactional('LimitReached')
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Transactional Error: LimitReached')
    })
  })

  describe('Error types without value', () => {
    it('should handle BadOrigin error', () => {
      const dispatchError = createMockDispatchError.badOrigin()
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Error: BadOrigin')
    })

    it('should handle CannotLookup error', () => {
      const dispatchError = createMockDispatchError.cannotLookup()
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Error: CannotLookup')
    })

    it('should handle Other error', () => {
      const dispatchError = createMockDispatchError.other()
      const result = getReadableDispatchError(mockApi, dispatchError)

      expect(result).toBe('[useSendTransaction]: Error: Other')
    })
  })
})
