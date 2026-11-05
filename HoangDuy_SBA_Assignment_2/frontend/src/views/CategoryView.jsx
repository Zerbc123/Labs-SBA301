// DuyDLH-CE200667
import React, { useState, useMemo } from 'react';
import { 
  FolderPlus, 
  Search, 
  Edit, 
  Eye, 
  Trash2, 
  FolderTree, 
  X, 
  FileText 
} from 'lucide-react';
import CategoryModal from '../components/forms/CategoryModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import DetailModal from '../components/common/DetailModal';

export default function CategoryView({
  categories = [],
  news = [],
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [detailCategoryId, setDetailCategoryId] = useState(null);

  const detailCategory = categories.find(cat => (cat.categoryID || cat.id) === detailCategoryId);
  const detailNews = detailCategory
    ? news.filter(item => (item.category?.categoryID || item.categoryID || item.categoryId) === (detailCategory.categoryID || detailCategory.id))
    : [];

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const filteredCategories = useMemo(() => {
    return categories.filter(item => {
      const name = item.categoryName || item.name || '';
      const matchSearch = name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const isActive = item.isActive !== undefined ? Boolean(item.isActive) : item.status === 1;
      const matchStatus = 
        statusFilter === 'ALL' || 
        (statusFilter === '1' && isActive) ||
        (statusFilter === '0' && !isActive);

      return matchSearch && matchStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setModalMode('update');
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    if (modalMode === 'create') {
      onAddCategory(formData);
    } else if (modalMode === 'update' && selectedCategory) {
      const catId = selectedCategory.categoryID || selectedCategory.id;
      onUpdateCategory(catId, formData);
    }
    setIsModalOpen(false);
  };

  const handleOpenDelete = (category) => {
    setCategoryToDelete(category);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      const catId = categoryToDelete.categoryID || categoryToDelete.id;
      onDeleteCategory(catId);
    }
    setIsConfirmOpen(false);
    setCategoryToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setCategoryToDelete(null);
  };

  const toDeleteId = categoryToDelete ? (categoryToDelete.categoryID || categoryToDelete.id) : null;
  const linkedNewsCount = toDeleteId
    ? news.filter(n => (n.category?.categoryID || n.categoryID || n.categoryId) === toDeleteId).length 
    : 0;

  return (
    <div>
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold mb-1">Quản Lý Danh Mục (Categories)</h2>
          <p className="text-secondary small mb-0">Tổ chức và phân loại các chủ đề tin tức trong FUNews (Kết nối Spring REST API)</p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm"
          onClick={handleOpenCreate}
        >
          <FolderPlus size={18} />
          <span className="fw-semibold">Thêm danh mục</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-body border-end-0 text-secondary">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Tìm kiếm danh mục theo tên..."
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

            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="1">Đang hoạt động (Active)</option>
                <option value="0">Tạm ẩn (Inactive)</option>
              </select>
            </div>

            <div className="col-6 col-md-3 text-md-end text-secondary small">
              Hiển thị <strong>{filteredCategories.length}</strong> / {categories.length} danh mục
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card border-0 shadow-sm">
        {filteredCategories.length === 0 ? (
          <EmptyState
            isSearch={Boolean(searchTerm || statusFilter !== 'ALL')}
            keyword={searchTerm}
            title={categories.length === 0 ? "Chưa có danh mục nào" : undefined}
            actionText={searchTerm ? "Xóa bộ lọc" : "Tạo danh mục đầu tiên"}
            onAction={searchTerm ? () => { setSearchTerm(''); setStatusFilter('ALL'); } : handleOpenCreate}
          />
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="text-secondary small text-uppercase">
                  <th style={{ width: '70px' }} className="ps-4">ID</th>
                  <th style={{ minWidth: '220px' }}>Tên danh mục</th>
                  <th style={{ minWidth: '320px' }}>Mô tả chi tiết</th>
                  <th style={{ width: '150px' }}>Số tin bài</th>
                  <th style={{ width: '130px' }}>Trạng thái</th>
                  <th style={{ minWidth: '150px' }} className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat) => {
                  const catId = cat.categoryID || cat.id;
                  const catName = cat.categoryName || cat.name;
                  const catDesc = cat.categoryDesciption || cat.categoryDescription || cat.description;
                  const isActive = cat.isActive !== undefined ? Boolean(cat.isActive) : cat.status === 1;
                  const articleCount = news.filter(n => (n.category?.categoryID || n.categoryID || n.categoryId) === catId).length;

                  return (
                    <tr key={catId}>
                      <td className="ps-4 fw-semibold text-secondary">
                        #{catId}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2 fw-semibold text-body">
                          <FolderTree size={18} className="text-primary flex-shrink-0" />
                          <span>{catName}</span>
                        </div>
                      </td>
                      <td className="text-secondary small">
                        {catDesc || '—'}
                      </td>
                      <td>
                        <span className="badge bg-body-secondary text-secondary border px-2 py-1 d-inline-flex align-items-center gap-1">
                          <FileText size={12} />
                          <span>{articleCount} bài viết</span>
                        </span>
                      </td>
                      <td>
                        {isActive ? (
                          <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                            ● Active
                          </span>
                        ) : (
                          <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
                            ● Inactive
                          </span>
                        )}
                      </td>
                      <td className="text-end pe-4">
                        <div className="btn-group btn-group-sm">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setDetailCategoryId(catId)}
                            title="Xem chi tiết danh mục"
                            aria-label={`Xem chi tiết danh mục ${catName}`}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleOpenEdit(cat)}
                            title="Chỉnh sửa danh mục"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleOpenDelete(cat)}
                            title="Xóa danh mục"
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

      {detailCategory && (
        <DetailModal
          title="Chi tiết danh mục"
          subtitle={`Danh mục #${detailCategory.categoryID || detailCategory.id}`}
          onClose={() => setDetailCategoryId(null)}
          fields={[
            { label: 'ID', value: `#${detailCategory.categoryID || detailCategory.id}` },
            { label: 'Tên danh mục', value: detailCategory.categoryName || detailCategory.name },
            { label: 'Mô tả', value: <span style={{ whiteSpace: 'pre-wrap' }}>{detailCategory.categoryDesciption || detailCategory.description || '—'}</span> },
            { label: 'Trạng thái', value: (detailCategory.isActive !== undefined ? detailCategory.isActive : detailCategory.status === 1) ? 'Đang hoạt động' : 'Tạm ẩn' },
            { label: 'Số bài viết', value: detailNews.length }
          ]}
        >
          <section className="border-top pt-3 mt-3">
            <h6 className="fw-bold">Bài viết thuộc danh mục</h6>
            {detailNews.length > 0 ? (
              <ul className="list-group list-group-flush">
                {detailNews.map(item => {
                  const nId = item.newsArticleID || item.id;
                  const nTitle = item.newsTitle || item.title;
                  return (
                    <li key={nId} className="list-group-item px-0 text-break">
                      <span className="text-secondary me-2">#{nId}</span>
                      {nTitle}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-secondary mb-0">Chưa có bài viết thuộc danh mục này.</p>
            )}
          </section>
        </DetailModal>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        mode={modalMode}
        category={selectedCategory}
        existingCategories={categories}
        onSubmit={handleModalSubmit}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Xác nhận xóa danh mục"
        itemName={categoryToDelete?.categoryName || categoryToDelete?.name}
        message={
          linkedNewsCount > 0 
            ? `Cảnh báo: Có ${linkedNewsCount} bài tin tức đang thuộc danh mục này! Backend sẽ chặn xóa nếu danh mục đang chứa bài viết.`
            : "Hành động này sẽ xóa vĩnh viễn danh mục khỏi cơ sở dữ liệu. Bạn có chắc chắn muốn xóa?"
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
