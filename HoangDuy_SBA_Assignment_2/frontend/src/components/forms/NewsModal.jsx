// DuyDLH-CE200667
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Newspaper, Edit3, RotateCcw } from 'lucide-react';

export default function NewsModal({
  isOpen,
  mode = 'create',
  newsItem = null,
  categories = [],
  availableTags = [],
  currentUser = null,
  onSubmit,
  onClose
}) {
  const [formData, setFormData] = useState({
    newsTitle: '',
    headline: '',
    categoryID: '',
    newsContent: '',
    newsSource: 'FUNews',
    selectedTagIds: [],
    newsStatus: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && newsItem) {
        const catId = newsItem.category?.categoryID || newsItem.categoryID || newsItem.categoryId || '';
        const tagIds = newsItem.tags && Array.isArray(newsItem.tags)
          ? newsItem.tags.map(t => typeof t === 'object' ? t.tagID : t)
          : [];
        setFormData({
          newsTitle: newsItem.newsTitle || newsItem.title || '',
          headline: newsItem.headline || '',
          categoryID: catId ? String(catId) : '',
          newsContent: newsItem.newsContent || newsItem.content || '',
          newsSource: newsItem.newsSource || 'FUNews',
          selectedTagIds: tagIds,
          newsStatus: newsItem.newsStatus !== undefined ? Boolean(newsItem.newsStatus) : true
        });
      } else {
        const defaultCatId = categories.length > 0 
          ? String(categories[0].categoryID || categories[0].id) 
          : '';
        setFormData({
          newsTitle: '',
          headline: '',
          categoryID: defaultCatId,
          newsContent: '',
          newsSource: 'FUNews',
          selectedTagIds: [],
          newsStatus: true
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, newsItem, categories]);

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

  const handleToggleTag = (tagId) => {
    setFormData(prev => {
      const exists = prev.selectedTagIds.includes(tagId);
      return {
        ...prev,
        selectedTagIds: exists 
          ? prev.selectedTagIds.filter(id => id !== tagId)
          : [...prev.selectedTagIds, tagId]
      };
    });
  };

  const handleReset = () => {
    if (mode === 'update' && newsItem) {
      const catId = newsItem.category?.categoryID || newsItem.categoryID || newsItem.categoryId || '';
      const tagIds = newsItem.tags && Array.isArray(newsItem.tags)
        ? newsItem.tags.map(t => typeof t === 'object' ? t.tagID : t)
        : [];
      setFormData({
        newsTitle: newsItem.newsTitle || newsItem.title || '',
        headline: newsItem.headline || '',
        categoryID: catId ? String(catId) : '',
        newsContent: newsItem.newsContent || newsItem.content || '',
        newsSource: newsItem.newsSource || 'FUNews',
        selectedTagIds: tagIds,
        newsStatus: newsItem.newsStatus !== undefined ? Boolean(newsItem.newsStatus) : true
      });
    } else {
      const defaultCatId = categories.length > 0 
        ? String(categories[0].categoryID || categories[0].id) 
        : '';
      setFormData({
        newsTitle: '',
        headline: '',
        categoryID: defaultCatId,
        newsContent: '',
        newsSource: 'FUNews',
        selectedTagIds: [],
        newsStatus: true
      });
    }
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!formData.newsTitle.trim()) {
      errs.newsTitle = "Tiêu đề bài viết không được để trống";
    }
    if (!formData.categoryID) {
      errs.categoryID = "Vui lòng chọn danh mục bài viết";
    }
    if (!formData.newsContent.trim()) {
      errs.newsContent = "Nội dung bài viết không được để trống";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const currentAccId = currentUser?.accountID || currentUser?.id || 1;

    onSubmit({
      newsTitle: formData.newsTitle.trim(),
      headline: formData.headline.trim() || formData.newsTitle.trim(),
      categoryID: parseInt(formData.categoryID, 10),
      newsContent: formData.newsContent.trim(),
      newsSource: formData.newsSource.trim() || 'FUNews',
      newsStatus: Boolean(formData.newsStatus),
      createdByID: currentAccId,
      updatedByID: currentAccId,
      tagIDs: formData.selectedTagIds
    });
  };

  const isCreate = mode === 'create';
  const modalTitle = isCreate ? "Thêm Bài Viết Mới" : "Cập nhật Bài Viết";
  const currentId = newsItem?.newsArticleID || newsItem?.id;
  const modalSubtitle = isCreate 
    ? "Tạo và phát hành tin tức mới lên CSDL FUNews" 
    : `Chỉnh sửa nội dung bài viết ID #${currentId}`;
  const modalIcon = isCreate ? <Newspaper size={20} /> : <Edit3 size={20} />;

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
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-title">
              Tiêu đề bài viết (News Title) <span className="text-danger">*</span>
            </label>
            <input
              id="news-title"
              name="newsTitle"
              type="text"
              className={`form-control ${errors.newsTitle ? 'is-invalid' : ''}`}
              placeholder="VD: FPT University thông báo lịch đăng ký tín chỉ..."
              value={formData.newsTitle}
              onChange={handleChange}
              autoFocus
            />
            {errors.newsTitle && <div className="invalid-feedback">{errors.newsTitle}</div>}
          </div>

          {/* Headline */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-headline">
              Tóm tắt / Tiêu đề phụ (Headline)
            </label>
            <input
              id="news-headline"
              name="headline"
              type="text"
              className="form-control"
              placeholder="Tóm tắt ngắn gọn 1 câu về nội dung bài viết..."
              value={formData.headline}
              onChange={handleChange}
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-category">
              Danh mục tin tức (Category) <span className="text-danger">*</span>
            </label>
            <select
              id="news-category"
              name="categoryID"
              className={`form-select ${errors.categoryID ? 'is-invalid' : ''}`}
              value={formData.categoryID}
              onChange={handleChange}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map(cat => {
                const cId = cat.categoryID || cat.id;
                const cName = cat.categoryName || cat.name;
                const cActive = cat.isActive !== undefined ? cat.isActive : cat.status === 1;
                return (
                  <option key={cId} value={cId}>
                    {cName} {!cActive ? '(Tạm ẩn)' : ''}
                  </option>
                );
              })}
            </select>
            {errors.categoryID && <div className="invalid-feedback">{errors.categoryID}</div>}
          </div>

          {/* Content */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-content">
              Nội dung chi tiết (News Content) <span className="text-danger">*</span>
            </label>
            <textarea
              id="news-content"
              name="newsContent"
              className={`form-control ${errors.newsContent ? 'is-invalid' : ''}`}
              placeholder="Nhập nội dung đầy đủ của bài tin tức..."
              value={formData.newsContent}
              onChange={handleChange}
              rows={5}
            />
            {errors.newsContent && <div className="invalid-feedback">{errors.newsContent}</div>}
          </div>

          {/* Source */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-source">
              Nguồn tin (News Source)
            </label>
            <input
              id="news-source"
              name="newsSource"
              type="text"
              className="form-control"
              placeholder="VD: FUNews, FPT Edu, Ban Truyền thông..."
              value={formData.newsSource}
              onChange={handleChange}
            />
          </div>

          {/* Tags Selection */}
          {availableTags.length > 0 && (
            <div className="mb-3">
              <label className="form-label fw-semibold small mb-2">
                Gắn Thẻ (Tags):
              </label>
              <div className="d-flex flex-wrap gap-2">
                {availableTags.map(tag => {
                  const tagId = tag.tagID || tag.id;
                  const isChecked = formData.selectedTagIds.includes(tagId);
                  return (
                    <button
                      type="button"
                      key={tagId}
                      className={`btn btn-sm rounded-pill px-3 py-1 ${isChecked ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => handleToggleTag(tagId)}
                    >
                      #{tag.tagName || tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Status */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-status">
              Trạng thái xuất bản
            </label>
            <select
              id="news-status"
              name="newsStatus"
              className="form-select"
              value={formData.newsStatus ? "true" : "false"}
              onChange={(e) => setFormData(prev => ({ ...prev, newsStatus: e.target.value === "true" }))}
            >
              <option value="true">Công khai (Active = 1)</option>
              <option value="false">Tạm ẩn / Bản nháp (Inactive = 0)</option>
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
              {isCreate ? "Đăng bài viết" : "Lưu bài viết"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
