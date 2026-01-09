import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { generateAccessToken, createRefreshToken, verifyRefreshToken, cookieOptions, COOKIE_NAMES } from '../../utils/tokens';

// Mock environment variables
process.env.ACCESS_TOKEN_SECRET = 'test_access_secret';
process.env.REFRESH_TOKEN_SECRET = 'test_refresh_secret';
process.env.ACCESS_TOKEN_EXPIRES_IN = '15m';
process.env.REFRESH_TOKEN_EXPIRES_IN = '7d';
process.env.REFRESH_COOKIE_NAME = 'shopkoro_refresh_test';

let mongoServer: MongoMemoryServer;

describe('Token Utils', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('generateAccessToken', () => {
    it('should generate a valid JWT access token', () => {
      const userId = 'user123';
      const token = generateAccessToken(userId);
      
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });

    it('should contain correct payload', () => {
      const userId = 'user123';
      const token = generateAccessToken(userId);
      
      const decoded = jwt.decode(token) as any;
      expect(decoded.userId).toBe(userId);
    });

    it('should use correct algorithm and expiration', () => {
      const userId = 'user123';
      const token = generateAccessToken(userId);
      
      const decoded = jwt.decode(token, { complete: true }) as any;
      expect(decoded.payload.exp).toBeDefined();
      expect(decoded.header.alg).toBe('HS256');
    });
  });

  describe('createRefreshToken & verifyRefreshToken', () => {
    it('should create and verify a refresh token', async () => {
      const userId = new mongoose.Types.ObjectId().toHexString();
      const token = await createRefreshToken(userId);

      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);

      const { payload } = await verifyRefreshToken(token);
      expect(payload.userId).toBe(userId);
      expect(payload.jti).toBeDefined();
    });

    it('should throw for invalid token', async () => {
      const invalidToken = 'invalid.token.here';

      await expect(verifyRefreshToken(invalidToken as any)).rejects.toThrow();
    });

    it('should throw for token signed with wrong secret', async () => {
      const userId = 'user123';
      const token = jwt.sign({ userId, jti: 'abc' }, 'wrong_secret');

      await expect(verifyRefreshToken(token as any)).rejects.toThrow();
    });
  });

  describe('cookieOptions', () => {
    it('should have correct default options', () => {
      expect(cookieOptions.httpOnly).toBe(true);
      expect(cookieOptions.secure).toBe(true); // NODE_ENV is 'test', so !isDevelopment = true
      expect(cookieOptions.sameSite).toBe('none');
      expect(cookieOptions.path).toBe('/');
      expect(cookieOptions.maxAge).toBe(7 * 24 * 60 * 60 * 1000); // 7 days
    });
  });

  describe('COOKIE_NAMES', () => {
    it('should have correct refresh cookie name', () => {
      expect(COOKIE_NAMES.refresh).toBe('shopkoro_refresh_test');
    });
  });
});
