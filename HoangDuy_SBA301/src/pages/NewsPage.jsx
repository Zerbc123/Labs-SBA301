/**
 * NewsPage.jsx - Màn hình Quản lý Bài viết Tin tức (News Management)
 * Đáp ứng R08, R10, R11, Test case 31:
 * - Read danh sách bài viết
 * - Relation: Chọn Category từ danh sách categories tồn tại
 * - Search lọc theo tiêu đề, nội dung, tác giả, tag + lọc theo thể loại, trạng thái
 * - Create / Update popup dialog (Modal) có validation
 * - Delete có Confirm dialog (R11)
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Newspaper,
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  AlertCircle,
  Tag,
  Calendar,
  User,
  Eye,
  Filter
} from 'lucide-react';
import { newsService } from '../services/newsService';
import { categoryService } from '../services/categoryService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/Modal';
import { ConfirmModal } from '../components/ConfirmModal';
import { StatusBadge } from '../components/Badges';
import { EmptyState } from '../components/EmptyState';

export const NewsPage = () => {
  const { currentUser } = useAuth();
  const toast = useToast();

  // 1. Data States
  const [newsList, setNewsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // 2. Modal States (Create / Update)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    tags: '',
    status: 1
  });
  const [formErrors, setFormErrors] = useState({});

  // 3. View Details Modal State (Xem nhanh bài viết)
  const [viewDetailItem, setViewDetailItem] = useState(null);

  // 4. Confirm Delete State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const news = newsService.getAll();
    const cats = categoryService.getAll();
    setNewsList(news);
    setCategories(cats);
  };

  // 5. Derived Filtered News (Search không làm mất mảng gốc)
  const displayedNews = useMemo(() => {
    return newsService.search(newsList, keyword, selectedCategoryFilter, statusFilter);
  }, [newsList, keyword, selectedCategoryFilter, statusFilter]);

  // 6. Modal Open Handlers
  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedItem(null);
    setFormData({
      title: '',
      content: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
      tags: '',
      status: 1
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('update');
    setSelectedItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      categoryId: item.categoryId,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
      status: item.status
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleResetForm = () => {
    if (modalMode === 'create') {
      setFormData({
        title: '',
        content: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        tags: '',
        status: 1
      });
    } else if (selectedItem) {
      setFormData({
        title: selectedItem.title,
        content: selectedItem.content,
        categoryId: selectedItem.categoryId,
        tags: Array.isArray(selectedItem.tags) ? selectedItem.tags.join(', ') : selectedItem.tags || '',
        status: selectedItem.status
      });
    }
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'status' ? Number(value) : value
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Tiêu đề bài viết không được để trống!';
    }
    if (!formData.content.trim()) {
      errors.content = 'Nội dung bài viết không được để trống!';
    }
    if (!formData.categoryId) {
      errors.categoryId = 'Vui lòng chọn một Thể loại hợp lệ!';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (modalMode === 'create') {
        newsService.create(formData, currentUser);
        toast.success(`Đã đăng bài viết mới thành công!`);
      } else {
        newsService.update(selectedItem.id, formData);
        toast.success(`Đã cập nhật bài viết "${formData.title}"!`);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Lỗi khi lưu bài viết!');
      setFormErrors({ general: err.message });
    }
  };

  // 7. Delete Handlers
  const handleOpenDelete = (item) => {
    setDeleteTarget(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    try {
      newsService.delete(deleteTarget.id);
      toast.success(`Đã xóa bài viết "${deleteTarget.title}"!`);
      loadData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleClearFilters = () => {
    setKeyword('');
    setSelectedCategoryFilter('');
    setStatusFilter('');
  };

  return (
    <div className="page-wrapper fade-in">
      {/* Tiêu đề & Action */}
      <div className="page-header-flex">
        <div>
          <h2 className="page-title">Quản lý Bài viết Tin tức</h2>
          <p className="page-subtitle">
            Soạn thảo, quản lý xuất bản và liên kết danh mục tin tức FUNews
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenCreate}
        >
          <Plus size={16} />
          <span>Tạo Bài Viết Mới</span>
        </button>
      </div>

      {/* Thanh tìm kiếm & bộ lọc nâng cao */}
      <div className="filter-bar-card">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm theo tiêu đề, nội dung, tác giả, tag..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setKeyword('')}
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-group">
          {/* Lọc theo Thể loại */}
          <select
            className="filter-select"
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          >
            <option value="">Tất cả thể loại</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Lọc theo Trạng thái */}
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="1">Đã xuất bản (Active)</option>
            <option value="0">Tạm ẩn / Bản nháp (Inactive)</option>
          </select>

          {(keyword || selectedCategoryFilter !== '' || statusFilter !== '') && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleClearFilters}
              title="Đặt lại bộ lọc"
            >
              <RotateCcw size={14} />
              <span>Đặt lại</span>
            </button>
          )}
        </div>
      </div>

      {/* Danh sách bài viết */}
      <div className="content-card">
        {displayedNews.length === 0 ? (
          <EmptyState
            isSearch={Boolean(keyword || selectedCategoryFilter !== '' || statusFilter !== '')}
            onReset={handleClearFilters}
            onAction={handleOpenCreate}
            actionLabel="Tạo Bài Viết Mới"
          />
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '90px' }}>Mã ID</th>
                  <th>Tiêu đề & Tóm tắt</th>
                  <th style={{ width: '160px' }}>Thể loại</th>
                  <th style={{ width: '130px' }}>Tác giả</th>
                  <th style={{ width: '110px' }}>Ngày tạo</th>
                  <th style={{ width: '140px' }}>Trạng thái</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {displayedNews.map((item) => (
                  <tr key={item.id} className="table-row-hover">
                    <td>
                      <span className="id-badge">{item.id}</span>
                    </td>
                    <td>
                      <div className="news-title-cell">
                        <span
                          className="news-item-title clickable"
                          onClick={() => setViewDetailItem(item)}
                          title="Bấm để xem chi tiết bài viết"
                        >
                          {item.title}
                        </span>
                        <p className="news-excerpt">
                          {item.content && item.content.length > 90
                            ? item.content.slice(0, 90) + '...'
                            : item.content}
                        </p>
                        {Array.isArray(item.tags) && item.tags.length > 0 && (
                          <div className="tags-row">
                            {item.tags.map((t, idx) => (
                              <span key={idx} className="tag-pill">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="category-pill">{item.categoryName}</span>
                    </td>
                    <td className="text-sm">
                      <div className="flex-align-center gap-1">
                        <User size={13} className="text-muted" />
                        <span>{item.createdBy}</span>
                      </div>
                    </td>
                    <td className="text-sm">
                      <div className="flex-align-center gap-1">
                        <Calendar size={13} className="text-muted" />
                        <span>{item.createdAt}</span>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                    <td>
                      <div className="action-buttons-group">
                        <button
                          type="button"
                          className="btn-icon btn-icon-view"
                          onClick={() => setViewDetailItem(item)}
                          title="Xem chi tiết"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon btn-icon-edit"
                          onClick={() => handleOpenEdit(item)}
                          title="Chỉnh sửa bài viết"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon btn-icon-delete"
                          onClick={() => handleOpenDelete(item)}
                          title="Xóa bài viết"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="table-footer-summary">
          Hiển thị <strong>{displayedNews.length}</strong> / <strong>{newsList.length}</strong> bài viết tin tức
        </div>
      </div>

      {/* POPUP MODAL CREATE / UPDATE (R10) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Tạo Mới Bài Viết Tin Tức' : 'Chỉnh Sửa Bài Viết Tin Tức'}
        subtitle={modalMode === 'create' ? 'Điền thông tin và chọn danh mục để xuất bản bài viết' : `Chỉnh sửa bài viết: ${selectedItem?.id}`}
        maxWidth="680px"
      >
        <form onSubmit={handleFormSubmit} noValidate>
          {formErrors.general && (
            <div className="form-alert-error">
              <AlertCircle size={16} />
              <span>{formErrors.general}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              Tiêu đề bài viết <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="title"
              className={`form-input ${formErrors.title ? 'input-error' : ''}`}
              placeholder="Nhập tiêu đề tin tức nổi bật..."
              value={formData.title}
              onChange={handleFormChange}
              autoFocus
            />
            {formErrors.title && (
              <span className="field-error-text">{formErrors.title}</span>
            )}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Thể loại tin <span className="text-danger">*</span>
              </label>
              <select
                name="categoryId"
                className={`form-select ${formErrors.categoryId ? 'input-error' : ''}`}
                value={formData.categoryId}
                onChange={handleFormChange}
              >
                <option value="">-- Chọn thể loại --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.status === 0 ? '(Tạm ẩn)' : ''}
                  </option>
                ))}
              </select>
              {formErrors.categoryId && (
                <span className="field-error-text">{formErrors.categoryId}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Trạng thái xuất bản</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value={1}>1 - Đã xuất bản (Active)</option>
                <option value={0}>0 - Bản nháp / Ẩn (Inactive)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Nội dung bài viết <span className="text-danger">*</span>
            </label>
            <textarea
              name="content"
              rows={6}
              className={`form-textarea ${formErrors.content ? 'input-error' : ''}`}
              placeholder="Nhập đầy đủ chi tiết nội dung bài viết tin tức..."
              value={formData.content}
              onChange={handleFormChange}
            />
            {formErrors.content && (
              <span className="field-error-text">{formErrors.content}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Thẻ từ khóa (Tags) <span className="text-muted">(cách nhau bởi dấu phẩy)</span>
            </label>
            <div className="input-with-icon">
              <Tag size={16} className="input-icon" />
              <input
                type="text"
                name="tags"
                className="form-input"
                placeholder="vd: AI, FPT, CongNghe, SuKien"
                value={formData.tags}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleResetForm}
              title="Đặt lại thông tin trên form"
            >
              <RotateCcw size={15} />
              <span>Đặt lại</span>
            </button>

            <div className="footer-right-buttons">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy bỏ
              </button>
              <button type="submit" className="btn btn-primary">
                {modalMode === 'create' ? 'Đăng bài viết' : 'Lưu cập nhật'}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* POPUP XEM CHI TIẾT BÀI VIẾT */}
      {viewDetailItem && (
        <Modal
          isOpen={Boolean(viewDetailItem)}
          onClose={() => setViewDetailItem(null)}
          title="Chi Tiết Bài Viết Tin Tức"
          subtitle={`Mã bài: ${viewDetailItem.id}`}
          maxWidth="640px"
        >
          <div className="news-detail-view">
            <div className="news-detail-meta">
              <span className="category-pill">{viewDetailItem.categoryName}</span>
              <StatusBadge status={viewDetailItem.status} />
              <span className="detail-date">Ngày đăng: {viewDetailItem.createdAt}</span>
              <span className="detail-author">Tác giả: {viewDetailItem.createdBy}</span>
            </div>
            <h3 className="news-detail-title">{viewDetailItem.title}</h3>
            <div className="news-detail-content">
              {viewDetailItem.content}
            </div>
            {Array.isArray(viewDetailItem.tags) && viewDetailItem.tags.length > 0 && (
              <div className="news-detail-tags">
                <strong>Tags:</strong>
                {viewDetailItem.tags.map((t, idx) => (
                  <span key={idx} className="tag-pill">#{t}</span>
                ))}
              </div>
            )}
            <div className="modal-actions-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setViewDetailItem(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* CONFIRM DELETE MODAL (R11) */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa bài viết tin tức"
        message="Bạn có chắc chắn muốn xóa bài viết này không? Bài viết sẽ bị gỡ vĩnh viễn khỏi hệ thống."
        itemName={deleteTarget?.title}
        confirmText="Xác nhận xóa"
      />
    </div>
  );
};
