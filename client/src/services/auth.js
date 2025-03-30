import api from './api';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const authApi = {
  login: (credentials, remember) => 
    api.post('/auth/login', { ...credentials, remember }),
  logout: () => 
    api.post('/auth/logout'),
  refresh: () => 
    api.post('/auth/refresh'),
  getCurrentUser: () => 
    api.get('/auth/me')
};

export const auth = {
  login: async (credentials, remember = false) => {
    const response = await authApi.login(credentials, remember);
    const { token, user } = response.data;
    localStorage.setItem(TOKEN_KEY, token);
    return { token, user };
  },

  logout: async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  refreshToken: async () => {
    try {
      const response = await authApi.refresh();
      const { token } = response.data;
      localStorage.setItem(TOKEN_KEY, token);
      return token;
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      throw error;
    }
  },

  getCurrentUser: async () => {
    return authApi.getCurrentUser();
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    try {
      // Decode JWT and check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};

export default auth; 