import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import useAuthStore from './authStore';
import { authApi } from '@/lib/api';

// Mock the authApi dependency
vi.mock('@/lib/api', async (importOriginal) => {
    const original = await importOriginal<typeof import('@/lib/api')>();
    return {
        ...original,
        authApi: {
            login: vi.fn(),
            register: vi.fn(),
        },
    };
});

describe('useAuthStore', () => {
    // Reset store and mocks before each test
    beforeEach(() => {
        act(() => {
            // Reset the store to its initial state
            useAuthStore.setState({ userInfo: null });
        });
        // Clear mock history
        vi.clearAllMocks();
        // Clear localStorage
        localStorage.clear();
    });

    const mockUserCredentials = {
        email: 'test@example.com',
        password: 'password123',
    };

    const mockUserInfo = {
        _id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
        token: 'fake-jwt-token',
    };

    describe('login', () => {
        it('should call authApi.login and update userInfo on successful login', async () => {
            // Arrange: Mock the successful API response
            vi.mocked(authApi.login).mockResolvedValue({ data: mockUserInfo });

            // Act: Call the login action
            await act(async () => {
                await useAuthStore.getState().login(mockUserCredentials);
            });

            // Assert
            expect(authApi.login).toHaveBeenCalledWith(mockUserCredentials);
            expect(useAuthStore.getState().userInfo).toEqual(mockUserInfo);
        });

        it('should not update userInfo on failed login', async () => {
            // Arrange: Mock the failed API response
            const loginError = new Error('Invalid credentials');
            vi.mocked(authApi.login).mockRejectedValue(loginError);

            // Act & Assert: Expect the action to throw an error
            await expect(
                act(async () => {
                    await useAuthStore.getState().login(mockUserCredentials);
                })
            ).rejects.toThrow('Invalid credentials');

            expect(useAuthStore.getState().userInfo).toBeNull();
        });
    });

    describe('logout', () => {
        it('should set userInfo to null', () => {
            // Arrange: Set an initial logged-in state
            act(() => {
                useAuthStore.setState({ userInfo: mockUserInfo });
            });

            // Act: Call the logout action
            act(() => {
                useAuthStore.getState().logout();
            });

            // Assert
            expect(useAuthStore.getState().userInfo).toBeNull();
        });
    });
});