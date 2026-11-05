<!-- DuyDLH-CE200667 -->
# Phân Tích State và Props - FUNews Management System

**Sinh viên:** Đào Lê Hoàng Duy - CE200667

---

## 📋 Mục Lục
- [1. State trong App.jsx](#1-state-trong-appjsx)
- [2. Props truyền từ App.jsx xuống các View](#2-props-truyền-từ-appjsx-xuống-các-view)
- [3. State trong các View Components](#3-state-trong-các-view-components)
- [4. Props trong các Form Modal Components](#4-props-trong-các-form-modal-components)
- [5. Tổng kết luồng dữ liệu](#5-tổng-kết-luồng-dữ-liệu)

---

## 1. State trong App.jsx

### 1.1. Auth State (App.jsx:19)
```javascript
const [currentUser, setCurrentUser] = useState(() => StorageService.getCurrentUser());
```
- **Công dụng:** Lưu thông tin người dùng đang đăng nhập
- **Vị trí:** `src/App.jsx:19`
- **Kiểu dữ liệu:** `{ id, username, fullName, role } | null`
- **Yêu cầu liên quan:** R02, R03 (Authentication, Authorization)

### 1.2. Navigation State (App.jsx:22)
```javascript
const [activeTab, setActiveTab] = useState('dashboard');
```
- **Công dụng:** Quản lý tab đang được hiển thị trong Admin Layout
- **Vị trí:** `src/App.jsx:22`
- **Giá trị:** `'dashboard' | 'category' | 'news' | 'users' | 'settings'`
- **Yêu cầu liên quan:** R06 (Single Page Navigation)

### 1.3. Theme State (App.jsx:25)
```javascript
const [isDarkMode, setIsDarkMode] = useState(() => StorageService.getDarkMode());
```
- **Công dụng:** Quản lý chế độ Dark/Light mode
- **Vị trí:** `src/App.jsx:25`
- **Kiểu dữ liệu:** `boolean`
- **Đồng bộ:** Với localStorage và data-bs-theme attribute (App.jsx:50-59)

### 1.4. Data States (App.jsx:28-30)
```javascript
const [categories, setCategories] = useState(() => StorageService.getCategories());
const [news, setNews] = useState(() => StorageService.getNews());
const [users, setUsers] = useState(() => StorageService.getUsers());
```
- **Công dụng:** Quản lý dữ liệu chính của ứng dụng
- **Vị trí:** `src/App.jsx:28-30`
- **Persistence:** Đồng bộ với localStorage qua StorageService
- **Yêu cầu liên quan:** R12 (localStorage persistence)

### 1.5. Toast Feedback State (App.jsx:33)
```javascript
const [toasts, setToasts] = useState([]);
```
- **Công dụng:** Quản lý thông báo feedback cho người dùng
- **Vị trí:** `src/App.jsx:33`
- **Kiểu dữ liệu:** Array of `{ id, message, type }`
- **Tự động dismiss:** Sau 3500ms (App.jsx:38)

---

## 2. Props truyền từ App.jsx xuống các View

### 2.1. AdminLayout Props (App.jsx:252-263)
| Prop | Kiểu | Nguồn | Công dụng |
|------|------|-------|-----------|
| `currentUser` | Object | State | Hiển thị thông tin user đăng nhập |
| `onLogout` | Function | Handler | Xử lý đăng xuất |
| `activeTab` | String | State | Tab hiện tại đang active |
| `setActiveTab` | Function | Setter | Chuyển đổi tab |
| `categories` | Array | State | Dữ liệu categories cho sidebar counter |
| `news` | Array | State | Dữ liệu news cho sidebar counter |
| `users` | Array | State | Dữ liệu users cho sidebar counter |
| `isDarkMode` | Boolean | State | Trạng thái theme |
| `onToggleTheme` | Function | Handler | Toggle dark/light mode |
| `children` | ReactNode | - | Các View components |

**File:** `src/components/layout/AdminLayout.jsx`

### 2.2. DashboardView Props (App.jsx:265-271)
| Prop | Kiểu | Công dụng |
|------|------|-----------|
| `categories` | Array | Hiển thị thống kê và biểu đồ phân bố |
| `news` | Array | Hiển thị danh sách bài viết gần đây |
| `users` | Array | Hiển thị thống kê số lượng user |
| `onNavigateTab` | Function | Điều hướng đến tab khác từ dashboard |

**File:** `src/views/DashboardView.jsx:12-17`

### 2.3. CategoryView Props (App.jsx:274-280)
| Prop | Kiểu | Công dụng |
|------|------|-----------|
| `categories` | Array | Danh sách categories để hiển thị và filter |
| `news` | Array | Đếm số bài viết theo category |
| `onAddCategory` | Function | Handler thêm category mới |
| `onUpdateCategory` | Function | Handler cập nhật category |
| `onDeleteCategory` | Function | Handler xóa category |

**File:** `src/views/CategoryView.jsx:18-24`

### 2.4. NewsView Props (App.jsx:283-291)
| Prop | Kiểu | Công dụng |
|------|------|-----------|
| `news` | Array | Danh sách bài viết để hiển thị |
| `categories` | Array | Dropdown chọn category khi tạo/sửa |
| `currentUser` | Object | Lấy username làm createdBy |
| `onAddNews` | Function | Handler thêm bài viết mới |
| `onUpdateNews` | Function | Handler cập nhật bài viết |
| `onDeleteNews` | Function | Handler xóa bài viết |

**File:** `src/views/NewsView.jsx:20-27`

### 2.5. UserView Props (App.jsx:294-302)
| Prop | Kiểu | Công dụng |
|------|------|-----------|
| `users` | Array | Danh sách user để hiển thị |
| `currentUser` | Object | Ngăn không cho xóa chính mình |
| `onAddUser` | Function | Handler thêm user mới |
| `onUpdateUser` | Function | Handler cập nhật user |
| `onDeleteUser` | Function | Handler xóa user |
| `onShowToast` | Function | Hiển thị toast khi có lỗi (VD: xóa chính mình) |

**File:** `src/views/UserView.jsx:20-27`

### 2.6. SettingsView Props (App.jsx:305-311)
| Prop | Kiểu | Công dụng |
|------|------|-----------|
| `currentUser` | Object | Hiển thị thông tin profile |
| `isDarkMode` | Boolean | Toggle dark mode trong settings |
| `onToggleTheme` | Function | Handler toggle theme |
| `onResetFactoryData` | Function | Handler reset tất cả data về mặc định |

**File:** `src/views/SettingsView.jsx` (không đọc chi tiết)

---

## 3. State trong các View Components

### 3.1. CategoryView Internal State (CategoryView.jsx:25-38)

#### Search & Filter States
```javascript
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState('ALL');
```
- **Công dụng:** Lọc danh sách categories theo từ khóa và trạng thái
- **Vị trí:** `src/views/CategoryView.jsx:25-26`

#### Modal States
```javascript
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMode, setModalMode] = useState('create');
const [selectedCategory, setSelectedCategory] = useState(null);
```
- **Công dụng:** Quản lý modal thêm/sửa category
- **Vị trí:** `src/views/CategoryView.jsx:28-30`

#### Detail Modal State
```javascript
const [detailCategoryId, setDetailCategoryId] = useState(null);
```
- **Công dụng:** Hiển thị chi tiết category khi click icon Eye
- **Vị trí:** `src/views/CategoryView.jsx:31`

#### Delete Confirmation States
```javascript
const [isConfirmOpen, setIsConfirmOpen] = useState(false);
const [categoryToDelete, setCategoryToDelete] = useState(null);
```
- **Công dụng:** Quản lý dialog xác nhận xóa
- **Vị trí:** `src/views/CategoryView.jsx:37-38`

#### Computed State (useMemo)
```javascript
const filteredCategories = useMemo(() => { ... }, [categories, searchTerm, statusFilter]);
```
- **Công dụng:** Tính toán danh sách categories sau khi filter
- **Vị trí:** `src/views/CategoryView.jsx:40-52`

### 3.2. NewsView Internal State (NewsView.jsx:28-45)

#### Search & Filter States
```javascript
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
const [statusFilter, setStatusFilter] = useState('ALL');
```
- **Công dụng:** Lọc bài viết theo title, content, tags, category, status
- **Vị trí:** `src/views/NewsView.jsx:29-31`

#### Modal & Confirmation States
Tương tự CategoryView nhưng cho News entity

#### Computed State
```javascript
const filteredNews = useMemo(() => {
  // Tìm kiếm trong title, content, và tags
  // Lọc theo category và status
}, [news, searchTerm, selectedCategoryFilter, statusFilter]);
```
- **Vị trí:** `src/views/NewsView.jsx:48-67`

### 3.3. UserView Internal State (UserView.jsx:28-39)

#### Search & Filter States
```javascript
const [searchTerm, setSearchTerm] = useState('');
const [roleFilter, setRoleFilter] = useState('ALL');
const [statusFilter, setStatusFilter] = useState('ALL');
```
- **Công dụng:** Lọc user theo username, fullName, email, role, status
- **Vị trí:** `src/views/UserView.jsx:28-30`

#### Modal & Confirmation States
Tương tự CategoryView nhưng cho User entity

#### Computed State
```javascript
const filteredUsers = useMemo(() => { ... }, [users, searchTerm, roleFilter, statusFilter]);
```
- **Vị trí:** `src/views/UserView.jsx:41-60`

### 3.4. DashboardView (No Internal State)
- **Đặc điểm:** Không có internal state, chỉ nhận props và render
- **Vị trí:** `src/views/DashboardView.jsx:12`
- **Lý do:** Pure component, chỉ hiển thị thống kê

---

## 4. Props trong các Form Modal Components

### 4.1. CategoryModal Props (CategoryModal.jsx:6-13)
| Prop | Kiểu | Công dụng |
|------|------|-----------|
| `isOpen` | Boolean | Hiển thị/ẩn modal |
| `mode` | String | `'create'` hoặc `'update'` |
| `category` | Object | Dữ liệu category khi edit (null khi create) |
| `existingCategories` | Array | Validation duplicate name |
| `onSubmit` | Function | Callback khi submit form |
| `onClose` | Function | Callback đóng modal |

**Internal Form State:**
```javascript
const [formData, setFormData] = useState({
  name: '',
  description: '',
  status: 1
});
const [errors, setErrors] = useState({});
```
- **Vị trí:** `src/components/forms/CategoryModal.jsx:14-19`

### 4.2. NewsModal Props (NewsModal.jsx:6-14)
| Prop | Kiểu | Công dụng |
|------|------|-----------|
| `isOpen` | Boolean | Hiển thị/ẩn modal |
| `mode` | String | `'create'` hoặc `'update'` |
| `newsItem` | Object | Dữ liệu news khi edit |
| `categories` | Array | Dropdown chọn category |
| `currentUser` | Object | Lấy username làm createdBy |
| `onSubmit` | Function | Callback khi submit form |
| `onClose` | Function | Callback đóng modal |

**Internal Form State:**
```javascript
const [formData, setFormData] = useState({
  title: '',
  categoryId: '',
  content: '',
  tagsString: '',
  status: 1
});
const [errors, setErrors] = useState({});
```
- **Vị trí:** `src/components/forms/NewsModal.jsx:15-22`

### 4.3. UserModal Props (không đọc chi tiết)
Tương tự CategoryModal nhưng cho User entity

---

## 5. Tổng kết luồng dữ liệu

### 5.1. Kiến trúc State Management

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx (Root)                        │
│  • currentUser (Auth State)                                  │
│  • activeTab (Navigation State)                              │
│  • isDarkMode (Theme State)                                  │
│  • categories, news, users (Data States)                     │
│  • toasts (Feedback State)                                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          CRUD Handlers (Immutable Updates)            │   │
│  │  • handleAddCategory / handleUpdateCategory / ...     │   │
│  │  • handleAddNews / handleUpdateNews / ...             │   │
│  │  • handleAddUser / handleUpdateUser / ...             │   │
│  │  → Update state + Sync with localStorage             │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │ Props down
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                      AdminLayout                             │
│  Props: currentUser, activeTab, categories, news, users...   │
│  Render: Header + Sidebar + {children}                       │
└───────────────────────┬─────────────────────────────────────┘
                        │ Props down + Callbacks up
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         Views (CategoryView, NewsView, UserView...)          │
│  Props: data arrays + CRUD callbacks                         │
│  Internal State: search, filter, modal, confirmation         │
│  Computed: useMemo(filteredData)                             │
└───────────────────────┬─────────────────────────────────────┘
                        │ Props down + Callbacks up
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         Modal Forms (CategoryModal, NewsModal...)            │
│  Props: isOpen, mode, data, onSubmit, onClose               │
│  Internal State: formData, errors                            │
│  Validation: Client-side validation before submit            │
└─────────────────────────────────────────────────────────────┘
```

### 5.2. Unidirectional Data Flow

#### Luồng xuống (Props Down):
1. **App.jsx** → State toàn cục (`categories`, `news`, `users`, `currentUser`)
2. **App.jsx** → **AdminLayout** → Props cho Header, Sidebar
3. **App.jsx** → **Views** → Props data + callbacks
4. **Views** → **Modals** → Props form data + callbacks

#### Luồng lên (Callbacks Up):
1. **Modal** submit form → `onSubmit(formData)`
2. **View** nhận formData → gọi callback từ App (VD: `onAddCategory`)
3. **App** xử lý → cập nhật state + sync localStorage → re-render
4. **View** nhận props mới → re-render với dữ liệu mới

### 5.3. Nguyên tắc Immutable State Updates

Tất cả CRUD handlers trong App.jsx đều tuân theo nguyên tắc immutable:

```javascript
// CREATE: Thêm item mới vào đầu mảng
const updatedList = [createdItem, ...categories];

// UPDATE: Map và thay thế item cũ bằng spread operator
const updatedList = categories.map(cat =>
  cat.id === id ? { ...cat, ...updatedFields } : cat
);

// DELETE: Filter để loại bỏ item
const updatedList = categories.filter(cat => cat.id !== id);
```

### 5.4. Persistence với localStorage

**StorageService** (`src/services/storageService.js`) đảm nhiệm:
- Load initial data từ localStorage khi app khởi động
- Save data sau mỗi CRUD operation
- Sync `currentUser` session
- Sync `isDarkMode` preference

**Keys sử dụng:**
```javascript
const STORAGE_KEYS = {
  CATEGORIES: 'funews_categories',
  NEWS: 'funews_news',
  USERS: 'funews_users',
  AUTH: 'funews_current_user',
  THEME: 'funews_theme_dark'
};
```

---

## 📌 Key Takeaways

1. **Centralized State:** Tất cả data chính được quản lý tập trung tại `App.jsx`
2. **Prop Drilling:** Props được truyền qua 2-3 levels (App → Layout → View → Modal)
3. **Local State trong Views:** Search, filter, modal states được quản lý local
4. **useMemo Optimization:** Tính toán filtered data được cache với `useMemo`
5. **Immutable Updates:** Tuân thủ React best practices cho state updates
6. **Persistent Storage:** Đồng bộ với localStorage qua `StorageService`
7. **Callback Pattern:** Views không trực tiếp update global state, mà gọi callbacks từ App

---

**Người thực hiện:** Đào Lê Hoàng Duy - CE200667
**Ngày tạo:** 2026-11-03
