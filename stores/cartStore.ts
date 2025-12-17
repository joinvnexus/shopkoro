"use client";

import create from "zustand";
import { devtools } from "zustand/middleware";
import { cartApi } from "@/lib/api";

export interface CartItem {
  image: any;
  productId: string;
  name?: string;
  price?: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  syncFromServer: () => Promise<void>;
  getTotalPrice: () => number;
}

interface CartApiItem {
  product: {
    _id: string;
    name?: string;
    price?: number;
    image?: string;
  } | null;
  quantity: number;
}

const useCartStore = create<CartState>()(
  devtools((set, get) => ({
    items: [],
    setItems: (items) => set({ items }),
    getTotalPrice: () => {
      return get().items.reduce((total, item) => {
        return total + (item.price || 0) * item.quantity;
      }, 0);
    },
    addItem: (item) => {
      // Optimistic update
      const existing = get().items.find((i) => i.productId === item.productId);
      if (existing) {
        set({
          items: get().items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        });
      } else {
        set({ items: [...get().items, item] });
      }

      // Persist to server (best-effort)
      (async () => {
        try {
          console.log("Attempting to add to cart, checking auth...");
          const authState = JSON.parse(localStorage.getItem("auth-storage") || "{}");
          console.log("Auth state:", authState.state?.userInfo ? "Logged in" : "Not logged in");
          await cartApi.addToCart(item.productId, item.quantity);
          // sync back server state to be safe
          const payload = await cartApi.getCart();
          const cart = payload.data;
          const items = (cart.items || [])
            .filter((it: CartApiItem) => it.product)
            .map((it: CartApiItem) => ({
              productId: it.product!._id,
              name: it.product!.name,
              price: it.product!.price,
              quantity: it.quantity,
              image: it.product!.image || null,
            }));
          set({ items });
        } catch (err) {
          console.error("Failed to persist addToCart", err);
        }
      })();
    },
    updateQuantity: (productId, quantity) => {
      set({
        items: get().items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        ),
      });
      // persist
      (async () => {
        try {
          await cartApi.updateItem(productId, quantity);
        } catch (err) {
          console.error("Failed to update cart item", err);
        }
      })();
    },
    removeItem: (productId) => {
      set({ items: get().items.filter((i) => i.productId !== productId) });
      (async () => {
        try {
          await cartApi.removeItem(productId);
        } catch (err) {
          console.error("Failed to remove cart item", err);
        }
      })();
    },
    // clear should call server
    clearCart: () => {
      set({ items: [] });
      (async () => {
        try {
          await cartApi.clear();
        } catch (err) {
          console.error("Failed to clear cart on server", err);
        }
      })();
    },
    syncFromServer: async () => {
      try {
        // Attempt to fetch cart from API and set items via cartApi
        const payload = await cartApi.getCart();
        const cart = payload.data;
        const items = (cart.items || [])
          .filter((it: CartApiItem) => it.product)
          .map((it: CartApiItem) => ({
            productId: it.product!._id,
            name: it.product!.name,
            price: it.product!.price,
            quantity: it.quantity,
            image: it.product!.image,
          }));
        set({ items });
      } catch (err) {
        console.error("Failed to sync cart from server", err);
      }
    },
  }))
);

export default useCartStore;
