import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token'),
        returnUrl: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async register(credentials) {
            try {
                console.log('Starting registration...');
                const response = await api.post('/register', credentials);
                this.user = response.data.user;
                this.token = response.data.access_token;

                // Save token in localStorage
                localStorage.setItem('token', response.data.access_token);
                console.log('Registration successful');
                return true;
            } catch (error) {
                console.error('Registration error:', error.response?.data || error.message);

                // Handle specific validation errors
                if (error.response?.data?.errors) {
                    const validationErrors = error.response.data.errors;
                    if (validationErrors.email) {
                        throw new Error(validationErrors.email[0]); // Duplicate email error
                    } else if (validationErrors.password) {
                        throw new Error(validationErrors.password[0]); // Password validation error
                    }
                }

                // Throw general error message if no specific validation error
                throw new Error(
                    error.response?.data?.message || 'Registration failed. Please try again.'
                );
            }
        },

        async login(credentials) {
            try {
                console.log('Starting login...');
                const response = await api.post('/login', credentials);
                this.user = response.data.user;
                this.token = response.data.access_token;

                // Save token in localStorage
                localStorage.setItem('token', response.data.access_token);
                console.log('Login successful');
                return true;
            } catch (error) {
                console.error('Login error:', error.response?.data || error.message);

                // Handle specific errors
                if (error.response?.data?.errors) {
                    const validationErrors = error.response.data.errors;
                    if (validationErrors.email) {
                        throw new Error(validationErrors.email[0]); // Incorrect email error
                    } else if (validationErrors.password) {
                        throw new Error(validationErrors.password[0]); // Incorrect password error
                    }
                }

                // Throw general error message if no specific validation error
                throw new Error(
                    error.response?.data?.message || 'Login failed. Please check your credentials.'
                );
            }
        },

        async logout() {
            try {
                console.log('Starting logout process...');
                if (this.token) {
                    await api.post(
                        '/logout',
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${this.token}`,
                            },
                        }
                    );
                    console.log('Logout successful');
                }
            } catch (error) {
                console.error('Logout error:', error.response?.data || error.message);
            } finally {
                // Clear local auth state regardless of API call success
                this.clearAuth();
                console.log('Local state cleared');
            }
        },

        clearAuth() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        },

        async fetchUser() {
            try {
                if (!this.token) return null;
                const response = await api.get('/user', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.user = response.data.user;
                return this.user;
            } catch (error) {
                console.error('Fetch user error:', error.response?.data || error.message);

                // Clear auth state if unauthorized
                if (error.response?.status === 401) {
                    this.clearAuth();
                }
                throw new Error('Unable to fetch user information.');
            }
        },
    },
});
