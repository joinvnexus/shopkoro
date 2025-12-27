import useWishlistStore from '../../stores/wishlistStore'

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

describe('useWishlistStore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset store state
    useWishlistStore.setState({ items: [] })
  })

  describe('initial state', () => {
    it('should have empty items array initially', () => {
      const state = useWishlistStore.getState()
      expect(state.items).toEqual([])
    })
  })

  describe('addToWishlist', () => {
    it('should add new item to wishlist', () => {
      const mockItem = {
        id: '1',
        name: 'Product 1',
        price: 100,
        image: 'image1.jpg',
        discount: 10,
        inStock: true
      }

      useWishlistStore.getState().addToWishlist(mockItem)
      
      const state = useWishlistStore.getState()
      expect(state.items).toHaveLength(1)
      expect(state.items[0]).toEqual({
        ...mockItem,
        addedAt: expect.any(String)
      })
    })

    it('should not add duplicate items', () => {
      const mockItem = {
        id: '1',
        name: 'Product 1',
        price: 100,
        image: 'image1.jpg',
        discount: 10,
        inStock: true
      }

      useWishlistStore.getState().addToWishlist(mockItem)
      useWishlistStore.getState().addToWishlist(mockItem) // Try to add same item again
      
      const state = useWishlistStore.getState()
      expect(state.items).toHaveLength(1)
    })

    it('should add multiple different items', () => {
      const mockItem1 = {
        id: '1',
        name: 'Product 1',
        price: 100,
        image: 'image1.jpg',
        discount: 10,
        inStock: true
      }

      const mockItem2 = {
        id: '2',
        name: 'Product 2',
        price: 50,
        image: 'image2.jpg',
        discount: 5,
        inStock: false
      }

      useWishlistStore.getState().addToWishlist(mockItem1)
      useWishlistStore.getState().addToWishlist(mockItem2)
      
      const state = useWishlistStore.getState()
      expect(state.items).toHaveLength(2)
      expect(state.items[0].id).toBe('1')
      expect(state.items[1].id).toBe('2')
    })
  })

  describe('removeFromWishlist', () => {
    it('should remove item by id', () => {
      const mockItems = [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          image: 'image1.jpg',
          discount: 10,
          inStock: true,
          addedAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Product 2',
          price: 50,
          image: 'image2.jpg',
          discount: 5,
          inStock: false,
          addedAt: new Date().toISOString()
        }
      ]

      useWishlistStore.setState({ items: mockItems })

      useWishlistStore.getState().removeFromWishlist('1')
      
      const state = useWishlistStore.getState()
      expect(state.items).toHaveLength(1)
      expect(state.items[0].id).toBe('2')
    })

    it('should not remove anything if id not found', () => {
      const mockItems = [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          image: 'image1.jpg',
          discount: 10,
          inStock: true,
          addedAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Product 2',
          price: 50,
          image: 'image2.jpg',
          discount: 5,
          inStock: false,
          addedAt: new Date().toISOString()
        }
      ]

      useWishlistStore.setState({ items: mockItems })

      useWishlistStore.getState().removeFromWishlist('3')
      
      const state = useWishlistStore.getState()
      expect(state.items).toHaveLength(2)
      expect(state.items).toEqual(mockItems)
    })
  })

  describe('isInWishlist', () => {
    it('should return true if item is in wishlist', () => {
      const mockItems = [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          image: 'image1.jpg',
          discount: 10,
          inStock: true,
          addedAt: new Date().toISOString()
        }
      ]

      useWishlistStore.setState({ items: mockItems })

      const result = useWishlistStore.getState().isInWishlist('1')
      expect(result).toBe(true)
    })

    it('should return false if item is not in wishlist', () => {
      const mockItems = [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          image: 'image1.jpg',
          discount: 10,
          inStock: true,
          addedAt: new Date().toISOString()
        }
      ]

      useWishlistStore.setState({ items: mockItems })

      const result = useWishlistStore.getState().isInWishlist('2')
      expect(result).toBe(false)
    })

    it('should return false for empty wishlist', () => {
      const result = useWishlistStore.getState().isInWishlist('1')
      expect(result).toBe(false)
    })
  })

  describe('getWishlistCount', () => {
    it('should return 0 for empty wishlist', () => {
      const count = useWishlistStore.getState().getWishlistCount()
      expect(count).toBe(0)
    })

    it('should return correct count for non-empty wishlist', () => {
      const mockItems = [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          image: 'image1.jpg',
          discount: 10,
          inStock: true,
          addedAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Product 2',
          price: 50,
          image: 'image2.jpg',
          discount: 5,
          inStock: false,
          addedAt: new Date().toISOString()
        }
      ]

      useWishlistStore.setState({ items: mockItems })

      const count = useWishlistStore.getState().getWishlistCount()
      expect(count).toBe(2)
    })
  })

  describe('clearWishlist', () => {
    it('should clear all items', () => {
      const mockItems = [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          image: 'image1.jpg',
          discount: 10,
          inStock: true,
          addedAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Product 2',
          price: 50,
          image: 'image2.jpg',
          discount: 5,
          inStock: false,
          addedAt: new Date().toISOString()
        }
      ]

      useWishlistStore.setState({ items: mockItems })

      useWishlistStore.getState().clearWishlist()
      
      const state = useWishlistStore.getState()
      expect(state.items).toEqual([])
    })
  })

  describe('removeItem (alias)', () => {
    it('should work the same as removeFromWishlist', () => {
      const mockItems = [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          image: 'image1.jpg',
          discount: 10,
          inStock: true,
          addedAt: new Date().toISOString()
        }
      ]

      useWishlistStore.setState({ items: mockItems })

      useWishlistStore.getState().removeItem('1')
      
      const state = useWishlistStore.getState()
      expect(state.items).toHaveLength(0)
    })
  })
})
