/**
 * UsersPage.jsx - Màn hình Quản lý Tài khoản / Người dùng (User Management)
 * Đáp ứng R09, R10, R11, Test case 32:
 * - Read danh sách người dùng
 * - Phân quyền Role: 1 = Admin, 2 = Staff
 * - Search lọc theo username, tên, email, role, status
 * - Create / Update popup dialog (Modal) có validation chặt chẽ
 * - Delete có Confirm dialog (R11), ngăn tự xóa tài khoản đang đăng nhập hoặc tài khoản Admin gốc
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  AlertCircle,
  Mail,
  User,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/Modal';
import { ConfirmModal } from '../components/ConfirmModal';
import { StatusBadge, RoleBadge } from '../components/Badges';
import { EmptyState } from '../components/EmptyState';

export const UsersPage = () => {
  const { currentUser } = useAuth();
  const toast = useToast();

  // 1. Data States
  const [userList, setUserList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // 2. Modal States (Create / Update)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    role: 2, // Mặc định Staff
    status: 1 // Mặc định Active
  });
  const [formErrors, setFormErrors] = useState({});

  // 3. Confirm Delete State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const list = userService.getAll();
    setUserList(list);
  };

  // 4. Derived Filtered Users
  const displayedUsers = useMemo(() => {
    return userService.search(userList, keyword, roleFilter, statusFilter);
  }, [userList, keyword, roleFilter, statusFilter]);

  // 5. Modal Handlers
  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedItem(null);
    setFormData({
      username: '',
      password: '',
      fullName: '',
      email: '',
      role: 2,
      status: 1
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('update');
    setSelectedItem(item);
    setFormData({
      username: item.username,
      password: '', // Để trống nếu không muốn đổi pass
      fullName: item.fullName,
      email: item.email,
      role: item.role,
      status: item.status
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleResetForm = () => {
    if (modalMode === 'create') {
      setFormData({
        username: '',
        password: '',
        fullName: '',
        email: '',
        role: 2,
        status: 1
      });
    } else if (selectedItem) {
      setFormData({
        username: selectedItem.username,
        password: '',
        fullName: selectedItem.fullName,
        email: selectedItem.email,
        role: selectedItem.role,
        status: selectedItem.status
      });
    }
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'role' || name === 'status' ? Number(value) : value
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Tên tài khoản không được để trống!';
    }
    if (modalMode === 'create' && !formData.password.trim()) {
      errors.password = 'Mật khẩu khởi tạo không được để trống!';
    }
    if (!formData.fullName.trim()) {
      errors.fullName = 'Họ và tên không được để trống!';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống!';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Định dạng email không hợp lệ (ví dụ: name@domain.com)!';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (modalMode === 'create') {
        userService.create(formData);
        toast.success(`Đã thêm mới tài khoản "${formData.username}" thành công!`);
      } else {
        userService.update(selectedItem.id, formData);
        toast.success(`Đã cập nhật thông tin tài khoản "${formData.username}"!`);
      }
      setIsModalOpen(false);
      loadUsers();
    } catch (err) {
      toast.error(err.message || 'Lỗi khi lưu tài khoản!');
      setFormErrors({ general: err.message });
    }
  };

  // 6. Delete Handlers
  const handleOpenDelete = (item) => {
    // Ngăn chặn thao tác xóa ngay nếu vi phạm
    if (currentUser && item.id === currentUser.id) {
      toast.warning('Bạn không thể xóa tài khoản của chính mình!');
      return;
    }
    if (item.username.toLowerCase() === 'admin') {
      toast.warning('Không thể xóa tài khoản Admin mặc định!');
      return;
    }

    setDeleteTarget(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    try {
      userService.delete(deleteTarget.id, currentUser?.id);
      toast.success(`Đã xóa tài khoản "${deleteTarget.username}"!`);
      loadUsers();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleClearFilters = () => {
    setKeyword('');
    setRoleFilter('');
    setStatusFilter('');
  };

  return (
    <div className="page-wrapper fade-in">
      {/* Tiêu đề & Action */}
      <div className="page-header-flex">
        <div>
          <h2 className="page-title">Quản lý Tài khoản & Phân quyền</h2>
          <p className="page-subtitle">
            Danh sách nhân sự, phân quyền vai trò Admin / Staff và trạng thái tài khoản
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenCreate}
        >
          <UserPlus size={16} />
          <span>Thêm Tài Khoản</span>
        </button>
      </div>

      {/* Thanh tìm kiếm & bộ lọc */}
      <div className="filter-bar-card">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm theo username, họ tên, email..."
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
          {/* Lọc Role */}
          <select
            className="filter-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Tất cả vai trò</option>
            <option value="1">1 - Quản trị viên (Admin)</option>
            <option value="2">2 - Nhân viên (Staff)</option>
          </select>

          {/* Lọc Status */}
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="1">Đang hoạt động</option>
            <option value="0">Tạm khóa / Vô hiệu hóa</option>
          </select>

          {(keyword || roleFilter !== '' || statusFilter !== '') && (
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

      {/* Bảng danh sách người dùng */}
      <div className="content-card">
        {displayedUsers.length === 0 ? (
          <EmptyState
            isSearch={Boolean(keyword || roleFilter !== '' || statusFilter !== '')}
            onReset={handleClearFilters}
            onAction={handleOpenCreate}
            actionLabel="Tạo Tài Khoản Mới"
          />
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '90px' }}>Mã ID</th>
                  <th>Tài khoản & Họ tên</th>
                  <th>Email liên hệ</th>
                  <th style={{ width: '180px' }}>Vai trò (Role)</th>
                  <th style={{ width: '140px' }}>Trạng thái</th>
                  <th style={{ width: '110px' }}>Ngày tạo</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((item) => {
                  const isCurrent = currentUser?.id === item.id;
                  const isMasterAdmin = item.username.toLowerCase() === 'admin';

                  return (
                    <tr key={item.id} className="table-row-hover">
                      <td>
                        <span className="id-badge">{item.id}</span>
                      </td>
                      <td>
                        <div className="user-name-cell">
                          <span className="user-full-name">{item.fullName}</span>
                          <span className="user-username-tag">@{item.username}</span>
                          {isCurrent && (
                            <span className="current-user-badge">(Bạn đang đăng nhập)</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex-align-center gap-1 text-sm">
                          <Mail size={13} className="text-muted" />
                          <span>{item.email}</span>
                        </div>
                      </td>
                      <td>
                        <RoleBadge role={item.role} />
                      </td>
                      <td>
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="text-sm">{item.createdAt || 'N/A'}</td>
                      <td>
                        <div className="action-buttons-group">
                          <button
                            type="button"
                            className="btn-icon btn-icon-edit"
                            onClick={() => handleOpenEdit(item)}
                            title="Chỉnh sửa tài khoản"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            type="button"
                            className={`btn-icon btn-icon-delete ${
                              isCurrent || isMasterAdmin ? 'btn-disabled' : ''
                            }`}
                            onClick={() => handleOpenDelete(item)}
                            disabled={isCurrent || isMasterAdmin}
                            title={
                              isCurrent
                                ? 'Không thể tự xóa chính mình'
                                : isMasterAdmin
                                ? 'Không thể xóa Admin mặc định'
                                : 'Xóa tài khoản'
                            }
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="table-footer-summary">
          Hiển thị <strong>{displayedUsers.length}</strong> / <strong>{userList.length}</strong> tài khoản
        </div>
      </div>

      {/* POPUP MODAL CREATE / UPDATE (R10) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Tạo Tài Khoản Người Dùng Mới' : 'Cập Nhật Tài Khoản'}
        subtitle={
          modalMode === 'create'
            ? 'Cấp quyền và tạo thông tin đăng nhập cho nhân sự mới'
            : `Chỉnh sửa tài khoản: @${selectedItem?.username}`
        }
        maxWidth="600px"
      >
        <form onSubmit={handleFormSubmit} noValidate>
          {formErrors.general && (
            <div className="form-alert-error">
              <AlertCircle size={16} />
              <span>{formErrors.general}</span>
            </div>
          )}

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Tên đăng nhập (Username) <span className="text-danger">*</span>
              </label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input
                  type="text"
                  name="username"
                  className={`form-input ${formErrors.username ? 'input-error' : ''}`}
                  placeholder="vd: staff2, editor"
                  value={formData.username}
                  onChange={handleFormChange}
                  autoFocus
                />
              </div>
              {formErrors.username && (
                <span className="field-error-text">{formErrors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Mật khẩu {modalMode === 'create' && <span className="text-danger">*</span>}
                {modalMode === 'update' && (
                  <span className="text-muted font-normal text-xs"> (Để trống nếu không đổi)</span>
                )}
              </label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  name="password"
                  className={`form-input ${formErrors.password ? 'input-error' : ''}`}
                  placeholder={modalMode === 'create' ? 'Nhập mật khẩu' : 'Mật khẩu mới (nếu có)'}
                  value={formData.password}
                  onChange={handleFormChange}
                />
              </div>
              {formErrors.password && (
                <span className="field-error-text">{formErrors.password}</span>
              )}
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Họ và tên đầy đủ <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                className={`form-input ${formErrors.fullName ? 'input-error' : ''}`}
                placeholder="vd: Nguyễn Văn A"
                value={formData.fullName}
                onChange={handleFormChange}
              />
              {formErrors.fullName && (
                <span className="field-error-text">{formErrors.fullName}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Địa chỉ Email <span className="text-danger">*</span>
              </label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                  placeholder="vd: name@funews.edu.vn"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              {formErrors.email && (
                <span className="field-error-text">{formErrors.email}</span>
              )}
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Vai trò phân quyền (Role) <span className="text-danger">*</span>
              </label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleFormChange}
              >
                <option value={1}>1 - Admin (Toàn quyền quản trị)</option>
                <option value={2}>2 - Staff (Nhân viên biên tập)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Trạng thái tài khoản</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value={1}>1 - Đang hoạt động (Active)</option>
                <option value={0}>0 - Tạm khóa (Inactive)</option>
              </select>
            </div>
          </div>

          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleResetForm}
              title="Đặt lại thông tin về ban đầu"
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
                {modalMode === 'create' ? 'Tạo tài khoản' : 'Lưu thông tin'}
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
        title="Xác nhận xóa tài khoản người dùng"
        message="Bạn có chắc chắn muốn xóa tài khoản này khỏi hệ thống? Tài khoản sẽ không thể đăng nhập được nữa."
        itemName={deleteTarget ? `${deleteTarget.fullName} (@${deleteTarget.username})` : ''}
        confirmText="Xác nhận xóa"
      />
    </div>
  );
};
