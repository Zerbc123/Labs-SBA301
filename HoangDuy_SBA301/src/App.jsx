/**
 * App.jsx - Component gốc của ứng dụng FUNewsManagementSystem
 * Điều phối luồng xác thực (LoginPage vs AdminLayout)
 * và điều hướng tab chức năng (State Navigation SPA)
 */

import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { AdminLayout } from './components/AdminLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CategoryPage } from './pages/CategoryPage';
import { NewsPage } from './pages/NewsPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';

export function AppContent() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Nếu chưa đăng nhập -> Hiển thị LoginPage
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Nếu đã đăng nhập -> Hiển thị AdminLayout và page tương ứng
  return (
    <AdminLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <DashboardPage onNavigate={setActiveTab} />
      )}
      {activeTab === 'categories' && <CategoryPage />}
      {activeTab === 'news' && <NewsPage />}
      {activeTab === 'users' && <UsersPage />}
      {activeTab === 'settings' && <SettingsPage />}
    </AdminLayout>
  );
}

export default function App() {
  return <AppContent />;
}
