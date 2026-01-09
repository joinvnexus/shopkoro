import { app, request } from './test-setup';
import User from '../../models/User';

describe('Auth Endpoints Integration Tests', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('name', userData.name);
      expect(response.body).toHaveProperty('email', userData.email);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('isAdmin', false);
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should not register user with existing email', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      // Create first user
      await request(app)
        .post('/api/auth/register')
        .send(userData);

      // Try to create second user with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'User already exists');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User'
        })
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          password: 'password123'
        })
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });

    it('should validate password length', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: '123'
        })
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user for login tests
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should login user successfully', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('name', 'Test User');
      expect(response.body).toHaveProperty('email', loginData.email);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('isAdmin', false);
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should reject invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'password123'
        })
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });

    it('should reject invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com'
        })
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken: string;

    beforeEach(async () => {
      // Create and login user to get refresh token
      await User.create({
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

      const cookies = (loginResponse.headers['set-cookie'] as unknown) as string[];
      refreshToken = cookies?.find((cookie: string) => 
        cookie.startsWith('shopkoro_refresh_test=')
      )?.split(';')[0]?.split('=')[1] || '';

      // pick up xsrf token cookie
      const xsrfCookie = cookies?.find((cookie: string) =>
        cookie.startsWith('XSRF-TOKEN=')
      )?.split(';')[0]?.split('=')[1] || '';

      // store for use
      (global as any).testXsrf = xsrfCookie;    });

    it('should refresh access token successfully', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', `shopkoro_refresh_test=${refreshToken}; XSRF-TOKEN=${(global as any).testXsrf}`)
        .set('x-xsrf-token', (global as any).testXsrf)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('name', 'Test User');
      expect(response.body).toHaveProperty('email', 'test@example.com');
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should reject request without refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .expect(401);

      expect(response.body).toHaveProperty('message', 'No refresh token');
    });

    it('should reject invalid refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', 'shopkoro_refresh_test=invalid_token; XSRF-TOKEN=invalid')
        .set('x-xsrf-token', 'invalid')
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('should rotate refresh token and invalidate the old one', async () => {
      // first refresh -> rotates
      const firstResponse = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', `shopkoro_refresh_test=${refreshToken}; XSRF-TOKEN=${(global as any).testXsrf}`)
        .set('x-xsrf-token', (global as any).testXsrf)
        .expect(200);

      // new refresh cookie should be present
      const cookies = (firstResponse.headers['set-cookie'] as unknown) as string[];
      const newRefreshToken = cookies?.find((cookie: string) => 
        cookie.startsWith('shopkoro_refresh_test=')
      )?.split(';')[0]?.split('=')[1] || '';

      expect(newRefreshToken).toBeTruthy();

      // Using old token should now fail
      const secondResponse = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', `shopkoro_refresh_test=${refreshToken}; XSRF-TOKEN=${(global as any).testXsrf}`)
        .set('x-xsrf-token', (global as any).testXsrf)
        .expect(401);

      expect(secondResponse.body).toHaveProperty('message');

      // Using new token should succeed
      const thirdResponse = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', `shopkoro_refresh_test=${newRefreshToken}; XSRF-TOKEN=${(global as any).testXsrf}`)
        .set('x-xsrf-token', (global as any).testXsrf)
        .expect(200);

      expect(thirdResponse.body).toHaveProperty('token');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.headers['set-cookie']).toBeDefined();
      
      // Check that cookie is cleared
      const cookies = (response.headers['set-cookie'] as unknown) as string[];
      const clearedCookie = cookies?.find((cookie: string) => 
        cookie.includes('shopkoro_refresh_test=;')
      );
      expect(clearedCookie).toBeDefined();
    });
  });
});
