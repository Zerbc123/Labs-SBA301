// DuyDLH-CE200667
import React from 'react';
import { 
  Newspaper, 
  FolderTree, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function DashboardView({
  categories = [],
  news = [],
  users = [],
  onNavigateTab
}) {
  const totalNews = news.length;
  const activeNews = news.filter(n => n.newsStatus !== undefined ? Boolean(n.newsStatus) : n.status === 1).length;
  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.isActive !== undefined ? Boolean(c.isActive) : c.status === 1).length;
  const totalUsers = users.length;
  const adminCount = users.filter(u => (u.accountRole === 1 || u.role === 1)).length;

  const activeRatio = totalNews > 0 ? Math.round((activeNews / totalNews) * 100) : 0;
  const recentNews = [...news].slice(0, 5);

  const categoryNewsCount = categories.map(cat => {
    const cId = cat.categoryID || cat.id;
    return {
      ...cat,
      name: cat.categoryName || cat.name,
      count: news.filter(n => (n.category?.categoryID || n.categoryID || n.categoryId) === cId).length
    };
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Bảng Điều Khiển Tổng Quan</h2>
        <p className="text-secondary small mb-0">Thống kê số lượng bài viết, danh mục chuyên đề và tài khoản trong FUNews</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="row g-4 mb-4">
        {/* Card 1: News */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between align-items-center p-3">
              <div>
                <span className="text-secondary small fw-semibold text-uppercase" style={{ letterSpacing: '0.05em' }}>
                  Tổng bài viết
                </span>
                <h3 className="fw-bold text-body my-1">{totalNews}</h3>
                <span className="small text-success d-flex align-items-center gap-1">
                  <TrendingUp size={14} />
                  <span>{activeNews} bài công khai</span>
                </span>
              </div>
              <div 
                className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center p-3"
                style={{ width: '54px', height: '54px' }}
              >
                <Newspaper size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Categories */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between align-items-center p-3">
              <div>
                <span className="text-secondary small fw-semibold text-uppercase" style={{ letterSpacing: '0.05em' }}>
                  Danh mục tin
                </span>
                <h3 className="fw-bold text-body my-1">{totalCategories}</h3>
                <span className="small text-info d-flex align-items-center gap-1">
                  <CheckCircle2 size={14} />
                  <span>{activeCategories} khả dụng</span>
                </span>
              </div>
              <div 
                className="rounded-3 bg-info-subtle text-info d-flex align-items-center justify-content-center p-3"
                style={{ width: '54px', height: '54px' }}
              >
                <FolderTree size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Users */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between align-items-center p-3">
              <div>
                <span className="text-secondary small fw-semibold text-uppercase" style={{ letterSpacing: '0.05em' }}>
                  Tài khoản
                </span>
                <h3 className="fw-bold text-body my-1">{totalUsers}</h3>
                <span className="small text-secondary">
                  {adminCount} Admin • {totalUsers - adminCount} Staff
                </span>
              </div>
              <div 
                className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center p-3"
                style={{ width: '54px', height: '54px' }}
              >
                <Users size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Active Ratio */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between align-items-center p-3">
              <div>
                <span className="text-secondary small fw-semibold text-uppercase" style={{ letterSpacing: '0.05em' }}>
                  Tỷ lệ xuất bản
                </span>
                <h3 className="fw-bold text-body my-1">{activeRatio}%</h3>
                <span className="small text-secondary">
                  Sẵn sàng hiển thị
                </span>
              </div>
              <div 
                className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center p-3"
                style={{ width: '54px', height: '54px' }}
              >
                <CheckCircle2 size={26} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Split Row */}
      <div className="row g-4">
        {/* Recent News Articles */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-bottom d-flex justify-content-between align-items-center py-3">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <Newspaper size={18} className="text-primary" />
                <span>Bài viết mới cập nhật</span>
              </h5>
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                onClick={() => onNavigateTab('news')}
              >
                <span>Xem tất cả</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr className="text-secondary small text-uppercase">
                    <th className="ps-4">Tiêu đề bài viết</th>
                    <th>Danh mục</th>
                    <th>Tác giả</th>
                    <th className="pe-4">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentNews.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-secondary">
                        Chưa có bài viết nào
                      </td>
                    </tr>
                  ) : (
                    recentNews.map(item => {
                      const nId = item.newsArticleID || item.id;
                      const nTitle = item.newsTitle || item.title;
                      const catId = item.category?.categoryID || item.categoryID || item.categoryId;
                      const category = categories.find(c => (c.categoryID || c.id) === catId);
                      const catName = item.category?.categoryName || category?.categoryName || category?.name || 'Chưa phân loại';
                      const author = item.createdBy?.accountName || item.createdBy || 'Admin';
                      const isActive = item.newsStatus !== undefined ? Boolean(item.newsStatus) : item.status === 1;

                      return (
                        <tr key={nId}>
                          <td className="ps-4 fw-semibold" style={{ maxWidth: '300px' }}>
                            <div className="text-truncate">{nTitle}</div>
                          </td>
                          <td>
                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                              {catName}
                            </span>
                          </td>
                          <td className="text-secondary small">{author}</td>
                          <td className="pe-4">
                            {isActive ? (
                              <span className="badge bg-success-subtle text-success border border-success-subtle">
                                ● Active
                              </span>
                            ) : (
                              <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                                ● Inactive
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-bottom d-flex justify-content-between align-items-center py-3">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <FolderTree size={18} className="text-info" />
                <span>Phân bố danh mục</span>
              </h5>
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => onNavigateTab('category')}
              >
                <span>Quản lý</span>
              </button>
            </div>

            <div className="card-body p-3">
              <div className="d-flex flex-column gap-3">
                {categoryNewsCount.map(cat => {
                  const percentage = totalNews > 0 ? Math.round((cat.count / totalNews) * 100) : 0;
                  return (
                    <div key={cat.id}>
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="fw-semibold text-body">{cat.name}</span>
                        <span className="text-secondary">{cat.count} bài ({percentage}%)</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-primary" 
                          role="progressbar" 
                          style={{ width: `${percentage}%` }}
                          aria-valuenow={percentage} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
