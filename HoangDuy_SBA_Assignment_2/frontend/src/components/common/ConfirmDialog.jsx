// DuyDLH-CE200667
import React, { useEffect } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  title = "Xác nhận xóa dữ liệu",
  message = "Bạn có chắc chắn muốn xóa bản ghi này? Thao tác này không thể hoàn tác.",
  itemName,
  onConfirm,
  onCancel,
  confirmText = "Xác nhận xóa",
  cancelText = "Hủy bỏ"
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    if (isOpen) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      role="alertdialog" 
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(3px)' }}
      onClick={onCancel}
    >
      <div 
        className="modal-dialog modal-dialog-centered" 
        style={{ maxWidth: '450px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content shadow-lg border-0 rounded-4 text-center p-4">
          <div 
            className="rounded-circle bg-danger-subtle text-danger mx-auto d-flex align-items-center justify-content-center mb-3"
            style={{ width: '60px', height: '60px' }}
          >
            <AlertTriangle size={32} />
          </div>
          <h4 className="fw-bold mb-2">{title}</h4>
          <p className="text-secondary small mb-3">
            {message}
            {itemName && (
              <span className="d-block fw-semibold text-body mt-2">
                &ldquo;{itemName}&rdquo;
              </span>
            )}
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2 pt-2">
            <button 
              type="button" 
              className="btn btn-outline-secondary px-4" 
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button 
              type="button" 
              className="btn btn-danger d-flex align-items-center gap-2 px-4" 
              onClick={onConfirm}
            >
              <Trash2 size={16} />
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
