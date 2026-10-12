/**
 * categoryService.js - Tầng nghiệp vụ cho Category (Thể loại tin tức)
 * Hỗ trợ CRUD, Search, và kiểm tra ràng buộc toàn vẹn dữ liệu
 */

import { storageService } from './storageService';

export const categoryService = {
  getAll() {
    return storageService.get(storageService.KEYS.CATEGORIES, []);
  },

  getById(id) {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  },

  create(categoryData) {
    const list = this.getAll();

    // Validate tên thể loại
    const name = (categoryData.name || '').trim();
    if (!name) {
      throw new Error('Tên thể loại không được để trống!');
    }

    // Kiểm tra tên trùng lặp (không phân biệt hoa thường)
    const exists = list.some(item => item.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      throw new Error('Thể loại với tên này đã tồn tại!');
    }

    const newCategory = {
      id: 'CAT' + String(Date.now()).slice(-4) + Math.floor(Math.random() * 10),
      name,
      description: (categoryData.description || '').trim(),
      status: Number(categoryData.status) === 1 ? 1 : 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Immutable update mảng
    const updatedList = [newCategory, ...list];
    storageService.set(storageService.KEYS.CATEGORIES, updatedList);
    return newCategory;
  },

  update(id, updatedData) {
    const list = this.getAll();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Không tìm thấy thể loại cần cập nhật!');
    }

    const name = (updatedData.name || '').trim();
    if (!name) {
      throw new Error('Tên thể loại không được để trống!');
    }

    // Kiểm tra trùng tên với item khác
    const duplicate = list.some(
      item => item.id !== id && item.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      throw new Error('Tên thể loại đã được sử dụng bởi mục khác!');
    }

    // Immutable update item
    const updatedCategory = {
      ...list[index],
      name,
      description: (updatedData.description || '').trim(),
      status: Number(updatedData.status) === 1 ? 1 : 0
    };

    const updatedList = list.map(item => (item.id === id ? updatedCategory : item));
    storageService.set(storageService.KEYS.CATEGORIES, updatedList);
    return updatedCategory;
  },

  delete(id) {
    const list = this.getAll();
    const target = list.find(item => item.id === id);
    if (!target) {
      throw new Error('Không tìm thấy thể loại cần xóa!');
    }

    // Kiểm tra ràng buộc dữ liệu: Nếu đang có tin tức liên kết với thể loại này
    const newsList = storageService.get(storageService.KEYS.NEWS, []);
    const linkedNews = newsList.filter(news => news.categoryId === id);
    if (linkedNews.length > 0) {
      throw new Error(
        `Không thể xóa thể loại "${target.name}" vì đang có ${linkedNews.length} bài viết liên kết!`
      );
    }

    // Immutable remove
    const updatedList = list.filter(item => item.id !== id);
    storageService.set(storageService.KEYS.CATEGORIES, updatedList);
    return true;
  },

  search(list, keyword) {
    if (!keyword || !keyword.trim()) return list;
    const normalized = keyword.trim().toLowerCase();
    return list.filter(
      item =>
        item.name.toLowerCase().includes(normalized) ||
        (item.description && item.description.toLowerCase().includes(normalized))
    );
  }
};
