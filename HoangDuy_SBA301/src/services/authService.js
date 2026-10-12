/**
 * authService.js - Xử lý xác thực người dùng (Mock Authentication)
 * Quy định đề bài:
 * - Admin/Admin đăng nhập thành công vào admin page
 * - Sai thông tin -> trả lỗi thông báo
 * - Logout -> xóa session, trở về màn hình đăng nhập
 */

import { storageService } from './storageService';

export const authService = {
  // Lấy phiên đăng nhập hiện tại từ localStorage
  getCurrentUser() {
    return storageService.get(storageService.KEYS.AUTH, null);
  },

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated() {
    const user = this.getCurrentUser();
    return Boolean(user);
  },

  // Xử lý login
  login(username, password) {
    const trimmedUser = (username || '').trim();
    const trimmedPass = (password || '').trim();

    // 1. Kiểm tra validation bắt buộc
    if (!trimmedUser || !trimmedPass) {
      return {
        success: false,
        message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!'
      };
    }

    // 2. Tìm người dùng trong danh sách lưu trữ
    const users = storageService.get(storageService.KEYS.USERS, []);
    
    // Đặc biệt kiểm tra tài khoản Admin/Admin theo yêu cầu đề bài
    const foundUser = users.find(
      u => u.username.toLowerCase() === trimmedUser.toLowerCase() && u.password === trimmedPass
    );

    if (foundUser) {
      if (foundUser.status === 0) {
        return {
          success: false,
          message: 'Tài khoản này đã bị khóa (Inactive)!'
        };
      }

      // Tạo object session an toàn (không lộ pass)
      const sessionUser = {
        id: foundUser.id,
        username: foundUser.username,
        fullName: foundUser.fullName,
        email: foundUser.email,
        role: foundUser.role, // 1: Admin, 2: Staff
        loginAt: new Date().toISOString()
      };

      storageService.set(storageService.KEYS.AUTH, sessionUser);
      return {
        success: true,
        user: sessionUser
      };
    }

    // Nếu không khớp tài khoản nào
    return {
      success: false,
      message: 'Tên đăng nhập hoặc mật khẩu không chính xác! (Gợi ý: Admin / Admin)'
    };
  },

  // Xử lý đăng xuất
  logout() {
    localStorage.removeItem(storageService.KEYS.AUTH);
    return true;
  }
};
