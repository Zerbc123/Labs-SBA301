<!-- DuyDLH-CE200667 -->
# Workflow & Function Mapping - FUNews Management System

**Sinh viên:** Đào Lê Hoàng Duy - CE200667

---

## 📋 Mục Lục
- [1. Luồng khởi động ứng dụng](#1-luồng-khởi-động-ứng-dụng)
- [2. Luồng Authentication](#2-luồng-authentication)
- [3. Luồng Navigation (Single Page)](#3-luồng-navigation-single-page)
- [4. Luồng CRUD - Category Management](#4-luồng-crud---category-management)
- [5. Luồng CRUD - News Management](#5-luồng-crud---news-management)
- [6. Luồng CRUD - User Management](#6-luồng-crud---user-management)
- [7. Luồng Theme Toggle](#7-luồng-theme-toggle)
- [8. Luồng Toast Notification](#8-luồng-toast-notification)
- [9. Mapping các hàm chính trong dự án](#9-mapping-các-hàm-chính-trong-dự-án)

---

## 1. Luồng khởi động ứng dụng

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Application Bootstrap                               │
│  File: src/main.jsx                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: App Component Mount                                 │
│  File: src/App.jsx                                           │
│                                                              │
│  Initialize States (với lazy initialization):                │
│  • currentUser ← StorageService.getCurrentUser()  [Line 19] │
│  • activeTab = 'dashboard'                        [Line 22] │
│  • isDarkMode ← StorageService.getDarkMode()      [Line 25] │
│  • categories ← StorageService.getCategories()    [Line 28] │
│  • news ← StorageService.getNews()                [Line 29] │
│  • users ← StorageService.getUsers()              [Line 30] │
│  • toasts = []                                    [Line 33] │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Check localStorage                                  │
│  File: src/services/storageService.js                        │
│                                                              │
│  StorageService.getCategories() → [Line 54]                  │
│    ↓                                                         │
│  loadFromStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES)│
│    ↓                                                         │
│  Nếu không có data → set INITIAL_CATEGORIES vào localStorage│
│  Nếu có data → parse JSON và return                          │
│                                                              │
│  Tương tự cho news, users, auth, theme                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: useEffect - Sync Theme with DOM                     │
│  File: src/App.jsx:50-59                                     │
│                                                              │
│  useEffect(() => {                                           │
│    if (isDarkMode) {                                         │
│      document.documentElement.setAttribute('data-bs-theme', 'dark')│
│      document.documentElement.setAttribute('data-theme', 'dark')│
│    } else {                                                  │
│      document.documentElement.setAttribute('data-bs-theme', 'light')│
│      document.documentElement.removeAttribute('data-theme')  │
│    }                                                         │
│    StorageService.setDarkMode(isDarkMode)                    │
│  }, [isDarkMode])                                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: Conditional Rendering                               │
│  File: src/App.jsx:241-249 / 252-316                         │
│                                                              │
│  if (!currentUser) {                                         │
│    return <LoginView /> + <Toast />                          │
│  } else {                                                    │
│    return <AdminLayout>{active view}</AdminLayout> + <Toast />│
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
```

**Các file liên quan:**
- `src/main.jsx` - Entry point
- `src/App.jsx` - Root component
- `src/services/storageService.js` - Data persistence
- `src/services/initialData.js` - Default data

---

## 2. Luồng Authentication

### 2.1. Login Flow

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION: Nhập username & password → Click "Đăng nhập"  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: LoginView Component                                 │
│  File: src/views/LoginView.jsx                               │
│                                                              │
│  handleSubmit(e) → validate form → gọi StorageService       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Authentication Service                              │
│  File: src/services/storageService.js:66-91                  │
│                                                              │
│  StorageService.authenticate(username, password)             │
│    ↓                                                         │
│  1. Load users từ localStorage                               │
│  2. Tìm user với username & password khớp (case-insensitive)│
│  3. Kiểm tra status !== 1 → error "Tài khoản bị khóa"       │
│  4. Kiểm tra role (1=Admin, 2=Staff) → error nếu invalid    │
│  5. Return { user, error }                                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Handle Login Success                                │
│  File: src/views/LoginView.jsx → callback                    │
│                                                              │
│  if (user) {                                                 │
│    onLoginSuccess(user) → gọi callback từ App.jsx           │
│  } else {                                                    │
│    setError(error) → hiển thị lỗi                           │
│  }                                                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Update App State                                    │
│  File: src/App.jsx:67-72 (handleLoginSuccess)                │
│                                                              │
│  setCurrentUser(user)                                        │
│  StorageService.saveCurrentUser(user)                        │
│  setActiveTab('dashboard')                                   │
│  showToast("Chào mừng ${user.username}...", 'success')      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: Re-render → Hiển thị AdminLayout                   │
│  File: src/App.jsx:252 (điều kiện if thay đổi)              │
│                                                              │
│  currentUser !== null → render AdminLayout thay vì LoginView│
└─────────────────────────────────────────────────────────────┘
```

### 2.2. Logout Flow

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION: Click nút "Đăng xuất" ở Header                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Header Component                                    │
│  File: src/components/layout/Header.jsx                      │
│                                                              │
│  onClick={() => onLogout()} → gọi callback từ AdminLayout   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Handle Logout                                       │
│  File: src/App.jsx:74-79 (handleLogout)                      │
│                                                              │
│  setCurrentUser(null)                                        │
│  StorageService.saveCurrentUser(null)                        │
│  setActiveTab('dashboard')                                   │
│  showToast('Đã đăng xuất...', 'info')                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Re-render → Quay về LoginView                      │
│  File: src/App.jsx:241                                       │
└─────────────────────────────────────────────────────────────┘
```

**Các hàm liên quan:**
- `src/App.jsx:67` - `handleLoginSuccess(user)`
- `src/App.jsx:74` - `handleLogout()`
- `src/services/storageService.js:66` - `authenticate(username, password)`
- `src/services/storageService.js:94` - `getCurrentUser()`
- `src/services/storageService.js:105` - `saveCurrentUser(user)`

---

## 3. Luồng Navigation (Single Page)

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION: Click menu item ở Sidebar                     │
│  VD: Click "Danh mục tin" (Categories)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Sidebar Component                                   │
│  File: src/components/layout/Sidebar.jsx                     │
│                                                              │
│  onClick={() => setActiveTab('category')}                    │
│  → gọi callback từ AdminLayout                               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Update activeTab State                              │
│  File: src/App.jsx:22 (state) + AdminLayout props           │
│                                                              │
│  setActiveTab('category') → App state thay đổi              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Conditional Rendering View                          │
│  File: src/App.jsx:265-312                                   │
│                                                              │
│  {activeTab === 'dashboard' && <DashboardView />}            │
│  {activeTab === 'category' && <CategoryView />}   ← ACTIVE   │
│  {activeTab === 'news' && <NewsView />}                      │
│  {activeTab === 'users' && <UserView />}                     │
│  {activeTab === 'settings' && <SettingsView />}              │
└─────────────────────────────────────────────────────────────┘
```

**Luồng navigate từ Dashboard:**

```
DashboardView → Click "Xem tất cả" bài viết
  ↓
onNavigateTab('news') [src/views/DashboardView.jsx:151]
  ↓
setActiveTab('news') [App.jsx prop]
  ↓
Re-render → Hiển thị NewsView
```

**Các hàm liên quan:**
- `src/App.jsx:22` - `activeTab` state
- `src/App.jsx:10` - `setActiveTab` prop xuống AdminLayout
- `src/components/layout/Sidebar.jsx` - Render menu items với active state
- `src/views/DashboardView.jsx:151` - `onNavigateTab('news')`

---

## 4. Luồng CRUD - Category Management

### 4.1. CREATE Category

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION: Click "Thêm danh mục" ở CategoryView          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Open Modal                                          │
│  File: src/views/CategoryView.jsx:54-58 (handleOpenCreate)  │
│                                                              │
│  setModalMode('create')                                      │
│  setSelectedCategory(null)                                   │
│  setIsModalOpen(true)                                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: CategoryModal Component Render                      │
│  File: src/components/forms/CategoryModal.jsx                │
│                                                              │
│  useEffect → reset formData về default khi isOpen=true      │
│  formData = { name: '', description: '', status: 1 }        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION: Điền form → Click "Tạo danh mục"              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Form Validation                                     │
│  File: src/components/forms/CategoryModal.jsx:68-86          │
│                                                              │
│  validate() {                                                │
│    1. Check name không để trống                              │
│    2. Check duplicate name trong existingCategories          │
│    → setErrors(errs)                                         │
│  }                                                           │
│  → Nếu có lỗi, không submit                                 │
└──────────────────────────┬──────────────────────────────────┘
                           │ validation OK
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Submit Form Data                                    │
│  File: src/components/forms/CategoryModal.jsx:88-97          │
│                                                              │
│  handleSubmit(e) {                                           │
│    e.preventDefault()                                        │
│    onSubmit({                                                │
│      name: formData.name.trim(),                             │
│      description: formData.description.trim(),               │
│      status: Number(formData.status)                         │
│    })                                                        │
│  }                                                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: CategoryView handleModalSubmit                      │
│  File: src/views/CategoryView.jsx:66-73                      │
│                                                              │
│  if (modalMode === 'create') {                               │
│    onAddCategory(formData) → callback từ App.jsx            │
│  }                                                           │
│  setIsModalOpen(false)                                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: App.jsx handleAddCategory                           │
│  File: src/App.jsx:87-96                                     │
│                                                              │
│  const nextId = Math.max(...categories.map(c => c.id)) + 1  │
│  const createdItem = { ...newCat, id: nextId }               │
│  const updatedList = [createdItem, ...categories]            │
│  setCategories(updatedList) ← Update React state             │
│  StorageService.saveCategories(updatedList) ← Persist        │
│  showToast("Đã thêm danh mục...", 'success')                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 7: Re-render CategoryView với categories mới          │
│  → Hiển thị item vừa thêm ở đầu bảng                        │
│  → Hiển thị Toast notification                               │
└─────────────────────────────────────────────────────────────┘
```

### 4.2. UPDATE Category

```
Click icon Edit → handleOpenEdit(category) [CategoryView.jsx:60-64]
  ↓
setModalMode('update')
setSelectedCategory(category)
setIsModalOpen(true)
  ↓
CategoryModal useEffect → populate formData với category data [CategoryModal.jsx:23-28]
  ↓
User chỉnh sửa → Submit form
  ↓
onSubmit(formData) → handleModalSubmit [CategoryView.jsx:66-73]
  ↓
onUpdateCategory(selectedCategory.id, formData) → App.jsx callback
  ↓
handleUpdateCategory(id, updatedFields) [App.jsx:98-104]
  ↓
const updatedList = categories.map(cat =>
  cat.id === id ? { ...cat, ...updatedFields } : cat
)
setCategories(updatedList)
StorageService.saveCategories(updatedList)
showToast("Đã cập nhật...")
  ↓
Re-render → Hiển thị data mới
```

**Hàm liên quan:**
- `src/App.jsx:98` - `handleUpdateCategory(id, updatedFields)`
- `src/views/CategoryView.jsx:60` - `handleOpenEdit(category)`
- `src/views/CategoryView.jsx:66` - `handleModalSubmit(formData)`

### 4.3. DELETE Category

```
Click icon Delete → handleOpenDelete(category) [CategoryView.jsx:75-78]
  ↓
setCategoryToDelete(category)
setIsConfirmOpen(true)
  ↓
ConfirmDialog hiển thị → Click "Xác nhận"
  ↓
handleConfirmDelete() [CategoryView.jsx:80-86]
  ↓
onDeleteCategory(categoryToDelete.id) → App.jsx callback
  ↓
handleDeleteCategory(id) [App.jsx:106-112]
  ↓
const updatedList = categories.filter(cat => cat.id !== id)
setCategories(updatedList)
StorageService.saveCategories(updatedList)
showToast("Đã xóa...")
  ↓
Re-render → Item biến mất khỏi bảng
```

**Hàm liên quan:**
- `src/App.jsx:106` - `handleDeleteCategory(id)`
- `src/views/CategoryView.jsx:75` - `handleOpenDelete(category)`
- `src/views/CategoryView.jsx:80` - `handleConfirmDelete()`

### 4.4. VIEW Detail Category

```
Click icon Eye → setDetailCategoryId(cat.id) [CategoryView.jsx:225]
  ↓
detailCategory = categories.find(cat => cat.id === detailCategoryId) [CategoryView.jsx:32]
detailNews = news.filter(item => item.categoryId === detailCategory.id) [CategoryView.jsx:33-35]
  ↓
DetailModal component render với detailCategory props [CategoryView.jsx:258-287]
  ↓
Hiển thị modal với thông tin chi tiết + danh sách bài viết thuộc category
  ↓
Click "Đóng" → setDetailCategoryId(null)
```

**Component liên quan:**
- `src/components/common/DetailModal.jsx` - Generic detail modal
- `src/views/CategoryView.jsx:258` - Render DetailModal

---

## 5. Luồng CRUD - News Management

### 5.1. CREATE News (Tương tự Category)

```
handleOpenCreate() [NewsView.jsx:70-74]
  ↓
NewsModal render với mode='create' [NewsModal.jsx:35-42]
  → defaultCatId = categories[0].id (chọn category đầu tiên làm default)
  ↓
User điền form: title, categoryId, content, tags, status
  ↓
validate() [NewsModal.jsx:81-94]
  → Check title, categoryId, content không rỗng
  ↓
handleSubmit() [NewsModal.jsx:96-112]
  → Parse tagsString thành array: "AI, Hackathon" → ['AI', 'Hackathon']
  → onSubmit({ ...formData, createdBy: currentUser.username })
  ↓
handleModalSubmit() [NewsView.jsx:82-89]
  → onAddNews(formData) → App.jsx callback
  ↓
handleAddNews(newArticle) [App.jsx:121-131]
  → nextId = Math.max(...news.map(n => n.id)) + 1
  → createdItem = { ...newArticle, id: nextId, createdAt: today }
  → updatedList = [createdItem, ...news]
  → setNews(updatedList)
  → StorageService.saveNews(updatedList)
  → showToast("Đã xuất bản...")
  ↓
Re-render NewsView với news mới
```

**Đặc điểm khác biệt với Category:**
- Có thêm field `tags` (array) và `createdBy`
- Có field `createdAt` tự động thêm khi tạo
- Validate phức tạp hơn (title, categoryId, content đều required)

**Hàm liên quan:**
- `src/App.jsx:121` - `handleAddNews(newArticle)`
- `src/views/NewsView.jsx:70` - `handleOpenCreate()`
- `src/components/forms/NewsModal.jsx:96` - `handleSubmit()`

### 5.2. UPDATE / DELETE / VIEW News

Tương tự Category, các hàm tương ứng:

| Action | View Handler | App Handler | File Location |
|--------|-------------|-------------|---------------|
| UPDATE | `handleOpenEdit` [NewsView.jsx:76] | `handleUpdateNews` [App.jsx:133] | - |
| DELETE | `handleOpenDelete` [NewsView.jsx:91] | `handleDeleteNews` [App.jsx:140] | - |
| VIEW | `setDetailNewsId` [NewsView.jsx:282] | - | DetailModal render [NewsView.jsx:316] |

---

## 6. Luồng CRUD - User Management

### 6.1. CREATE User

```
handleOpenCreate() [UserView.jsx:62-66]
  ↓
UserModal render với mode='create'
  ↓
User điền form: username, password, fullName, email, role, status
  ↓
validate()
  → Check username, password required
  → Check duplicate username trong existingUsers
  ↓
handleSubmit()
  → onSubmit(formData)
  ↓
handleModalSubmit() [UserView.jsx:74-81]
  → onAddUser(formData)
  ↓
handleAddUser(newUser) [App.jsx:149-159]
  → nextId = Math.max(...users.map(u => u.id)) + 1
  → createdItem = { ...newUser, id: nextId, createdAt: today }
  → updatedList = [...users, createdItem]
  → setUsers(updatedList)
  → StorageService.saveUsers(updatedList)
  → showToast("Đã tạo tài khoản...")
  ↓
Re-render UserView
```

### 6.2. UPDATE User (Đặc biệt: Sync với currentUser)

```
handleOpenEdit(item) [UserView.jsx:68-72]
  ↓
UserModal render với mode='update' và user data
  ↓
User chỉnh sửa → Submit
  ↓
handleUpdateUser(id, updatedFields) [App.jsx:161-174]
  → updatedList = users.map(user =>
      user.id === id ? { ...user, ...updatedFields } : user
    )
  → setUsers(updatedList)
  → StorageService.saveUsers(updatedList)
  ↓
  → ĐẶC BIỆT: Nếu đang update chính user đăng nhập:
    if (currentUser && currentUser.id === id) {
      setCurrentUser({ ...currentUser, ...updatedFields })
      StorageService.saveCurrentUser(updatedCurrent)
    }
  ↓
  → showToast("Đã cập nhật...")
  ↓
Re-render → Thông tin user ở Header cũng được cập nhật nếu là currentUser
```

**Đặc biệt quan trọng:** Update user phải sync với `currentUser` session!

### 6.3. DELETE User (Đặc biệt: Không cho xóa chính mình)

```
handleOpenDelete(item) [UserView.jsx:83-92]
  ↓
  if (currentUser && item.id === currentUser.id) {
    onShowToast("Không thể xóa tài khoản đang đăng nhập!", "error")
    return  ← STOP, không mở confirm dialog
  }
  ↓
setUserToDelete(item)
setIsConfirmOpen(true)
  ↓
ConfirmDialog → Click "Xác nhận"
  ↓
handleConfirmDelete() [UserView.jsx:94-100]
  → onDeleteUser(userToDelete.id)
  ↓
handleDeleteUser(id) [App.jsx:176-182]
  → updatedList = users.filter(user => user.id !== id)
  → setUsers(updatedList)
  → StorageService.saveUsers(updatedList)
  → showToast("Đã xóa...")
  ↓
Re-render
```

**UI Protection:** Button Delete bị disabled nếu là currentUser [UserView.jsx:295]

**Hàm liên quan:**
- `src/App.jsx:149` - `handleAddUser(newUser)`
- `src/App.jsx:161` - `handleUpdateUser(id, updatedFields)` ← Sync session
- `src/App.jsx:176` - `handleDeleteUser(id)`
- `src/views/UserView.jsx:83` - `handleOpenDelete(item)` ← Prevent self-delete

---

## 7. Luồng Theme Toggle

```
┌─────────────────────────────────────────────────────────────┐
│  USER ACTION: Click icon Sun/Moon ở Header                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Header Component                                    │
│  File: src/components/layout/Header.jsx                      │
│                                                              │
│  onClick={() => onToggleTheme()}                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: App.jsx handleToggleTheme                           │
│  File: src/App.jsx:61-63                                     │
│                                                              │
│  setIsDarkMode(prev => !prev)                                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: useEffect triggered                                 │
│  File: src/App.jsx:50-59                                     │
│                                                              │
│  useEffect(() => {                                           │
│    if (isDarkMode) {                                         │
│      document.documentElement.setAttribute('data-bs-theme', 'dark')│
│      document.documentElement.setAttribute('data-theme', 'dark')│
│    } else {                                                  │
│      document.documentElement.setAttribute('data-bs-theme', 'light')│
│      document.documentElement.removeAttribute('data-theme')  │
│    }                                                         │
│    StorageService.setDarkMode(isDarkMode)  ← Persist         │
│  }, [isDarkMode])                                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: CSS Variables Apply                                 │
│                                                              │
│  Bootstrap 5 dark mode: data-bs-theme="dark"                 │
│  Custom CSS: [data-theme="dark"] { ... }                     │
│  → Toàn bộ giao diện đổi màu theo theme                     │
└─────────────────────────────────────────────────────────────┘
```

**Persistence:** Theme được lưu vào localStorage key `funews_theme_dark`

**Các file liên quan:**
- `src/App.jsx:25` - `isDarkMode` state
- `src/App.jsx:50` - useEffect sync theme với DOM
- `src/App.jsx:61` - `handleToggleTheme()`
- `src/services/storageService.js:114` - `getDarkMode()`
- `src/services/storageService.js:121` - `setDarkMode(isDark)`

---

## 8. Luồng Toast Notification

### 8.1. Trigger Toast từ CRUD Operations

```
Mọi CRUD operation trong App.jsx đều gọi:
  showToast(message, type)  [App.jsx:35-42]
    ↓
  const id = Date.now() + Math.random()  ← Generate unique ID
  setToasts(prev => [...prev, { id, message, type }])
    ↓
  setTimeout(() => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, 3500)  ← Auto dismiss sau 3.5 giây
```

### 8.2. Toast Component Render

```
Toast Component [src/components/common/Toast.jsx:5-48]
  ↓
Render tất cả toasts trong array
  → Position: bottom-right corner (fixed)
  → zIndex: 1100 (trên tất cả elements)
  ↓
Mỗi toast có:
  → Icon: CheckCircle2 (success), AlertCircle (error), Info (info)
  → bgClass: text-bg-success, text-bg-danger, text-bg-dark
  → Close button: onClick={() => onDismiss(toast.id)}
```

### 8.3. Manual Dismiss

```
User click nút X → onDismiss(toast.id)
  ↓
dismissToast(id) [App.jsx:44-46]
  ↓
setToasts(prev => prev.filter(t => t.id !== id))
  ↓
Toast biến mất khỏi UI
```

**Các type toast:**
- `'success'` - Màu xanh lá, icon CheckCircle2
- `'error'` - Màu đỏ, icon AlertCircle
- `'info'` - Màu xám đen, icon Info

**Các file liên quan:**
- `src/App.jsx:33` - `toasts` state
- `src/App.jsx:35` - `showToast(message, type)`
- `src/App.jsx:44` - `dismissToast(id)`
- `src/components/common/Toast.jsx` - Toast component

---

## 9. Mapping các hàm chính trong dự án

### 9.1. App.jsx - Root Component Functions

| Hàm | Dòng | Công dụng | Gọi bởi |
|-----|------|-----------|---------|
| `showToast(message, type)` | 35 | Hiển thị thông báo feedback | Tất cả CRUD handlers |
| `dismissToast(id)` | 44 | Đóng toast thủ công | Toast component |
| `handleToggleTheme()` | 61 | Toggle dark/light mode | Header, SettingsView |
| `handleLoginSuccess(user)` | 67 | Xử lý login thành công | LoginView |
| `handleLogout()` | 74 | Xử lý đăng xuất | Header |
| **CATEGORY CRUD** | | | |
| `handleAddCategory(newCat)` | 87 | Thêm category mới | CategoryView |
| `handleUpdateCategory(id, fields)` | 98 | Cập nhật category | CategoryView |
| `handleDeleteCategory(id)` | 106 | Xóa category | CategoryView |
| **NEWS CRUD** | | | |
| `handleAddNews(newArticle)` | 121 | Thêm bài viết mới | NewsView |
| `handleUpdateNews(id, fields)` | 133 | Cập nhật bài viết | NewsView |
| `handleDeleteNews(id)` | 140 | Xóa bài viết | NewsView |
| **USER CRUD** | | | |
| `handleAddUser(newUser)` | 149 | Thêm user mới | UserView |
| `handleUpdateUser(id, fields)` | 161 | Cập nhật user + sync session | UserView |
| `handleDeleteUser(id)` | 176 | Xóa user | UserView |
| **SETTINGS** | | | |
| `handleResetFactoryData()` | 189 | Reset tất cả data về mặc định | SettingsView |

### 9.2. CategoryView.jsx - Category Management Functions

| Hàm | Dòng | Công dụng | Gọi lên App.jsx |
|-----|------|-----------|-----------------|
| `filteredCategories` (useMemo) | 40 | Lọc categories theo search & status | - |
| `handleOpenCreate()` | 54 | Mở modal tạo mới | - |
| `handleOpenEdit(category)` | 60 | Mở modal chỉnh sửa | - |
| `handleModalSubmit(formData)` | 66 | Xử lý submit từ modal | `onAddCategory` / `onUpdateCategory` |
| `handleOpenDelete(category)` | 75 | Mở dialog xác nhận xóa | - |
| `handleConfirmDelete()` | 80 | Xác nhận xóa | `onDeleteCategory` |
| `handleCancelDelete()` | 88 | Hủy xóa | - |

**Computed values:**
- `linkedNewsCount` [Line 93] - Đếm số bài viết thuộc category (warning khi xóa)
- `detailCategory` [Line 32] - Category đang xem chi tiết
- `detailNews` [Line 33] - Danh sách bài viết thuộc category

### 9.3. NewsView.jsx - News Management Functions

| Hàm | Dòng | Công dụng | Gọi lên App.jsx |
|-----|------|-----------|-----------------|
| `filteredNews` (useMemo) | 48 | Lọc news theo search, category, status | - |
| `handleOpenCreate()` | 70 | Mở modal tạo bài viết | - |
| `handleOpenEdit(item)` | 76 | Mở modal sửa bài viết | - |
| `handleModalSubmit(formData)` | 82 | Xử lý submit từ modal | `onAddNews` / `onUpdateNews` |
| `handleOpenDelete(item)` | 91 | Mở dialog xác nhận xóa | - |
| `handleConfirmDelete()` | 96 | Xác nhận xóa | `onDeleteNews` |
| `handleCancelDelete()` | 104 | Hủy xóa | - |

**Search logic đặc biệt:** Tìm kiếm trong `title`, `content`, và `tags` array [Line 52-55]

### 9.4. UserView.jsx - User Management Functions

| Hàm | Dòng | Công dụng | Gọi lên App.jsx | Đặc biệt |
|-----|------|-----------|-----------------|----------|
| `filteredUsers` (useMemo) | 41 | Lọc users theo search, role, status | - | - |
| `handleOpenCreate()` | 62 | Mở modal tạo user | - | - |
| `handleOpenEdit(item)` | 68 | Mở modal sửa user | - | - |
| `handleModalSubmit(formData)` | 74 | Xử lý submit từ modal | `onAddUser` / `onUpdateUser` | - |
| `handleOpenDelete(item)` | 83 | Mở dialog xóa (có kiểm tra) | - | ⚠️ Ngăn xóa currentUser [Line 84-89] |
| `handleConfirmDelete()` | 94 | Xác nhận xóa | `onDeleteUser` | - |
| `handleCancelDelete()` | 102 | Hủy xóa | - | - |

**Protection logic:**
```javascript
// Line 84-89: Không cho xóa chính mình
if (currentUser && item.id === currentUser.id) {
  onShowToast("Không thể xóa tài khoản đang đăng nhập!", "error");
  return;
}
```

### 9.5. DashboardView.jsx - Statistics Display Functions

**Không có handlers, chỉ có computed values:**

| Computed Value | Dòng | Công dụng |
|----------------|------|-----------|
| `totalNews` | 18 | Tổng số bài viết |
| `activeNews` | 19 | Số bài viết đang công khai (status=1) |
| `totalCategories` | 20 | Tổng số danh mục |
| `activeCategories` | 21 | Số danh mục đang hoạt động |
| `totalUsers` | 22 | Tổng số user |
| `adminCount` | 23 | Số user có role=1 (Admin) |
| `activeRatio` | 25 | Tỷ lệ % bài viết công khai |
| `recentNews` | 26 | 5 bài viết gần nhất |
| `categoryNewsCount` | 28 | Số bài viết theo từng category (cho chart) |

**Navigation:** `onNavigateTab('news')` [Line 151] - Chuyển đến NewsView

### 9.6. CategoryModal.jsx - Form Component Functions

| Hàm | Dòng | Công dụng |
|-----|------|-----------|
| `useEffect` | 21 | Populate formData khi modal mở |
| `handleChange(e)` | 40 | Xử lý thay đổi input + clear error |
| `handleReset()` | 51 | Reset form về giá trị ban đầu |
| `validate()` | 68 | Validate form (required, duplicate) |
| `handleSubmit(e)` | 88 | Submit form data lên View |

**Form State:**
```javascript
formData = {
  name: string,
  description: string,
  status: number (0 or 1)
}
errors = {
  name?: string  // Error message
}
```

### 9.7. NewsModal.jsx - Form Component Functions

| Hàm | Dòng | Công dụng | Đặc biệt |
|-----|------|-----------|----------|
| `useEffect` | 24 | Populate formData + default categoryId | [Line 35] |
| `handleChange(e)` | 48 | Xử lý input change | - |
| `handleReset()` | 59 | Reset form | - |
| `validate()` | 81 | Validate title, categoryId, content | - |
| `handleSubmit(e)` | 96 | Submit + parse tags array | ⚠️ Parse `tagsString` → array [Line 100-102] |

**Tags parsing logic:**
```javascript
// Line 100-102
const tagsArray = formData.tagsString
  ? formData.tagsString.split(',').map(t => t.trim()).filter(Boolean)
  : [];
```

**Form State:**
```javascript
formData = {
  title: string,
  categoryId: string,  // Note: là string để dùng với <select>
  content: string,
  tagsString: string,  // "AI, Hackathon, FPT"
  status: number
}
```

### 9.8. StorageService Functions

| Hàm | Dòng | Công dụng |
|-----|------|-----------|
| **Generic** | | |
| `loadFromStorage(key, fallback)` | 30 | Load từ localStorage với fallback |
| `saveToStorage(key, data)` | 44 | Save vào localStorage |
| **Categories** | | |
| `getCategories()` | 54 | Load categories |
| `saveCategories(categories)` | 55 | Save categories |
| **News** | | |
| `getNews()` | 58 | Load news |
| `saveNews(news)` | 59 | Save news |
| **Users** | | |
| `loadUsers()` | 20 | Load users + normalize student name |
| `getUsers()` | 62 | Wrapper cho loadUsers |
| `saveUsers(users)` | 63 | Save users |
| **Authentication** | | |
| `authenticate(username, password)` | 66 | Login validation logic |
| `getCurrentUser()` | 94 | Load current session |
| `saveCurrentUser(user)` | 105 | Save/clear session |
| **Theme** | | |
| `getDarkMode()` | 114 | Load theme preference |
| `setDarkMode(isDark)` | 121 | Save theme preference |
| **Factory Reset** | | |
| `resetAll()` | 126 | Reset tất cả data về INITIAL_DATA |

**Authentication logic (Line 66-91):**
1. Tìm user với username & password khớp (case-insensitive username)
2. Kiểm tra `status !== 1` → error "Tài khoản bị khóa"
3. Kiểm tra `role` (1=Admin, 2=Staff) → error nếu invalid
4. Return `{ user, error }`

---

## 📌 Key Takeaways - Workflow

### 1. Single Page Application (SPA)
- Không có routing library (React Router)
- Navigation qua `activeTab` state trong App.jsx
- Conditional rendering các View components

### 2. Unidirectional Data Flow
```
User Action → Event Handler (View)
  ↓
Callback to Parent (App.jsx)
  ↓
Update State (immutable)
  ↓
Sync with localStorage
  ↓
Re-render with new props
```

### 3. Immutable State Updates
- Luôn dùng spread operator: `[...array]`, `{ ...object }`
- `.map()` cho UPDATE, `.filter()` cho DELETE
- Không mutate state trực tiếp

### 4. Separation of Concerns
- **App.jsx:** Global state + CRUD logic
- **Views:** UI rendering + local state (search, filter, modal)
- **Modals:** Form state + validation
- **StorageService:** Data persistence

### 5. Các Pattern quan trọng

#### Modal Pattern:
```
isModalOpen (boolean)
modalMode ('create' | 'update')
selectedItem (data | null)
→ Mở/đóng modal
→ Populate form data
→ Submit callback lên View → App
```

#### Confirmation Pattern:
```
isConfirmOpen (boolean)
itemToDelete (data | null)
→ Mở dialog xác nhận
→ Click "Xác nhận" → gọi DELETE handler
→ Click "Hủy" → đóng dialog
```

#### Toast Pattern:
```
toasts = [{ id, message, type }]
showToast(msg, type) → add to array + auto dismiss
dismissToast(id) → remove from array
```

---

**Người thực hiện:** Đào Lê Hoàng Duy - CE200667
**Ngày tạo:** 2026-11-03
