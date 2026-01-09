import useCartStore from '../../stores/cartStore'
import { cartApi } from '../../lib/api'

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

// Mock cartApi
jest.mock('../../lib/api', () => ({
  cartApi: {
    addToCart: jest.fn(),
    getCart: jest.fn(),
    updateItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
}))

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset mocks explicitly (avoid relying on global jest.clearAllMocks())
    (cartApi.addToCart as jest.Mock).mockReset();
    (cartApi.getCart as jest.Mock).mockReset();
    (cartApi.updateItem as jest.Mock).mockReset();
    (cartApi.removeItem as jest.Mock).mockReset();
    (cartApi.clear as jest.Mock).mockReset();

    // Default API mock return values to match actual API shape
    (cartApi.addToCart as jest.Mock).mockResolvedValue({});
    (cartApi.getCart as jest.Mock).mockResolvedValue({ data: { items: [] } });
    (cartApi.updateItem as jest.Mock).mockResolvedValue({});
    (cartApi.removeItem as jest.Mock).mockResolvedValue({});
    (cartApi.clear as jest.Mock).mockResolvedValue({});

    // Reset store state
    useCartStore.setState({ items: [] })
  })

  describe('initial state', () => {
    it('should have empty items array initially', () => {
      const state = useCartStore.getState()
      expect(state.items).toEqual([])
    })
  })

  describe('getTotalPrice', () => {
    it('should return 0 for empty cart', () => {
      const state = useCartStore.getState()
      expect(state.getTotalPrice()).toBe(0)
    })

    it('should calculate total price correctly', () => {
    const mockItems = [
  { productId: '1', name: 'Product 1', price: 100, quantity: 1, image: 'image1.jpg' },
  { productId: '2', name: 'Product 2', price: 50, quantity: 2, image: 'image2.jpg' }
]


      useCartStore.setState({ items: mockItems })
      
      const state = useCartStore.getState()
      expect(state.getTotalPrice()).toBe(200) // (100 * 1) + (50 * 2)
    })

    it('should handle items with undefined price', () => {
    const mockItems = [
  { productId: '1', name: 'Product 1', price: undefined, quantity: 2, image: 'image1.jpg' },
  { productId: '2', name: 'Product 2', price: 50, quantity: 1, image: 'image2.jpg' },
]


      useCartStore.setState({ items: mockItems })
      
      const state = useCartStore.getState()
      expect(state.getTotalPrice()).toBe(50) // (0 * 2) + (50 * 1)
    })
  })

  describe('addItem', () => {
    it('should add new item to empty cart', () => {
      const mockItem = {
        productId: '1',
        name: 'Product 1',
        price: 100,
        quantity: 1,
        image: 'image1.jpg'
      }

      useCartStore.getState().addItem(mockItem)
      
      const state = useCartStore.getState()
      expect(state.items).toHaveLength(1)
      expect(state.items[0]).toEqual(mockItem)
    })

    it('should increase quantity if item already exists', () => {
      const existingItem = {
        productId: '1',
        name: 'Product 1',
        price: 100,
        quantity: 1,
        image: 'image1.jpg'
      }

      useCartStore.setState({ items: [existingItem] })

      const newItem = {
        productId: '1',
        name: 'Product 1',
        price: 100,
        quantity: 2,
        image: 'image1.jpg'
      }

      useCartStore.getState().addItem(newItem)
      
      const state = useCartStore.getState()
      expect(state.items).toHaveLength(1)
      expect(state.items[0].quantity).toBe(3) // 1 + 2
    })

    it('should add new item if different productId', () => {
      const existingItem = {
        productId: '1',
        name: 'Product 1',
        price: 100,
        quantity: 1,
        image: 'image1.jpg'
      }

      useCartStore.setState({ items: [existingItem] })

      const newItem = {
        productId: '2',
        name: 'Product 2',
        price: 50,
        quantity: 1,
        image: 'image2.jpg'
      }

      useCartStore.getState().addItem(newItem)
      
      const state = useCartStore.getState()
      expect(state.items).toHaveLength(2)
      expect(state.items).toContainEqual(existingItem)
      expect(state.items).toContainEqual(newItem)
    })
  })

  describe('updateQuantity', () => {
    it('should update quantity of existing item', () => {
      const mockItems = [
  { productId: '1', name: 'Product 1', price: 100, quantity: 1, image: 'image1.jpg' }
]


      useCartStore.setState({ items: mockItems })

      useCartStore.getState().updateQuantity('1', 5)
      
      const state = useCartStore.getState()
      expect(state.items[0].quantity).toBe(5)
    })

    it('should not affect other items', () => {
      const mockItems = [
  { productId: '1', name: 'Product 1', price: 100, quantity: 1, image: 'image1.jpg' },
  { productId: '2', name: 'Product 2', price: 50, quantity: 2, image: 'image2.jpg' }
]


      useCartStore.setState({ items: mockItems })

      useCartStore.getState().updateQuantity('1', 5)
      
      const state = useCartStore.getState()
      expect(state.items[0].quantity).toBe(5)
      expect(state.items[1].quantity).toBe(2) // unchanged
    })
  })

  describe('removeItem', () => {
    it('should remove item by productId', () => {
     const mockItems = [
  { productId: '1', name: 'Product 1', price: 100, quantity: 1, image: 'image1.jpg' },
  { productId: '2', name: 'Product 2', price: 50, quantity: 2, image: 'image2.jpg' }
]


      useCartStore.setState({ items: mockItems })

      useCartStore.getState().removeItem('1')
      
      const state = useCartStore.getState()
      expect(state.items).toHaveLength(1)
      expect(state.items[0].productId).toBe('2')
    })

    it('should not remove anything if productId not found', () => {
     const mockItems = [
  { productId: '1', name: 'Product 1', price: 100, quantity: 1, image: 'image1.jpg' },
  { productId: '2', name: 'Product 2', price: 50, quantity: 2, image: 'image2.jpg' }
]


      useCartStore.setState({ items: mockItems })

      useCartStore.getState().removeItem('3')
      
      const state = useCartStore.getState()
      expect(state.items).toHaveLength(2)
      expect(state.items).toEqual(mockItems)
    })
  })

  describe('clearCart', () => {
    it('should clear all items', () => {
   const mockItems = [
  { productId: '1', name: 'Product 1', price: 100, quantity: 1, image: 'image1.jpg' },
  { productId: '2', name: 'Product 2', price: 50, quantity: 2, image: 'image2.jpg' }
]


      useCartStore.setState({ items: mockItems })

      useCartStore.getState().clearCart()
      
      const state = useCartStore.getState()
      expect(state.items).toEqual([])
    })
  })

  describe('setItems', () => {
    it('should set items to provided array', () => {
      const mockItems = [
  { productId: '1', name: 'Product 1', price: 100, quantity: 1, image: 'image1.jpg' }
      ]

      useCartStore.getState().setItems(mockItems)
      
      const state = useCartStore.getState()
      expect(state.items).toEqual(mockItems)
    })
  })

  describe('robustness', () => {
    it('should not throw when cartApi.getCart returns undefined', async () => {
      // Make getCart return undefined to simulate malformed API response
      (cartApi.getCart as jest.Mock).mockResolvedValue(undefined)

      // Call syncFromServer and ensure it resolves without throwing and leaves items unchanged
      const stateBefore = useCartStore.getState()
      expect(stateBefore.items).toEqual([])

      await expect(useCartStore.getState().syncFromServer()).resolves.toBeUndefined()

      const stateAfter = useCartStore.getState()
      expect(stateAfter.items).toEqual([])
    })
  })
})
