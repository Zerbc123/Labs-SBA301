<!-- DuyDLH-CE200667 -->
# Frontend FUNewsManagementSystem - Assignment 02 (SBA301)

- **Sinh viên:** Đào Lê Hoàng Duy - CE200667
- **Công nghệ:** ReactJS 19, Vite, Bootstrap 5, Axios, Lucide Icons
- **Backend API:** Spring Boot 3 (Port 8080)
- **Database:** Microsoft SQL Server (`DuyDLH_CE200667_FUNewsManagementSBA301`)

---

## 1. Tính năng hoàn thiện theo yêu cầu Assignment 02

1. **Kết nối RESTful Web Service qua Axios:**
   - Tất cả các thao tác dữ liệu Danh mục (Category), Tin tức (NewsArticle), Tài khoản (SystemAccount), Thẻ (Tag) và Xác thực (Auth) đều gọi qua các REST API tương ứng tại `http://localhost:8080/api`.
   - File cấu hình tập trung: `src/services/api.js`.

2. **Chế độ xem tin tức công khai (Khách vãng lai):**
   - Người dùng không cần đăng nhập vẫn có thể xem danh sách tin tức đang phát hành (trạng thái Active = 1) qua endpoint `GET /api/news/active`.

3. **Xác thực thành viên bằng Email & Password:**
   - Form đăng nhập hỗ trợ nhập Email và Password khớp với dữ liệu trong database SQL Server.
   - Tài khoản Admin (Role = 1): Quản lý toàn bộ danh sách tài khoản (CRUD + Search).
   - Tài khoản Staff (Role = 2): Quản lý danh mục, bài viết, xem lịch sử bài viết mình tạo.

4. **Xử lý ràng buộc nghiệp vụ (Delete Constraints):**
   - Khi xóa Category hoặc Account bị chặn từ Backend (do đang chứa bài viết hoặc đã tạo bài viết), giao diện sẽ hiển thị đúng thông báo lỗi trả về từ Backend thông qua `Toast`.

5. **Lịch sử bài viết cá nhân (News History):**
   - Biên tập viên (Staff) có thể bấm nút **"Bài viết của tôi"** để lọc nhanh các bài viết do chính tài khoản của mình tạo.

---

## 2. Tài khoản kiểm thử có sẵn trong CSDL

| Email | Password | Role | Quyền |
|---|---|---|---|
| `SteveParis@FUNewsManagement.org` | `@1` | 1 | **Admin** (Quản lý Account, Dashboard) |
| `EmmaWilliam@FUNewsManagement.org` | `@1` | 2 | **Staff** (Quản lý Category, News, Lịch sử) |
| `OliviaJames@FUNewsManagement.org` | `@1` | 2 | **Staff** |

---

## 3. Cách khởi chạy dự án

### Khởi chạy Backend trước:
```powershell
cd DuyDLH_BACKEND_CE200667
mvn spring-boot:run
```
*(Backend sẽ lắng nghe tại: http://localhost:8080)*

### Khởi chạy Frontend:
```powershell
cd DuyDLH_FRONTEND_CE200667
npm run dev
```
*(Frontend sẽ chạy tại: http://localhost:5173)*
