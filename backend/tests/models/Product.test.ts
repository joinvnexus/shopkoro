import mongoose from 'mongoose';
import Product, { IProduct } from '../../models/Product';

describe('Product Model', () => {
  describe('Schema Validation', () => {
    it('should require name field', () => {
      const productData = {
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      const validationError = product.validateSync();

      expect(validationError?.errors.name).toBeDefined();
      expect(validationError?.errors.name.kind).toBe('required');
    });

    it('should require description field', () => {
      const productData = {
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      const validationError = product.validateSync();

      expect(validationError?.errors.description).toBeDefined();
      expect(validationError?.errors.description.kind).toBe('required');
    });

    it('should require price field', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      const validationError = product.validateSync();

      expect(validationError?.errors.price).toBeDefined();
      expect(validationError?.errors.price.kind).toBe('required');
    });

    it('should require image field', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        category: 'electronics'
      };

      const product = new Product(productData);
      const validationError = product.validateSync();

      expect(validationError?.errors.image).toBeDefined();
      expect(validationError?.errors.image.kind).toBe('required');
    });

    it('should require category field', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        image: 'test.jpg'
      };

      const product = new Product(productData);
      const validationError = product.validateSync();

      expect(validationError?.errors.category).toBeDefined();
      expect(validationError?.errors.category.kind).toBe('required');
    });

    it('should enforce name length limit', () => {
      const longName = 'A'.repeat(201); // 201 characters
      const productData = {
        name: longName,
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      const validationError = product.validateSync();

      expect(validationError?.errors.name).toBeDefined();
      expect(validationError?.errors.name.kind).toBe('maxlength');
    });

    it('should enforce price minimum', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: -10,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      const validationError = product.validateSync();

      expect(validationError?.errors.price).toBeDefined();
      expect(validationError?.errors.price.kind).toBe('min');
    });

    it('should enforce rating range', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics',
        rating: 6 // Over maximum
      };

      const product = new Product(productData);
      const validationError = product.validateSync();

      expect(validationError?.errors.rating).toBeDefined();
      expect(validationError?.errors.rating.kind).toBe('max');
    });

    it('should enforce discount range', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics',
        discount: 101 // Over maximum
      };

      const product = new Product(productData);
      const validationError = product.validateSync();

      expect(validationError?.errors.discount).toBeDefined();
      expect(validationError?.errors.discount.kind).toBe('max');
    });
  });

  describe('Default Values', () => {
    it('should default inStock to true', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      expect(product.inStock).toBe(true);
    });

    it('should default rating to 0', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      expect(product.rating).toBe(0);
    });

    it('should default reviews to 0', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      expect(product.reviews).toBe(0);
    });

    it('should default boolean fields to false', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      expect(product.isFeatured).toBe(false);
      expect(product.isFlashSale).toBe(false);
      expect(product.isTrending).toBe(false);
    });

    it('should default array fields to empty arrays', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      expect(Array.isArray(product.images)).toBe(true);
      expect(product.images?.length).toBe(0);
      expect(Array.isArray(product.tags)).toBe(true);
      expect(product.tags?.length).toBe(0);
      expect(Array.isArray(product.reviewsList)).toBe(true);
      expect(product.reviewsList?.length).toBe(0);
    });
  });

  describe('Field Trimming', () => {
    it('should trim name field', () => {
      const productData = {
        name: '  Test Product  ',
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      expect(product.name).toBe('Test Product');
    });

    it('should trim description field', () => {
      const productData = {
        name: 'Test Product',
        description: '  Test description  ',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      expect(product.description).toBe('Test description');
    });

    it('should trim Bengali name field', () => {
      const productData = {
        nameBn: '  টেস্ট পণ্ড  ',
        description: 'Test description',
        price: 100,
        image: 'test.jpg',
        category: 'electronics'
      };

      const product = new Product(productData);
      expect(product.nameBn).toBe('টেস্ট পণ্ড');
    });
  });

  describe('Interface Compliance', () => {
    it('should conform to IProduct interface', () => {
      const productData = {
        name: 'Test Product',
        nameBn: 'টেস্ট পণ্ড',
        description: 'Test description',
        descriptionBn: 'বিবরণা',
        price: 100,
        originalPrice: 120,
        discount: 20,
        image: 'test.jpg',
        images: ['test1.jpg', 'test2.jpg'],
        category: 'electronics',
        categoryBn: 'ইলেকট্রনিক্স',
        inStock: true,
        stock: 50,
        rating: 4,
        reviews: 10,
        isFeatured: true,
        isFlashSale: true,
        isTrending: true,
        tags: ['popular', 'new']
      };

      const product = new Product(productData);
      
      expect(product.name).toBe('Test Product');
      expect(product.nameBn).toBe('টেস্ট পণ্ড');
      expect(product.description).toBe('Test description');
      expect(product.descriptionBn).toBe('বিবরণা');
      expect(product.price).toBe(100);
      expect(product.originalPrice).toBe(120);
      expect(product.discount).toBe(20);
      expect(product.image).toBe('test.jpg');
      expect(Array.isArray(product.images)).toBe(true);
      expect(product.category).toBe('electronics');
      expect(product.categoryBn).toBe('ইলেকট্রনিক্স');
      expect(product.inStock).toBe(true);
      expect(product.stock).toBe(50);
      expect(product.rating).toBe(4);
      expect(product.reviews).toBe(10);
      expect(product.isFeatured).toBe(true);
      expect(product.isFlashSale).toBe(true);
      expect(product.isTrending).toBe(true);
      expect(Array.isArray(product.tags)).toBe(true);
    });
  });
});
