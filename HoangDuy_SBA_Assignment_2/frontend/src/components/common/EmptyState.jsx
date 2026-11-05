// DuyDLH-CE200667
import React from 'react';
import { SearchX, Inbox, Plus } from 'lucide-react';

export default function EmptyState({
  isSearch = false,
  keyword = '',
  title,
  description,
  actionText,
  onAction
}) {
  const defaultTitle = isSearch 
    ? "Không tìm thấy kết quả" 
    : "Chưa có dữ liệu";

  const defaultDesc = isSearch 
    ? `Không có bản ghi nào khớp với từ khóa "${keyword}". Vui lòng thử từ khóa khác.`
    : "Hiện tại danh sách đang trống. Bạn có thể thêm bản ghi mới ngay bây giờ.";

  return (
    <div className="text-center py-5 px-3 bg-body-tertiary rounded-3 border border-secondary border-opacity-25 my-2">
      <div 
        className="rounded-circle bg-body-secondary text-secondary mx-auto d-flex align-items-center justify-content-center mb-3"
        style={{ width: '64px', height: '64px' }}
      >
        {isSearch ? <SearchX size={30} /> : <Inbox size={30} />}
      </div>
      <h5 className="fw-bold text-body mb-1">{title || defaultTitle}</h5>
      <p className="text-secondary small mb-3 mx-auto" style={{ maxWidth: '420px' }}>
        {description || defaultDesc}
      </p>
      {actionText && onAction && (
        <button 
          type="button" 
          className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2 px-3 py-2" 
          onClick={onAction}
        >
          {isSearch ? null : <Plus size={16} />}
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
