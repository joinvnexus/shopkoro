import useAuthStore from '../../stores/authStore'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
}
global.localStorage = localStorageMock

describe('useAuthStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
    // Reset store state
    useAuthStore.setState({ userInfo: null })
  })

  describe('initial state', () => {
    it('should have null userInfo initially', () => {
      const state = useAuthStore.getState()
      expect(state.userInfo).toBeNull()
    })
  })

  describe('login', () => {
    it('should set user info when login is called', () => {
      const mockUserInfo = {
        _id: 'user123',
        name: 'John Doe',
        email: 'john@example.com',
        isAdmin: false,
        token: 'mock-token'
      }

      useAuthStore.getState().login(mockUserInfo)
      
      const state = useAuthStore.getState()
      expect(state.userInfo).toEqual(mockUserInfo)
    })
  })

  describe('logout', () => {
    it('should clear user info when logout is called', () => {
      const mockUserInfo = {
        _id: 'user123',
        name: 'John Doe',
        email: 'john@example.com',
        isAdmin: false,
        token: 'mock-token'
      }

      // First login
      useAuthStore.getState().login(mockUserInfo)
      expect(useAuthStore.getState().userInfo).toEqual(mockUserInfo)

      // Then logout
      useAuthStore.getState().logout()
      expect(useAuthStore.getState().userInfo).toBeNull()
    })
  })
})
