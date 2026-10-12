/**
 * AdminLayout.jsx - Layout khung chuẩn cho toàn bộ trang quản trị (R05)
 * Kết nối Sidebar + Header + Khu vực nội dung Content + Footer
 */

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AdminLayout = ({ activeTab, onSelectTab, children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="admin-wrapper">
      {/* Thanh bên trái */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Vùng nội dung chính */}
      <div className="admin-main-area">
        <Header
          activeTab={activeTab}
          onToggleMobile={() => setIsMobileOpen((prev) => !prev)}
        />

        <main className="admin-content-container">
          {children}
        </main>

        <footer className="admin-footer">
          <p>© 2026 FUNews Management System • SBA301 Assignment 01 • Built with ReactJS & Vite</p>
        </footer>
      </div>
    </div>
  );
};
