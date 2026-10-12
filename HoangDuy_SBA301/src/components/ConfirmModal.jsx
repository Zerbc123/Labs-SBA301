/**
 * ConfirmModal.jsx - Hộp thoại xác nhận thao tác nguy hiểm (Xóa / Hủy)
 * Thỏa mãn R11: Cancel không xóa, chỉ confirm mới thực hiện xóa
 */

import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Xác nhận xóa dữ liệu',
  message = 'Bạn có chắc chắn muốn xóa bản ghi này? Hành động này không thể hoàn tác.',
  itemName = '',
  confirmText = 'Xác nhận xóa',
  cancelText = 'Hủy bỏ',
  isDanger = true
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop fade-in" onClick={onClose} role="alertdialog">
      <div className="modal-container scale-in confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-wrapper">
          <AlertTriangle size={32} className="confirm-warning-icon" />
        </div>
        <div className="confirm-content">
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-message">{message}</p>
          {itemName && (
            <div className="confirm-target-badge">
              <strong>Mục:</strong> <span>{itemName}</span>
            </div>
          )}
        </div>
        <div className="confirm-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
