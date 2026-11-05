// DuyDLH-CE200667
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AdminLayout({
  currentUser,
  onLogout,
  activeTab,
  setActiveTab,
  categories,
  news,
  users,
  isDarkMode,
  onToggleTheme,
  children
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="d-flex min-vh-100 bg-body-tertiary">
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categoryCount={categories.length}
        newsCount={news.length}
        userCount={users.length}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <div className="d-flex flex-column flex-grow-1 min-vw-0">
        <Header
          currentUser={currentUser}
          onLogout={onLogout}
          activeTab={activeTab}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
          onToggleMobileMenu={() => setIsMobileOpen(prev => !prev)}
        />
        <main className="flex-grow-1 p-3 p-md-4">
          <div className="container-fluid px-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
