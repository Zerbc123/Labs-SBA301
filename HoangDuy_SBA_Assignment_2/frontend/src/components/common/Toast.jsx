// DuyDLH-CE200667
import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      {toasts.map((toast) => {
        const bgClass = toast.type === 'error' 
          ? 'text-bg-danger' 
          : toast.type === 'info' 
          ? 'text-bg-dark' 
          : 'text-bg-success';
        
        const icon = toast.type === 'error' 
          ? <AlertCircle size={18} className="me-2 flex-shrink-0" /> 
          : toast.type === 'info' 
          ? <Info size={18} className="me-2 flex-shrink-0" /> 
          : <CheckCircle2 size={18} className="me-2 flex-shrink-0" />;

        return (
          <div 
            key={toast.id} 
            className={`toast show align-items-center ${bgClass} border-0 shadow-lg mb-2`}
            role="alert" 
            aria-live="assertive" 
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body d-flex align-items-center flex-grow-1">
                {icon}
                <span>{toast.message}</span>
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white me-2 m-auto" 
                onClick={() => onDismiss(toast.id)}
                aria-label="Close"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
