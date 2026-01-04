import jwt from 'jsonwebtoken';
import { generateAccessToken, signRefreshToken, verifyRefreshToken, cookieOptions, COOKIE_NAMES } from '../../utils/tokens';

// Mock environment variables
process.env.ACCESS_TOKEN_SECRET = 'test_access_secret';
process.env.REFRESH_TOKEN_SECRET = 'test_refresh_secret';
process.env.ACCESS_TOKEN_EXPIRES_IN = '15m';
process.env.REFRESH_TOKEN_EXPIRES_IN = '7d';
process.env.REFRESH_COOKIE_NAME = 'shopkoro_refresh_test';

describe('Token Utils', () => {
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

  describe('signRefreshToken', () => {
    it('should generate a valid JWT refresh token', () => {
      const userId = 'user123';
      const token = signRefreshToken(userId);
      
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });

    it('should contain correct payload', () => {
      const userId = 'user123';
      const token = signRefreshToken(userId);
      
      const decoded = jwt.decode(token) as any;
      expect(decoded.userId).toBe(userId);
    });

    it('should have longer expiration than access token', () => {
      const userId = 'user123';
      const accessToken = generateAccessToken(userId);
      const refreshToken = signRefreshToken(userId);
      
      const accessDecoded = jwt.decode(accessToken) as any;
      const refreshDecoded = jwt.decode(refreshToken) as any;
      
      expect(refreshDecoded.exp).toBeGreaterThan(accessDecoded.exp);
    });
  });

  describe('verifyRefreshToken', () => {
    it('should verify a valid refresh token', () => {
      const userId = 'user123';
      const token = signRefreshToken(userId);
      
      const payload = verifyRefreshToken(token);
      
      expect(payload.userId).toBe(userId);
    });

    it('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => {
        verifyRefreshToken(invalidToken);
      }).toThrow();
    });

    it('should throw error for token with wrong secret', () => {
      const userId = 'user123';
      const token = jwt.sign({ userId }, 'wrong_secret');
      
      expect(() => {
        verifyRefreshToken(token);
      }).toThrow();
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
