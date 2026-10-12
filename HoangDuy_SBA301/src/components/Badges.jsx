/**
 * Badges.jsx - Hiển thị nhãn trạng thái và phân quyền trực quan
 * Chuyển đổi mã số 1/0 và role 1/2 thành nhãn tiếng Việt dễ hiểu
 */

import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, UserCheck } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const isActive = Number(status) === 1;

  return (
    <span className={`status-badge ${isActive ? 'badge-active' : 'badge-inactive'}`}>
      <span className="status-dot"></span>
      {isActive ? 'Hoạt động' : 'Tạm khóa / Ẩn'}
    </span>
  );
};

export const RoleBadge = ({ role }) => {
  const isAdmin = Number(role) === 1;

  return (
    <span className={`role-badge ${isAdmin ? 'role-admin' : 'role-staff'}`}>
      {isAdmin ? (
        <>
          <ShieldCheck size={14} />
          <span>Admin (Quản trị)</span>
        </>
      ) : (
        <>
          <UserCheck size={14} />
          <span>Staff (Nhân viên)</span>
        </>
      )}
    </span>
  );
};
