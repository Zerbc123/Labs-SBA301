/**
 * LoginPage.jsx - Màn hình đăng nhập quản trị viên (R02, R03)
 * Kiểm thử:
 * 1. Submit khi để trống -> Báo lỗi validation
 * 2. Nhập sai username hoặc password -> Báo lỗi credential
 * 3. Nhập Admin / Admin -> Đăng nhập thành công chuyển vào Admin Layout
 */

import React, { useState } from 'react';
import { LogIn, Lock, User, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import logoImg from '../assets/fu-news-logo.jpg';

export const LoginPage = () => {
  const { login } = useAuth();
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. Kiểm tra validation khi form rỗng
    if (!username.trim() && !password.trim()) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu!');
      return;
    }
    if (!username.trim()) {
      setError('Vui lòng nhập tên đăng nhập!');
      return;
    }
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu!');
      return;
    }

    setIsLoading(true);

    // Giả lập độ trễ xử lý mượt mà
    setTimeout(() => {
      const result = login(username, password);
      setIsLoading(false);

      if (result.success) {
        toast.success(`Chào mừng ${result.user.fullName || result.user.username} đăng nhập thành công!`);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    }, 300);
  };

  // Nút hỗ trợ điền nhanh tài khoản mẫu phục vụ demo
  const fillSampleAccount = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setError('');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card-container fade-in">
        {/* Header card */}
        <div className="login-card-header">
          <div className="login-logo-circle">
            <img
              src={logoImg}
              alt="FUNews AI Logo"
              className="login-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 className="login-title">Hệ Thống Quản Trị FUNews</h1>
          <p className="login-subtitle">
            Cổng quản lý tin tức và phân quyền cán bộ - SBA301 Assignment 01
          </p>
        </div>

        {/* Lỗi hiển thị nếu có */}
        {error && (
          <div className="login-error-alert shake" role="alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="username-input" className="form-label">
              Tên đăng nhập <span className="text-danger">*</span>
            </label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                id="username-input"
                type="text"
                className={`form-input ${error && !username.trim() ? 'input-error' : ''}`}
                placeholder="Nhập tên đăng nhập (vd: Admin)"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password-input" className="form-label">
              Mật khẩu <span className="text-danger">*</span>
            </label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                id="password-input"
                type="password"
                className={`form-input ${error && !password.trim() ? 'input-error' : ''}`}
                placeholder="Nhập mật khẩu (vd: Admin)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={isLoading}
          >
            <LogIn size={18} />
            <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}</span>
          </button>
        </form>

        {/* Khu vực gợi ý tài khoản test theo rubric */}
        <div className="login-demo-accounts">
          <div className="demo-accounts-title">
            <Sparkles size={14} /> Gợi ý tài khoản kiểm thử (Demo):
          </div>
          <div className="demo-chips">
            <button
              type="button"
              className="chip-btn"
              onClick={() => fillSampleAccount('Admin', 'Admin')}
              title="Đăng nhập tài khoản Quản trị viên"
            >
              <CheckCircle2 size={13} />
              <span>Admin / Admin</span>
            </button>
            <button
              type="button"
              className="chip-btn chip-secondary"
              onClick={() => fillSampleAccount('staff1', '123')}
              title="Đăng nhập tài khoản Nhân viên Staff"
            >
              <span>staff1 / 123</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
