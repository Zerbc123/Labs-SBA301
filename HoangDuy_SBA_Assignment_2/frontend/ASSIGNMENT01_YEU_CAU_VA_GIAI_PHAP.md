<!-- DuyDLH-CE200667 -->
# Assignment 01: Thầy yêu cầu gì và giải pháp cho từng yêu cầu

**Sinh viên:** Đào Lê Hoàng Duy - CE200667  
**Hệ thống:** FUNewsManagementSystem  
**Đối chiếu:** Student Guide của Assignment 01 và source hiện tại, sau bản sửa đăng nhập dùng danh sách tài khoản.

## 1. Hiểu bài trong một phút

Thầy yêu cầu xây dựng **frontend quản trị tin tức bằng ReactJS + Vite**, dựa trên HTML/CSS template. Người dùng đăng nhập rồi thao tác trong layout quản trị có Header, menu và vùng nội dung.

Ba nhóm dữ liệu chính là **Category, News, User/Account**. Cả ba đều cần:

- **Create:** thêm mới.
- **Read:** xem danh sách.
- **Update:** chỉnh sửa.
- **Delete:** xóa sau khi xác nhận.
- **Search:** tìm kiếm.

Create/Update phải sử dụng popup dialog. Menu cần đủ **Dashboard, Category, News, Users, Settings**. Ngoài sản phẩm chạy được, sinh viên phải giải thích được code, kiểm thử, phân tích lỗi và thay đổi yêu cầu nhỏ.

**Không bắt buộc trong Assignment 01:** Spring Boot backend thật, database thật, JWT production và triển khai production. Vì vậy dùng mảng JavaScript kết hợp localStorage là một giải pháp được hướng dẫn cho phép.

> Phân biệt trong tài liệu: **Yêu cầu** là nội dung từ PDF; **giải pháp hiện tại** là cách source đang làm; **cần hoàn thiện** là việc chưa được bảo đảm hoặc chưa có bằng chứng. “Có code” không đồng nghĩa đã chạy đủ test hoặc chắc chắn đạt điểm tối đa.

## 2. Bảng tổng hợp 12 yêu cầu chính

ID và tên yêu cầu được đối chiếu Student Guide trang 4.

| ID | Thầy yêu cầu | Giải pháp trong bài hiện tại | Tình trạng cần biết |
|---|---|---|---|
| R01 | React + Vite; tên project đúng quy ước | React 19, Vite; folder DuyDLH_CE200667 | Có công nghệ; cần xác nhận phần ClassCode theo quy định lớp |
| R02 | Có trang Login | LoginView có form và validation | Có code; cần demo cả rỗng/sai/đúng |
| R03 | Admin/Admin vào admin page | authenticate → currentUser → conditional render | Có; hiện đọc users đã lưu thay cho hard-code |
| R04 | Logo tạo bằng AI | Có logo SVG trên Login/Sidebar | Chưa xác minh nguồn AI; cần đối chiếu vị trí Header |
| R05 | Header và master/admin layout | AdminLayout chứa Header, Sidebar, children | Có cấu trúc dùng chung |
| R06 | Đủ 5 menu | Sidebar + activeTab ở App | Có; Staff bị disable Users ở menu |
| R07 | Category CRUD + Search | CategoryView/CategoryModal/App | Có; xóa liên kết với News còn hạn chế |
| R08 | News CRUD + Search | NewsView/NewsModal/App | Có; cần tăng kiểm tra categoryId hợp lệ |
| R09 | User/Account CRUD + Search | UserView/UserModal/App | Có; login đã dùng dữ liệu CRUD |
| R10 | Create/Update bằng popup dialog | Modal dùng chung và form theo mode | Có; có draft, prefill, validation |
| R11 | Delete có confirmation | ConfirmDialog + itemToDelete | Có; Cancel không thực thi xóa |
| R12 | Data model hợp lý | initialData + state App + StorageService | Có model; chưa có ràng buộc database |

## 3. Giải thích và giải pháp từng yêu cầu

### R01. Tạo project ReactJS + Vite và đặt tên đúng

**Thầy yêu cầu gì?** Có source React chạy lại được, dùng Vite và đặt tên project theo `StudentName_ClassCode`.

**Giải pháp hiện tại:** React dựng giao diện bằng component, Vite phục vụ môi trường phát triển và build. Metadata, scripts và dependency nằm trong package.json.

**Cách chạy bản hiện tại:**

```powershell
Set-Location 'D:\File\Ki_7\SBA301\labs\HoangDuy_SBA_Assignment_2\frontend'
npm install
npm run dev
```

Chạy `npm run build` để tạo bản production trong dist; `npm run lint` để kiểm tra một số vấn đề code; `npm run preview` để xem bản build cục bộ. Lệnh npm phải chạy tại thư mục có package.json.

**Vì sao chọn cách này?** React giúp chia UI thành component và cập nhật theo state; Vite hỗ trợ phát triển/build mà không phải tự cấu hình bundler từ đầu.

**Cách chứng minh:** mở package.json, chạy lại dự án, chỉ entry main.jsx và App.jsx.

**Cần xác nhận:** `CE200667` là MSSV đang dùng trong tên folder; chưa có thông tin chứng minh nó cũng là ClassCode mà lớp yêu cầu. Không tự kết luận tên folder đã đúng hoàn toàn.

**Câu trả lời ngắn:** “Em dùng React để tổ chức component và state, dùng Vite để chạy/build. Các script nằm trong package.json và source có thể cài dependency để chạy lại.”

### R02. Có trang đăng nhập và kiểm tra dữ liệu nhập

**Thầy yêu cầu gì?** Có Login page; test được trường hợp rỗng, sai và Admin/Admin đúng.

**Giải pháp hiện tại:** LoginView giữ `username`, `password`, `errorMsg` bằng state. Input nhận value từ state và cập nhật qua onChange.

```text
Nhập tài khoản/mật khẩu
→ onChange cập nhật state
→ onSubmit gọi handleSubmit
→ preventDefault để tránh reload trang
→ trim dữ liệu, kiểm tra field rỗng
→ StorageService.authenticate
→ sai: hiện errorMsg; đúng: onLoginSuccess(user)
```

**Validation:** cả hai field rỗng, thiếu username hoặc thiếu password đều bị chặn trước khi xác thực. Nhập toàn dấu cách cũng thành rỗng sau trim.

**Vì sao chọn cách này?** Controlled input giúp dữ liệu hiển thị và dữ liệu kiểm tra có cùng nguồn; người dùng được báo lỗi ngay tại màn hình.

**Cách chứng minh:** submit form rỗng, nhập sai password, thử Admin/Admin. Chỉ nhận kết quả Pass sau khi chạy và quan sát thật.

**Câu trả lời ngắn:** “LoginView quản lý dữ liệu nhập bằng state. Submit validate trước, rồi gọi service xác thực; sai thì giữ màn hình và hiện lỗi, đúng thì gửi user lên App.”

### R03. Admin/Admin đăng nhập được vào trang quản trị

**Thầy yêu cầu gì?** Mock credential Admin/Admin phải vào admin page.

**Giải pháp hiện tại sau bản sửa login:** StorageService đọc danh sách users đang lưu, tìm username/password khớp, yêu cầu `status === 1` và role 1/2 hợp lệ. Username không phân biệt hoa thường; password có phân biệt hoa thường. Input đầu cuối được trim.

Service trả user gồm id, username, fullName, role cho lần login; LoginView gọi `onLoginSuccess`. App thực hiện:

```text
setCurrentUser(user)
→ lưu user vào localStorage
→ setActiveTab('dashboard')
→ React render AdminLayout và Dashboard
```

App quyết định Login/Admin dựa trên `currentUser`. Đây là chuyển nội dung bằng state, không phải chuyển URL qua React Router.

**Logout:** set currentUser=null, xóa auth key, reset tab; dữ liệu CRUD vẫn giữ. **F5:** App đọc lại session từ storage, activeTab khởi tạo dashboard.

**Tài khoản mẫu:** Admin/Admin, Staff/Staff và hoangduy/123 đang active. guest_writer/123 ban đầu inactive, phải được Admin bật Hoạt động trong Users trước khi login. Nếu dữ liệu đã lưu khác dữ liệu mẫu, credential/status thực tế theo dữ liệu đã lưu.

**Vì sao chọn cách này?** Vẫn đáp ứng mock login nhưng tài khoản tạo/sửa/khóa/xóa trong CRUD nay ảnh hưởng lần đăng nhập tiếp theo.

**Cần biết:** chưa có authentication server và chưa tự thu hồi session đang mở khi account bị khóa/xóa. Lưu session trong localStorage không phải bảo vệ truy cập production.

**Cách chứng minh:** login Admin/Admin, logout, F5; tạo account active rồi login; account inactive báo bị khóa. Không đổi/xóa credential Admin trước buổi demo nếu cần giữ tài khoản theo đề.

**Câu trả lời ngắn:** “Service xác thực tài khoản trong dữ liệu đã lưu. Sau thành công, App cập nhật currentUser và lưu session, nên render sang Dashboard; logout xóa cả state lẫn session.”

### R04. Có logo được tạo bằng AI

**Thầy yêu cầu gì?** Theo requirement matrix, cần logo tạo bằng AI và có bằng chứng asset/Header; checklist cũng nhắc Header và logo AI.

**Giải pháp hiện tại:** project có logo SVG được import và hiển thị ở LoginView và Sidebar.

**Cần hoàn thiện/xác minh:** có file SVG không chứng minh logo đã được tạo bằng AI. Cần giữ prompt/công cụ/output thật hoặc bằng chứng nguồn. Header hiện có breadcrumb, tài khoản, theme và logout; chưa thấy logo nằm trực tiếp trong Header. Cần đối chiếu cách giảng viên yêu cầu vị trí logo và bổ sung nếu cần.

**Cách chứng minh:** mở asset, chạy UI xem logo không lỗi đường dẫn; đưa bằng chứng quá trình tạo thật. Kiểm tra ảnh trên light/dark và khi build.

**Câu trả lời ngắn:** “Em có asset logo dùng ở Login và Sidebar. Em cần trình bày nguồn/prompt tạo logo thật và kiểm tra vị trí hiển thị theo yêu cầu Header.”

Không khẳng định đã đáp ứng nguồn AI nếu chưa có bằng chứng.

### R05. Có Header và master/admin layout dùng chung

**Thầy yêu cầu gì?** Các trang quản trị nằm trong layout có Header và vùng quản lý chung.

**Giải pháp hiện tại:** AdminLayout ghép Sidebar, Header và vùng `children` chứa view hiện hành.

```text
AdminLayout
├─ Sidebar: menu và số lượng dữ liệu
├─ Header: breadcrumb, account, theme, logout
└─ children: Dashboard/Category/News/Users/Settings
```

Header nhận props như currentUser, activeTab, onLogout. AdminLayout giữ state mở/đóng sidebar trên mobile.

**Vì sao chọn cách này?** Tránh mỗi màn hình tự viết lại Header/Sidebar; thay phần dùng chung một nơi là các màn hình cùng nhận thay đổi.

**Cách chứng minh:** chuyển qua các menu, quan sát layout vẫn nhất quán; resize để kiểm tra sidebar, header và bảng không che nội dung.

**Câu trả lời ngắn:** “Em tách layout dùng chung và truyền view qua children, nên thay nội dung mà vẫn giữ cấu trúc điều hướng thống nhất.”

### R06. Có đủ Dashboard, Category, News, Users, Settings

**Thầy yêu cầu gì?** Có đủ năm mục và chuyển đúng nội dung.

**Giải pháp hiện tại:** Sidebar khai báo menuItems; khi bấm button, handler gọi setActiveTab ở App. App conditional render view theo tab, Header đổi breadcrumb theo cùng giá trị.

| Menu | Trách nhiệm trong bài |
|---|---|
| Dashboard | Thống kê số lượng, trạng thái và bài theo category |
| Category | Quản lý danh mục |
| News | Quản lý bài viết |
| Users | Quản lý tài khoản |
| Settings | Profile phiên làm việc, theme và reset dữ liệu |

**Vì sao dùng state navigation?** Ít màn hình, dễ theo dõi và không cần dependency Router. Đánh đổi: URL không phản ánh tab, không có deep link và back/forward theo menu.

**Phần thêm của project:** Staff được disable Users ở Sidebar; đây là policy của bài hiện tại, không phải toàn bộ RBAC production mà đề bắt buộc. App/action chưa có guard role đầy đủ.

**Cách chứng minh:** Admin bấm đủ năm menu; tab và breadcrumb đúng. Reload về dashboard theo thiết kế. Staff thấy mục Users bị vô hiệu hóa.

**Câu trả lời ngắn:** “Em giữ activeTab ở App để Sidebar, Header và nội dung cùng dựa trên một state, tránh menu active và màn hình bị lệch.”

### R07. Category có CRUD và Search

**Thầy yêu cầu gì?** Xem, thêm, sửa, xóa, tìm kiếm danh mục.

**Giải pháp từng thao tác:**

| Thao tác | Cách làm trong code | Cách kiểm tra |
|---|---|---|
| Read | CategoryView map danh sách đã lọc, key theo id | Có dữ liệu và danh sách rỗng |
| Create | Mở modal mode=create, selected=null; submit hợp lệ → App tạo id và thêm đầu mảng | Tên hợp lệ được thêm, modal đóng |
| Update | Chọn object → mode=update → prefill draft; App map và thay đúng id | Đổi đúng record, record khác giữ nguyên |
| Delete | Lưu item cần xóa, mở confirm; confirm mới App filter theo id | Hủy giữ dữ liệu; xác nhận xóa đúng |
| Search | Filter từ source theo name đã lowercase và keyword trim/lowercase | Có kết quả, không có kết quả, xóa keyword |

**Validation form:** tên không rỗng sau trim; tên không trùng sau trim/lowercase. Khi Update, không coi chính id đang sửa là bản ghi trùng. Description không bắt buộc; status 1/0.

**Id hiện tại:** max id đang có + 1, hoặc 1 khi mảng rỗng. Đây không phải auto-increment database và có thể tái sử dụng id đã xóa.

**Vì sao đặt state ở App?** Categories còn dùng cho News, Dashboard và số lượng Sidebar. Nếu mỗi màn hình giữ bản sao riêng mà không đồng bộ, danh mục mới có thể không xuất hiện ở ô chọn khi viết tin.

**Cần hoàn thiện:** xóa category có news hiện chỉ cảnh báo rồi vẫn xóa, không cascade/reassign. Đề hướng dẫn yêu cầu xác định policy relation nhất quán. Nên chọn chặn xóa khi còn news hoặc triển khai policy khác có xác nhận rõ; chưa sửa thì không nhận đã giữ toàn vẹn liên kết.

**Câu trả lời ngắn:** “Form validate rồi gửi payload lên view, view chọn Create/Update, App cập nhật mảng mới và lưu storage. Search tạo danh sách hiển thị riêng, không sửa nguồn.”

### R08. News có CRUD và Search

**Thầy yêu cầu gì?** Quản lý bài viết với các thao tác CRUD/Search; dữ liệu liên quan danh mục hợp lý.

**Giải pháp hiện tại:** NewsView quản lý bảng, keyword, filter category/status, selected news và dialog. NewsModal giữ form title, content, categoryId, tagsString, status.

| Thao tác | Giải pháp |
|---|---|
| Read | Map filteredNews; tìm tên category qua categoryId |
| Create | Validate, chuyển categoryId sang số, tạo tags array; App tạo id/createdAt và thêm đầu mảng |
| Update | Prefill record; App map theo id; thông thường giữ createdBy ban đầu |
| Delete | Confirm rồi filter theo id bài viết |
| Search | Tìm title/content/tags; kết hợp category và status bằng AND |

**Dữ liệu đầu vào và xử lý:** title/content phải có sau trim; phải có lựa chọn category. Tags nhập dấu phẩy được split, trim, bỏ chuỗi trống. createdBy dùng username người tạo; không phải account id.

**Vì sao categoryId là số?** Model dùng id số, còn value từ select là chuỗi; parseInt giúp so sánh đúng với category.id.

**Cần hoàn thiện:** validate mới kiểm tra categoryId có giá trị, chưa xác minh nó còn tồn tại bằng categories.some tại lúc lưu. Category bị xóa có thể khiến News mất liên kết. createdAt lấy ngày UTC; recentNews ở Dashboard chỉ slice đầu mảng, chưa sort theo ngày.

**Cách chứng minh:** tạo bài với category đang tồn tại; nhập thiếu title/content; sửa bài; test cancel/confirm; search theo title/content/tag và filter kết hợp.

**Câu trả lời ngắn:** “News giữ categoryId để liên kết với danh mục và createdBy để ghi username tác giả. Form chuẩn hóa payload trước khi App cập nhật danh sách dùng chung.”

### R09. User/Account có CRUD và Search

**Thầy yêu cầu gì?** Quản lý danh sách tài khoản, role và thao tác CRUD/Search.

**Giải pháp hiện tại:** UserView giữ bộ lọc/selection; UserModal giữ draft và validation; App thực hiện cập nhật state, storage. Create thêm user cuối mảng; Update dùng map; Delete dùng filter.

**Validation:**

- Username bắt buộc, ít nhất 3 ký tự, không trùng theo lowercase; Edit loại trừ chính id và disable ô username.
- Full name bắt buộc.
- Email bắt buộc, kiểm tra định dạng cơ bản bằng regex.
- Password bắt buộc khi Create; khi Edit để trống thì giữ password cũ.
- Role 1=Admin, 2=Staff; status 1=Hoạt động, 0=Khóa.

**Search:** username/fullName/email; kết hợp filter role/status. UserView chặn mở Delete cho tài khoản đang đăng nhập.

**Sau bản sửa login:** tạo user active, đổi password, khóa hoặc xóa user ảnh hưởng lần đăng nhập kế tiếp. guest_writer bị khóa vì status=0; bật active qua CRUD mới login được.

**Cần biết:** password là dữ liệu mock lưu cục bộ; chưa có hash/server auth. App cập nhật session khi sửa account hiện tại nhưng chưa có policy hoàn chỉnh về tự đổi quyền/tự khóa/thu hồi session. Kiểm tra quyền và chặn self-delete mới ở UI chưa đủ cho production.

**Cách chứng minh:** tạo username mới; thử username trùng/email sai/password rỗng; Edit giữ password cũ; search theo tên/email; xóa account khác; test tài khoản mới đăng nhập. Không tự đánh dấu toàn bộ case Pass khi chưa chạy UI.

**Câu trả lời ngắn:** “Em dùng một form cho Create/Update account, validate thông tin và trùng username. Dữ liệu đã lưu được service đọc khi login, đồng thời kiểm tra account active và role hợp lệ.”

### R10. Create/Update phải dùng popup dialog

**Thầy yêu cầu gì?** Khi thêm/sửa, dùng dialog thay vì chỉ sửa trực tiếp trên bảng hoặc chuyển sang trang khác.

**Giải pháp hiện tại:** Modal là khung dùng chung; CategoryModal, NewsModal, UserModal chứa form riêng. View giữ isModalOpen, modalMode và selected item.

```text
Create: mở → mode=create → không có selected item → form rỗng
Update: mở → mode=update → có selected item → điền sẵn form
```

Form modal dùng effect để reset/prefill theo props. Input cập nhật formData nháp, không sửa trực tiếp selected object.

```text
Bấm Lưu → preventDefault → validate
  ├─ sai: hiện errors, modal giữ mở, source chưa đổi
  └─ đúng: onSubmit → view → App → setState/save → đóng modal

Bấm Hủy → đóng modal, bỏ draft, source không đổi
```

**Vì sao chọn cách này?** Đáp ứng yêu cầu, giữ người dùng trong ngữ cảnh danh sách, dùng lại field và validation. Form quá dài/phức tạp có thể phù hợp trang riêng hơn, nhưng scope hiện tại dùng dialog.

**Cần hoàn thiện nếu nâng chất lượng:** focus trap/restore focus và ARIA đầy đủ; cảnh báo draft chưa lưu là tính năng thêm, không phải điều kiện cốt lõi R10.

**Cách chứng minh:** Create rỗng, Edit prefill; mở Edit A rồi B; Edit rồi Create; invalid không đóng; Hủy không lưu.

**Câu trả lời ngắn:** “Em tách draft form khỏi dữ liệu đã lưu để Hủy không làm thay đổi danh sách. mode và selected item quyết định tạo mới hay chỉnh sửa.”

### R11. Delete phải có xác nhận

**Thầy yêu cầu gì?** Không xóa ngay khi click icon; người dùng phải có thể hủy hoặc xác nhận.

**Giải pháp hiện tại:** view lưu itemToDelete và mở ConfirmDialog. Dialog nhận nội dung, tên item, onConfirm, onCancel qua props.

```text
Click icon Xóa → ghi nhớ item → mở dialog, chưa xóa
  ├─ Hủy → đóng dialog và xóa selection
  └─ Xác nhận → callback App → filter tạo mảng mới → set/save
```

`useEffect` trong dialog quản lý body class/listener Escape; không phải hàm trực tiếp thực hiện Delete. Xóa do event handler của nút Confirm kích hoạt.

**Vì sao chọn cách này?** Tránh thao tác nhầm và cho người dùng kiểm tra đúng đối tượng trước khi mất dữ liệu.

**Cách chứng minh:** hủy rồi record vẫn còn; xác nhận chỉ đúng record mất; thử record đầu/giữa/cuối; xóa record vừa tạo.

**Cần phân biệt:** confirmation không tự đảm bảo quan hệ News/Category đúng. Policy xóa liên kết là phần xử lý bổ sung ở handler/service, không chỉ nội dung cảnh báo.

**Câu trả lời ngắn:** “Em chưa gọi callback xóa lúc mở dialog. Chỉ onConfirm mới gửi id đến App, còn onCancel chỉ đóng dialog.”

### R12. Mô hình dữ liệu, role/status và quan hệ hợp lý

**Thầy yêu cầu gì?** Dữ liệu có id, field cần thiết, role/status và quan hệ category của news rõ ràng. Có thể dùng JS array, localStorage, JSON hoặc mock service.

**Model hiện tại:**

| Entity | Field chính | Quan hệ/ý nghĩa |
|---|---|---|
| Category | id, name, description, status | Chứa chủ đề của bài viết; chưa có createdBy |
| News | id, title, content, categoryId, createdBy, status, tags, createdAt | categoryId trỏ category; createdBy là username |
| User | id, username, password, fullName, email, role, status, createdAt | Role 1/2, trạng thái active/locked |

**Giải pháp quản lý:** initialData cung cấp mảng mẫu; StorageService đọc/ghi localStorage; App giữ state React dùng chung; các view nhận props và gửi callback.

| Key localStorage | Nội dung |
|---|---|
| funews_categories | Mảng danh mục |
| funews_news | Mảng bài viết |
| funews_users | Mảng tài khoản |
| funews_current_user | Thông tin phiên đăng nhập |
| funews_theme_dark | Preference sáng/tối |

**State và storage khác gì?** setState giúp giao diện cập nhật; save storage giữ dữ liệu cho lần mở/reload sau. Chỉ save storage không làm React tự render lại. Chỉ setState thì thay đổi chưa được giữ qua F5.

**Vì sao chọn cách này?** Tách nguồn mẫu, lưu trữ và UI giúp code dễ theo dõi, có đường thay service bằng API sau này. Khi chuyển API phải sửa cả async flow/loading/error, không chỉ đổi tên hàm lưu.

**Cần hoàn thiện:** schema validation cho JSON đã lưu; trả lỗi save lên UI; tránh orphan categoryId; id không tái sử dụng ngoài ý muốn; xử lý đồng bộ nhiều tab nếu mở rộng. Đây là liên kết logic, không có database FK/transaction.

**Cách chứng minh:** first-run có dữ liệu mẫu; role/status hiển thị đúng; CRUD rồi F5 vẫn còn; News chọn category hợp lệ; trình bày rõ policy khi category bị xóa.

**Câu trả lời ngắn:** “App là nguồn state chung; service đọc/ghi dữ liệu. News liên kết Category bằng categoryId và lưu tác giả bằng username. Bản này chưa có database thực thi ràng buộc.”

## 4. Dashboard và Settings cần làm tới đâu?

Hai mục này bắt buộc có trong menu. Độ sâu chức năng cụ thể cần theo đề/thông báo lớp; không tự coi mọi tính năng đang có là yêu cầu bắt buộc.

| Màn hình | Giải pháp hiện tại | Vì sao phù hợp | Lưu ý |
|---|---|---|---|
| Dashboard | Tổng news/category/user, active news/category, số bài theo category | Có tổng quan từ dữ liệu quản lý | Số liệu suy ra từ props; recentNews chưa sort theo ngày |
| Settings | Profile session, theme sáng/tối, reset dữ liệu mẫu | Có thông tin và cấu hình đơn giản | Dark mode/reset là phần mở rộng của project |

Reset hiện chỉ nạp lại ba mảng mẫu, không clear toàn bộ storage, không tự logout và không reset theme. Nếu nói “reset tất cả” trong interview cần giải thích đúng giới hạn đó.

## 5. Thầy còn yêu cầu chất lượng và bằng chứng gì?

Không chỉ có đủ màn hình. Student Guide hướng dẫn chuẩn bị các nội dung dưới đây để giải thích và kiểm chứng.

| Nội dung | Giải pháp/cách chuẩn bị | Bằng chứng nên có |
|---|---|---|
| Component hợp lý | App điều phối; views hiển thị; forms xử lý draft; common/layout dùng lại | Component tree và source |
| State ownership rõ | Shared state ở App; form/filter/modal state tại component dùng trực tiếp | Bảng state và flow |
| Không mutate state | Create spread; Update map + object spread; Delete filter | Giải thích được ba handler |
| Empty/no-result state | EmptyState khi không có dữ liệu/kết quả | Demo source rỗng và search không khớp |
| Validation | Rỗng, tên/username trùng, email, password Create | Negative test và thông báo lỗi |
| Search không phá nguồn | filtered list được suy từ source | Xóa keyword thấy dữ liệu gốc lại |
| UI cơ bản | Viền/input/nút dễ đọc, dialog thống nhất, responsive | Kiểm tra desktop/mobile/light/dark |
| Testing | Normal + negative + edge; expected/actual cụ thể | Test matrix có kết quả thật |
| Debug | Triệu chứng → khoanh vùng → root cause → sửa → retest | Debug log lỗi thật |
| Modification | Phân tích impact rồi sửa nhỏ và test | Ví dụ thêm filter/sort/validation |
| Giải thích code | Input → event → handler → state/service → output | Mở đúng code và trace được |
| AI usage | Ghi hỗ trợ thực tế và cách đã kiểm chứng/chỉnh sửa | Prompt/log và diff/test thật |

**Ví dụ việc mới là thêm, không mặc định bắt buộc:** pagination, sort nâng cao, chart, bỏ dấu search, dark mode, JWT và API thật. Hướng dẫn ưu tiên core requirement trước tính năng mở rộng.

## 6. Những gì phải chuẩn bị để nộp

Theo Student Guide trang 3 và checklist trang 18:

| Sản phẩm/bằng chứng | Cần có nội dung gì? | Tình trạng bản đang đọc |
|---|---|---|
| Source chạy lại được | Đúng phiên bản, dependency cài được, không phụ thuộc đường dẫn máy cá nhân | Build vừa kiểm tra ở lượt sửa login đã đạt |
| README | Mô tả, setup/run, tài khoản test, chức năng, giới hạn, nguồn/AI usage nếu có | Đã có hướng dẫn account/login; vẫn cần hoàn thiện setup/run và mô tả đầy đủ |
| Test matrix/evidence theo lớp | Case, input, expected, actual, Pass/Fail, bằng chứng | Có test plan trong tài liệu ôn tập; chưa đồng nghĩa mọi test UI đã chạy |
| Screenshot/video nếu giảng viên yêu cầu | Các luồng chính và lỗi/confirmation | Cần tự xác nhận đã có đủ bằng chứng đúng phiên bản |
| AI usage log theo yêu cầu/quy định | Mục đích, prompt, phần áp dụng, kiểm chứng, sửa lại | Tài liệu ôn tập có ghi nhận hỗ trợ trong phiên; cần bổ sung đúng thực tế |
| GitHub nếu quy trình lớp dùng Git | Repo đúng tài khoản, source/version và tiến trình thật | README có link; chưa xác minh account/history |
| Component/data/state sketch | Quan hệ component, nguồn state, model | Tài liệu này có mô tả; có thể mở cùng code |
| Debug log | 2-3 lỗi thật theo checklist hồ sơ | Không bịa thêm lỗi hoặc retest chưa thực hiện |

Nộp đúng hạn theo thông báo lớp/Edunext. Tài liệu được cung cấp không cho biết hạn nộp cụ thể của lớp nên không tự đặt ngày.

## 7. Thầy chấm Assignment 01 theo gì?

Đây là rubric **8 tiêu chí** của Assignment Guide, tổng 10.0; không phải bảng 4 tiêu chí của Interview Guide chung.

| Tiêu chí | Điểm | Giải pháp để chứng minh |
|---|---:|---|
| Problem Understanding | 1.0 | Nêu đủ scope, entity, constraint, input/output và relation |
| Solution Design & Reasoning | 1.5 | Giải thích state ở App, tách component, service và trade-off |
| Implementation | 2.0 | Demo core requirement hoạt động và tích hợp |
| Testing & Verification | 1.5 | Test matrix có normal/negative/edge, actual và evidence |
| Debugging & Problem Solving | 1.5 | Tìm nguyên nhân theo dữ liệu/state/event, sửa và retest |
| Code Explanation | 1.0 | Mở đúng file và trace được luồng |
| Modification / Transfer Task | 1.0 | Biết impact, sửa requirement nhỏ, kiểm tra regression |
| AI Usage & Engineering Practice | 0.5 | Minh bạch hỗ trợ AI, kiểm chứng và làm chủ phần đã dùng |

Interview Guide chung có rubric riêng: C1 1.5, C2 2.0, C3 1.5, C4 5.0. Cách áp dụng/kết hợp theo giảng viên; không tự cộng hai bảng thành 20 điểm. Comment tên đầu file không thay thế Git evidence hay khả năng giải thích code.

## 8. Những điểm ưu tiên hoàn thiện trong bài hiện tại

Các mục này là kết quả đối chiếu source; không phải tự thêm yêu cầu bắt buộc ngoài đề.

| Ưu tiên | Điểm còn thiếu/chưa chắc | Giải pháp đề xuất |
|---|---|---|
| 1 | Xóa Category làm News mất liên kết | Chọn policy restrict/reassign/cascade; thực thi ở handler/service, test đúng policy |
| 2 | Chưa chứng minh nguồn logo AI và vị trí Header | Chuẩn bị nguồn/prompt thật; bổ sung vị trí logo nếu lớp yêu cầu |
| 3 | Chưa đủ actual UI test | Chạy smoke test và negative/edge, ghi actual/evidence |
| 4 | README chưa đủ nội dung nộp | Thêm setup/run/build/features/limits/source/AI usage |
| 5 | Quyền Staff mới ở Sidebar | Guard view/action theo policy; khi có backend kiểm quyền ở server |
| 6 | categoryId mới được validate có giá trị | Kiểm tra category tồn tại khi lưu và xử lý trường hợp dữ liệu đổi |
| 7 | Session có thể không khớp account sau khóa/xóa/reset | Xác định policy đồng bộ/thu hồi session; tránh lưu password khi merge update |
| 8 | Storage/schema và lỗi lưu còn yếu | Validate JSON shape; propagate save failure để UI không báo thành công sai |
| 9 | Tên folder, repo cá nhân, Git history chưa xác minh | Đối chiếu quy định lớp và bằng chứng thật |

**Kiểm chứng đã có từ lượt sửa trước:** build thành công; lint không có error nhưng còn 11 warning có sẵn; kiểm tra logic authentication bằng Node đã đạt cho credential mẫu, account khóa/bật active, account mới, đổi password, xóa account, role sai và session trả từ login không chứa password. Chưa coi đây là retest UI đầy đủ; lượt tạo tài liệu này không sửa code ứng dụng.

## 9. Bản trả lời mẫu cho câu “Thầy yêu cầu gì và em giải quyết thế nào?”

> “Assignment 01 yêu cầu em xây frontend quản trị FUNewsManagementSystem bằng React và Vite. Core gồm Login, Header/master layout và năm menu Dashboard, Category, News, Users, Settings. Category, News và Account phải có CRUD cùng tìm kiếm; thêm/sửa dùng dialog, xóa có xác nhận.
>
> Em chia chương trình thành App, views, layout, form modal, common component và service. App giữ shared state categories/news/users và currentUser. View nhận dữ liệu qua props, quản lý search/filter và selected item; form giữ draft và validate. Khi lưu, callback đưa dữ liệu lên App để tạo mảng mới bằng spread/map/filter, cập nhật state rồi lưu localStorage.
>
> Login hiện đọc tài khoản đang lưu, kiểm tra mật khẩu, trạng thái và role rồi cập nhật session. Em dùng localStorage vì Assignment chưa bắt buộc backend/database thật; đổi lại dữ liệu nằm cục bộ, chưa có server auth và chia sẻ nhiều máy.
>
> Em cần chứng minh bằng demo, test matrix, code explanation và bằng chứng tiến trình thật. Một điểm còn cần hoàn thiện là policy xóa category có news; logo AI, README và test evidence cũng phải được đối chiếu trước khi nộp.”

## 10. Mở nhanh code để chứng minh

Liên kết được lập theo source lúc tạo tài liệu. Nếu thay đổi code, có thể tìm lại theo tên hàm.

| Yêu cầu/phần | File | Vị trí cần xem |
|---|---|---|
| R01 | [package.json](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/package.json:6) | `"scripts"` |
| R01 | [src/main.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/main.jsx:11) | `createRoot(document` |
| R02 | [src/views/LoginView.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/views/LoginView.jsx:12) | `const handleSubmit` |
| R03 | [src/services/storageService.js](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/services/storageService.js:66) | `authenticate:` |
| R03 | [src/App.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/App.jsx:68) | `const handleLoginSuccess` |
| R03 Logout | [src/App.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/App.jsx:75) | `const handleLogout` |
| R04 | [src/assets/logo.svg](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/assets/logo.svg:2) | `<svg` |
| R05 | [src/components/layout/AdminLayout.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/components/layout/AdminLayout.jsx:6) | `export default function` |
| R05 Header | [src/components/layout/Header.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/components/layout/Header.jsx:5) | `export default function` |
| R06 | [src/components/layout/Sidebar.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/components/layout/Sidebar.jsx:25) | `const menuItems` |
| R06 render | [src/App.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/App.jsx:232) | `activeTab === 'dashboard'` |
| R07 search/selection | [src/views/CategoryView.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/views/CategoryView.jsx:33) | `const filteredCategories` |
| R07 validation | [src/components/forms/CategoryModal.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/components/forms/CategoryModal.jsx:68) | `const validate` |
| R07 Create | [src/App.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/App.jsx:86) | `const handleAddCategory` |
| R07 Update | [src/App.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/App.jsx:97) | `const handleUpdateCategory` |
| R07 Delete | [src/App.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/App.jsx:106) | `const handleDeleteCategory` |
| R08 search | [src/views/NewsView.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/views/NewsView.jsx:41) | `const filteredNews` |
| R08 form/payload | [src/components/forms/NewsModal.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/components/forms/NewsModal.jsx:96) | `const handleSubmit` |
| R09 search | [src/views/UserView.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/views/UserView.jsx:37) | `const filteredUsers` |
| R09 validation | [src/components/forms/UserModal.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/components/forms/UserModal.jsx:83) | `const validate` |
| R10 | [src/components/common/Modal.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/components/common/Modal.jsx:5) | `export default function` |
| R11 | [src/components/common/ConfirmDialog.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/components/common/ConfirmDialog.jsx:5) | `export default function` |
| R12 | [src/services/initialData.js](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/services/initialData.js:8) | `export const INITIAL_CATEGORIES` |
| R12 storage | [src/services/storageService.js](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/services/storageService.js:4) | `const STORAGE_KEYS` |
| Dashboard | [src/views/DashboardView.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/views/DashboardView.jsx:18) | `const totalNews` |
| Settings | [src/views/SettingsView.jsx](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/src/views/SettingsView.jsx:14) | `export default function` |
| README | [README.md](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/README.md:5) | `## Đăng nhập` |

## 11. Nguồn và tài liệu liên quan

- [Assignment 01 Student Guide](D:/SBA301_FPT_PROJECTS/SBA301_Assignment01_Student_Guide.pdf): trang 3 về phạm vi/sản phẩm nộp; trang 4 về R01-R12 và phần không bắt buộc; trang 5-6 về model/state/flow; trang 12-15 về test/debug/code explanation/transfer; trang 16-17 về AI/rubric; trang 18 về checklist.
- [Interview Guide chung](D:/SBA301_FPT_PROJECTS/SBA301_Assignments_Interview_Guide.pdf): dùng để phân biệt rubric phỏng vấn với rubric Assignment.
- [Bộ câu hỏi và luồng code chi tiết](D:/File/Ki_7/SBA301/labs/HoangDuy_SBA_Assignment_2/frontend/ON_TAP_ASSIGNMENT01_INTERVIEW_DAO_LE_HOANG_DUY.md): tài liệu luyện interview đã tạo trước. Khi đọc phần auth cũ, ưu tiên ghi chú cập nhật login ở đầu file.

Tài liệu này giải thích yêu cầu và giải pháp của bản source hiện tại; không phải giấy xác nhận của giảng viên rằng bài đã đáp ứng toàn bộ yêu cầu hay đạt một mức điểm cụ thể.
