// DuyDLH-CE200667
// API Service kết nối Spring Boot RESTful API (Assignment 02)
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper lấy message lỗi từ response Backend
export const getErrorMessage = (error, defaultMsg = 'Đã có lỗi xảy ra!') => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return `${error.response.data.error}: ${error.response.data.message || ''}`;
  }
  if (error.message) {
    return error.message;
  }
  return defaultMsg;
};

export const api = {
  // 1. Auth & Profile
  auth: {
    login: async (email, password) => {
      const res = await apiClient.post('/auth/login', { email, password });
      return res.data;
    },
    getProfile: async (id) => {
      const res = await apiClient.get(`/auth/me/${id}`);
      return res.data;
    }
  },

  // 2. Categories
  category: {
    getAll: async () => {
      const res = await apiClient.get('/categories');
      return res.data;
    },
    getActive: async () => {
      const res = await apiClient.get('/categories/active');
      return res.data;
    },
    getById: async (id) => {
      const res = await apiClient.get(`/categories/${id}`);
      return res.data;
    },
    create: async (categoryData) => {
      const res = await apiClient.post('/categories', categoryData);
      return res.data;
    },
    update: async (id, categoryData) => {
      const res = await apiClient.put(`/categories/${id}`, categoryData);
      return res.data;
    },
    delete: async (id) => {
      const res = await apiClient.delete(`/categories/${id}`);
      return res.data;
    },
    search: async (keyword) => {
      const res = await apiClient.get(`/categories/search?keyword=${encodeURIComponent(keyword || '')}`);
      return res.data;
    }
  },

  // 3. News Articles
  news: {
    getAll: async () => {
      const res = await apiClient.get('/news');
      return res.data;
    },
    getActive: async () => {
      const res = await apiClient.get('/news/active');
      return res.data;
    },
    getById: async (id) => {
      const res = await apiClient.get(`/news/${id}`);
      return res.data;
    },
    getByCreator: async (accountId) => {
      const res = await apiClient.get(`/news/history/${accountId}`);
      return res.data;
    },
    create: async (newsData) => {
      const res = await apiClient.post('/news', newsData);
      return res.data;
    },
    update: async (id, newsData) => {
      const res = await apiClient.put(`/news/${id}`, newsData);
      return res.data;
    },
    delete: async (id) => {
      const res = await apiClient.delete(`/news/${id}`);
      return res.data;
    },
    search: async (keyword) => {
      const res = await apiClient.get(`/news/search?keyword=${encodeURIComponent(keyword || '')}`);
      return res.data;
    }
  },

  // 4. Accounts (Users)
  account: {
    getAll: async () => {
      const res = await apiClient.get('/accounts');
      return res.data;
    },
    getById: async (id) => {
      const res = await apiClient.get(`/accounts/${id}`);
      return res.data;
    },
    create: async (accountData) => {
      const res = await apiClient.post('/accounts', accountData);
      return res.data;
    },
    update: async (id, accountData) => {
      const res = await apiClient.put(`/accounts/${id}`, accountData);
      return res.data;
    },
    delete: async (id) => {
      const res = await apiClient.delete(`/accounts/${id}`);
      return res.data;
    },
    search: async (keyword) => {
      const res = await apiClient.get(`/accounts/search?keyword=${encodeURIComponent(keyword || '')}`);
      return res.data;
    }
  },

  // 5. Tags
  tag: {
    getAll: async () => {
      const res = await apiClient.get('/tags');
      return res.data;
    },
    getById: async (id) => {
      const res = await apiClient.get(`/tags/${id}`);
      return res.data;
    },
    create: async (tagData) => {
      const res = await apiClient.post('/tags', tagData);
      return res.data;
    }
  }
};

export default api;

