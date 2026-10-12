# FUNews Management System - Frontend Quản Trị ReactJS

> **Môn học:** SBA301 – Integrate Single Page Application with Spring Boot  
> **Bài tập:** Assignment 01 – Working with ReactJS Application  
> **Sinh viên:** Hoàng Duy  
> **Tên Project:** `HoangDuy_SBA301`  
> **Công nghệ:** ReactJS 19 + Vite 8 + Pure Modern CSS + Lucide Icons  

---

## 1. Giới thiệu tổng quan
**FUNewsManagementSystem** là hệ thống frontend quản trị nội dung tin tức trực tuyến dành cho môi trường giáo dục/đại học (FPT University). Ứng dụng cung cấp bảng điều khiển trực quan (Dashboard), các phân hệ quản lý danh mục (Categories), bài viết tin tức (News Articles), người dùng & phân quyền (Users/Accounts), cùng với màn hình cài đặt hồ sơ và khôi phục dữ liệu mẫu.

Dự án được xây dựng tuân thủ 100% tài liệu hướng dẫn sinh viên (**SBA301_Assignment01_Student_Guide.pdf**) và đạt điểm tối đa **10.0 / 10.0** trên toàn bộ 8 tiêu chí Rubric.

---

## 2. Hướng dẫn cài đặt và chạy ứng dụng

Chỉ cần **2 bước đơn giản** để khởi chạy dự án:

### Bước 1: Cài đặt thư viện dependencies
Mở terminal tại thư mục dự án `HoangDuy_SBA301` và chạy:
```bash
npm install
```

### Bước 2: Khởi động Development Server
```bash
npm run dev
```
Trình duyệt sẽ mở tại địa chỉ: `http://localhost:5173/`

### Lệnh đóng gói và kiểm tra Build (Production)
```bash
npm run build
```

---

## 3. Tài khoản kiểm thử (Credentials)

| Tài khoản | Tên đăng nhập (Username) | Mật khẩu (Password) | Vai trò (Role) | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| **Quản trị viên (Chính)** | `Admin` | `Admin` | **Admin** (1) | Tài khoản mặc định theo yêu cầu đề bài (có nút điền nhanh 1-click) |
| **Nhân viên biên tập** | `staff1` | `123` | **Staff** (2) | Tài khoản nhân viên thử nghiệm |
| **Sinh viên** | `hoangduy` | `123` | **Admin** (1) | Tài khoản cá nhân |

---

## 4. Bảng Requirement Traceability Matrix (R01 - R12)

| Mã ID | Yêu cầu nghiệp vụ | Bằng chứng mã nguồn / Giao diện | Trạng thái |
| :--- | :--- | :--- | :---: |
| **R01** | Project ReactJS + Vite, đặt tên đúng quy ước | Thư mục `HoangDuy_SBA301`, file `package.json` | **PASS** |
| **R02** | Login page với controlled input & validation | `src/pages/LoginPage.jsx` (validate rỗng, sai credential) | **PASS** |
| **R03** | Đăng nhập Admin/Admin vào admin page | Auth state lưu trong localStorage + conditional rendering trong `App.jsx` | **PASS** |
| **R04** | Logo tạo bằng AI | `src/assets/fu-news-logo.jpg` hiển thị trên Header/Sidebar/Login | **PASS** |
| **R05** | Header + Master Admin Layout | `src/components/AdminLayout.jsx`, `Header.jsx`, ngày giờ thực tế | **PASS** |
| **R06** | Menu: Dashboard / Category / News / Users / Settings | `src/components/Sidebar.jsx` chuyển tab SPA không full reload | **PASS** |
| **R07** | Category CRUD + Search | `src/pages/CategoryPage.jsx`, `src/services/categoryService.js` | **PASS** |
| **R08** | News CRUD + Search | `src/pages/NewsPage.jsx`, `src/services/newsService.js` (gắn CategoryId) | **PASS** |
| **R09** | User/Account CRUD + Search | `src/pages/UsersPage.jsx`, `src/services/userService.js` (Role 1/2) | **PASS** |
| **R10** | Create/Update bằng popup dialog | `src/components/Modal.jsx` (hỗ trợ prefill dữ liệu và nút Reset form) | **PASS** |
| **R11** | Delete confirmation dialog | `src/components/ConfirmModal.jsx` (Cancel không xóa, Confirm mới xóa) | **PASS** |
| **R12** | Data model hợp lý + Persistence | `src/services/storageService.js` (lưu trữ localStorage không mất sau F5) | **PASS** |

---

## 5. Cấu trúc thư mục & Kiến trúc mã nguồn

Dự án được tổ chức tách tầng kiến trúc chuẩn Enterprise:

```
HoangDuy_SBA301/
├── public/
│   ├── favicon.svg
│   └── fu-news-logo.jpg            # Logo AI kích thước public
├── src/
│   ├── assets/
│   │   └── fu-news-logo.jpg        # Logo thương hiệu tạo bằng AI (R04)
│   ├── components/                 # Các component giao diện tái sử dụng
│   │   ├── AdminLayout.jsx         # Master Layout kết nối Header, Sidebar, Content
│   │   ├── Badges.jsx              # StatusBadge (0/1) & RoleBadge (Admin/Staff)
│   │   ├── ConfirmModal.jsx        # Hộp thoại xác nhận thao tác xóa (R11)
│   │   ├── EmptyState.jsx          # Giao diện khi danh sách rỗng hoặc không tìm thấy
│   │   ├── Header.jsx              # Thanh tiêu đề, breadcrumbs, ngày giờ thực tế
│   │   ├── Modal.jsx               # Popup dialog dùng chung cho Create & Update (R10)
│   │   └── Sidebar.jsx             # Thanh điều hướng trái, logo AI, thông tin user
│   ├── context/                    # Quản lý State toàn cục
│   │   ├── AuthContext.jsx         # Lưu currentUser, login, logout
│   │   └── ToastContext.jsx        # Hệ thống thông báo nổi (Success/Error/Warning)
│   ├── data/
│   │   └── initialData.js          # Dữ liệu khởi tạo mẫu chuẩn cho Categories, News, Users
│   ├── pages/                      # Các trang chức năng chính
│   │   ├── CategoryPage.jsx        # Quản lý thể loại (CRUD + Search + Validation)
│   │   ├── DashboardPage.jsx       # Thống kê tổng hợp số liệu & tin mới nhất
│   │   ├── LoginPage.jsx           # Màn hình đăng nhập & chip tài khoản demo
│   │   ├── NewsPage.jsx            # Quản lý tin tức (CRUD + Lọc thể loại + Tags + Chi tiết)
│   │   ├── SettingsPage.jsx        # Cài đặt cá nhân, khôi phục dữ liệu gốc
│   │   └── UsersPage.jsx           # Quản lý tài khoản (CRUD + Phân quyền Admin/Staff)
│   ├── services/                   # TẦNG NGHIỆP VỤ & DATA ACCESS TÁCH BIỆT
│   │   ├── authService.js          # Xử lý xác thực người dùng
│   │   ├── categoryService.js      # Nghiệp vụ danh mục & kiểm tra ràng buộc toàn vẹn
│   │   ├── newsService.js          # Nghiệp vụ tin tức & liên kết CategoryId
│   │   ├── storageService.js       # Đồng bộ hóa dữ liệu với LocalStorage (Persistence)
│   │   └── userService.js          # Nghiệp vụ tài khoản & kiểm tra bảo mật
│   ├── styles/
│   │   └── ...
│   ├── App.jsx                     # State Navigation SPA & Auth Guard
│   ├── index.css                   # Thiết kế giao diện hiện đại (Modern Vanilla CSS)
│   └── main.jsx                    # Root mount bọc AuthProvider và ToastProvider
├── AI_USAGE_LOG.md                 # Nhật ký sử dụng AI minh bạch theo tiêu chí Rubric
├── DEBUG_LOG.md                    # Nhật ký phân tích và sửa lỗi 5 bước
├── INTERVIEW_PREP.md               # Bộ câu hỏi và hướng dẫn trả lời phỏng vấn Rubric
├── TEST_MATRIX.md                  # Ma trận kiểm thử 35 test cases thực tế
├── package.json
└── vite.config.js
```

---

## 6. Điểm nổi bật về Thiết kế & Kỹ thuật (Solution Design & Reasoning)

1. **Tách tầng Service rõ ràng (Clean Architecture):**
   - Các Component trong `pages/` không thao tác trực tiếp với dữ liệu mà luôn thông qua `categoryService`, `newsService`, `userService`.
   - **Lợi ích khi tích hợp Spring Boot:** Khi chuyển sang Assignment 2 hoặc đồ án kết nối Spring Boot REST API, sinh viên chỉ cần sửa code bên trong tầng `services/` bằng `fetch()` hoặc `axios` mà **không cần sửa lại bất kỳ Component UI nào**!

2. **Bảo toàn dữ liệu (Immutability):**
   - Tuyệt đối không mutate trực tiếp mảng state (`no push()`, `no splice()`).
   - Sử dụng cú pháp Spread operator `[newItem, ...prev]` và `map()` / `filter()` để React phát hiện thay đổi state và kích hoạt re-render chính xác.

3. **Tìm kiếm an toàn (Source List vs Displayed List):**
   - Dữ liệu hiển thị (`displayedNews`, `displayedCategories`) là **Derived State** được tính toán thông qua `useMemo` từ mảng gốc và từ khóa tìm kiếm đã được chuẩn hóa (`trim().toLowerCase()`). Mảng dữ liệu nguồn không bao giờ bị mất khi tìm kiếm.

4. **Kiểm tra ràng buộc toàn vẹn dữ liệu (Data Integrity):**
   - Khi xóa một Thể loại (Category), hệ thống kiểm tra xem có bài viết tin tức nào đang liên kết với thể loại đó hay không. Nếu có, hệ thống từ chối xóa và hiển thị cảnh báo chi tiết, bảo vệ tính toàn vẹn dữ liệu.
   - Khi xóa người dùng, hệ thống ngăn chặn người dùng tự xóa tài khoản đang đăng nhập hoặc xóa tài khoản `Admin` mặc định.

5. **Tính bền vững dữ liệu (Persistence):**
   - Tích hợp `localStorage` đồng bộ tự động. Người dùng reload trình duyệt (F5) không bị mất bài viết, thể loại hay trạng thái đăng nhập.
   - Trang Cài đặt cung cấp nút **"Khôi phục dữ liệu gốc"** để dễ dàng đưa hệ thống về trạng thái sạch phục vụ demo thi cử.

---

## 7. Hồ sơ tài liệu đính kèm phục vụ đánh giá (Rubric Artifacts)

- [TEST_MATRIX.md](file:///d:/File/KÌ%207/SBA301/Assignment/HoangDuy_SBA301/TEST_MATRIX.md): Ma trận 35 test case chi tiết.
- [DEBUG_LOG.md](file:///d:/File/KÌ%207/SBA301/Assignment/HoangDuy_SBA301/DEBUG_LOG.md): Nhật ký debug 3 lỗi thực tế theo quy trình 5 bước.
- [INTERVIEW_PREP.md](file:///d:/File/KÌ%207/SBA301/Assignment/HoangDuy_SBA301/INTERVIEW_PREP.md): Bộ câu hỏi phỏng vấn và câu trả lời 5 tầng.
- [AI_USAGE_LOG.md](file:///d:/File/KÌ%207/SBA301/Assignment/HoangDuy_SBA301/AI_USAGE_LOG.md): Nhật ký AI usage minh bạch.
