// DuyDLH-CE200667
import React from 'react';
import { 
  LayoutDashboard, 
  FolderTree, 
  Newspaper, 
  Users, 
  Settings,
  ShieldAlert
} from 'lucide-react';
import logoSvg from '../../assets/logo.svg';

export default function Sidebar({
  currentUser,
  activeTab,
  setActiveTab,
  categoryCount = 0,
  newsCount = 0,
  userCount = 0,
  isMobileOpen = false,
  onCloseMobile
}) {
  const role = currentUser?.accountRole !== undefined ? currentUser.accountRole : currentUser?.role;
  const isStaff = role === 2;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Bảng điều khiển',
      icon: LayoutDashboard,
      badge: null,
      restricted: false
    },
    {
      id: 'category',
      label: 'Quản lý Danh mục',
      icon: FolderTree,
      badge: categoryCount,
      restricted: false
    },
    {
      id: 'news',
      label: 'Quản lý Tin tức',
      icon: Newspaper,
      badge: newsCount,
      restricted: false
    },
    {
      id: 'users',
      label: 'Quản lý Tài khoản',
      icon: Users,
      badge: userCount,
      restricted: isStaff
    },
    {
      id: 'settings',
      label: 'Hồ sơ & Cài đặt',
      icon: Settings,
      badge: null,
      restricted: false
    }
  ];

  const handleSelectTab = (tabId, restricted) => {
    if (restricted) return;
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className={`app-sidebar ${isMobileOpen ? 'show' : ''} p-3`}>
      {/* Brand Header */}
      <div className="d-flex align-items-center gap-2 pb-3 mb-3 border-bottom border-secondary border-opacity-25">
        <img 
          src={logoSvg} 
          alt="FUNews Management Logo" 
          width="36"
          height="36"
          className="rounded"
        />
        <div>
          <div className="fw-bold text-white d-flex align-items-center gap-2">
            <span>FUNews</span>
            <span className="badge bg-primary rounded-pill" style={{ fontSize: '10px' }}>SBA301</span>
          </div>
          <small className="text-secondary" style={{ fontSize: '11px' }}>Quản trị Cổng Tin Tức</small>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="small text-uppercase text-secondary fw-bold px-2 mb-2" style={{ letterSpacing: '0.05em', fontSize: '11px' }}>
        Hệ thống quản trị
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isRestricted = item.restricted;

          return (
            <li key={item.id} className="nav-item">
              <button
                type="button"
                className={`nav-link w-100 border-0 ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectTab(item.id, isRestricted)}
                disabled={isRestricted}
                style={isRestricted ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {isRestricted ? (
                  <ShieldAlert size={14} className="ms-auto text-warning" />
                ) : item.badge !== null ? (
                  <span className={`badge rounded-pill ms-auto ${isActive ? 'bg-white text-primary' : 'bg-secondary bg-opacity-50 text-white'}`} style={{ fontSize: '11px' }}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer Student Badge */}
      <div className="pt-3 mt-auto border-top border-secondary border-opacity-25">
        <div className="p-2 rounded bg-dark bg-opacity-50 border border-secondary border-opacity-25">
          <div className="text-light fw-semibold small">Sinh viên thực hiện:</div>
          <div className="text-white small fw-bold">Đào Lê Hoàng Duy • CE200667</div>
          <div className="text-secondary" style={{ fontSize: '11px' }}>Assignment 02 - Spring REST + ReactJS</div>
        </div>
      </div>
    </aside>
  );
}
