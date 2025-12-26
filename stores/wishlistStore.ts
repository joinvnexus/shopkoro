import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  inStock?: boolean;
  addedAt?: string;
}

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (item) =>
        set((state) => {
          // Check if already in wishlist
          if (state.items.some((i) => i.id === item.id)) {
            return state;
          }
          return { 
            items: [...state.items, { 
              ...item, 
              addedAt: new Date().toISOString() 
            }] 
          };
        }),
      
      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },
      
      clearWishlist: () => set({ items: [] }),
      
      getWishlistCount: () => get().items.length,
    }),
    {
      name: 'wishlist-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useWishlistStore;