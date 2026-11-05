// DuyDLH-CE200667
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Sun, 
  Moon, 
  Save, 
  Key, 
  Mail, 
  ShieldCheck, 
  Database, 
  Server, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function SettingsView({
  currentUser = null,
  isDarkMode = false,
  onToggleTheme,
  onUpdateProfile
}) {
  // Form profile state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.accountName || currentUser.fullName || currentUser.username || '');
      setEmail(currentUser.accountEmail || currentUser.email || '');
      setPassword('');
      setFormError('');
    }
  }, [currentUser]);

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Vui lòng nhập họ tên của bạn!');
      return;
    }
    if (!email.trim()) {
      setFormError('Vui lòng nhập email hợp lệ!');
      return;
    }

    try {
      setIsSubmitting(true);
      const updateData = {
        accountName: name.trim(),
        accountEmail: email.trim()
      };
      if (password.trim()) {
        updateData.accountPassword = password.trim();
      }

      if (onUpdateProfile) {
        await onUpdateProfile(updateData);
      }
      setPassword('');
    } catch (err) {
      setFormError('Không thể cập nhật hồ sơ: ' + (err.message || 'Lỗi server!'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const role = currentUser?.accountRole !== undefined ? currentUser.accountRole : currentUser?.role;
  const isStaff = role === 2;

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Hồ Sơ & Cài Đặt (Profile & Settings)</h2>
        <p className="text-secondary small mb-0">
          Quản lý thông tin hồ sơ cá nhân của bạn, tùy biến giao diện và kiểm tra kết nối hệ thống
        </p>
      </div>

      <div className="row g-4" style={{ maxWidth: '900px' }}>
        {/* Profile Management Form (Required for Staff & Admin) */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <User className="text-primary" size={22} />
                  <h5 className="fw-bold text-body mb-0">Quản lý hồ sơ cá nhân (Manage Profile)</h5>
                </div>
                <span className={`badge ${role === 1 ? 'bg-danger' : 'bg-primary'}`}>
                  {role === 1 ? 'Quản trị viên (Admin)' : 'Biên tập viên (Staff)'}
                </span>
              </div>
              <p className="text-secondary small mb-3">
                Cập nhật họ tên, email hoặc mật khẩu đăng nhập của tài khoản đang hoạt động
              </p>

              {formError && (
                <div className="alert alert-danger py-2 small mb-3">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmitProfile}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Mã tài khoản (Account ID)
                    </label>
                    <input
                      type="text"
                      className="form-control bg-body-tertiary"
                      value={`#${currentUser?.accountID || currentUser?.id || '—'}`}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Vai trò hệ thống (Role)
                    </label>
                    <input
                      type="text"
                      className="form-control bg-body-tertiary"
                      value={role === 1 ? 'Role 1 - Administrator' : 'Role 2 - Staff Member'}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Họ và tên hiển thị <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập họ và tên..."
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Email đăng nhập <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-body text-secondary">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@FUNewsManagement.org"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">
                      Mật khẩu mới (Bỏ trống nếu giữ nguyên mật khẩu cũ)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-body text-secondary">
                        <Key size={16} />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới nếu muốn thay đổi..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary d-inline-flex align-items-center gap-2 px-4 py-2"
                    disabled={isSubmitting}
                  >
                    <Save size={16} />
                    <span>{isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi hồ sơ'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold text-body mb-1">Giao diện người dùng (Theme & Display)</h5>
              <p className="text-secondary small mb-3">Chuyển đổi chủ đề màu sắc sáng / tối (Dark Mode / Light Mode)</p>

              <div className="d-flex align-items-center justify-content-between p-3 bg-body-tertiary rounded-3 border">
                <div>
                  <h6 className="fw-bold mb-1">Chế độ hiển thị</h6>
                  <p className="text-secondary small mb-0">
                    Hiện đang áp dụng: <strong>{isDarkMode ? 'Chế độ Tối (Dark Theme)' : 'Chế độ Sáng (Light Theme)'}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 px-3 py-2"
                  onClick={onToggleTheme}
                >
                  {isDarkMode ? <Sun size={17} className="text-warning" /> : <Moon size={17} className="text-primary" />}
                  <span>{isDarkMode ? "Bật giao diện Sáng" : "Bật giao diện Tối"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Database & Backend Status */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold text-body mb-1">Kết nối Backend & CSDL (System Architecture)</h5>
              <p className="text-secondary small mb-3">Thông số dịch vụ RESTful Web Service kết nối trực tiếp MS SQL Server</p>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="p-3 bg-body-tertiary rounded-3 border d-flex align-items-center gap-3">
                    <Server className="text-success" size={24} />
                    <div>
                      <div className="small text-secondary">Backend API Server</div>
                      <div className="fw-bold text-body">Spring Boot 3.4.1 (Java 21)</div>
                      <div className="text-success small d-flex align-items-center gap-1">
                        <CheckCircle2 size={13} />
                        <span>http://localhost:8080/api</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="p-3 bg-body-tertiary rounded-3 border d-flex align-items-center gap-3">
                    <Database className="text-primary" size={24} />
                    <div>
                      <div className="small text-secondary">Cơ sở dữ liệu (MS SQL Server)</div>
                      <div className="fw-bold text-body">DuyDLH_CE200667_...</div>
                      <div className="text-primary small d-flex align-items-center gap-1">
                        <CheckCircle2 size={13} />
                        <span>localhost:1433 • Spring Data JPA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Project Meta */}
        <div className="col-12">
          <div className="card border-primary border-opacity-25 bg-primary bg-opacity-10 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold text-primary d-flex align-items-center gap-2 mb-2">
                <Sparkles size={18} />
                <span>Thông tin đồ án Assignment 02</span>
              </h5>
              <p className="text-secondary small mb-3">
                Implement CRUD Application with RESTful Web Service and ReactJS (SBA301)
              </p>

              <div className="row g-3 small">
                <div className="col-6 col-md-3">
                  <span className="text-secondary">Môn học:</span>
                  <div className="fw-bold text-body">SBA301 (Spring + ReactJS)</div>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-secondary">Hệ thống:</span>
                  <div className="fw-bold text-body">FUNewsManagement</div>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-secondary">Sinh viên:</span>
                  <div className="fw-bold text-body">Đào Lê Hoàng Duy (CE200667)</div>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-secondary">Kiến trúc:</span>
                  <div className="fw-bold text-body">3-Layer + Repository</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
