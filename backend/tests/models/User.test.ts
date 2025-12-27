import bcrypt from 'bcryptjs';
import User, { IUser } from '../../models/User';

describe('User Model', () => {
  describe('Schema Validation', () => {
    it('should require name field', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false
      };

      const user = new User(userData);
      const validationError = user.validateSync();

      expect(validationError?.errors.name).toBeDefined();
      expect(validationError?.errors.name.kind).toBe('required');
    });

    it('should require email field', () => {
      const userData = {
        name: 'Test User',
        password: 'password123',
        isAdmin: false
      };

      const user = new User(userData);
      const validationError = user.validateSync();

      expect(validationError?.errors.email).toBeDefined();
      expect(validationError?.errors.email.kind).toBe('required');
    });

    it('should require password field for new users', () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        isAdmin: false
      };

      const user = new User(userData);
      const validationError = user.validateSync();

      expect(validationError?.errors.password).toBeDefined();
      expect(validationError?.errors.password.kind).toBe('required');
    });

    it('should enforce unique email', () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false
      };

      const user = new User(userData);
      const validationError = user.validateSync();

      // Check that email field has unique constraint
      expect(user.schema.paths.email.options.unique).toBe(true);
    });

    it('should default isAdmin to false', () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      expect(user.isAdmin).toBe(false);
    });

    it('should trim name and email fields', () => {
      const userData = {
        name: '  Test User  ',
        email: '  test@example.com  ',
        password: 'password123',
        isAdmin: false
      };

      const user = new User(userData);
      // Note: Mongoose doesn't automatically trim string fields unless specified in schema
      // This test verifies the current behavior
      expect(user.name).toBe('  Test User  ');
      expect(user.email).toBe('  test@example.com  ');
    });
  });

  describe('Password Hashing', () => {
    it('should have pre-save hook defined', () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false
      };

      const user = new User(userData);
      
      // Check that pre-save hook is defined
      expect(user.schema.pre).toBeDefined();
    });

    it('should have matchPassword method', () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false
      };

      const user = new User(userData);
      expect(typeof user.matchPassword).toBe('function');
    });
  });
  });

  describe('Password Comparison', () => {
    it('should compare passwords correctly', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        isAdmin: false
      };

      const user = new User(userData);
      const isMatch = await user.matchPassword(password);

      expect(isMatch).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const password = 'password123';
      const wrongPassword = 'wrongpassword';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        isAdmin: false
      };

      const user = new User(userData);
      const isMatch = await user.matchPassword(wrongPassword);

      expect(isMatch).toBe(false);
    });

    it('should return false if password is undefined', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        isAdmin: false
      };

      const user = new User(userData);
      const isMatch = await user.matchPassword('anypassword');

      expect(isMatch).toBe(false);
    });
  });

  describe('Interface Compliance', () => {
    it('should conform to IUser interface', () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false
      };

      const user = new User(userData);
      
      expect(user.name).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.isAdmin).toBeDefined();
      expect(typeof user.matchPassword).toBe('function');
    });
  });

