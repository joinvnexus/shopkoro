import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act } from "@testing-library/react";
import useCartStore, { CartItem } from "./cartStore";
import useAuthStore from "./authStore";
import { cartApi } from "@/lib/api";

// Mock the dependencies
vi.mock("@/lib/api", () => ({
  cartApi: {
    addToCart: vi.fn(),
    getCart: vi.fn(),
    removeItem: vi.fn(),
  },
}));

vi.mock("@/stores/authStore");

// Mock window.alert
global.alert = vi.fn();

describe("useCartStore", () => {
  // Reset stores and mocks before each test
  beforeEach(() => {
    act(() => {
      useCartStore.setState({ items: [] });
      useAuthStore.setState({
        userInfo: null,
        login: () => {},
        logout: () => {},
      });
    });
    vi.clearAllMocks();
  });

  const mockCartItem: CartItem = {
    productId: "prod-1",
    name: "Test Product",
    price: 100,
    quantity: 1,
    image: "test.jpg",
  };

  const mockApiCart = {
    data: {
      items: [
        {
          product: {
            _id: "prod-1",
            name: "Test Product from API",
            price: 105,
            image: "api.jpg",
          },
          quantity: 1,
        },
      ],
    },
  };

  describe("addItem", () => {
    it("should show an alert and not add item if user is not logged in", () => {
      // Arrange: User is not logged in
      vi.mocked(useAuthStore.getState).mockReturnValue({
        userInfo: null,
        login: vi.fn(),
        logout: vi.fn(),
      });

      // Act
      act(() => {
        useCartStore.getState().addItem(mockCartItem);
      });

      // Assert
      expect(useCartStore.getState().items).toEqual([]);
      expect(global.alert).toHaveBeenCalledWith(
        "Please log in to add items to the cart."
      );
      expect(cartApi.addToCart).not.toHaveBeenCalled();
    });

    it("should optimistically add an item and sync with the server if user is logged in", async () => {
      // Arrange: User is logged in
      vi.mocked(useAuthStore.getState).mockReturnValue({
        userInfo: {
          _id: "user-1",
          name: "Test User",
          email: "test@example.com",
          token: "fake-token",
          isAdmin: false,
        },
        login: vi.fn(),
        logout: vi.fn(),
      });
      vi.mocked(cartApi.addToCart).mockResolvedValue({ success: true });
      vi.mocked(cartApi.getCart).mockResolvedValue(mockApiCart);

      // Act: Add item
      await act(async () => {
        useCartStore.getState().addItem(mockCartItem);
      });

      // Assert: Optimistic update happened first
      const items = useCartStore.getState().items;
      expect(items[0]).toEqual(mockCartItem);

      // Assert: API calls were made
      expect(cartApi.addToCart).toHaveBeenCalledWith("prod-1", 1);
      expect(cartApi.getCart).toHaveBeenCalled();

      // Assert: State is synced with server response
      const finalItems = useCartStore.getState().items;
      expect(finalItems).toHaveLength(1);
      expect(finalItems[0].name).toBe("Test Product from API");
      expect(finalItems[0].price).toBe(105);
    });
  });

  describe("removeItem", () => {
    it("should optimistically remove an item and call the API", async () => {
      // Arrange: Cart has an item
      act(() => {
        useCartStore.setState({ items: [mockCartItem] });
      });
      vi.mocked(cartApi.removeItem).mockResolvedValue({ success: true });

      // Act
      await act(async () => {
        useCartStore.getState().removeItem("prod-1");
      });

      // Assert
      expect(useCartStore.getState().items).toEqual([]);
      expect(cartApi.removeItem).toHaveBeenCalledWith("prod-1");
    });
  });

  describe("syncFromServer", () => {
    it("should fetch the cart from the server and update the state", async () => {
      // Arrange
      vi.mocked(cartApi.getCart).mockResolvedValue(mockApiCart);

      // Act
      await act(async () => {
        await useCartStore.getState().syncFromServer();
      });

      // Assert
      const finalItems = useCartStore.getState().items;
      expect(cartApi.getCart).toHaveBeenCalled();
      expect(finalItems).toHaveLength(1);
      expect(finalItems[0].productId).toBe("prod-1");
      expect(finalItems[0].name).toBe("Test Product from API");
    });

    it("should handle errors when syncing from server", async () => {
      // Arrange
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      vi.mocked(cartApi.getCart).mockRejectedValue(new Error("API Error"));

      // Act
      await act(async () => {
        await useCartStore.getState().syncFromServer();
      });

      // Assert
      expect(useCartStore.getState().items).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to sync cart from server",
        expect.any(Error)
      );
      consoleErrorSpy.mockRestore();
    });
  });
});
