// DuyDLH-CE200667
import React, { useState, useMemo } from 'react';
import { 
  UserPlus, 
  Search, 
  Edit, 
  Eye, 
  Trash2, 
  ShieldCheck, 
  Shield, 
  X, 
  Mail 
} from 'lucide-react';
import UserModal from '../components/forms/UserModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import DetailModal from '../components/common/DetailModal';

export default function UserView({
  users = [],
  currentUser = null,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onShowToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailUserId, setDetailUserId] = useState(null);

  const detailUser = users.find(item => (item.accountID || item.id) === detailUserId);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter(item => {
      const keyword = searchTerm.trim().toLowerCase();
      const name = (item.accountName || item.fullName || item.username || '').toLowerCase();
      const email = (item.accountEmail || item.email || '').toLowerCase();

      const matchSearch = !keyword || name.includes(keyword) || email.includes(keyword);

      const role = item.accountRole !== undefined ? item.accountRole : item.role;
      const matchRole = roleFilter === 'ALL' || String(role) === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, searchTerm, roleFilter]);

  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('update');
    setSelectedUser(item);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    if (modalMode === 'create') {
      onAddUser(formData);
    } else if (modalMode === 'update' && selectedUser) {
      const accId = selectedUser.accountID || selectedUser.id;
      onUpdateUser(accId, formData);
    }
    setIsModalOpen(false);
  };

  const handleOpenDelete = (item) => {
    const accId = item.accountID || item.id;
    const currentId = currentUser?.accountID || currentUser?.id;
    if (currentId && accId === currentId) {
      if (onShowToast) {
        onShowToast("Không thể xóa tài khoản bạn đang đăng nhập hiện tại!", "error");
      }
      return;
    }
    setUserToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      const accId = userToDelete.accountID || userToDelete.id;
      onDeleteUser(accId);
    }
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  return (
    <div>
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold mb-1">Quản Lý Tài Khoản (System Accounts)</h2>
          <p className="text-secondary small mb-0">Quản trị viên (Admin = 1) và Biên tập viên (Staff = 2) kết nối trực tiếp CSDL</p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm"
          onClick={handleOpenCreate}
        >
          <UserPlus size={18} />
          <span className="fw-semibold">Thêm tài khoản</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-body border-end-0 text-secondary">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Tìm theo họ tên, email tài khoản..."
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

            {/* Role Filter */}
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="ALL">Tất cả vai trò</option>
                <option value="1">1 - Admin (Quản trị hệ thống)</option>
                <option value="2">2 - Staff (Biên tập viên)</option>
              </select>
            </div>

            {/* Counter */}
            <div className="col-6 col-md-3 text-md-end text-secondary small">
              Hiển thị <strong>{filteredUsers.length}</strong> / {users.length} tài khoản
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card border-0 shadow-sm">
        {filteredUsers.length === 0 ? (
          <EmptyState
            isSearch={Boolean(searchTerm || roleFilter !== 'ALL')}
            keyword={searchTerm}
            title={users.length === 0 ? "Chưa có tài khoản nào" : undefined}
            actionText={searchTerm ? "Xóa bộ lọc" : "Tạo tài khoản đầu tiên"}
            onAction={
              searchTerm 
                ? () => { setSearchTerm(''); setRoleFilter('ALL'); } 
                : handleOpenCreate
            }
          />
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="text-secondary small text-uppercase">
                  <th style={{ width: '70px' }} className="ps-4">ID</th>
                  <th style={{ minWidth: '220px' }}>Tên tài khoản</th>
                  <th style={{ minWidth: '260px' }}>Email đăng nhập</th>
                  <th style={{ width: '160px' }}>Vai trò (Role)</th>
                  <th style={{ minWidth: '150px' }} className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((item) => {
                  const accId = item.accountID || item.id;
                  const accName = item.accountName || item.fullName || item.username;
                  const accEmail = item.accountEmail || item.email;
                  const accRole = item.accountRole !== undefined ? item.accountRole : item.role;
                  const currentId = currentUser?.accountID || currentUser?.id;
                  const isCurrent = currentId && currentId === accId;

                  return (
                    <tr key={accId}>
                      <td className="ps-4 fw-semibold text-secondary">
                        #{accId}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar-circle" style={{ width: '32px', height: '32px', fontSize: '13px' }}>
                            {(accName || 'U')[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-semibold text-body d-flex align-items-center gap-1">
                              <span>{accName}</span>
                              {isCurrent && (
                                <span className="badge bg-primary-subtle text-primary border border-primary-subtle" style={{ fontSize: '10px' }}>
                                  Bạn
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1 small text-secondary">
                          <Mail size={13} />
                          <span>{accEmail || '—'}</span>
                        </div>
                      </td>
                      <td>
                        {accRole === 1 ? (
                          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 d-inline-flex align-items-center gap-1">
                            <ShieldCheck size={13} />
                            <span>1 - Admin</span>
                          </span>
                        ) : (
                          <span className="badge bg-info-subtle text-info border border-info-subtle px-2 py-1 d-inline-flex align-items-center gap-1">
                            <Shield size={13} />
                            <span>2 - Staff</span>
                          </span>
                        )}
                      </td>
                      <td className="text-end pe-4">
                        <div className="btn-group btn-group-sm">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setDetailUserId(accId)}
                            title="Xem chi tiết tài khoản"
                            aria-label={`Xem chi tiết tài khoản ${accName}`}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleOpenEdit(item)}
                            title="Chỉnh sửa tài khoản"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleOpenDelete(item)}
                            disabled={isCurrent}
                            style={isCurrent ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                            title={isCurrent ? "Không thể xóa chính mình" : "Xóa tài khoản"}
                          >
                            <Trash2 size={14} />
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
      </div>

      {detailUser && (
        <DetailModal
          title="Chi tiết tài khoản"
          subtitle={`Tài khoản #${detailUser.accountID || detailUser.id}`}
          onClose={() => setDetailUserId(null)}
          fields={[
            { label: 'ID', value: `#${detailUser.accountID || detailUser.id}` },
            { label: 'Tên tài khoản', value: detailUser.accountName || detailUser.fullName || detailUser.username },
            { label: 'Email', value: detailUser.accountEmail || detailUser.email },
            { label: 'Vai trò', value: (detailUser.accountRole === 1 || detailUser.role === 1) ? '1 - Admin (Quản trị viên)' : '2 - Staff (Biên tập viên)' }
          ]}
        />
      )}

      <UserModal
        isOpen={isModalOpen}
        mode={modalMode}
        user={selectedUser}
        existingUsers={users}
        onSubmit={handleModalSubmit}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Xác nhận xóa tài khoản người dùng"
        itemName={userToDelete ? `${userToDelete.accountName || userToDelete.username} (${userToDelete.accountEmail || userToDelete.email})` : ''}
        message="Lưu ý: Backend sẽ chặn xóa nếu tài khoản này đã từng tạo bài viết tin tức (theo đúng yêu cầu của Assignment 02)."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
