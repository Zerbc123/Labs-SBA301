// DuyDLH-CE200667
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { UserPlus, UserCheck, RotateCcw } from 'lucide-react';

export default function UserModal({
  isOpen,
  mode = 'create',
  user = null,
  existingUsers = [],
  onSubmit,
  onClose
}) {
  const [formData, setFormData] = useState({
    accountName: '',
    accountEmail: '',
    accountPassword: '',
    accountRole: 2
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && user) {
        setFormData({
          accountName: user.accountName || user.fullName || user.username || '',
          accountEmail: user.accountEmail || user.email || '',
          accountPassword: '',
          accountRole: user.accountRole !== undefined ? user.accountRole : (user.role || 2)
        });
      } else {
        setFormData({
          accountName: '',
          accountEmail: '',
          accountPassword: '',
          accountRole: 2
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'accountRole' ? parseInt(value, 10) : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleReset = () => {
    if (mode === 'update' && user) {
      setFormData({
        accountName: user.accountName || user.fullName || user.username || '',
        accountEmail: user.accountEmail || user.email || '',
        accountPassword: '',
        accountRole: user.accountRole !== undefined ? user.accountRole : (user.role || 2)
      });
    } else {
      setFormData({
        accountName: '',
        accountEmail: '',
        accountPassword: '',
        accountRole: 2
      });
    }
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    const trimmedName = formData.accountName.trim();
    const trimmedEmail = formData.accountEmail.trim();

    if (!trimmedName) {
      errs.accountName = "Tên tài khoản không được để trống";
    }

    if (!trimmedEmail) {
      errs.accountEmail = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.accountEmail = "Email không đúng định dạng";
    } else {
      const currentId = user?.accountID || user?.id;
      const isDuplicate = existingUsers.some(
        u => (u.accountEmail || u.email || '').toLowerCase() === trimmedEmail.toLowerCase() &&
             (mode === 'create' || (u.accountID || u.id) !== currentId)
      );
      if (isDuplicate) {
        errs.accountEmail = "Email này đã được sử dụng bởi tài khoản khác";
      }
    }

    if (mode === 'create') {
      if (!formData.accountPassword) {
        errs.accountPassword = "Vui lòng nhập mật khẩu cho tài khoản mới";
      } else if (formData.accountPassword.length < 2) {
        errs.accountPassword = "Mật khẩu tối thiểu 2 ký tự";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      accountName: formData.accountName.trim(),
      accountEmail: formData.accountEmail.trim(),
      accountRole: Number(formData.accountRole)
    };
    if (formData.accountPassword) {
      payload.accountPassword = formData.accountPassword;
    }

    onSubmit(payload);
  };

  const isCreate = mode === 'create';
  const modalTitle = isCreate ? "Thêm Tài Khoản Mới" : "Cập nhật Tài Khoản";
  const currentId = user?.accountID || user?.id;
  const modalSubtitle = isCreate 
    ? "Tạo tài khoản quản trị mới (Admin hoặc Staff)" 
    : `Chỉnh sửa thông tin tài khoản #${currentId}`;
  const modalIcon = isCreate ? <UserPlus size={20} /> : <UserCheck size={20} />;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      subtitle={modalSubtitle}
      icon={modalIcon}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="modal-body p-4">
          {/* Account Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="acc-name">
              Tên tài khoản (Họ và tên) <span className="text-danger">*</span>
            </label>
            <input
              id="acc-name"
              name="accountName"
              type="text"
              className={`form-control ${errors.accountName ? 'is-invalid' : ''}`}
              placeholder="VD: Steve Paris, Emma William..."
              value={formData.accountName}
              onChange={handleChange}
              autoFocus
            />
            {errors.accountName && <div className="invalid-feedback">{errors.accountName}</div>}
          </div>

          {/* Account Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="acc-email">
              Địa chỉ Email <span className="text-danger">*</span>
            </label>
            <input
              id="acc-email"
              name="accountEmail"
              type="email"
              className={`form-control ${errors.accountEmail ? 'is-invalid' : ''}`}
              placeholder="VD: SteveParis@FUNewsManagement.org"
              value={formData.accountEmail}
              onChange={handleChange}
            />
            {errors.accountEmail && <div className="invalid-feedback">{errors.accountEmail}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="acc-pass">
              Mật khẩu {isCreate ? <span className="text-danger">*</span> : <span className="text-secondary fw-normal">(để trống nếu giữ nguyên)</span>}
            </label>
            <input
              id="acc-pass"
              name="accountPassword"
              type="password"
              className={`form-control ${errors.accountPassword ? 'is-invalid' : ''}`}
              placeholder={isCreate ? "Nhập mật khẩu (VD: @1)" : "Nhập mật khẩu mới nếu muốn đổi"}
              value={formData.accountPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.accountPassword && <div className="invalid-feedback">{errors.accountPassword}</div>}
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="acc-role">
              Vai trò (Role)
            </label>
            <select
              id="acc-role"
              name="accountRole"
              className="form-select"
              value={formData.accountRole}
              onChange={handleChange}
            >
              <option value={1}>Admin (Toàn quyền quản trị hệ thống - Role 1)</option>
              <option value={2}>Staff (Biên tập viên tin tức - Role 2)</option>
            </select>
          </div>
        </div>

        <div className="modal-footer bg-body-tertiary d-flex justify-content-between px-4 py-3">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={handleReset}
            title="Đặt lại thông tin form ban đầu"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm px-3"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm px-3"
            >
              {isCreate ? "Tạo tài khoản" : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
