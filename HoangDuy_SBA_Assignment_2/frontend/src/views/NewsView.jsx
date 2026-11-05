// DuyDLH-CE200667
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  Trash2, 
  Newspaper, 
  X, 
  Tag, 
  Calendar, 
  UserCheck, 
  History 
} from 'lucide-react';
import NewsModal from '../components/forms/NewsModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import DetailModal from '../components/common/DetailModal';

export default function NewsView({
  news = [],
  categories = [],
  availableTags = [],
  currentUser = null,
  isGuest = false,
  onAddNews,
  onUpdateNews,
  onDeleteNews
}) {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [onlyMyNews, setOnlyMyNews] = useState(false); // Staff Requirement: "View news history created by him/her"

  // Modal dialog state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedNews, setSelectedNews] = useState(null);
  const [detailNewsId, setDetailNewsId] = useState(null);

  const detailNews = news.find(item => (item.newsArticleID || item.id) === detailNewsId);

  // Delete dialog state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  const currentAccId = currentUser?.accountID || currentUser?.id;

  // Search & Filter logic
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const keyword = searchTerm.trim().toLowerCase();
      const title = (item.newsTitle || item.title || '').toLowerCase();
      const content = (item.newsContent || item.content || '').toLowerCase();
      const headline = (item.headline || '').toLowerCase();

      const matchSearch = 
        !keyword ||
        title.includes(keyword) ||
        headline.includes(keyword) ||
        content.includes(keyword);

      const catId = item.category?.categoryID || item.categoryID || item.categoryId;
      const matchCategory = 
        selectedCategoryFilter === 'ALL' || 
        String(catId) === selectedCategoryFilter;

      const isActive = item.newsStatus !== undefined ? Boolean(item.newsStatus) : item.status === 1;
      const matchStatus = 
        statusFilter === 'ALL' || 
        (statusFilter === '1' && isActive) ||
        (statusFilter === '0' && !isActive);

      const itemCreatorId = item.createdBy?.accountID || item.createdByID;
      const matchCreator = !onlyMyNews || (currentAccId && itemCreatorId === currentAccId);

      return matchSearch && matchCategory && matchStatus && matchCreator;
    });
  }, [news, searchTerm, selectedCategoryFilter, statusFilter, onlyMyNews, currentAccId]);

  // Handlers
  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedNews(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('update');
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    if (modalMode === 'create') {
      onAddNews(formData);
    } else if (modalMode === 'update' && selectedNews) {
      const nId = selectedNews.newsArticleID || selectedNews.id;
      onUpdateNews(nId, formData);
    }
    setIsModalOpen(false);
  };

  const handleOpenDelete = (item) => {
    setNewsToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (newsToDelete) {
      const nId = newsToDelete.newsArticleID || newsToDelete.id;
      onDeleteNews(nId);
    }
    setIsConfirmOpen(false);
    setNewsToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setNewsToDelete(null);
  };

  return (
    <div>
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold mb-1">
            {isGuest ? "Cổng Tin Tức Đại Học FPT (Public)" : "Quản Lý Tin Tức (News Articles)"}
          </h2>
          <p className="text-secondary small mb-0">
            {isGuest 
              ? "Xem tin tức đang phát hành (Không yêu cầu đăng nhập)" 
              : "Soạn thảo, phân loại danh mục, gắn thẻ tags và quản trị bài viết (REST API)"}
          </p>
        </div>
        {!isGuest && (
          <button 
            type="button" 
            className="btn btn-primary d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm"
            onClick={handleOpenCreate}
          >
            <Plus size={18} />
            <span className="fw-semibold">Thêm bài viết mới</span>
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-12 col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-body border-end-0 text-secondary">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Tìm theo tiêu đề, nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary border-start-0" 
                    onClick={() => setSearchTerm('')}
                    title="Xóa tìm kiếm"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              >
                <option value="ALL">Tất cả danh mục</option>
                {categories.map(cat => {
                  const cId = cat.categoryID || cat.id;
                  const cName = cat.categoryName || cat.name;
                  return (
                    <option key={cId} value={String(cId)}>
                      {cName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Status Filter */}
            <div className="col-6 col-md-2">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                disabled={isGuest} // Guest only sees active
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="1">Đang công khai (Active)</option>
                <option value="0">Bản nháp / Ẩn (Inactive)</option>
              </select>
            </div>

            {/* Staff Requirement: View news history created by him/her */}
            {!isGuest && currentUser && (
              <div className="col-12 col-md-3 d-flex align-items-center justify-content-md-end gap-2">
                <button
                  type="button"
                  className={`btn btn-sm d-flex align-items-center gap-1 ${onlyMyNews ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setOnlyMyNews(prev => !prev)}
                  title="Lọc các bài viết do chính bạn tạo"
                >
                  <History size={14} />
                  <span>Bài viết của tôi ({news.filter(n => (n.createdBy?.accountID || n.createdByID) === currentAccId).length})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card border-0 shadow-sm">
        {filteredNews.length === 0 ? (
          <EmptyState
            isSearch={Boolean(searchTerm || selectedCategoryFilter !== 'ALL' || statusFilter !== 'ALL' || onlyMyNews)}
            keyword={searchTerm}
            title={news.length === 0 ? "Chưa có bài viết nào" : undefined}
            actionText={searchTerm || onlyMyNews ? "Xóa bộ lọc" : isGuest ? undefined : "Đăng bài viết đầu tiên"}
            onAction={
              searchTerm || onlyMyNews
                ? () => { setSearchTerm(''); setSelectedCategoryFilter('ALL'); setStatusFilter('ALL'); setOnlyMyNews(false); } 
                : handleOpenCreate
            }
          />
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="text-secondary small text-uppercase">
                  <th style={{ width: '60px' }} className="ps-4">ID</th>
                  <th style={{ minWidth: '340px' }}>Tiêu đề & Nội dung</th>
                  <th style={{ width: '180px' }}>Danh mục</th>
                  <th style={{ width: '150px' }}>Tác giả</th>
                  <th style={{ width: '180px' }}>Tags</th>
                  <th style={{ width: '120px' }}>Trạng thái</th>
                  <th style={{ minWidth: '130px' }} className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((item) => {
                  const nId = item.newsArticleID || item.id;
                  const nTitle = item.newsTitle || item.title;
                  const nContent = item.newsContent || item.content;
                  const nDate = item.createdDate || item.createdAt;
                  const catId = item.category?.categoryID || item.categoryID || item.categoryId;
                  const catObj = item.category || categories.find(c => (c.categoryID || c.id) === catId);
                  const catName = catObj?.categoryName || catObj?.name || `Danh mục #${catId}`;
                  const authorName = item.createdBy?.accountName || item.createdBy || 'Admin';
                  const isActive = item.newsStatus !== undefined ? Boolean(item.newsStatus) : item.status === 1;

                  // Render tags
                  const tagList = Array.isArray(item.tags) ? item.tags : [];

                  return (
                    <tr key={nId}>
                      <td className="ps-4 fw-semibold text-secondary">
                        #{nId}
                      </td>
                      <td>
                        <div className="fw-bold text-body mb-1">{nTitle}</div>
                        {item.headline && (
                          <div className="text-primary small mb-1 fst-italic">{item.headline}</div>
                        )}
                        <p className="text-secondary small mb-1 text-truncate" style={{ maxWidth: '420px' }}>
                          {nContent}
                        </p>
                        {nDate && (
                          <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '11px' }}>
                            <Calendar size={12} />
                            <span>{typeof nDate === 'string' ? nDate.replace('T', ' ').substring(0, 19) : nDate}</span>
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 text-wrap text-start">
                          {catName}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1 small fw-semibold text-body">
                          <UserCheck size={14} className="text-primary" />
                          <span>{authorName}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {tagList.length > 0 ? (
                            tagList.map((tag, idx) => {
                              const tName = typeof tag === 'object' ? (tag.tagName || tag.name) : tag;
                              return (
                                <span key={idx} className="badge bg-body-secondary text-secondary border small">
                                  #{tName}
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-secondary small">—</span>
                          )}
                        </div>
                      </td>
                      <td>
                        {isActive ? (
                          <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                            ● Active
                          </span>
                        ) : (
                          <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
                            ● Inactive
                          </span>
                        )}
                      </td>
                      <td className="text-end pe-4">
                        <div className="btn-group btn-group-sm">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setDetailNewsId(nId)}
                            title="Xem chi tiết bài viết"
                            aria-label={`Xem chi tiết bài viết ${nTitle}`}
                          >
                            <Eye size={14} />
                          </button>
                          {!isGuest && (
                            <>
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => handleOpenEdit(item)}
                                title="Chỉnh sửa bài viết"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => handleOpenDelete(item)}
                                title="Xóa bài viết"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {detailNews && (
        <DetailModal
          title="Chi tiết bài viết"
          subtitle={`Bài viết #${detailNews.newsArticleID || detailNews.id}`}
          onClose={() => setDetailNewsId(null)}
          fields={[
            { label: 'Mã bài viết', value: `#${detailNews.newsArticleID || detailNews.id}` },
            { label: 'Tiêu đề', value: detailNews.newsTitle || detailNews.title },
            { label: 'Headline', value: detailNews.headline || '—' },
            { label: 'Danh mục', value: detailNews.category?.categoryName || '—' },
            { label: 'Tác giả', value: detailNews.createdBy?.accountName || detailNews.createdBy || 'Admin' },
            { label: 'Nguồn tin', value: detailNews.newsSource || 'FUNews' },
            { label: 'Ngày đăng', value: detailNews.createdDate || detailNews.createdAt || '—' },
            { label: 'Trạng thái', value: (detailNews.newsStatus !== undefined ? detailNews.newsStatus : detailNews.status === 1) ? 'Công khai (Active)' : 'Bản nháp / Tạm ẩn' }
          ]}
        >
          <section className="border-top pt-3 mt-3">
            <h6 className="fw-bold">Nội dung đầy đủ:</h6>
            <p className="mb-0 text-break" style={{ whiteSpace: 'pre-wrap' }}>
              {detailNews.newsContent || detailNews.content || '—'}
            </p>
          </section>
        </DetailModal>
      )}

      {!isGuest && (
        <NewsModal
          isOpen={isModalOpen}
          mode={modalMode}
          newsItem={selectedNews}
          categories={categories}
          availableTags={availableTags}
          currentUser={currentUser}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Xác nhận xóa bài viết"
        itemName={newsToDelete?.newsTitle || newsToDelete?.title}
        message="Hành động này sẽ xóa vĩnh viễn bài tin tức này khỏi hệ thống. Bạn có chắc chắn muốn tiếp tục?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
