/**
 * CategoryPage.jsx - Màn hình Quản lý Thể loại tin tức (Category Management)
 * Đáp ứng R07, R10, R11:
 * - Read danh sách
 * - Search lọc theo tên / mô tả (không làm hỏng source list)
 * - Create bằng popup dialog (Modal)
 * - Update bằng popup dialog (Modal) có prefill dữ liệu
 * - Delete có Confirm dialog (Cancel không xóa, Confirm mới xóa)
 * - Kiểm tra ràng buộc không cho xóa Category đang có bài viết tin tức
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  FolderTree,
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  AlertCircle,
  FileText
} from 'lucide-react';
import { categoryService } from '../services/categoryService';
import { Modal } from '../components/Modal';
import { ConfirmModal } from '../components/ConfirmModal';
import { StatusBadge } from '../components/Badges';
import { EmptyState } from '../components/EmptyState';
import { useToast } from '../context/ToastContext';

export const CategoryPage = () => {
  const toast = useToast();

  // 1. Data States (Source list độc lập)
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // 2. Modal States (Create / Update)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'update'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states bên trong modal
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 1
  });
  const [formErrors, setFormErrors] = useState({});

  // 3. Confirm Delete Modal States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Load dữ liệu khi mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const list = categoryService.getAll();
    setCategories(list);
  };

  // 4. Lọc hiển thị (Derived state từ source list)
  const displayedCategories = useMemo(() => {
    let filtered = categoryService.search(categories, keyword);
    if (statusFilter !== '') {
      filtered = filtered.filter((c) => c.status === Number(statusFilter));
    }
    return filtered;
  }, [categories, keyword, statusFilter]);

  // 5. Handlers cho Create / Update
  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedItem(null);
    setFormData({
      name: '',
      description: '',
      status: 1
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('update');
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      status: item.status
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Reset form về trạng thái ban đầu trong dialog (Bài luyện transfer task 8.1)
  const handleResetForm = () => {
    if (modalMode === 'create') {
      setFormData({ name: '', description: '', status: 1 });
    } else if (selectedItem) {
      setFormData({
        name: selectedItem.name,
        description: selectedItem.description || '',
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

    // Xóa lỗi validation khi người dùng gõ
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Tên thể loại không được để trống!';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (modalMode === 'create') {
        categoryService.create(formData);
        toast.success(`Đã thêm mới thể loại "${formData.name}" thành công!`);
      } else {
        categoryService.update(selectedItem.id, formData);
        toast.success(`Đã cập nhật thể loại "${formData.name}" thành công!`);
      }
      setIsModalOpen(false);
      loadCategories();
    } catch (err) {
      toast.error(err.message || 'Có lỗi xảy ra!');
      setFormErrors({ general: err.message });
    }
  };

  // 6. Handlers cho Delete
  const handleOpenDelete = (item) => {
    setDeleteTarget(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    try {
      categoryService.delete(deleteTarget.id);
      toast.success(`Đã xóa thành công thể loại "${deleteTarget.name}"!`);
      loadCategories();
    } catch (err) {
      // Báo lỗi nếu có bài viết tin tức ràng buộc
      toast.error(err.message);
    } finally {
      setIsDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  // Xóa bộ lọc tìm kiếm
  const handleClearFilters = () => {
    setKeyword('');
    setStatusFilter('');
  };

  return (
    <div className="page-wrapper fade-in">
      {/* Tiêu đề & Nút Thêm mới */}
      <div className="page-header-flex">
        <div>
          <h2 className="page-title">Quản lý Thể loại Tin tức</h2>
          <p className="page-subtitle">
            Danh sách và quản lý các danh mục phân loại tin tức trong hệ thống FUNews
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenCreate}
        >
          <Plus size={16} />
          <span>Thêm Thể Loại</span>
        </button>
      </div>

      {/* Thanh tìm kiếm & bộ lọc */}
      <div className="filter-bar-card">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm theo tên thể loại, mô tả..."
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
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="1">Đang hoạt động</option>
            <option value="0">Tạm khóa / Ẩn</option>
          </select>

          {(keyword || statusFilter !== '') && (
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

      {/* Bảng dữ liệu hoặc Trạng thái rỗng */}
      <div className="content-card">
        {displayedCategories.length === 0 ? (
          <EmptyState
            isSearch={Boolean(keyword || statusFilter !== '')}
            onReset={handleClearFilters}
            onAction={handleOpenCreate}
            actionLabel="Tạo Thể Loại Mới"
          />
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Mã ID</th>
                  <th>Tên Thể loại</th>
                  <th>Mô tả chi tiết</th>
                  <th style={{ width: '120px' }}>Ngày tạo</th>
                  <th style={{ width: '150px' }}>Trạng thái</th>
                  <th style={{ width: '140px', textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {displayedCategories.map((item) => (
                  <tr key={item.id} className="table-row-hover">
                    <td>
                      <span className="id-badge">{item.id}</span>
                    </td>
                    <td className="font-semibold text-primary-dark">
                      {item.name}
                    </td>
                    <td className="text-muted text-sm">
                      {item.description || <em>(Chưa có mô tả)</em>}
                    </td>
                    <td className="text-sm">{item.createdAt || 'N/A'}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                    <td>
                      <div className="action-buttons-group">
                        <button
                          type="button"
                          className="btn-icon btn-icon-edit"
                          onClick={() => handleOpenEdit(item)}
                          title="Chỉnh sửa thể loại"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon btn-icon-delete"
                          onClick={() => handleOpenDelete(item)}
                          title="Xóa thể loại"
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
          Hiển thị <strong>{displayedCategories.length}</strong> / <strong>{categories.length}</strong> thể loại
        </div>
      </div>

      {/* POPUP MODAL CREATE / UPDATE (R10) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Thêm Mới Thể Loại Tin Tức' : 'Chỉnh Sửa Thể Loại Tin Tức'}
        subtitle={modalMode === 'create' ? 'Tạo thể loại mới để phân loại các bài viết tin tức' : `Chỉnh sửa thông tin thể loại: ${selectedItem?.id}`}
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
              Tên Thể loại <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              className={`form-input ${formErrors.name ? 'input-error' : ''}`}
              placeholder="Nhập tên thể loại (vd: Công nghệ & AI)"
              value={formData.name}
              onChange={handleFormChange}
              autoFocus
            />
            {formErrors.name && (
              <span className="field-error-text">{formErrors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Mô tả tóm tắt</label>
            <textarea
              name="description"
              rows={3}
              className="form-textarea"
              placeholder="Nhập mô tả ngắn gọn về nội dung thể loại này..."
              value={formData.description}
              onChange={handleFormChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Trạng thái áp dụng</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleFormChange}
            >
              <option value={1}>1 - Đang hoạt động (Active)</option>
              <option value={0}>0 - Tạm khóa / Ẩn (Inactive)</option>
            </select>
          </div>

          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleResetForm}
              title="Đặt lại các trường về giá trị ban đầu"
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
                {modalMode === 'create' ? 'Tạo mới thể loại' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE MODAL (R11) */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa thể loại tin"
        message="Bạn có chắc chắn muốn xóa thể loại này? Nếu thể loại đang có bài viết tin tức liên quan, hệ thống sẽ chặn thao tác để đảm bảo an toàn dữ liệu."
        itemName={deleteTarget?.name}
        confirmText="Xác nhận xóa"
      />
    </div>
  );
};
