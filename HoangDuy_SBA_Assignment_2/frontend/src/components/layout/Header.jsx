// DuyDLH-CE200667
import React from 'react';
import { LogOut, Sun, Moon, Menu } from 'lucide-react';

export default function Header({
  currentUser,
  onLogout,
  activeTab,
  isDarkMode,
  onToggleTheme,
  onToggleMobileMenu
}) {
  const getTabLabel = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Bảng điều khiển';
      case 'category': return 'Quản lý Danh mục';
      case 'news': return 'Quản lý Tin tức';
      case 'users': return 'Quản lý Tài khoản';
      case 'settings': return 'Hồ sơ & Cài đặt';
      default: return 'Trang quản trị';
    }
  };

  const role = currentUser?.accountRole !== undefined ? currentUser.accountRole : currentUser?.role;
  const roleName = role === 1 ? 'Administrator' : 'Staff Editor';
  const displayName = currentUser?.accountName || currentUser?.username || 'User';

  return (
    <header className="app-header d-flex align-items-center justify-content-between px-4 shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <button 
          type="button" 
          className="btn btn-outline-secondary btn-sm d-lg-none"
          onClick={onToggleMobileMenu}
          aria-label="Toggle menu"
        >
          <Menu size={18} />
        </button>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item text-secondary small">FUNews</li>
            <li className="breadcrumb-item active fw-bold small text-body" aria-current="page">
              {getTabLabel(activeTab)}
            </li>
          </ol>
        </nav>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Dark/Light mode toggle */}
        <button 
          type="button" 
          className="btn-theme-circle"
          onClick={onToggleTheme}
          title={isDarkMode ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
          aria-label="Chuyển đổi giao diện Sáng/Tối"
        >
          {isDarkMode ? <Sun size={18} className="text-warning" /> : <Moon size={18} className="text-primary" />}
        </button>

        {/* User profile info pill */}
        <div className="d-flex align-items-center gap-2 px-3 py-1 bg-body-tertiary border rounded-pill">
          <div className="avatar-circle">
            {(displayName || 'U')[0].toUpperCase()}
          </div>
          <div className="d-flex flex-column text-start">
            <span className="fw-semibold text-body small lh-1">{displayName}</span>
            <span className="text-secondary" style={{ fontSize: '11px' }}>{roleName}</span>
          </div>
        </div>

        {/* Logout button */}
        <button 
          type="button" 
          className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 px-3 py-1"
          onClick={onLogout}
          title="Đăng xuất khỏi hệ thống"
        >
          <LogOut size={15} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </header>
  );
}
