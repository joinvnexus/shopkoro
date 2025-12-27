import { app, request } from './test-setup';
import User from '../../models/User';
import Product from '../../models/Product';

describe('Cart Endpoints Integration Tests', () => {
  let authToken: string;
  let userId: string;
  let productId: string;

  beforeEach(async () => {
    // Create and authenticate a user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = loginResponse.body.token;
    userId = loginResponse.body._id;

    // Create a test product
    const product = await Product.create({
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      image: 'test.jpg',
      category: 'electronics'
    });

    productId = product._id.toString();
  });

  describe('GET /api/cart', () => {
    it('should get user cart (empty)', async () => {
      const response = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('items');
      expect(Array.isArray(response.body.data.items)).toBe(true);
      expect(response.body.data.items).toHaveLength(0);
    });

    it('should reject request without authentication', async () => {
      const response = await request(app)
        .get('/api/cart')
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/cart', () => {
    it('should add item to cart successfully', async () => {
      const response = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId,
          quantity: 2
        })
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('items');
      expect(response.body.data.items).toHaveLength(1);
      
      const cartItem = response.body.data.items[0];
      expect(cartItem).toHaveProperty('product');
      expect(cartItem).toHaveProperty('quantity', 2);
      expect(cartItem.product._id).toBe(productId);
    });

    it('should add item with default quantity', async () => {
      const response = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId
        })
        .expect(201);

      expect(response.body.data.items[0]).toHaveProperty('quantity', 1);
    });

    it('should update quantity of existing item', async () => {
      // Add item first
      await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId,
          quantity: 2
        });

      // Add same item again
      const response = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId,
          quantity: 3
        })
        .expect(201);

      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0]).toHaveProperty('quantity', 3);
    });

    it('should reject non-existent product', async () => {
      const response = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId: '507f1f77bcf86cd799439011',
          quantity: 1
        })
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Product not found');
    });

    it('should reject missing productId', async () => {
      const response = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          quantity: 1
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'productId is required');
    });

    it('should reject request without authentication', async () => {
      const response = await request(app)
        .post('/api/cart')
        .send({
          productId,
          quantity: 1
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/cart/item', () => {
    beforeEach(async () => {
      // Add an item to cart first
      await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId,
          quantity: 2
        });
    });

    it('should update item quantity successfully', async () => {
      const response = await request(app)
        .put('/api/cart/item')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId,
          quantity: 5
        })
        .expect(200);

      expect(response.body.data.items[0]).toHaveProperty('quantity', 5);
    });

    it('should remove item when quantity is 0', async () => {
      const response = await request(app)
        .put('/api/cart/item')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId,
          quantity: 0
        })
        .expect(200);

      expect(response.body.data.items).toHaveLength(0);
    });

    it('should reject non-existent item', async () => {
      const response = await request(app)
        .put('/api/cart/item')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId: '507f1f77bcf86cd799439011',
          quantity: 5
        })
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Item not in cart');
    });

    it('should reject invalid quantity', async () => {
      const response = await request(app)
        .put('/api/cart/item')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId,
          quantity: 'invalid'
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'productId and numeric quantity are required');
    });

    it('should reject request without authentication', async () => {
      const response = await request(app)
        .put('/api/cart/item')
        .send({
          productId,
          quantity: 5
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/cart/item/:productId', () => {
    beforeEach(async () => {
      // Add an item to cart first
      await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId,
          quantity: 2
        });
    });

    it('should remove item from cart successfully', async () => {
      const response = await request(app)
        .delete(`/api/cart/item/${productId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.data.items).toHaveLength(0);
    });

    it('should handle removal of non-existent item gracefully', async () => {
      const response = await request(app)
        .delete('/api/cart/item/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.data.items).toHaveLength(1); // Original item still there
    });

    it('should reject request without authentication', async () => {
      const response = await request(app)
        .delete(`/api/cart/item/${productId}`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/cart', () => {
    beforeEach(async () => {
      // Add items to cart first
      await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId,
          quantity: 2
        });
    });

    it('should clear cart successfully', async () => {
      const response = await request(app)
        .delete('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('items');
      expect(response.body.data.items).toHaveLength(0);
    });

    it('should reject request without authentication', async () => {
      const response = await request(app)
        .delete('/api/cart')
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });
});
