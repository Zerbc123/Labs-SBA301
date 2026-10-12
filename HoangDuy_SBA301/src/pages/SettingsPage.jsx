/**
 * SettingsPage.jsx - Màn hình Cài đặt hệ thống & Quản lý dữ liệu mẫu
 * Hỗ trợ xem thông tin cá nhân, khôi phục dữ liệu mẫu (Reset Data) cho việc chấm bài
 */

import React, { useState } from 'react';
import {
  Settings,
  User,
  Database,
  RotateCcw,
  CheckCircle2,
  Shield,
  Info,
  KeyRound,
  Save,
  Laptop
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { storageService } from '../services/storageService';
import { userService } from '../services/userService';
import { ConfirmModal } from '../components/ConfirmModal';

export const SettingsPage = () => {
  const { currentUser } = useAuth();
  const toast = useToast();

  const [profileData, setProfileData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    newPassword: ''
  });
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!profileData.fullName.trim() || !profileData.email.trim()) {
      toast.error('Họ tên và email không được để trống!');
      return;
    }

    try {
      if (currentUser?.id) {
        userService.update(currentUser.id, {
          username: currentUser.username,
          fullName: profileData.fullName,
          email: profileData.email,
          role: currentUser.role,
          status: 1,
          password: profileData.newPassword || undefined
        });
      }
      toast.success('Đã cập nhật thông tin tài khoản thành công!');
      setProfileData((prev) => ({ ...prev, newPassword: '' }));
    } catch (err) {
      toast.error(err.message || 'Lỗi cập nhật hồ sơ');
    }
  };

  const handleResetData = () => {
    storageService.resetToDefault();
    toast.success('Đã khôi phục dữ liệu mẫu gốc ban đầu thành công!');
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className="page-wrapper fade-in">
      <div className="page-header-flex">
        <div>
          <h2 className="page-title">Cài đặt Hệ thống & Hồ sơ</h2>
          <p className="page-subtitle">
            Cấu hình thông tin tài khoản cá nhân, cơ sở dữ liệu mẫu và môi trường ứng dụng
          </p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Khối Thông tin cá nhân */}
        <div className="content-card">
          <div className="card-header-flex">
            <div>
              <h3 className="card-title flex-align-center gap-2">
                <User size={18} className="text-primary" />
                <span>Hồ sơ tài khoản cá nhân</span>
              </h3>
              <p className="card-subtitle">Thông tin tài khoản đang trực tiếp đăng nhập</p>
            </div>
            <span className="badge-primary">
              {currentUser?.role === 1 ? 'Quyền Admin' : 'Quyền Staff'}
            </span>
          </div>

          <form onSubmit={handleUpdateProfile} className="settings-form">
            <div className="form-group">
              <label className="form-label">Tên tài khoản (Username)</label>
              <input
                type="text"
                className="form-input input-readonly"
                value={currentUser?.username || 'Admin'}
                readOnly
                title="Tên tài khoản cố định"
              />
              <span className="form-help-text">Username hệ thống không thể thay đổi</span>
            </div>

            <div className="form-group">
              <label className="form-label">Họ và tên hiển thị</label>
              <input
                type="text"
                className="form-input"
                value={profileData.fullName}
                onChange={(e) =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email liên lạc</label>
              <input
                type="email"
                className="form-input"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mật khẩu mới (Tùy chọn)</label>
              <input
                type="password"
                className="form-input"
                placeholder="Nhập nếu bạn muốn đổi mật khẩu"
                value={profileData.newPassword}
                onChange={(e) =>
                  setProfileData({ ...profileData, newPassword: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Cập nhật hồ sơ</span>
            </button>
          </form>
        </div>

        {/* Khối Quản lý Dữ liệu mẫu (Database Reset) */}
        <div className="content-card">
          <div className="card-header-flex">
            <div>
              <h3 className="card-title flex-align-center gap-2">
                <Database size={18} className="text-warning" />
                <span>Quản lý dữ liệu Mock (Persistence)</span>
              </h3>
              <p className="card-subtitle">
                Dữ liệu được lưu trong trình duyệt (localStorage). Bạn có thể khôi phục trạng thái ban đầu bất cứ lúc nào.
              </p>
            </div>
          </div>

          <div className="settings-data-box">
            <div className="info-box-callout">
              <Info size={20} className="info-icon" />
              <div>
                <strong>Lưu ý khi kiểm thử & bảo vệ bài:</strong>
                <p>
                  Khi giảng viên yêu cầu kiểm tra trường hợp danh sách trắng hoặc khôi phục dữ liệu sau các bài test xóa/sửa, bạn chỉ cần nhấn nút Khôi phục bên dưới.
                </p>
              </div>
            </div>

            <div className="data-action-item">
              <div>
                <h4>Khôi phục dữ liệu ban đầu</h4>
                <p className="text-muted text-sm">
                  Thiết lập lại danh sách Categories, News và Users về trạng thái khởi tạo chuẩn của đề bài.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => setIsResetConfirmOpen(true)}
              >
                <RotateCcw size={16} />
                <span>Khôi phục dữ liệu gốc</span>
              </button>
            </div>
          </div>

          {/* Khối Thông tin hệ thống */}
          <div className="system-info-section">
            <h4 className="system-info-title flex-align-center gap-2">
              <Laptop size={16} />
              <span>Thông tin môn học & Môi trường</span>
            </h4>
            <ul className="system-info-list">
              <li>
                <span>Môn học:</span>
                <strong>SBA301 - Integrate Single Page Application with Spring Boot</strong>
              </li>
              <li>
                <span>Assignment:</span>
                <strong>Assignment 01 – Working with ReactJS Application</strong>
              </li>
              <li>
                <span>Hệ thống:</span>
                <strong>FUNewsManagementSystem (ReactJS + Vite)</strong>
              </li>
              <li>
                <span>Phiên bản:</span>
                <strong>1.0.0 (Release Candidate)</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirm Reset Data Modal */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetData}
        title="Xác nhận khôi phục dữ liệu gốc"
        message="Hành động này sẽ ghi đè lại toàn bộ dữ liệu Category, News và Users về trạng thái mẫu ban đầu của bài Assignment. Bạn có chắc chắn muốn thực hiện?"
        confirmText="Đồng ý khôi phục"
        isDanger={false}
      />
    </div>
  );
};
