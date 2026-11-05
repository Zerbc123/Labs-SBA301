// DuyDLH-CE200667
import React, { useState, useEffect, useCallback } from 'react';
import './styles/index.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/views.css';

import { api, getErrorMessage } from './services/api';
import LoginView from './views/LoginView';
import AdminLayout from './components/layout/AdminLayout';
import DashboardView from './views/DashboardView';
import CategoryView from './views/CategoryView';
import NewsView from './views/NewsView';
import UserView from './views/UserView';
import SettingsView from './views/SettingsView';
import Toast from './components/common/Toast';
import { LogIn, Globe, Shield } from 'lucide-react';
import logoSvg from './assets/logo.svg';

export default function App() {
  // 1. Auth & Session State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('funews_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      // Xóa phiên làm việc cũ không tương thích (từ Assignment 01)
      if (parsed && (!parsed.accountID && !parsed.accountEmail)) {
        localStorage.removeItem('funews_user');
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });
  const [isGuest, setIsGuest] = useState(false);

  // 2. Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');

  // 3. Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('funews_theme') === 'dark';
  });

  // 4. Data States (Live from Spring Boot RESTful API)
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 5. Toast Feedback State
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync theme with DOM root attribute
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('funews_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('funews_theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Load Data from Spring Boot RESTful API
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [catList, newsList, tagList] = await Promise.all([
        api.category.getAll(),
        api.news.getAll(),
        api.tag.getAll()
      ]);
      setCategories(catList || []);
      setNews(newsList || []);
      setTags(tagList || []);

      // Admin role (1) fetches all accounts
      const role = currentUser?.accountRole !== undefined ? currentUser.accountRole : currentUser?.role;
      if (role === 1 || role === '1') {
        const userList = await api.account.getAll();
        setUsers(userList || []);
      }
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu từ Backend API:", err);
      showToast(getErrorMessage(err, "Không thể kết nối đến Backend Spring Boot (port 8080)!"), "error");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, showToast]);

  // Load Data for Guest mode (Active news only, no authentication required)
  const loadGuestData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [activeNews, activeCats] = await Promise.all([
        api.news.getActive(),
        api.category.getActive()
      ]);
      setNews(activeNews || []);
      setCategories(activeCats || []);
    } catch (err) {
      console.error("Lỗi tải tin tức công khai:", err);
      showToast(getErrorMessage(err, "Không thể tải tin tức công khai từ Backend!"), "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (currentUser) {
      loadData();
    } else if (isGuest) {
      loadGuestData();
    }
  }, [currentUser, isGuest, loadData, loadGuestData]);

  // ==========================================
  // AUTH HANDLERS
  // ==========================================
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('funews_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    setIsGuest(false);
    setActiveTab('dashboard');
    showToast(`Chào mừng ${user.accountName || user.username} đã đăng nhập thành công!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('funews_user');
    setIsGuest(false);
    setActiveTab('dashboard');
    showToast('Đã đăng xuất khỏi phiên làm việc', 'info');
  };

  const handleGuestMode = () => {
    setIsGuest(true);
  };

  // ==========================================
  // CATEGORY CRUD HANDLERS (Via Spring Boot API)
  // ==========================================
  const handleAddCategory = async (newCat) => {
    try {
      await api.category.create(newCat);
      await loadData();
      showToast(`Đã thêm danh mục "${newCat.categoryName}" thành công!`, 'success');
    } catch (err) {
      showToast(getErrorMessage(err, "Không thể thêm danh mục!"), 'error');
    }
  };

  const handleUpdateCategory = async (id, updatedFields) => {
    try {
      await api.category.update(id, updatedFields);
      await loadData();
      showToast(`Đã cập nhật danh mục #${id} thành công!`, 'success');
    } catch (err) {
      showToast(getErrorMessage(err, "Không thể cập nhật danh mục!"), 'error');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await api.category.delete(id);
      await loadData();
      showToast(`Đã xóa danh mục #${id} thành công!`, 'success');
    } catch (err) {
      // Backend constraint error: "Cannot delete category because it is already used in news articles!"
      showToast(getErrorMessage(err, "Không thể xóa danh mục!"), 'error');
    }
  };

  // ==========================================
  // NEWS CRUD HANDLERS (Via Spring Boot API)
  // ==========================================
  const handleAddNews = async (newArticle) => {
    try {
      await api.news.create(newArticle);
      await loadData();
      showToast(`Đã đăng bài viết "${newArticle.newsTitle}" thành công!`, 'success');
    } catch (err) {
      showToast(getErrorMessage(err, "Không thể đăng bài viết!"), 'error');
    }
  };

  const handleUpdateNews = async (id, updatedFields) => {
    try {
      await api.news.update(id, updatedFields);
      await loadData();
      showToast(`Đã cập nhật bài viết #${id} thành công!`, 'success');
    } catch (err) {
      showToast(getErrorMessage(err, "Không thể cập nhật bài viết!"), 'error');
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      await api.news.delete(id);
      await loadData();
      showToast(`Đã xóa bài viết #${id} thành công!`, 'info');
    } catch (err) {
      showToast(getErrorMessage(err, "Không thể xóa bài viết!"), 'error');
    }
  };

  // ==========================================
  // USER / ACCOUNT CRUD HANDLERS (Via Spring Boot API)
  // ==========================================
  const handleAddUser = async (newUser) => {
    try {
      await api.account.create(newUser);
      await loadData();
      showToast(`Đã tạo tài khoản ${newUser.accountEmail} thành công!`, 'success');
    } catch (err) {
      showToast(getErrorMessage(err, "Không thể tạo tài khoản!"), 'error');
    }
  };

  const handleUpdateUser = async (id, updatedFields) => {
    try {
      await api.account.update(id, updatedFields);
      await loadData();
      showToast(`Đã cập nhật tài khoản #${id} thành công!`, 'success');
    } catch (err) {
      showToast(getErrorMessage(err, "Không thể cập nhật tài khoản!"), 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.account.delete(id);
      await loadData();
      showToast(`Đã xóa tài khoản #${id} thành công!`, 'info');
    } catch (err) {
      // Backend constraint error: "Cannot delete account because it has created news articles!"
      showToast(getErrorMessage(err, "Không thể xóa tài khoản!"), 'error');
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const accId = currentUser.accountID || currentUser.id;
      const updated = await api.account.update(accId, profileData);
      setCurrentUser(updated);
      localStorage.setItem('funews_user', JSON.stringify(updated));
      showToast('Cập nhật hồ sơ cá nhân thành công!', 'success');
      await loadData();
    } catch (err) {
      showToast(getErrorMessage(err, 'Không thể cập nhật hồ sơ!'), 'error');
      throw err;
    }
  };

  // ==========================================
  // RENDER: GUEST MODE (Public News Viewing)
  // ==========================================
  if (isGuest && !currentUser) {
    return (
      <div className="min-vh-100 bg-body-tertiary">
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm">
          <div className="container-fluid">
            <div className="d-flex align-items-center gap-2">
              <img src={logoSvg} alt="FUNews Logo" width="36" height="36" className="rounded" />
              <span className="navbar-brand fw-bold mb-0">FUNews Management (Cổng Tin Tức Đại Học)</span>
              <span className="badge bg-success ms-2">Chế độ xem công khai</span>
            </div>
            <button
              type="button"
              className="btn btn-outline-light d-flex align-items-center gap-2 btn-sm"
              onClick={() => setIsGuest(false)}
            >
              <LogIn size={16} />
              <span>Đăng nhập Quản trị</span>
            </button>
          </div>
        </nav>

        {/* Content Container */}
        <div className="container py-4">
          <NewsView
            news={news}
            categories={categories}
            availableTags={tags}
            currentUser={null}
            isGuest={true}
          />
        </div>

        <Toast toasts={toasts} onDismiss={dismissToast} />
      </div>
    );
  }

  // ==========================================
  // RENDER: LOGIN VIEW (If not authenticated)
  // ==========================================
  if (!currentUser) {
    return (
      <>
        <LoginView
          onLoginSuccess={handleLoginSuccess}
          onGuestMode={handleGuestMode}
        />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  // ==========================================
  // RENDER: ADMIN / STAFF MASTER LAYOUT
  // ==========================================
  return (
    <>
      <AdminLayout
        currentUser={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categories={categories}
        news={news}
        users={users}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      >
        {activeTab === 'dashboard' && (
          <DashboardView
            categories={categories}
            news={news}
            users={users}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'category' && (
          <CategoryView
            categories={categories}
            news={news}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {activeTab === 'news' && (
          <NewsView
            news={news}
            categories={categories}
            availableTags={tags}
            currentUser={currentUser}
            isGuest={false}
            onAddNews={handleAddNews}
            onUpdateNews={handleUpdateNews}
            onDeleteNews={handleDeleteNews}
          />
        )}

        {activeTab === 'users' && (
          <UserView
            users={users}
            currentUser={currentUser}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            currentUser={currentUser}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </AdminLayout>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
