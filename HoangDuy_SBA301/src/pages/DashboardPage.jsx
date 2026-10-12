/**
 * DashboardPage.jsx - Màn hình Bảng điều khiển tổng quan hệ thống
 * Tổng hợp dữ liệu có ý nghĩa: Thống kê số lượng Category, News, Users, bài viết mới nhất
 */

import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Newspaper,
  Users,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { categoryService } from '../services/categoryService';
import { newsService } from '../services/newsService';
import { userService } from '../services/userService';
import { StatusBadge, RoleBadge } from '../components/Badges';

export const DashboardPage = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalCategories: 0,
    activeCategories: 0,
    totalNews: 0,
    activeNews: 0,
    totalUsers: 0,
    adminUsers: 0,
    staffUsers: 0
  });
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const categories = categoryService.getAll();
    const news = newsService.getAll();
    const users = userService.getAll();

    setStats({
      totalCategories: categories.length,
      activeCategories: categories.filter(c => c.status === 1).length,
      totalNews: news.length,
      activeNews: news.filter(n => n.status === 1).length,
      totalUsers: users.length,
      adminUsers: users.filter(u => u.role === 1).length,
      staffUsers: users.filter(u => u.role === 2).length
    });

    // Lấy 4 bài viết mới nhất
    setRecentNews(news.slice(0, 4));
  };

  return (
    <div className="page-wrapper fade-in">
      {/* Banner chào mừng */}
      <div className="dashboard-welcome-banner">
        <div className="welcome-text">
          <h2>Xin chào Quản trị viên! 👋</h2>
          <p>
            Chào mừng bạn đến với hệ thống quản trị nội dung tin tức FUNews. Theo dõi các chỉ số và quản lý danh mục bên dưới.
          </p>
        </div>
        <div className="welcome-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate('news')}
          >
            <PlusCircle size={16} />
            <span>Viết tin mới</span>
          </button>
        </div>
      </div>

      {/* Thẻ thống kê (Stat Cards) */}
      <div className="stat-grid">
        <div className="stat-card" onClick={() => onNavigate('categories')}>
          <div className="stat-icon-wrap stat-icon-blue">
            <FolderTree size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Thể loại tin tức</span>
            <h3 className="stat-number">{stats.totalCategories}</h3>
            <span className="stat-desc text-success">
              ● {stats.activeCategories} đang hoạt động
            </span>
          </div>
        </div>

        <div className="stat-card" onClick={() => onNavigate('news')}>
          <div className="stat-icon-wrap stat-icon-orange">
            <Newspaper size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Bài viết tin tức</span>
            <h3 className="stat-number">{stats.totalNews}</h3>
            <span className="stat-desc text-success">
              ● {stats.activeNews} đã xuất bản
            </span>
          </div>
        </div>

        <div className="stat-card" onClick={() => onNavigate('users')}>
          <div className="stat-icon-wrap stat-icon-purple">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Người dùng hệ thống</span>
            <h3 className="stat-number">{stats.totalUsers}</h3>
            <span className="stat-desc">
              {stats.adminUsers} Admin • {stats.staffUsers} Staff
            </span>
          </div>
        </div>

        <div className="stat-card stat-card-highlight">
          <div className="stat-icon-wrap stat-icon-green">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Tỷ lệ tin kích hoạt</span>
            <h3 className="stat-number">
              {stats.totalNews > 0
                ? Math.round((stats.activeNews / stats.totalNews) * 100)
                : 0}
              %
            </h3>
            <span className="stat-desc">Độ phủ sóng nội dung</span>
          </div>
        </div>
      </div>

      {/* Bảng danh sách bài viết gần đây */}
      <div className="content-card">
        <div className="card-header-flex">
          <div>
            <h3 className="card-title">Tin tức mới cập nhật</h3>
            <p className="card-subtitle">Các bài viết mới nhất trong hệ thống FUNews</p>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => onNavigate('news')}
          >
            <span>Xem tất cả tin tức</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã ID</th>
                <th>Tiêu đề bài viết</th>
                <th>Thể loại</th>
                <th>Tác giả</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentNews.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    Chưa có bài viết nào trong hệ thống.
                  </td>
                </tr>
              ) : (
                recentNews.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="id-badge">{item.id}</span>
                    </td>
                    <td className="font-semibold">{item.title}</td>
                    <td>
                      <span className="category-pill">{item.categoryName}</span>
                    </td>
                    <td>{item.createdBy}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
