import axios from 'axios';

// Configure axios defaults
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post('/login/access-token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (userData: {
    email: string;
    password: string;
    full_name: string;
  }) => {
    const response = await api.post('/users/signup', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

// Users API
export const usersApi = {
  getUsers: async () => {
    const response = await api.get('/users/');
    return response.data;
  },

  updateUser: async (userId: string, userData: any) => {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: string) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },
};

// Items API (você pode adaptar conforme suas necessidades)
export const itemsApi = {
  getItems: async () => {
    const response = await api.get('/items/');
    return response.data;
  },

  createItem: async (itemData: any) => {
    const response = await api.post('/items/', itemData);
    return response.data;
  },

  updateItem: async (itemId: string, itemData: any) => {
    const response = await api.patch(`/items/${itemId}`, itemData);
    return response.data;
  },

  deleteItem: async (itemId: string) => {
    const response = await api.delete(`/items/${itemId}`);
    return response.data;
  },
};

export default api;
