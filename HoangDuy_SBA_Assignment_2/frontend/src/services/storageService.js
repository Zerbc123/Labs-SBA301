// DuyDLH-CE200667
import { INITIAL_CATEGORIES, INITIAL_NEWS, INITIAL_USERS } from './initialData';

const STORAGE_KEYS = {
  CATEGORIES: 'funews_categories',
  NEWS: 'funews_news',
  USERS: 'funews_users',
  AUTH: 'funews_current_user',
  THEME: 'funews_theme_dark'
};

// Update student name in saved users and the active session.
function normalizeStudentName(user) {
  if (!user) return user;
  if (user.id === 3 || user.username === 'hoangduy') {
    return {
      ...user,
      id: 3,
      username: 'hoangduy',
      fullName: 'Đào Lê Hoàng Duy',
      email: 'duydlh.ce200667@funews.edu.vn'
    };
  }
  return user;
}

function loadUsers() {
  const users = loadFromStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
  const updated = users.map(normalizeStudentName);
  if (updated.some((user, index) => user !== users[index])) {
    saveToStorage(STORAGE_KEYS.USERS, updated);
  }
  return updated;
}

// Generic loader with fallback and null safety
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading key "${key}" from localStorage:`, err);
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving key "${key}" to localStorage:`, err);
  }
}

export const StorageService = {
  // Categories
  getCategories: () => loadFromStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES),
  saveCategories: (categories) => saveToStorage(STORAGE_KEYS.CATEGORIES, categories),

  // News
  getNews: () => loadFromStorage(STORAGE_KEYS.NEWS, INITIAL_NEWS),
  saveNews: (news) => saveToStorage(STORAGE_KEYS.NEWS, news),

  // Users
  getUsers: loadUsers,
  saveUsers: (users) => saveToStorage(STORAGE_KEYS.USERS, users),

  // Mock authentication uses the latest saved accounts, including CRUD changes.
  authenticate: (username, password) => {
    const account = loadUsers().find(user =>
      user.username.toLowerCase() === username.trim().toLowerCase() &&
      user.password === password.trim()
    );

    if (!account) {
      return { user: null, error: 'Tên đăng nhập hoặc mật khẩu không chính xác!' };
    }
    if (account.status !== 1) {
      return { user: null, error: 'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên để kích hoạt.' };
    }
    if (account.role !== 1 && account.role !== 2) {
      return { user: null, error: 'Vai trò tài khoản không hợp lệ. Vui lòng liên hệ quản trị viên.' };
    }

    return {
      user: {
        id: account.id,
        username: account.username,
        fullName: account.fullName,
        role: account.role
      },
      error: null
    };
  },

  // Current session/auth
  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
      const savedUser = raw ? JSON.parse(raw) : null;
      const user = normalizeStudentName(savedUser);
      if (user !== savedUser) saveToStorage(STORAGE_KEYS.AUTH, user);
      return user;
    } catch {
      return null;
    }
  },
  saveCurrentUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  },

  // Dark mode
  getDarkMode: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) === 'true';
    } catch {
      return false;
    }
  },
  setDarkMode: (isDark) => {
    localStorage.setItem(STORAGE_KEYS.THEME, String(isDark));
  },

  // Reset to initial factory defaults
  resetAll: () => {
    saveToStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    saveToStorage(STORAGE_KEYS.NEWS, INITIAL_NEWS);
    saveToStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
    return {
      categories: INITIAL_CATEGORIES,
      news: INITIAL_NEWS,
      users: INITIAL_USERS
    };
  }
};
