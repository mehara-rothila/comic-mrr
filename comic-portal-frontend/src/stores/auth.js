import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token'),
        returnUrl: null
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
                localStorage.setItem('token', response.data.access_token);
                console.log('Registration successful');
                return true;
            } catch (error) {
                console.error('Registration error:', error.response?.data || error.message);
                throw error;
            }
        },

        async login(credentials) {
            try {
                console.log('Starting login...');
                const response = await api.post('/login', credentials);
                this.user = response.data.user;
                this.token = response.data.access_token;
                localStorage.setItem('token', response.data.access_token);
                console.log('Login successful');
                return true;
            } catch (error) {
                console.error('Login error:', error.response?.data || error.message);
                throw error;
            }
        },

        async logout() {
            try {
                console.log('Starting logout process...');
                
                if (!this.token) {
                    console.log('No token found, clearing state only');
                    this.clearAuth();
                    return true;
                }

                try {
                    const response = await api.post('/logout', {}, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    });
                    console.log('Logout API response:', response.data);
                } catch (apiError) {
                    console.error('Logout API error:', apiError.response?.data || apiError.message);
                } finally {
                    // Always clear local state
                    this.clearAuth();
                    console.log('Local state cleared');
                }
                
                return true;
            } catch (error) {
                console.error('Logout error:', error);
                // Still clear local state
                this.clearAuth();
                throw error;
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
                const response = await api.get('/user');
                this.user = response.data.user;
                return this.user;
            } catch (error) {
                console.error('Fetch user error:', error.response?.data || error.message);
                if (error.response?.status === 401) {
                    this.clearAuth();
                }
                throw error;
            }
        }
    }
});