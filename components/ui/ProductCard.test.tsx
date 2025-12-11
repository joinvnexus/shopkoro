import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import useCartStore from '@/stores/cartStore';

// Mock the cart store
vi.mock('@/stores/cartStore');

const mockProduct = {
  _id: '1',
  name: 'Test Product',
  description: 'Test description',
  price: 100,
  originalPrice: 120,
  discount: 10,
  image: 'test.jpg',
  category: 'test',
  inStock: true,
  stock: 10,
  rating: 4.5,
  reviews: 20,
  isFeatured: true,
  isFlashSale: false,
  isTrending: false,
};

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('৳100')).toBeInTheDocument();
    expect(screen.getByText('৳120')).toBeInTheDocument();
    expect(screen.getByText('(20)')).toBeInTheDocument();
    expect(screen.getByText('বিস্তারিত দেখুন')).toBeInTheDocument();
  });

  it('displays discount badge when discount is available', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('-17%')).toBeInTheDocument(); // Calculated discount
  });

  it('displays flash sale badge when product is on flash sale', () => {
    const flashSaleProduct = { ...mockProduct, isFlashSale: true };
    render(<ProductCard product={flashSaleProduct} />);

    expect(screen.getByText('Flash')).toBeInTheDocument();
  });

  it('displays low stock message when stock is low', () => {
    const lowStockProduct = { ...mockProduct, stock: 5 };
    render(<ProductCard product={lowStockProduct} />);

    expect(screen.getByText('মাত্র 5 টি বাকি!')).toBeInTheDocument();
  });

  it('displays out of stock message when not in stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText('স্টক আউট')).toBeInTheDocument();
  });

  it('calls addItem when add to cart button is clicked', () => {
    const mockAddItem = vi.fn();
    vi.mocked(useCartStore).mockReturnValue({
      addItem: mockAddItem,
      items: [],
      removeItem: vi.fn(),
      syncFromServer: vi.fn(),
    });

    render(<ProductCard product={mockProduct} />);

    const addToCartButton = screen.getByRole('button', { name: /shopping cart/i });
    fireEvent.click(addToCartButton);

    expect(mockAddItem).toHaveBeenCalledWith({
      productId: '1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      quantity: 1,
    });
  });

  it('renders star ratings correctly', () => {
    render(<ProductCard product={mockProduct} />);

    const stars = screen.getAllByTestId('star-icon');
    expect(stars).toHaveLength(5);
  });

  it('links to product page', () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole('link', { name: /test product/i });
    expect(link).toHaveAttribute('href', '/products/1');
  });
});