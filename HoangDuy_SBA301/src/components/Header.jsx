/**
 * Header.jsx - Thanh tiêu đề phía trên của Admin Layout (R05)
 * Hiển thị tiêu đề trang hiện tại, breadcrumbs, ngày giờ thực tế và thông tin người dùng
 */

import React, { useState, useEffect } from 'react';
import { Menu, Calendar, Clock, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MENU_ITEMS } from './Sidebar';

export const Header = ({ activeTab, onToggleMobile }) => {
  const { currentUser } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentMenu = MENU_ITEMS.find((item) => item.id === activeTab);
  const currentTitle = currentMenu ? currentMenu.label : 'Bảng điều khiển';

  // Format ngày giờ Việt Nam
  const formattedDate = currentTime.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedClock = currentTime.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          type="button"
          className="header-mobile-toggle"
          onClick={onToggleMobile}
          aria-label="Mở menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-breadcrumbs">
          <span className="breadcrumb-root">Hệ thống</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">{currentTitle}</span>
        </div>
      </div>

      <div className="header-right">
        {/* Đồng hồ hệ thống thời gian thực */}
        <div className="header-time-pill" title="Thời gian hệ thống">
          <Calendar size={14} />
          <span>{formattedDate}</span>
          <span className="time-divider">•</span>
          <Clock size={14} />
          <span className="time-clock">{formattedClock}</span>
        </div>

        {/* Thông tin user đăng nhập */}
        <div className="header-user-tag">
          <span className="user-online-dot"></span>
          <User size={15} />
          <span className="user-tag-name">{currentUser?.username || 'Admin'}</span>
          <span className="user-tag-role">
            ({currentUser?.role === 1 ? 'Admin' : 'Staff'})
          </span>
        </div>
      </div>
    </header>
  );
};
