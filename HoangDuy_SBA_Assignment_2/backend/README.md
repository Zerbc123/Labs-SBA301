<!-- DuyDLH-CE200667 -->
# Backend FUNewsManagementSystem - Assignment 02 (SBA301)

- **Sinh viên:** Đào Lê Hoàng Duy - CE200667
- **Công nghệ:** Spring Boot 3 (v3.4.1), Spring Data JPA, Java 21, Microsoft SQL Server
- **Kiến trúc:** 3-Layer Architecture (Controllers -> Services -> Repositories -> Entity)
- **Database:** `DuyDLH_CE200667_FUNewsManagementSBA301`

---

## 1. Cấu trúc thư mục (3-Layer Architecture)

```
DuyDLH_BACKEND_CE200667/
├── src/main/java/vn/edu/fpt/
│   ├── DuyBackendApplication.java      # File chạy chính (@SpringBootApplication)
│   ├── dtos/                           # Data Transfer Objects
│   │   ├── LoginRequest.java           # DTO nhận email & password khi login
│   │   └── NewsArticleRequest.java     # DTO tạo/cập nhật bài viết tin tức và tags
│   ├── entity/                         # Các Entity JPA ánh xạ bảng DB
│   │   ├── Category.java
│   │   ├── NewsArticle.java
│   │   ├── SystemAccount.java
│   │   └── Tag.java
│   ├── repositories/                   # Tầng Data Access (Spring Data JPA)
│   │   ├── ICategoryRepository.java
│   │   ├── INewsArticleRepository.java
│   │   ├── ISystemAccountRepository.java
│   │   └── ITagRepository.java
│   ├── services/                       # Tầng Business Logic (Interface + Implementation)
│   │   ├── ICategoryService.java & CategoryService.java
│   │   ├── INewsArticleService.java & NewsArticleService.java
│   │   ├── ISystemAccountService.java & SystemAccountService.java
│   │   └── ITagService.java & TagService.java
│   └── controllers/                    # Tầng RESTful Web Service Controller
│       ├── AuthController.java         # /api/auth (Login, Profile)
│       ├── CategoryController.java     # /api/categories (CRUD, Search)
│       ├── NewsArticleController.java  # /api/news (CRUD, Public Active, Search, History)
│       ├── SystemAccountController.java# /api/accounts (CRUD, Search)
│       └── TagController.java          # /api/tags (CRUD, Search)
└── src/main/resources/
    └── application.properties          # Cấu hình kết nối SQL Server & Hibernate
```

---

## 2. Các quy tắc nghiệp vụ theo đề bài (Business Rules)

1. **Authentication:**
   - Đăng nhập bằng Email và Password qua `POST /api/auth/login`.
   - Phân quyền: `AccountRole = 1` là **Admin**, `AccountRole = 2` là **Staff**.
   - Khách vãng lai xem tin tức không cần đăng nhập qua endpoint công khai `GET /api/news/active`.

2. **Ràng buộc xóa Category:**
   - Khi xóa một Category, hệ thống kiểm tra xem có bài viết nào đang thuộc Category này không (`newsArticleRepository.existsByCategory_CategoryID(id)`).
   - Nếu có bài viết -> Chặn xóa và trả về lỗi 400 Bad Request kèm thông báo: *"Cannot delete category because it is already used in news articles!"*.
   - Nếu không có bài viết -> Cho phép xóa thành công.

3. **Ràng buộc xóa Account:**
   - Khi xóa một Account, hệ thống kiểm tra xem tài khoản này đã từng tạo bài viết nào chưa (`newsArticleRepository.existsByCreatedBy_AccountID(id)`).
   - Nếu đã tạo bài viết -> Chặn xóa và trả về lỗi 400 Bad Request kèm thông báo: *"Cannot delete account because it has created news articles!"*.
   - Nếu chưa tạo bài viết -> Cho phép xóa thành công.

4. **Quản lý bài viết tin tức (NewsArticle):**
   - Hỗ trợ quan hệ Many-to-Many với `Tag` qua bảng liên kết `NewsTag`.
   - Lưu thời gian tạo (`CreatedDate`) và sửa đổi (`ModifiedDate`).
   - Hỗ trợ xem lịch sử bài viết do từng nhân viên tạo: `GET /api/news/history/{accountId}`.
   - Hỗ trợ tìm kiếm theo tiêu đề/nội dung: `GET /api/news/search?keyword=...`.

---

## 3. Danh sách RESTful APIs

| Method | Endpoint | Mô tả | Quyền / Ghi chú |
|---|---|---|---|
| **POST** | `/api/auth/login` | Đăng nhập bằng Email & Password | Trả về thông tin account & role |
| **GET** | `/api/auth/me/{id}` | Lấy thông tin cá nhân | Xem/quản lý profile |
| **GET** | `/api/categories` | Lấy tất cả danh mục | |
| **GET** | `/api/categories/active` | Lấy danh mục đang hoạt động | |
| **GET** | `/api/categories/{id}` | Chi tiết danh mục | |
| **POST** | `/api/categories` | Thêm danh mục mới | Staff / Admin |
| **PUT** | `/api/categories/{id}` | Cập nhật danh mục | Staff / Admin |
| **DELETE** | `/api/categories/{id}` | Xóa danh mục | Chặn xóa nếu có bài viết |
| **GET** | `/api/categories/search?keyword=` | Tìm kiếm danh mục | |
| **GET** | `/api/accounts` | Lấy tất cả tài khoản | Admin |
| **GET** | `/api/accounts/{id}` | Chi tiết tài khoản | Admin |
| **POST** | `/api/accounts` | Thêm tài khoản mới | Admin |
| **PUT** | `/api/accounts/{id}` | Cập nhật tài khoản | Admin |
| **DELETE** | `/api/accounts/{id}` | Xóa tài khoản | Chặn xóa nếu đã tạo bài viết |
| **GET** | `/api/accounts/search?keyword=` | Tìm kiếm tài khoản | |
| **GET** | `/api/news` | Lấy tất cả tin tức | Staff / Admin |
| **GET** | `/api/news/active` | Lấy tin tức đang active | Công khai (Public, không cần login) |
| **GET** | `/api/news/{id}` | Chi tiết bài viết | Kèm tags và danh mục |
| **GET** | `/api/news/history/{accountId}` | Lịch sử bài viết theo tác giả | Staff xem lịch sử của mình |
| **POST** | `/api/news` | Tạo bài viết mới | Kèm danh sách tag IDs |
| **PUT** | `/api/news/{id}` | Cập nhật bài viết | |
| **DELETE** | `/api/news/{id}` | Xóa bài viết | Tự động xóa liên kết tag |
| **GET** | `/api/news/search?keyword=` | Tìm kiếm tin tức | |
| **GET** | `/api/tags` | Lấy danh sách tag | |

---

## 4. Tài khoản kiểm thử có sẵn trong DB

| Account Email | Password | Role | Tên hiển thị | Ghi chú |
|---|---|---|---|---|
| `SteveParis@FUNewsManagement.org` | `@1` | 1 (Admin) | Steve Paris | Quyền Admin (quản lý tài khoản) |
| `EmmaWilliam@FUNewsManagement.org` | `@1` | 2 (Staff) | Emma William | Quyền Staff (đã có bài viết) |
| `OliviaJames@FUNewsManagement.org` | `@1` | 2 (Staff) | Olivia James | Quyền Staff |

---

## 5. Hướng dẫn chạy Backend

### Cách 1: Chạy bằng Maven command line
```powershell
cd DuyDLH_BACKEND_CE200667
mvn spring-boot:run
```

### Cách 2: Chạy trong IntelliJ IDEA / VS Code
- Mở thư mục `DuyDLH_BACKEND_CE200667` trong IntelliJ IDEA.
- Chọn file `vn.edu.fpt.DuyBackendApplication.java` -> bấm **Run** (Shift + F10).
- Backend sẽ khởi động tại: `http://localhost:8080`.

### Cách 3: Chạy file JAR đã đóng gói
```powershell
cd DuyDLH_BACKEND_CE200667
java -jar target/DuyDLH_BACKEND_CE200667-1.0-SNAPSHOT.jar
```

