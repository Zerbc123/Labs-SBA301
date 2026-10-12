/**
 * userService.js - Tầng nghiệp vụ Quản lý người dùng/tài khoản (Account/User)
 * Quản lý danh sách người dùng, phân quyền Role (1=Admin, 2=Staff), trạng thái (0/1)
 */

import { storageService } from './storageService';

export const userService = {
  getAll() {
    return storageService.get(storageService.KEYS.USERS, []);
  },

  getById(id) {
    const list = this.getAll();
    return list.find(u => u.id === id) || null;
  },

  create(userData) {
    const list = this.getAll();

    const username = (userData.username || '').trim();
    const password = (userData.password || '').trim();
    const fullName = (userData.fullName || '').trim();
    const email = (userData.email || '').trim();

    // 1. Validate bắt buộc
    if (!username) {
      throw new Error('Tên tài khoản (username) không được để trống!');
    }
    if (!password) {
      throw new Error('Mật khẩu không được để trống!');
    }
    if (!fullName) {
      throw new Error('Họ và tên không được để trống!');
    }
    if (!email) {
      throw new Error('Email không được để trống!');
    }

    // Validate email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Định dạng email không hợp lệ!');
    }

    // 2. Validate trùng username
    const exists = list.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) {
      throw new Error('Tên đăng nhập này đã có người sử dụng!');
    }

    const newUser = {
      id: 'USR' + String(Date.now()).slice(-4) + Math.floor(Math.random() * 10),
      username,
      password,
      fullName,
      email,
      role: Number(userData.role) === 1 ? 1 : 2, // 1: Admin, 2: Staff
      status: Number(userData.status) === 1 ? 1 : 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedList = [newUser, ...list];
    storageService.set(storageService.KEYS.USERS, updatedList);
    return newUser;
  },

  update(id, userData) {
    const list = this.getAll();
    const index = list.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('Không tìm thấy tài khoản cần cập nhật!');
    }

    const username = (userData.username || '').trim();
    const fullName = (userData.fullName || '').trim();
    const email = (userData.email || '').trim();

    if (!username) {
      throw new Error('Tên tài khoản không được để trống!');
    }
    if (!fullName) {
      throw new Error('Họ và tên không được để trống!');
    }
    if (!email) {
      throw new Error('Email không được để trống!');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Định dạng email không hợp lệ!');
    }

    // Kiểm tra trùng username với người khác
    const duplicate = list.some(
      u => u.id !== id && u.username.toLowerCase() === username.toLowerCase()
    );
    if (duplicate) {
      throw new Error('Tên đăng nhập này đã được tài khoản khác sử dụng!');
    }

    const updatedUser = {
      ...list[index],
      username,
      fullName,
      email,
      role: Number(userData.role) === 1 ? 1 : 2,
      status: Number(userData.status) === 1 ? 1 : 0
    };

    // Nếu người dùng nhập mật khẩu mới thì cập nhật
    if (userData.password && userData.password.trim()) {
      updatedUser.password = userData.password.trim();
    }

    const updatedList = list.map(u => (u.id === id ? updatedUser : u));
    storageService.set(storageService.KEYS.USERS, updatedList);
    return updatedUser;
  },

  delete(id, currentUserId) {
    const list = this.getAll();
    const target = list.find(u => u.id === id);
    if (!target) {
      throw new Error('Tài khoản cần xóa không tồn tại!');
    }

    // Không cho phép tự xóa tài khoản đang đăng nhập
    if (currentUserId && id === currentUserId) {
      throw new Error('Bạn không thể tự xóa tài khoản đang đăng nhập của chính mình!');
    }

    // Không cho phép xóa Admin gốc
    if (target.username.toLowerCase() === 'admin') {
      throw new Error('Không thể xóa tài khoản Quản trị viên mặc định (Admin)!');
    }

    const updatedList = list.filter(u => u.id !== id);
    storageService.set(storageService.KEYS.USERS, updatedList);
    return true;
  },

  search(list, keyword, roleFilter = '', statusFilter = '') {
    return list.filter(item => {
      if (keyword && keyword.trim()) {
        const norm = keyword.trim().toLowerCase();
        const matchUser = item.username && item.username.toLowerCase().includes(norm);
        const matchName = item.fullName && item.fullName.toLowerCase().includes(norm);
        const matchEmail = item.email && item.email.toLowerCase().includes(norm);

        if (!matchUser && !matchName && !matchEmail) {
          return false;
        }
      }

      if (roleFilter !== '' && item.role !== Number(roleFilter)) {
        return false;
      }

      if (statusFilter !== '' && item.status !== Number(statusFilter)) {
        return false;
      }

      return true;
    });
  }
};
