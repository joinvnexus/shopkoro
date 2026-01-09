/// <reference types="jest" />
import { app, request } from './test-setup';
import User from '../../models/User';
import Product from '../../models/Product';
import Category from '../../models/Category';

describe('Product Endpoints Integration Tests', () => {
  let authToken: string;
  let adminToken: string;
  let productId: string;

  beforeEach(async () => {
    // Create regular user
    const user = await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123'
    });

    const userLoginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'password123'
      });

    authToken = userLoginResponse.body.token;

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      isAdmin: true
    });

    const adminLoginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'password123'
      });

    adminToken = adminLoginResponse.body.token;

    // Create test categories
    await Category.create([
      { name: 'Electronics', slug: 'electronics', icon: '📱' },
      { name: 'Books', slug: 'books', icon: '📚' }
    ]);

    // Create a test product
    const product = await Product.create({
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      image: 'https://example.com/test.jpg',
      category: 'electronics'
    });

    productId = product._id.toString();
  });

  describe('GET /api/products', () => {
    it('should get all products successfully', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products?category=electronics')
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      response.body.data.forEach((product: any) => {
        expect(product.category).toBe('electronics');
      });
    });

    it('should filter products by price range', async () => {
      const response = await request(app)
        .get('/api/products?minPrice=50&maxPrice=150')
        .expect(200);

      response.body.data.forEach((product: any) => {
        expect(product.price).toBeGreaterThanOrEqual(50);
        expect(product.price).toBeLessThanOrEqual(150);
      });
    });

    it('should filter products by stock status', async () => {
      const response = await request(app)
        .get('/api/products?inStock=true')
        .expect(200);

      response.body.data.forEach((product: any) => {
        expect(product.inStock).toBe(true);
      });
    });

    it('should search products by text', async () => {
      const response = await request(app)
        .get('/api/products?search=Test')
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should paginate results', async () => {
      const response = await request(app)
        .get('/api/products?page=1&limit=5')
        .expect(200);

      expect(response.body.pagination).toHaveProperty('page', 1);
      expect(response.body.pagination).toHaveProperty('limit', 5);
      expect(response.body.data.length).toBeLessThanOrEqual(5);
    });

    it('should handle pagination edge cases', async () => {
      const response = await request(app)
        .get('/api/products?page=999&limit=5')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get single product successfully', async () => {
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('_id', productId);
      expect(response.body.data).toHaveProperty('name', 'Test Product');
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/507f1f77bcf86cd799439011')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message');
    });

    it('should validate product ID format', async () => {
      const response = await request(app)
        .get('/api/products/invalid-id')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('POST /api/products', () => {
    it('should create product with admin authentication', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 200,
        image: 'https://example.com/new.jpg',
        category: 'books'
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('name', 'New Product');
      expect(response.body.data).toHaveProperty('price', 200);
    });

    it('should reject product creation without authentication', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 200,
        image: 'https://example.com/new.jpg',
        category: 'books'
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('should reject product creation with regular user', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 200,
        image: 'https://example.com/new.jpg',
        category: 'books'
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData)
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Incomplete Product'
        })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should validate price is positive', async () => {
      const productData = {
        name: 'Invalid Product',
        description: 'Description',
        price: -10,
        image: 'https://example.com/test.jpg',
        category: 'electronics'
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product with admin authentication', async () => {
      const updateData = {
        name: 'Updated Product',
        price: 150
      };

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('name', 'Updated Product');
      expect(response.body.data).toHaveProperty('price', 150);
    });

    it('should reject update without authentication', async () => {
      const updateData = {
        name: 'Updated Product'
      };

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .send(updateData)
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('should reject update with regular user', async () => {
      const updateData = {
        name: 'Updated Product'
      };

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 for non-existent product', async () => {
      const updateData = {
        name: 'Updated Product'
      };

      const response = await request(app)
        .put('/api/products/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product with admin authentication', async () => {
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');

      // Verify product is deleted
      await request(app)
        .get(`/api/products/${productId}`)
        .expect(404);
    });

    it('should reject deletion without authentication', async () => {
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('should reject deletion with regular user', async () => {
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .delete('/api/products/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('Product Search and Filtering Edge Cases', () => {
    beforeEach(async () => {
      // Create additional test products
      await Product.create([
        {
          name: 'Laptop',
          description: 'High performance laptop',
          price: 1000,
          image: 'https://example.com/laptop.jpg',
          category: 'electronics',
          inStock: true
        },
        {
          name: 'Book',
          description: 'Interesting book',
          price: 25,
          image: 'https://example.com/book.jpg',
          category: 'books',
          inStock: false
        },
        {
          name: 'Smartphone',
          description: 'Latest smartphone',
          price: 500,
          image: 'https://example.com/phone.jpg',
          category: 'electronics',
          inStock: true
        }
      ]);
    });

    it('should handle complex filtering combinations', async () => {
      const response = await request(app)
        .get('/api/products?category=electronics&minPrice=400&inStock=true')
        .expect(200);

      response.body.data.forEach((product: any) => {
        expect(product.category).toBe('electronics');
        expect(product.price).toBeGreaterThanOrEqual(400);
        expect(product.inStock).toBe(true);
      });
    });

    it('should handle search with special characters', async () => {
      const response = await request(app)
        .get('/api/products?search=high%20performance')
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should handle empty search results', async () => {
      const response = await request(app)
        .get('/api/products?category=nonexistent')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });
});
