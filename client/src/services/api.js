import axios from 'axios';
import { auth } from './auth';
import { toast } from 'react-hot-toast';

const DEFAULT_API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if we should prevent retry for this specific request
    if (originalRequest._preventRetry) {
      return Promise.reject(error);
    }

    // Only attempt refresh if:
    // 1. It's a 401 error
    // 2. We haven't already tried to refresh for this request
    // 3. The request isn't to the refresh endpoint itself (to prevent loops)
    if (
      error.response?.status === 401 && 
      !originalRequest._retry &&
      !originalRequest.url?.includes('/refresh')
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await auth.refreshToken();
        
        // Get the new token and update the request
        const token = auth.getToken();
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } else {
          // If no token was returned, we need to log out
          auth.logout();
          return Promise.reject(new Error('Authentication failed'));
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        auth.logout();
        return Promise.reject(refreshError);
      }
    }

    // For other errors, ensure we're not showing duplicate toasts
    if (!originalRequest._preventToast) {
      // Show toast only for server errors or network issues
      if (!error.response || error.response.status >= 500) {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
      originalRequest._preventToast = true;
    }

    return Promise.reject(error);
  }
);

export const posts = {
  getAll: () => api.get('/posts'),
  getOne: (slug) => api.get(`/posts/${slug}`),
  create: (data) => api.post('/posts', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id, data) => api.put(`/posts/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response;
    } catch (error) {
      console.error('Delete request failed:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const events = {
  getAll: () => api.get('/events'),
  getOne: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id, data) => api.put(`/events/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: async (id) => {
    try {
      const response = await api.delete(`/events/${id}`);
      return response;
    } catch (error) {
      console.error('Delete request failed:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const categories = {
  getAll: (type) => api.get(`/categories?type=${type}`),
  create: (data) => api.post('/categories', data),
  delete: (id) => api.delete(`/categories/${id}`)
};

export const gallery = {
  getAll: () => api.get('/gallery'),
  getOne: (id) => api.get(`/gallery/${id}`),
  create: (data) => api.post('/gallery', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id, data) => api.put(`/gallery/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id) => api.delete(`/gallery/${id}`),
  getAlbums: () => api.get('/gallery/albums', {
    _preventToast: true
  }),
  getAlbum: (id) => api.get(`/gallery/albums/${id}`),
  createAlbum: (data) => api.post('/gallery/albums', data),
  updateAlbum: (id, data) => api.put(`/gallery/albums/${id}`, data),
  deleteAlbum: (id) => api.delete(`/gallery/albums/${id}`),
  moveToAlbum: (imageIds, albumId) => api.post('/gallery/move-to-album', { imageIds, albumId }),
  getPublished: () => api.get('/gallery/published'),
  getByAlbum: (albumId) => api.get(`/gallery/albums/${albumId}/images`),
};

export const programs = {
  getAll: () => {
    return api.get('/programs', {
      _preventToast: true,
      headers: {
        'Cache-Control': 'max-age=300'
      }
    });
  },
  getOne: (slug) => {
    return api.get(`/programs/${slug}`, {
      headers: {
        'Cache-Control': 'max-age=300'
      }
    });
  },
  create: (data) => {
    return api.post('/programs', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
      _preventRetry: true
    });
  },
  update: (id, data) => api.put(`/programs/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id) => api.delete(`/programs/${id}`),
};

export const settings = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
};

export const users = {
  getAll: () => api.get('/users'),
  getOne: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`)
};

export default api;