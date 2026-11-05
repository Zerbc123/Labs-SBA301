// DuyDLH-CE200667
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, subtitle, icon, children, scrollable = false }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      role="dialog" 
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <div 
        className={`modal-dialog modal-dialog-centered modal-lg${scrollable ? ' modal-dialog-scrollable' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content shadow-lg border-0 rounded-3">
          <div className="modal-header bg-body-tertiary border-bottom py-3 px-4">
            <div className="d-flex align-items-center gap-2">
              {icon && <div className="text-primary d-flex align-items-center">{icon}</div>}
              <div>
                <h5 className="modal-title fw-bold mb-0">{title}</h5>
                {subtitle && <small className="text-secondary">{subtitle}</small>}
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose} 
              aria-label="Đóng"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
