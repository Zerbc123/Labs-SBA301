/**
 * Sidebar.jsx - Thanh điều hướng chính của hệ thống quản trị
 * R04: Hiển thị Logo AI
 * R06: Menu 5 mục (Dashboard, Category, News, Users, Settings)
 */

import React from 'react';
import {
  LayoutDashboard,
  FolderTree,
  Newspaper,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/fu-news-logo.jpg';

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard, badge: null },
  { id: 'categories', label: 'Quản lý Thể loại', icon: FolderTree, badge: 'Category' },
  { id: 'news', label: 'Quản lý Tin tức', icon: Newspaper, badge: 'News' },
  { id: 'users', label: 'Quản lý Tài khoản', icon: Users, badge: 'Users' },
  { id: 'settings', label: 'Cài đặt hệ thống', icon: Settings, badge: null }
];

export const Sidebar = ({ activeTab, onSelectTab, isMobileOpen, onCloseMobile }) => {
  const { currentUser, logout } = useAuth();

  const handleMenuClick = (id) => {
    onSelectTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div className="sidebar-backdrop" onClick={onCloseMobile} />
      )}

      <aside className={`admin-sidebar ${isMobileOpen ? 'sidebar-mobile-open' : ''}`}>
        {/* Brand / Logo AI section */}
        <div className="sidebar-brand">
          <div className="brand-logo-wrapper">
            <img
              src={logoImg}
              alt="FUNews Logo AI"
              className="brand-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="brand-badge-ai" title="Logo được sinh bởi AI theo R04">
              <Sparkles size={11} /> AI
            </div>
          </div>
          <div className="brand-text">
            <h2 className="brand-title">FUNews</h2>
            <span className="brand-subtitle">Management System</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="sidebar-nav">
          <div className="nav-section-title">MENU CHỨC NĂNG</div>
          <ul className="nav-list">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id} className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <span className="nav-icon">
                      <Icon size={19} />
                    </span>
                    <span className="nav-label">{item.label}</span>
                    {isActive && <ChevronRight size={16} className="nav-arrow" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile & Logout */}
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="user-avatar">
              {(currentUser?.fullName || currentUser?.username || 'A')[0].toUpperCase()}
            </div>
            <div className="user-details">
              <div className="user-name" title={currentUser?.fullName || currentUser?.username}>
                {currentUser?.fullName || currentUser?.username}
              </div>
              <div className="user-role-label">
                {currentUser?.role === 1 ? 'Quản trị viên' : 'Nhân viên'}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={logout}
            title="Đăng xuất khỏi hệ thống"
          >
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>
    </>
  );
};
