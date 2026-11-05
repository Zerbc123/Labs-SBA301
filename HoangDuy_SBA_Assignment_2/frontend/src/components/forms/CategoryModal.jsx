// DuyDLH-CE200667
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { FolderPlus, Edit3, RotateCcw } from 'lucide-react';

export default function CategoryModal({
  isOpen,
  mode = 'create',
  category = null,
  existingCategories = [],
  onSubmit,
  onClose
}) {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryDesciption: '',
    parentCategoryID: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && category) {
        setFormData({
          categoryName: category.categoryName || category.name || '',
          categoryDesciption: category.categoryDesciption || category.categoryDescription || category.description || '',
          parentCategoryID: category.parentCategoryID || '',
          isActive: category.isActive !== undefined ? Boolean(category.isActive) : true
        });
      } else {
        setFormData({
          categoryName: '',
          categoryDesciption: '',
          parentCategoryID: '',
          isActive: true
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleReset = () => {
    if (mode === 'update' && category) {
      setFormData({
        categoryName: category.categoryName || category.name || '',
        categoryDesciption: category.categoryDesciption || category.categoryDescription || category.description || '',
        parentCategoryID: category.parentCategoryID || '',
        isActive: category.isActive !== undefined ? Boolean(category.isActive) : true
      });
    } else {
      setFormData({
        categoryName: '',
        categoryDesciption: '',
        parentCategoryID: '',
        isActive: true
      });
    }
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    const trimmedName = formData.categoryName.trim();

    if (!trimmedName) {
      errs.categoryName = "Tên danh mục không được để trống";
    } else {
      const currentId = category?.categoryID || category?.id;
      const isDuplicate = existingCategories.some(
        c => (c.categoryName || c.name || '').trim().toLowerCase() === trimmedName.toLowerCase() &&
             (mode === 'create' || (c.categoryID || c.id) !== currentId)
      );
      if (isDuplicate) {
        errs.categoryName = "Tên danh mục này đã tồn tại trong hệ thống";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      categoryName: formData.categoryName.trim(),
      categoryDesciption: formData.categoryDesciption.trim(),
      parentCategoryID: formData.parentCategoryID ? Number(formData.parentCategoryID) : null,
      isActive: Boolean(formData.isActive)
    });
  };

  const isCreate = mode === 'create';
  const modalTitle = isCreate ? "Thêm Danh mục Mới" : "Cập nhật Danh mục";
  const currentId = category?.categoryID || category?.id;
  const modalSubtitle = isCreate 
    ? "Điền thông tin để tạo danh mục tin tức mới" 
    : `Chỉnh sửa thông tin danh mục ID #${currentId}`;
  const modalIcon = isCreate ? <FolderPlus size={20} /> : <Edit3 size={20} />;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      subtitle={modalSubtitle}
      icon={modalIcon}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="modal-body p-4">
          {/* Category Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="cat-name">
              Tên danh mục <span className="text-danger">*</span>
            </label>
            <input
              id="cat-name"
              name="categoryName"
              type="text"
              className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
              placeholder="VD: Academic news, Student Affairs..."
              value={formData.categoryName}
              onChange={handleChange}
              autoFocus
            />
            {errors.categoryName && <div className="invalid-feedback">{errors.categoryName}</div>}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="cat-desc">
              Mô tả danh mục
            </label>
            <textarea
              id="cat-desc"
              name="categoryDesciption"
              className="form-control"
              placeholder="Mô tả phạm vi hoặc nội dung của danh mục..."
              value={formData.categoryDesciption}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="cat-status">
              Trạng thái hoạt động
            </label>
            <select
              id="cat-status"
              name="isActive"
              className="form-select"
              value={formData.isActive ? "true" : "false"}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === "true" }))}
            >
              <option value="true">Hoạt động (Active)</option>
              <option value="false">Tạm khóa (Inactive)</option>
            </select>
          </div>
        </div>

        <div className="modal-footer bg-body-tertiary d-flex justify-content-between px-4 py-3">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={handleReset}
            title="Đặt lại thông tin form ban đầu"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm px-3"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm px-3"
            >
              {isCreate ? "Tạo danh mục" : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
