// DuyDLH-CE200667
import React, { useState } from 'react';
import { LogIn, AlertCircle, ShieldCheck, KeyRound, Mail, Globe, Loader2 } from 'lucide-react';
import logoSvg from '../assets/logo.svg';
import { api, getErrorMessage } from '../services/api';

export default function LoginView({ onLoginSuccess, onGuestMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPass = password.trim();

    if (!trimmedEmail && !trimmedPass) {
      setErrorMsg("Vui lòng nhập Email và Mật khẩu");
      return;
    }
    if (!trimmedEmail) {
      setErrorMsg("Vui lòng nhập Email");
      return;
    }
    if (!trimmedPass) {
      setErrorMsg("Vui lòng nhập Mật khẩu");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg('');
      const user = await api.auth.login(trimmedEmail, trimmedPass);
      // user format: { accountID, accountName, accountEmail, accountRole, accountPassword }
      onLoginSuccess(user);
    } catch (err) {
      setErrorMsg(getErrorMessage(err, "Đăng nhập thất bại. Vui lòng kiểm tra lại Email và Mật khẩu!"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillCredentials = (em, pass) => {
    setEmail(em);
    setPassword(pass);
    setErrorMsg('');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary p-3">
      <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4" style={{ maxWidth: '460px', width: '100%' }}>
        {/* Brand Header */}
        <div className="text-center mb-4">
          <img 
            src={logoSvg} 
            alt="FUNews Logo" 
            width="60" 
            height="60" 
            className="mb-3 rounded-3 shadow-sm"
          />
          <h3 className="fw-bold text-body mb-1">FUNews Management</h3>
          <p className="text-secondary small mb-0">Cổng quản trị tin tức SBA301 (RESTful API + ReactJS)</p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 small rounded-3 mb-3" role="alert">
            <AlertCircle size={18} className="flex-shrink-0" />
            <div>{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-body" htmlFor="login-email">
              Email đăng nhập (theo DB)
            </label>
            <div className="input-group">
              <span className="input-group-text bg-body text-secondary border-end-0">
                <Mail size={16} />
              </span>
              <input
                id="login-email"
                type="email"
                className="form-control border-start-0 ps-0"
                placeholder="Nhập email (VD: SteveParis@FUNewsManagement.org)"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold small text-body" htmlFor="login-password">
              Mật khẩu
            </label>
            <div className="input-group">
              <span className="input-group-text bg-body text-secondary border-end-0">
                <KeyRound size={16} />
              </span>
              <input
                id="login-password"
                type="password"
                className="form-control border-start-0 ps-0"
                placeholder="Nhập mật khẩu (VD: @1)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
          >
            {isLoading ? <Loader2 size={18} className="spinner-border spinner-border-sm" /> : <LogIn size={18} />}
            <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}</span>
          </button>
        </form>

        {/* Guest Public View Button */}
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link text-decoration-none small text-secondary d-inline-flex align-items-center gap-1"
            onClick={onGuestMode}
          >
            <Globe size={16} className="text-primary" />
            <span>Xem tin tức công khai (Khách vãng lai)</span>
          </button>
        </div>

        {/* Credentials Helper Pill */}
        <div className="card bg-body-tertiary border border-secondary border-opacity-25 rounded-3 p-3 mt-4">
          <div className="d-flex align-items-center gap-2 small fw-bold text-primary mb-2">
            <ShieldCheck size={16} />
            <span>Tài khoản kiểm thử trong Database:</span>
          </div>
          <div className="d-flex flex-column gap-2 small">
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
              <span className="text-secondary">Admin (Role 1):</span>
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm py-0 px-2 font-monospace"
                onClick={() => handleFillCredentials('SteveParis@FUNewsManagement.org', '@1')}
                title="Bấm để điền nhanh"
              >
                SteveParis@FUNewsManagement.org / @1
              </button>
            </div>
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
              <span className="text-secondary">Staff (Role 2):</span>
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm py-0 px-2 font-monospace"
                onClick={() => handleFillCredentials('EmmaWilliam@FUNewsManagement.org', '@1')}
                title="Bấm để điền nhanh"
              >
                EmmaWilliam@FUNewsManagement.org / @1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
