/**
 * storageService.js - Quản lý lưu trữ localStorage đồng bộ
 * Đảm bảo dữ liệu không bị mất sau khi reload (Persistence requirement)
 */

import { INITIAL_CATEGORIES, INITIAL_NEWS, INITIAL_USERS } from '../data/initialData';

const KEYS = {
  CATEGORIES: 'fu_news_categories',
  NEWS: 'fu_news_articles',
  USERS: 'fu_news_users',
  AUTH: 'fu_news_auth_session',
  THEME: 'fu_news_theme'
};

export const storageService = {
  // Lấy dữ liệu với fallback an toàn
  get(key, defaultValue) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Lỗi khi đọc storage key [${key}]:`, error);
      return defaultValue;
    }
  },

  // Lưu dữ liệu
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Lỗi khi ghi storage key [${key}]:`, error);
    }
  },

  // Khởi tạo dữ liệu ban đầu nếu localStorage chưa có
  initData() {
    if (!localStorage.getItem(KEYS.CATEGORIES)) {
      this.set(KEYS.CATEGORIES, INITIAL_CATEGORIES);
    }
    if (!localStorage.getItem(KEYS.NEWS)) {
      this.set(KEYS.NEWS, INITIAL_NEWS);
    }
    if (!localStorage.getItem(KEYS.USERS)) {
      this.set(KEYS.USERS, INITIAL_USERS);
    }
  },

  // Reset về dữ liệu gốc (phục vụ test và chấm thi)
  resetToDefault() {
    this.set(KEYS.CATEGORIES, INITIAL_CATEGORIES);
    this.set(KEYS.NEWS, INITIAL_NEWS);
    this.set(KEYS.USERS, INITIAL_USERS);
  },

  KEYS
};
