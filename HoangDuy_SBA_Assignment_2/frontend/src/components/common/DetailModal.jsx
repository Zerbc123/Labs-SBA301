// DuyDLH-CE200667
import React from 'react';
import { Eye } from 'lucide-react';
import Modal from './Modal';

export default function DetailModal({ title, subtitle, fields, onClose, children }) {
  return (
    <Modal
      isOpen
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      icon={<Eye size={20} />}
      scrollable
    >
      <div className="modal-body p-4">
        <dl className="row gy-3 mb-0">
          {fields.map(({ label, value }) => (
            <React.Fragment key={label}>
              <dt className="col-12 col-sm-4 text-secondary fw-medium">{label}</dt>
              <dd className="col-12 col-sm-8 mb-0 text-break">
                {value === '' || value == null ? '—' : value}
              </dd>
            </React.Fragment>
          ))}
        </dl>
        {children}
      </div>
      <div className="modal-footer px-4 py-3">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Đóng
        </button>
      </div>
    </Modal>
  );
}
