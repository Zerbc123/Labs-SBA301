/**
 * EmptyState.jsx - Hiển thị trạng thái rỗng khi không có dữ liệu hoặc không tìm thấy kết quả
 * Thỏa mãn tiêu chí kiểm thử Data Empty state và Search miss
 */

import React from 'react';
import { SearchX, FolderX, PlusCircle, RotateCcw } from 'lucide-react';

export const EmptyState = ({
  isSearch = false,
  title,
  message,
  onReset,
  onAction,
  actionLabel = 'Thêm mới'
}) => {
  return (
    <div className="empty-state-card fade-in">
      <div className="empty-state-icon">
        {isSearch ? <SearchX size={44} /> : <FolderX size={44} />}
      </div>
      <h4 className="empty-state-title">
        {title || (isSearch ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có dữ liệu')}
      </h4>
      <p className="empty-state-desc">
        {message ||
          (isSearch
            ? 'Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh sách.'
            : 'Hiện tại bảng này chưa có bản ghi nào. Bạn có thể nhấn nút bên dưới để tạo mới.')}
      </p>

      <div className="empty-state-actions">
        {isSearch && onReset && (
          <button type="button" className="btn btn-outline" onClick={onReset}>
            <RotateCcw size={16} />
            <span>Xóa bộ lọc tìm kiếm</span>
          </button>
        )}
        {!isSearch && onAction && (
          <button type="button" className="btn btn-primary" onClick={onAction}>
            <PlusCircle size={16} />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};
