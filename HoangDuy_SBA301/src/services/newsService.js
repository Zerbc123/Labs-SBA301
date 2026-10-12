/**
 * newsService.js - Tầng nghiệp vụ cho Tin tức (News Articles)
 * Quản lý liên kết CategoryId, CRUD, tìm kiếm và lọc dữ liệu
 */

import { storageService } from './storageService';
import { categoryService } from './categoryService';

export const newsService = {
  // Lấy toàn bộ danh sách tin tức và bổ sung thông tin tên thể loại
  getAll() {
    const list = storageService.get(storageService.KEYS.NEWS, []);
    const categories = categoryService.getAll();
    const categoryMap = new Map(categories.map(c => [c.id, c.name]));

    return list.map(item => ({
      ...item,
      categoryName: categoryMap.get(item.categoryId) || 'Chưa phân loại'
    }));
  },

  getById(id) {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  },

  create(newsData, currentUser) {
    const list = storageService.get(storageService.KEYS.NEWS, []);

    // 1. Validate bắt buộc
    const title = (newsData.title || '').trim();
    const content = (newsData.content || '').trim();
    const categoryId = newsData.categoryId;

    if (!title) {
      throw new Error('Tiêu đề bài viết không được để trống!');
    }
    if (!content) {
      throw new Error('Nội dung bài viết không được để trống!');
    }
    if (!categoryId) {
      throw new Error('Vui lòng chọn một Thể loại tin tức!');
    }

    // 2. Kiểm tra Thể loại có tồn tại không
    const categories = categoryService.getAll();
    const existsCat = categories.some(c => c.id === categoryId);
    if (!existsCat) {
      throw new Error('Thể loại tin tức đã chọn không tồn tại hoặc đã bị xóa!');
    }

    // Xử lý tags
    let tagsArray = [];
    if (Array.isArray(newsData.tags)) {
      tagsArray = newsData.tags;
    } else if (typeof newsData.tags === 'string') {
      tagsArray = newsData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
    }

    const newArticle = {
      id: 'NEWS' + String(Date.now()).slice(-4) + Math.floor(Math.random() * 10),
      title,
      content,
      categoryId,
      createdBy: (currentUser && currentUser.username) || newsData.createdBy || 'Admin',
      createdAt: new Date().toISOString().split('T')[0],
      status: Number(newsData.status) === 1 ? 1 : 0,
      tags: tagsArray
    };

    // Immutable add
    const updatedList = [newArticle, ...list];
    storageService.set(storageService.KEYS.NEWS, updatedList);
    return newArticle;
  },

  update(id, newsData) {
    const list = storageService.get(storageService.KEYS.NEWS, []);
    const index = list.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Không tìm thấy bài viết cần chỉnh sửa!');
    }

    const title = (newsData.title || '').trim();
    const content = (newsData.content || '').trim();
    const categoryId = newsData.categoryId;

    if (!title) {
      throw new Error('Tiêu đề bài viết không được để trống!');
    }
    if (!content) {
      throw new Error('Nội dung bài viết không được để trống!');
    }
    if (!categoryId) {
      throw new Error('Vui lòng chọn một Thể loại tin tức!');
    }

    // Kiểm tra category tồn tại
    const categories = categoryService.getAll();
    const existsCat = categories.some(c => c.id === categoryId);
    if (!existsCat) {
      throw new Error('Thể loại tin tức đã chọn không tồn tại!');
    }

    // Xử lý tags
    let tagsArray = [];
    if (Array.isArray(newsData.tags)) {
      tagsArray = newsData.tags;
    } else if (typeof newsData.tags === 'string') {
      tagsArray = newsData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
    }

    const updatedArticle = {
      ...list[index],
      title,
      content,
      categoryId,
      status: Number(newsData.status) === 1 ? 1 : 0,
      tags: tagsArray
    };

    const updatedList = list.map(item => (item.id === id ? updatedArticle : item));
    storageService.set(storageService.KEYS.NEWS, updatedList);
    return updatedArticle;
  },

  delete(id) {
    const list = storageService.get(storageService.KEYS.NEWS, []);
    const exists = list.some(item => item.id === id);
    if (!exists) {
      throw new Error('Bài viết cần xóa không tồn tại!');
    }

    const updatedList = list.filter(item => item.id !== id);
    storageService.set(storageService.KEYS.NEWS, updatedList);
    return true;
  },

  search(list, keyword, categoryFilter = '', statusFilter = '') {
    return list.filter(item => {
      // 1. Kiểm tra keyword
      if (keyword && keyword.trim()) {
        const norm = keyword.trim().toLowerCase();
        const matchTitle = item.title && item.title.toLowerCase().includes(norm);
        const matchContent = item.content && item.content.toLowerCase().includes(norm);
        const matchAuthor = item.createdBy && item.createdBy.toLowerCase().includes(norm);
        const matchCategory = item.categoryName && item.categoryName.toLowerCase().includes(norm);
        const matchTags = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(norm));

        if (!matchTitle && !matchContent && !matchAuthor && !matchCategory && !matchTags) {
          return false;
        }
      }

      // 2. Kiểm tra lọc Category
      if (categoryFilter && item.categoryId !== categoryFilter) {
        return false;
      }

      // 3. Kiểm tra lọc Status
      if (statusFilter !== '' && item.status !== Number(statusFilter)) {
        return false;
      }

      return true;
    });
  }
};
