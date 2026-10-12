/**
 * AuthContext.jsx - Context quản lý phiên làm việc & trạng thái xác thực
 * Cung cấp: currentUser, isAuthenticated, login, logout
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  useEffect(() => {
    // Khởi tạo dữ liệu mock trong storage nếu chưa có
    storageService.initData();
  }, []);

  const login = (username, password) => {
    const result = authService.login(username, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const isAuthenticated = Boolean(currentUser);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
