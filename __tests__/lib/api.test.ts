import { ApiClientError } from '../../lib/api'
import { ApiErrorCode } from '../../types'

describe('ApiClientError', () => {
  describe('constructor', () => {
    it('should create error with required properties', () => {
      const error = new ApiClientError({
        message: 'Test error message',
        code: 'VALIDATION_ERROR',
      })

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ApiClientError)
      expect(error.message).toBe('Test error message')
      expect(error.code).toBe('VALIDATION_ERROR')
      expect(error.name).toBe('ApiClientError')
      expect(error.status).toBeUndefined()
      expect(error.details).toBeUndefined()
      expect(error.stack).toBeDefined()
      expect(typeof error.stack).toBe('string')
    })

    it('should create error with all properties', () => {
      const mockDetails = { field: 'email', message: 'Invalid email' }
      const error = new ApiClientError({
        message: 'Test error message',
        code: 'VALIDATION_ERROR',
        status: 400,
        details: mockDetails
      })

      expect(error).toBeInstanceOf(ApiClientError)
      expect(error.message).toBe('Test error message')
      expect(error.code).toBe('VALIDATION_ERROR')
      expect(error.name).toBe('ApiClientError')
      expect(error.status).toBe(400)
      expect(error.details).toEqual(mockDetails)
      expect(error.stack).toContain('ApiClientError')
    })

    it('should handle empty message', () => {
      const error = new ApiClientError({
        message: '',
        code: 'VALIDATION_ERROR',
      })

      expect(error.message).toBe('')
      expect(error.code).toBe('VALIDATION_ERROR')
    })

    it('should handle null details', () => {
      const error = new ApiClientError({
        message: 'Test error',
        code: 'INTERNAL_SERVER_ERROR',
        details: null
      })

      expect(error.details).toBeNull()
    })
  })

  describe('inheritance', () => {
    it('should have Error prototype chain', () => {
      const error = new ApiClientError({
        message: 'Test error message',
        code: 'VALIDATION_ERROR',
      })

      expect(error instanceof Error).toBe(true)
      expect(error instanceof ApiClientError).toBe(true)
      expect(Object.getPrototypeOf(error)).toBe(ApiClientError.prototype)
    })

    it('should have correct constructor', () => {
      const error = new ApiClientError({
        message: 'Test error message',
        code: 'VALIDATION_ERROR',
      })

      expect(error.constructor).toBe(ApiClientError)
      expect(error.constructor.name).toBe('ApiClientError')
    })
  })

  describe('error codes', () => {
    it('should accept various error codes', () => {
      const errorCodes: ApiErrorCode[] = [
        'VALIDATION_ERROR',
        'UNAUTHORIZED',
        'FORBIDDEN',
        'NOT_FOUND',
        'CONFLICT',
        'RATE_LIMITED',
        'INTERNAL_SERVER_ERROR',
        'NETWORK_ERROR',
        'UNKNOWN_ERROR'
      ]

      errorCodes.forEach(code => {
        const error = new ApiClientError({
          message: `Error with code: ${code}`,
          code,
        })

        expect(error.code).toBe(code)
      })
    })

    it('should handle numeric status codes', () => {
      const statusCodes = [400, 401, 403, 404, 500, 502]

      statusCodes.forEach(status => {
        const error = new ApiClientError({
          message: `Error with status: ${status}`,
          code: 'INTERNAL_SERVER_ERROR',
          status,
        })

        expect(error.status).toBe(status)
      })
    })
  })

  describe('error handling', () => {
    it('should be catchable in try-catch', () => {
      let caughtError: unknown = null
      
      try {
        throw new ApiClientError({
          message: 'Thrown error',
          code: 'VALIDATION_ERROR',
        })
      } catch (error) {
        caughtError = error
      }

      expect(caughtError).toBeInstanceOf(ApiClientError)
      if (caughtError instanceof ApiClientError) {
        expect(caughtError.message).toBe('Thrown error')
        expect(caughtError.code).toBe('VALIDATION_ERROR')
      }
    })

    it('should work with Promise rejection', async () => {
      const error = new ApiClientError({
        message: 'Async error',
        code: 'NETWORK_ERROR',
        status: 500
      })

      await expect(Promise.reject(error)).rejects.toThrow('Async error')
    })
  })

  describe('serialization', () => {
    it('should have expected properties for JSON serialization', () => {
      const error = new ApiClientError({
        message: 'Test error message',
        code: 'VALIDATION_ERROR',
        status: 400,
        details: { field: 'email' }
      })

      // Test that error has expected properties for serialization
      expect(error.message).toBe('Test error message')
      expect(error.code).toBe('VALIDATION_ERROR')
      expect(error.status).toBe(400)
      expect(error.details).toEqual({ field: 'email' })
      
      // Test that it can be stringified (even if Error objects don't serialize perfectly)
      const stringified = JSON.stringify(error)
      expect(typeof stringified).toBe('string')
    })

    it('should handle circular references gracefully', () => {
      const error = new ApiClientError({
        message: 'Test error',
        code: 'VALIDATION_ERROR',
      })

      // Create circular reference
      error.details = error

      // JSON.stringify should throw on circular references, which is expected behavior
      expect(() => JSON.stringify(error)).toThrow()
      
      // But the error should still be usable
      expect(error.message).toBe('Test error')
      expect(error.code).toBe('VALIDATION_ERROR')
    })
  })

  describe('edge cases', () => {
    it('should handle very long messages', () => {
      const longMessage = 'A'.repeat(10000)
      const error = new ApiClientError({
        message: longMessage,
        code: 'VALIDATION_ERROR',
      })

      expect(error.message).toBe(longMessage)
      expect(error.message.length).toBe(10000)
    })

    it('should handle special characters in message', () => {
      const specialMessage = 'Error with unicode: ñáéíóú '
      const error = new ApiClientError({
        message: specialMessage,
        code: 'VALIDATION_ERROR',
      })

      expect(error.message).toBe(specialMessage)
    })

    it('should handle undefined status', () => {
      const error = new ApiClientError({
        message: 'Test error',
        code: 'UNKNOWN_ERROR',
        status: undefined,
      })

      expect(error.status).toBeUndefined()
    })
  })
})
