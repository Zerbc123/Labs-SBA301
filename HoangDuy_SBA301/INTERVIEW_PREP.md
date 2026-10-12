# Cẩm Nang Ôn Luyện Phỏng Vấn & Vấn Đáp Mã Nguồn (Interview Preparation)

> **Môn học:** SBA301 – Assignment 01: Working with ReactJS Application  
> **Dành cho sinh viên:** Hoàng Duy  
> **Mục tiêu:** Đạt điểm tuyệt đối trong các phần:
> - **Code Explanation (1.0 điểm)**
> - **Solution Design & Reasoning (1.5 điểm)**
> - **Modification / Transfer Task (1.0 điểm)**

---

## 1. Khung Trả Lời Chuẩn 5 Tầng (5-Layer Explanation Framework)

Khi giảng viên chỉ vào bất kỳ file hoặc hàm nào trong dự án, hãy trả lời tuần tự theo 5 tầng sau:

```
[1. Purpose]   -> File / hàm này giải quyết trách nhiệm gì trong kiến trúc?
[2. Input]     -> Dữ liệu đầu vào gồm những props, state, dữ liệu nào?
[3. Trigger]   -> Sự kiện nào kích hoạt (onClick, onSubmit, useEffect, onChange)?
[4. Transform] -> Dữ liệu được tính toán, kiểm tra (validate) hoặc biến đổi ra sao?
[5. Output]    -> State nào được cập nhật và giao diện React render lại như thế nào?
```

### Ví dụ áp dụng thực tế:
* **Hỏi:** *"Em hãy giải thích hàm thêm mới thể loại `handleFormSubmit` trong file `CategoryPage.jsx`?"*
* **Trả lời theo 5 tầng:**
  1. **Purpose:** Xử lý thêm mới hoặc cập nhật thông tin một Thể loại tin tức.
  2. **Input:** Nhận dữ liệu từ form state `formData` (tên, mô tả, trạng thái).
  3. **Trigger:** Kích hoạt khi người dùng bấm nút submit trên form dialog.
  4. **Transform:** Chặn reload trang bằng `e.preventDefault()`, validate tên không rỗng; sau đó gọi `categoryService.create(formData)`. Trong service, kiểm tra tên trùng lặp và tạo ID duy nhất.
  5. **Output:** Đóng modal bằng `setIsModalOpen(false)`, hiển thị Toast thông báo thành công và gọi `loadCategories()` để cập nhật state `categories`, kích hoạt React re-render bảng với bản ghi mới ở dòng đầu tiên.

---

## 2. Checklist "Mở File và Chỉ Code" Trong Vòng ≤ 30 Giây

| Yêu cầu của Giảng viên | File cần mở ngay lập tức | Dòng code / Đoạn code cần chỉ |
| :--- | :--- | :--- |
| **1. Chỉ điều kiện đăng nhập Admin/Admin** | `src/services/authService.js` | Hàm `login()`, đoạn `u.username.toLowerCase() === trimmedUser.toLowerCase() && u.password === trimmedPass` |
| **2. Nơi lưu Auth State & Logout** | `src/context/AuthContext.jsx` | State `currentUser`, hàm `login()` và `logout()` (xóa session trong localStorage) |
| **3. Logic thêm/sửa Category** | `src/services/categoryService.js` | Hàm `create()` và `update()` với `[newCategory, ...list]` (Immutable update) |
| **4. Ràng buộc quan hệ News với Category** | `src/services/newsService.js` | Hàm `create()`, đoạn kiểm tra `categories.some(c => c.id === categoryId)` |
| **5. Hiển thị phân quyền Role (Admin/Staff)** | `src/components/Badges.jsx` | Component `RoleBadge`, điều kiện `Number(role) === 1 ? 'Admin' : 'Staff'` |
| **6. Hộp thoại xác nhận xóa (Delete Confirmation)** | `src/components/ConfirmModal.jsx` | Sự kiện `onConfirm()`, Cancel không thực hiện xóa, Confirm mới gọi hàm xóa |
| **7. Logic tìm kiếm (Source vs Displayed list)** | `src/pages/NewsPage.jsx` | Hook `useMemo` tính toán `displayedNews` từ `newsList` mà không ghi đè `newsList` gốc |
| **8. Modal Popup dùng chung cho Create/Update** | `src/components/Modal.jsx` | Component `Modal`, điều kiện mở `isOpen`, lắng nghe phím ESC và ngăn click nổi bọt `e.stopPropagation()` |
| **9. Nơi lưu và khôi phục LocalStorage** | `src/services/storageService.js` | Các hàm `get()`, `set()`, `initData()`, `resetToDefault()` |
| **10. Cấu hình Menu SPA (không full reload)** | `src/App.jsx` & `src/components/Sidebar.jsx` | State `activeTab` trong `AppContent()`, chuyển tab theo state rendering |

---

## 3. Trả Lời Trọn Bộ Câu Hỏi Phụ Lục 12 (Appendix Questions)

### Nhóm 1: Lệnh và Môi trường (Environment)
1. **Lệnh tạo project Vite React?**
   - Lệnh: `npm create vite@latest <ten_project> -- --template react`
   - Giải thích: Vite sử dụng trình biên dịch esbuild bằng ngôn ngữ Rust/Go cực nhanh, thời gian khởi động (HMR) tính bằng mili-giây, nhẹ và hiện đại hơn Create-React-App (Webpack).
2. **`npm install` làm gì?**
   - Đọc file `package.json` và `package-lock.json`, tải tất cả các thư viện phụ thuộc (dependencies) về máy và lưu trong thư mục `node_modules`.
3. **`npm run dev` làm gì?**
   - Chạy script `dev` được cấu hình trong `package.json` (`vite`), khởi động local development server (mặc định port 5173).
4. **Tại sao không nộp thư mục `node_modules`?**
   - Vì `node_modules` có dung lượng rất lớn (hàng trăm MB) và chứa các tệp mã nguồn phụ thuộc có thể dễ dàng tái tạo lại bất cứ lúc nào bằng lệnh `npm install`.

### Nhóm 2: Nền tảng React (Fundamentals)
1. **Component là gì? JSX là gì?**
   - **Component:** Là khối xây dựng giao diện độc lập, tái sử dụng được, nhận đầu vào là `props` và trả về cấu trúc giao diện mô tả bằng JSX.
   - **JSX (JavaScript XML):** Là phần mở rộng cú pháp cho JavaScript, cho phép viết cấu trúc giao diện giống HTML ngay bên trong code JavaScript. Trình biên dịch (Vite/Babel) sẽ chuyển JSX thành các lệnh gọi `React.createElement()`.
2. **Props khác State như thế nào?**
   - **Props:** Là dữ liệu được truyền từ Component cha xuống Component con; có tính chất chỉ đọc (read-only / immutable từ phía con).
   - **State:** Là dữ liệu nội bộ do chính Component quản lý; có thể thay đổi trong suốt vòng đời của component thông qua các hàm setter (như `useState`).
3. **Khi nào Component re-render?**
   - Khi `state` của component thay đổi (thông qua setter).
   - Khi `props` truyền vào từ component cha thay đổi.
   - Khi Component cha của nó bị re-render.
   - Khi giá trị Context mà component đó đang lắng nghe (subscribe) thay đổi.
4. **Tại sao không được mutate trực tiếp state (ví dụ: `list.push()`)?**
   - React so sánh shallow reference (địa chỉ vùng nhớ) của object/mảng. Nếu ta mutate trực tiếp mảng gốc (`list.push()`), tham chiếu vùng nhớ không đổi, React sẽ coi như state không thay đổi và **KHÔNG kích hoạt re-render giao diện**, dẫn đến lỗi mất đồng bộ UI. Do đó luôn cần tạo mảng mới: `[...list, newItem]`.
5. **Controlled Input là gì?**
   - Là thẻ `<input>` có giá trị (`value`) được liên kết trực tiếp với một React state, và mỗi thay đổi của người dùng được lắng nghe qua sự kiện `onChange` để cập nhật state. React là nguồn chân lý duy nhất (Single Source of Truth) của dữ liệu input đó.
6. **Tại sao khi dùng `.map()` cần truyền thuộc tính `key`?**
   - Thuộc tính `key` giúp thuật toán đối chiếu (Virtual DOM Reconciliation) của React xác định duy nhất từng phần tử trong danh sách để biết phần tử nào bị thêm, sửa hoặc xóa, từ đó chỉ re-render đúng DOM node đó thay vì phải dựng lại toàn bộ danh sách.

### Nhóm 3: Luồng thực thi & Kiến trúc (Architecture)
1. **Khi mở ứng dụng, component nào quyết định Login hay Admin?**
   - Component `AppContent` trong file `App.jsx`. Component này kiểm tra biến cờ `isAuthenticated` từ `AuthContext`. Nếu `false` thì trả về `<LoginPage />`, nếu `true` thì trả về `<AdminLayout />`.
2. **Nếu kết nối với Spring Boot API, tầng nào sẽ được thay đổi?**
   - **Chỉ cần thay đổi duy nhất tầng `services/`** (ví dụ: `categoryService.js`, `newsService.js`). Thay vì đọc/ghi vào `localStorage`, ta thay bằng các lời gọi `fetch()` hoặc `axios.get('http://localhost:8080/api/categories')`. Toàn bộ các Component trong `pages/` và `components/` giữ nguyên 100%.
3. **Sự khác biệt giữa Source List và Displayed List trong chức năng Tìm kiếm?**
   - `Source List` (`newsList`): Lưu trữ toàn bộ dữ liệu gốc được đồng bộ từ cơ sở dữ liệu / storage.
   - `Displayed List` (`displayedNews`): Là mảng tạm thời được sinh ra (Derived State qua `useMemo`) sau khi áp dụng các bộ lọc từ khóa, thể loại, trạng thái. Nhờ đó, khi người dùng xóa từ khóa tìm kiếm, danh sách ban đầu vẫn còn nguyên vẹn.

---

## 4. Hướng Dẫn Xử Lý Yêu Cầu Thay Đổi Thực Tế (Modification Tasks)

Nếu giảng viên yêu cầu thực hiện một thay đổi trực tiếp trên máy:

### Tình huống 1: Thêm nút Reset form trong Dialog Create/Update
* **Đã chuẩn bị sẵn:** Trên dialog của cả 3 trang `CategoryPage`, `NewsPage`, `UsersPage` đều đã có sẵn nút **"Đặt lại (Reset)"** với hàm `handleResetForm()`.

### Tình huống 2: Thêm bộ lọc Trạng thái (Active / Inactive) hoặc Thể loại
* **Đã chuẩn bị sẵn:** Trên thanh tìm kiếm của cả 3 trang đều đã có dropdown lọc theo trạng thái (`statusFilter`) và lọc theo thể loại (`selectedCategoryFilter`).

### Tình huống 3: Thêm validation email hoặc ràng buộc mới
* **Cách thực hiện nhanh:**
  Mở file trang tương ứng (ví dụ `UsersPage.jsx`), tìm đến hàm `handleFormSubmit`, bổ sung điều kiện regex kiểm tra:
  ```javascript
  if (!formData.email.includes('@')) {
    errors.email = 'Email phải chứa ký tự @';
  }
  ```
