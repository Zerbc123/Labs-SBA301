<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

# <span style="color:#1f4e78">**SBA301 – INTEGRATE SINGLE PAGE APPLICATION WITH SPRING BOOT**</span>


## <span style="color:#2f5597">**HƯỚNG DẪN SINH VIÊN THỰC HIỆN**</span>


## <span style="color:#1f4e78">**ASSIGNMENT 01 – WORKING WITH REACTJS APPLICATION**</span>


<span style="color:#5b6573">**FUNewsManagementSystem • Bài tính điểm • Hướng dẫn triển khai và chuẩn bị đánh giá theo rubric**</span>


<mark style="background-color:#fde9d9">**<span style="color:#9c0006">**Nguyên tắc trọng tâm:**</span>** Đây là tài liệu hướng dẫn để sinh viên tự phân tích, tự thiết kế, tự triển khai, tự kiểm thử và tự giải thích code.</mark>

<table>
<thead>
<tr><th><b>Thông tin</b></th><th><b>Nội dung</b></th></tr>
</thead>
<tbody>
<tr><td>Assignment</td><td>Assignment 01 – Working with ReactJS application</td></tr>
<tr><td>Bối cảnh</td><td>FUNewsManagementSystem – frontend quản trị bằng ReactJS</td></tr>
<tr><td>CLO</td><td>CLO1, CLO2</td></tr>
<tr><td>Hình thức</td><td>Bài có tính điểm; có demo/interview/verification</td></tr>
<tr><td>Điểm rubric</td><td>10.0 điểm / 8 tiêu chí</td></tr>
<tr><td>Tên project</td><td>StudentName_ClassCode</td></tr>
<tr><td>Tài liệu được phép</td><td>Slide, tài liệu chính thức, ví dụ đã học, AI có kiểm soát</td></tr>
</tbody>
</table>


<span style="color:#385723">**Mục tiêu cuối: sản phẩm chạy được + sinh viên chứng minh được năng lực thật**</span>

<span style="color:#667085">Trang 1</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

# <span style="color:#1f4e78">**CÁCH SỬ DỤNG TÀI LIỆU**</span>

Tài liệu này không phải đáp án. Hãy dùng nó như một bản đồ triển khai và một checklist chuẩn bị đánh giá. Mỗi milestone chỉ mô tả mục tiêu, quyết định kỹ thuật, bằng chứng cần có và câu hỏi mà sinh viên phải tự trả lời.

<table>
<thead>
<tr><th>Giai đoạn</th><th>Việc sinh viên cần làm</th><th>Bằng chứng nên có</th></tr>
</thead>
<tbody>
<tr><td>1. Understand</td><td>Đọc đề, lập Requirement Traceability Matrix, xác định màn hình/entity/constraint.</td><td>Bảng yêu cầu, component sketch, data sketch.</td></tr>
<tr><td>2. Design</td><td>Thiết kế layout, component tree, state ownership, navigation, CRUD flow.</td><td>Sơ đồ chữ/ảnh, design decisions.</td></tr>
<tr><td>3. Build</td><td>Triển khai theo milestone, commit theo chức năng, không viết toàn bộ một lần.</td><td>Git history, chức năng chạy từng phần.</td></tr>
<tr><td>4. Verify</td><td>Test normal/negative/edge case, sửa lỗi có log.</td><td>Test matrix, ảnh/log/debug notes.</td></tr>
<tr><td>5. Explain</td><td>Tự giải thích code, lệnh, state flow, event flow.</td><td>Interview rehearsal checklist.</td></tr>
<tr><td>6. Transfer</td><td>Thực hành một yêu cầu thay đổi nhỏ không dựa vào code mẫu.</td><td>Patch nhỏ + test mới.</td></tr>
<tr><td>7. Defend</td><td>Demo, trả lời interview, sửa lỗi/đổi yêu cầu khi được hỏi.</td><td>Bộ hồ sơ đánh giá hoàn chỉnh.</td></tr>
</tbody>
</table>

<mark style="background-color:#fff2cc">**<span style="color:#7f6000">**AI usage:**</span>**  AI có thể hỗ trợ giải thích, review, tạo test case, gợi ý debug và cải tiến. AI không thay thế việc sinh viên phải hiểu code và có thể sửa code trực tiếp khi đánh giá.</mark>

## <span style="color:#1f4e78">**MỤC LỤC NỘI DUNG**</span>

- 0. Thông tin Assignment và chính sách đánh giá
- 1. Tóm tắt yêu cầu và phạm vi thực hiện
- 2. Hướng dẫn phân tích yêu cầu – Problem Understanding
- 3. Hướng dẫn thiết kế giải pháp – Solution Design & Reasoning
- 4. Hướng dẫn triển khai theo milestone – Implementation
- 5. Hướng dẫn kiểm thử – Testing & Verification
- 6. Hướng dẫn debug – Debugging & Problem Solving
- 7. Hướng dẫn chuẩn bị giải thích code – Code Explanation
- 8. Hướng dẫn xử lý yêu cầu thay đổi – Modification / Transfer Task
- 9. Hướng dẫn sử dụng AI có kiểm soát
- 10. Rubric đánh giá 10 điểm
- 11. Checklist trước khi nộp và trước buổi đánh giá
- 12. Phụ lục – Interview, lệnh và quy luật thực thi

<span style="color:#667085">Trang 2</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

# **<span style="color:#1f4e78">0. THÔNG TIN ASSIGNMENT VÀ CHÍNH SÁCH ĐÁNH GIÁ</span>**

<table>
<thead>
<tr><th>Mục</th><th>Yêu cầu</th></tr>
</thead>
<tbody>
<tr><td>Tên bài</td><td>Assignment 01 – Working with ReactJS application</td></tr>
<tr><td>Hệ thống</td><td>FUNewsManagementSystem</td></tr>
<tr><td>Frontend</td><td>ReactJS + Vite + HTML/CSS template có sẵn</td></tr>
<tr><td>Core scope</td><td>Login; Header; Dashboard/Category/News/Users/Settings; CRUD<br />+ Search; dialog cho Create/Update; confirmation khi Delete</td></tr>
<tr><td>Mock authentication</td><td>Admin / Admin → admin page</td></tr>
<tr><td>Data</td><td>Có thể dùng JS array, localStorage, JSON hoặc mock service;<br />không bắt buộc Spring Boot/database thật</td></tr>
<tr><td>Role tham khảo</td><td>Admin = 1; Staff = 2</td></tr>
<tr><td>Status tham khảo</td><td>News/Category: active = 1, inactive = 0</td></tr>
<tr><td>Project name</td><td>StudentName_ClassCode</td></tr>
</tbody>
</table>

## **<span style="color:#1f4e78">0.1 Sản phẩm cần nộp</span>**

- Source code ReactJS có thể cài dependency và chạy lại.
- README.md: mô tả, cách cài/chạy, tài khoản test, chức năng, giới hạn, nguồn tham khảo/AI usage nếu có.
- Ảnh chụp các chức năng chính hoặc video demo nếu giảng viên yêu cầu.
- Test matrix hoặc bằng chứng kiểm thử theo yêu cầu của lớp.
- AI usage log nếu giảng viên yêu cầu.
- Link GitHub nếu quy trình lớp sử dụng Git/GitHub.

## **<span style="color:#1f4e78">0.2 Chính sách hoàn thành đúng hạn</span>**

<span style="color:#7f6000">**Lưu ý:**</span> <span style="color:#c00000">Sinh viên cần nộp bài đúng hạn; Sau thời hạn quy định edunext sẽ không gia hạn nộp bài.</span>

## **<span style="color:#1f4e78">0.3 Chính sách trung thực học thuật và AI</span>**

- Sinh viên chịu trách nhiệm với toàn bộ code nộp và phải giải thích được code của mình.
- Không sao chép nguyên vẹn source của sinh viên khác hoặc source trọn bộ từ AI.
- Được tham khảo slide, tài liệu chính thức, ví dụ trên lớp và AI assistant theo quy định.
- <mark style="background-color:#ffff00"><span style="color:#c00000">Nếu dùng AI: ghi prompt/mục đích, phần đã áp dụng, cách kiểm chứng và phần đã chỉnh sửa.</span></mark>
- Nếu code chạy nhưng sinh viên không giải thích được hoặc không thể thay đổi một phần nhỏ, rubric Code Explanation/Modification/AI Usage sẽ phản ánh đúng năng lực.

## **<span style="color:#1f4e78">0.4 Quy trình buổi đánh giá – mô hình khuyến nghị</span>**

<table>
<thead>
<tr><th>Pha</th><th>Sinh viên thực hiện</th><th>Giảng viên quan sát/chấm</th></tr>
</thead>
<tbody>
<tr><td>A. Identity &#x26; Run</td><td>Mở đúng project, chạy bằng lệnh chuẩn, đăng nhập và demo nhanh.</td><td>Tính xác thực project; môi trường; project chạy.</td></tr>
<tr><td>B. Requirement Demo</td><td>Demo login, layout/menu, CRUD/Search/dialog/confirmation.</td><td>Problem Understanding + Implementation.</td></tr>
<tr><td>C. Code Interview</td><td>Mở các file do giảng viên chỉ định và giải thích luồng.</td><td>Code Explanation + Design Reasoning.</td></tr>
<tr><td>D. Verification/Debug</td><td>Chạy một test/edge case hoặc phân tích một lỗi được đưa ra.</td><td>Testing + Debugging.</td></tr>
<tr><td>E. Transfer Task</td><td>Thực hiện hoặc mô tả chi tiết một thay đổi nhỏ.</td><td>Modification/Transfer.</td></tr>
<tr><td>F. AI Evidence</td><td>Trình bày AI log nếu có và cách đã kiểm chứng.</td><td>AI Usage &#x26; Engineering Practice.</td></tr>
</tbody>
</table>

<span style="color:#667085">Trang 3</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

<span style="color:#c00000">**Chuẩn bị đúng:**  Không học thuộc câu trả lời. Hãy có khả năng mở đúng file, chỉ đúng state/function, mô tả trước–trong–sau sự kiện và chứng minh bằng chạy chương trình.</span>

## <span style="color:#1f4e78">**1. TÓM TẮT YÊU CẦU VÀ PHẠM VI THỰC HIỆN**</span>

### <span style="color:#1f4e78">**1.1 Bài Assignment yêu cầu sinh viên xây dựng gì?**</span>

Xây dựng frontend quản trị cho FUNewsManagementSystem bằng ReactJS, dựa trên HTML/CSS template có sẵn. Ứng dụng phải có login, master/admin layout và các khu vực quản lý Dashboard, Category, News, Users, Settings. Category, News và Account/User phải có CRUD + Search; Create/Update dùng popup dialog; Delete có confirmation.

### <span style="color:#1f4e78">**1.2 Requirement Traceability Matrix tối thiểu**</span>

<table>
<thead>
<tr><th>ID</th><th>Yêu cầu</th><th>Bằng chứng trên UI/code</th><th>Test tối thiểu</th></tr>
</thead>
<tbody>
<tr><td>R01</td><td>Project ReactJS + Vite, tên đúng quy ước</td><td>package.json, folder name</td><td>npm run dev</td></tr>
<tr><td>R02</td><td>Login page</td><td>Login component/page</td><td>Empty, wrong, Admin/Admin</td></tr>
<tr><td>R03</td><td>Admin/Admin vào admin page</td><td>Auth state + navigation/conditional render</td><td>Đúng/sai credential</td></tr>
<tr><td>R04</td><td>Logo tạo bằng AI</td><td>Asset + Header</td><td>Asset hiển thị</td></tr>
<tr><td>R05</td><td>Header + master/admin layout</td><td>Header/Layout components</td><td>Các page nằm trong layout</td></tr>
<tr><td>R06</td><td>Menu<br />Dashboard/Category/News/Users/Settings</td><td>Sidebar/Menu</td><td>Chuyển đúng nội dung</td></tr>
<tr><td>R07</td><td>Category CRUD + Search</td><td>Category management</td><td>Create/Read/Update/Delete/Search</td></tr>
<tr><td>R08</td><td>News CRUD + Search</td><td>News management</td><td>Create/Read/Update/Delete/Search</td></tr>
<tr><td>R09</td><td>User/Account CRUD + Search</td><td>User management</td><td>Create/Read/Update/Delete/Search</td></tr>
<tr><td>R10</td><td>Create/Update bằng popup dialog</td><td>Modal/Dialog + form state</td><td>Mở đúng mode, submit, close</td></tr>
<tr><td>R11</td><td>Delete confirmation</td><td>Confirm dialog/prompt</td><td>Cancel không xóa; confirm mới xóa</td></tr>
<tr><td>R12</td><td>Data model hợp lý</td><td>Mock data/service/localStorage</td><td>Role/status/category relation</td></tr>
</tbody>
</table>

### <span style="color:#1f4e78">**1.3 Phạm vi không bắt buộc**</span>

- Không bắt buộc Spring Boot backend thật.
- Không bắt buộc database thật.
- Không bắt buộc JWT/authentication production.
- Không bắt buộc deployment production.
- Không bắt buộc chức năng ngoài đề nếu chúng không giúp chứng minh rubric.

<span style="color:#1f4e78">**Ưu tiên:**</span>  Hoàn thành đúng và giải thích được core requirement trước khi thêm dark mode, chart, pagination hoặc thư viện nâng cao.

## <span style="color:#1f4e78">**2. HƯỚNG DẪN PHÂN TÍCH YÊU CẦU – PROBLEM UNDERSTANDING**</span>

Mục tiêu rubric: sinh viên chứng minh rằng mình hiểu bài toán trước khi code. Một project chạy được nhưng thiếu constraint hoặc không biết input/output sẽ không đạt điểm tối đa.

### <span style="color:#1f4e78">**2.1 Xác định màn hình và trách nhiệm**</span>

<table>
<thead>
<tr><th><b>Màn hình/khu vực</b></th><th><b>Trách nhiệm tối thiểu</b></th><th><b>Câu hỏi phải trả lời</b></th></tr>
</thead>
<tbody>
<tr><td>Login</td><td>Nhập credential; validate; login Admin/Admin; error khi sai.</td><td>Auth state lưu ở đâu? Sau login điều gì thay đổi?</td></tr>
</tbody>
</table>

<span style="color:#667085">Trang 4</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

<table>
<thead>
<tr><th><b>Màn hình/khu vực</b></th><th><b>Trách nhiệm tối thiểu</b></th><th><b>Câu hỏi phải trả lời</b></th></tr>
</thead>
<tbody>
<tr><td>Dashboard</td><td>Tổng quan; có thể thống kê đơn giản.</td><td>Dữ liệu nào có ý nghĩa để tổng hợp?</td></tr>
<tr><td>Category</td><td>Read/Create/Update/Delete/Search.</td><td>Field nào bắt buộc? Status biểu diễn thế<br />nào?</td></tr>
<tr><td>News</td><td>Read/Create/Update/Delete/Search; gắn<br />Category; status; tags nếu có.</td><td>categoryId liên hệ ra sao? createdBy là gì?</td></tr>
<tr><td>Users</td><td>Read/Create/Update/Delete/Search; role<br />Admin/Staff.</td><td>Role 1/2 hiển thị và validate ra sao?</td></tr>
<tr><td>Settings</td><td>Cấu hình/profile đơn giản nếu đề yêu cầu.</td><td>Phạm vi tối thiểu là gì?</td></tr>
</tbody>
</table>


## <span style="color:#1f4e78">2.2 Phác thảo dữ liệu trước khi code</span>

<table>
<thead>
<tr><th><b>Entity</b></th><th><b>Field tối thiểu theo đề/prompt</b></th><th><b>Quy tắc cần tự quyết định</b></th></tr>
</thead>
<tbody>
<tr><td>Category</td><td>id, name, status</td><td>id unique; name không rỗng; status 0/1.</td></tr>
<tr><td>News Article</td><td>id, title, content, categoryId, createdBy,<br />status, tags (nếu có)</td><td>categoryId phải tham chiếu category tồn tại;<br />status 0/1.</td></tr>
<tr><td>Account/User</td><td>id, username, password/mock password,<br />role, status (nếu dùng)</td><td>role 1=Admin, 2=Staff; username nên unique.</td></tr>
<tr><td>Session/Auth</td><td>currentUser hoặc isAuthenticated</td><td>Cách lưu state/localStorage; logout reset gì.</td></tr>
</tbody>
</table>


## <span style="color:#1f4e78">2.3 Bảng Input – Process – Output cho CRUD</span>

<table>
<thead>
<tr><th>Use case</th><th>Input</th><th>Process</th><th>Output/UI</th></tr>
</thead>
<tbody>
<tr><td>Read</td><td>Danh sách hiện có</td><td>map/render/filter status label</td><td>Table/list hoặc empty state</td></tr>
<tr><td>Create</td><td>Form rỗng → dữ liệu mới</td><td>validate → tạo id → immutable add</td><td>Record mới xuất hiện; dialog đóng</td></tr>
<tr><td>Update</td><td>Selected item + form</td><td>prefill → validate → replace by id</td><td>Đúng record được cập nhật</td></tr>
<tr><td>Delete</td><td>Selected id/item</td><td>confirm → immutable remove</td><td>Record mất khỏi list; cancel không xóa</td></tr>
<tr><td>Search</td><td>keyword (+ filter nếu có)</td><td>normalize → filter</td><td>Filtered list / no-result state</td></tr>
</tbody>
</table>


## <span style="color:#1f4e78">2.4 Worksheet – sinh viên phải điền trước khi bắt đầu</span>

- Component lớn của tôi là gì?
- Dữ liệu categories/news/users khởi tạo từ đâu?
- State nào local, state nào shared, state nào persistent?
- Create/Update dùng một modal chung hay hai modal? Vì sao?
- Search lọc theo field nào cho từng entity?
- Admin page được bảo vệ bằng conditional render hay Router?
- Reload trang có cần giữ login/dữ liệu không? Nếu có, lưu ở đâu?
- Khi danh sách rỗng hoặc không có kết quả search, UI hiển thị gì?
- Validation tối thiểu cho từng form là gì?

<span style="color:#667085">Trang 5</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

# <span style="color:#1f4e78">**3. HƯỚNG DẪN THIẾT KẾ GIẢI PHÁP – SOLUTION DESIGN & REASONING**</span>

## <span style="color:#1f4e78">**3.1 Component tree gợi ý – không phải đáp án bắt buộc**</span>

```text
App
 ├─ LoginPage
 └─ AdminLayout
    ├─ Header
    ├─ Sidebar/Menu
    └─ ContentArea / Outlet
       ├─ DashboardPage
       ├─ CategoryManagement
       ├─ NewsManagement
       ├─ UserManagement
       └─ SettingsPage
```

Sinh viên có thể chọn cấu trúc khác, nhưng phải giải thích được trách nhiệm của component, hướng truyền props/state và lý do đặt state ở vị trí đó.

## <span style="color:#1f4e78">**3.2 State ownership map**</span>

<table>
<thead>
<tr><th>Loại state</th><th>Ví dụ</th><th>Nên đặt ở đâu?</th><th>Lý do</th></tr>
</thead>
<tbody>
<tr><td>Local UI state</td><td>dialog open/<span style="color:#1f2937">close</span>, active tab, form error</td><td>Component dùng trực tiếp</td><td>Không cần chia sẻ rộng.</td></tr>
<tr><td>Form state</td><td>name/title/content/role/status</td><td>Form/dialog component</td><td>Gắn vòng đời form.</td></tr>
<tr><td>Selected item</td><td>selectedCategory/news/user</td><td>Management page hoặc dialog owner</td><td>Phục vụ update/delete.</td></tr>
<tr><td>Shared data</td><td>categories/news/users</td><td>Parent/context/service + state</td><td>Nhiều component cần đọc/cập nhật.</td></tr>
<tr><td>Auth state</td><td>currentUser/isAuthenticated</td><td><span style="color:#1f2937">App</span>/context hoặc storage + state</td><td>Chi phối quyền truy cập/layout.</td></tr>
<tr><td>Persistent state</td><td>mock data nếu yêu cầu giữ sau reload</td><td>localStorage + hydrate state</td><td>Không mất dữ liệu sau refresh.</td></tr>
</tbody>
</table>

## <span style="color:#1f4e78">**3.3 Thiết kế navigation**</span>

<table>
<thead>
<tr><th><b>Cách</b></th><th><b>Ưu điểm</b></th><th><b>Hạn chế</b></th><th><b>Khi phù hợp</b></th></tr>
</thead>
<tbody>
<tr><td>State navigation</td><td>Đơn giản; ít dependency</td><td>URL không phản ánh page; khó mở rộng/deep link</td><td>Khi bài chưa yêu cầu Router hoặc scope rất nhỏ</td></tr>
<tr><td>React Router</td><td>URL rõ; SPA navigation; dễ mở rộng</td><td>Cần cấu hình route/protected flow</td><td>Khi sinh viên đã học Router và muốn structure rõ</td></tr>
</tbody>
</table>

<span style="color:#1f4e78">**Điểm rubric:**</span> Không chấm cao chỉ vì dùng thư viện nâng cao. Điểm Solution Design đến từ quyết định phù hợp và giải thích được trade-off.

## <span style="color:#1f4e78">**3.4 Thiết kế CRUD dialog**</span>

```text
CREATE: click Add → mode=create → selected=null → empty form → validate → append new item → close
UPDATE: click Edit → mode=update → selected=item → prefill form → validate → replace item by id → close
DELETE: click Delete → selected=item → confirm → if accepted remove by id
```

## <span style="color:#1f4e78">**3.5 Thiết kế search**</span>

- Giữ nguyên source list; không ghi đè source list bằng filtered result.
- Normalize keyword (trim/lowercase) trước khi so sánh nếu phù hợp.
- Category: search theo name; News: title (và có thể content); User: username.
- Định nghĩa rõ search kết hợp filter hay chỉ keyword.
- Có no-result state và nút clear nếu UI cho phép.

<span style="color:#667085">Trang 6</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

## <span style="color:#1f4e78">3.6 Design decision record – tối thiểu 6 quyết định</span>

<table>
<thead>
<tr><th>Quyết định</th><th>Lựa chọn của tôi</th><th>Lý do</th><th>Ảnh hưởng nếu đổi yêu cầu</th></tr>
</thead>
<tbody>
<tr><td>Navigation</td><td></td><td></td><td></td></tr>
<tr><td>State ownership</td><td></td><td></td><td></td></tr>
<tr><td>Mock data persistence</td><td></td><td></td><td></td></tr>
<tr><td>CRUD dialog reuse</td><td></td><td></td><td></td></tr>
<tr><td>Search strategy</td><td></td><td></td><td></td></tr>
<tr><td>Folder structure</td><td></td><td></td><td></td></tr>
</tbody>
</table>


## <span style="color:#1f4e78">4. HƯỚNG DẪN TRIỂN KHAI THEO MILESTONE – IMPLEMENTATION</span>


**<span style="color:#9e0007">Không có source hoàn chỉnh:</span>** Mỗi milestone bên dưới chỉ chỉ ra cách làm, checkpoint và câu hỏi. Sinh viên phải tự viết code và chịu trách nhiệm với quyết định triển khai.


### <span style="color:#2f5597">Bước 1. Tạo project Vite đúng quy ước</span>


**<span style="color:#22527b">Mục tiêu:</span>** Có project React chạy được và tên folder StudentName_ClassCode.


#### <span style="color:#2f5597">Thao tác cần thực hiện</span>


- Tạo project Vite React theo công cụ lớp yêu cầu.
- cd vào thư mục; cài dependencies; chạy development server.
- Mở package.json và xác định script dev/build.
- Tạo Git repository nếu lớp yêu cầu.


#### <span style="color:#385723">Kết quả mong đợi</span>


- Trang mặc định chạy trên localhost.
- Tên project đúng quy ước.


#### <span style="color:#385723">Cách kiểm tra</span>


- Chạy npm run dev.
- Tắt server rồi chạy lại để chắc chắn môi trường tái lập.


#### <span style="color:#9c0006">Lỗi thường gặp / dấu hiệu cần xem lại</span>


- Tên project sai; tạo nhầm template; thiếu npm install; chạy lệnh ở sai thư mục.


#### <span style="color:#7f6000">Tự kiểm tra trước khi sang bước tiếp theo</span>


- package.json dùng để làm gì?
- npm install và npm run dev khác nhau gì?
- node_modules có nộp không? Vì sao?


### <span style="color:#2f5597">Bước 2. Phân tích HTML/CSS template</span>


**<span style="color:#22527b">Mục tiêu:</span>** Biết phần nào giữ nguyên, phần nào chuyển thành React component.


#### <span style="color:#2f5597">Thao tác cần thực hiện</span>


- Mở template và đánh dấu Header/Sidebar/Content/Footer.
- Liệt kê CSS/JS/assets đi kèm.
- Xác định asset nào đặt trong public/assets hoặc src/assets.
- Không copy toàn bộ HTML vào một component duy nhất.


#### <span style="color:#385723">Kết quả mong đợi</span>


- Có sơ đồ layout và danh sách component dự kiến.

<span style="color:#667085">Trang 7</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

## <span style="color:#385723">Cách kiểm tra</span>

- Đối chiếu template với component tree.
- Chỉ ra 3 phần có thể tái sử dụng.

## <span style="color:#9c0006">Lỗi thường gặp / dấu hiệu cần xem lại</span>

- Đường dẫn asset sai; nhúng script DOM cũ gây xung đột; giữ inline onclick thay vì React event.

## <span style="color:#7f6000">Tự kiểm tra trước khi sang bước tiếp theo</span>

- Phần nào là layout?
- CSS global và component CSS khác gì?
- DOM script cũ nào cần loại bỏ?

## <span style="color:#2f5597">Bước 3. Tạo Login Page và mock authentication</span>

**<span style="color:#22527b">Mục tiêu:</span>** Login Admin/Admin hoạt động; credential sai hiển thị lỗi.

## <span style="color:#2f5597">Thao tác cần thực hiện</span>

- Tạo form username/password bằng controlled inputs.
- Validate empty trước khi kiểm tra credential.
- Khi Admin/Admin đúng: cập nhật auth state và chuyển admin view.
- Khi sai: hiển thị thông báo; không vào admin view.
- Thiết kế logout/reset session.

## <span style="color:#385723">Kết quả mong đợi</span>

- Login đúng vào admin page; login sai không vào được.
- Có thông báo lỗi dễ hiểu.

## <span style="color:#385723">Cách kiểm tra</span>

- Test empty, wrong user, wrong password, correct Admin/Admin, logout.

## <span style="color:#9c0006">Lỗi thường gặp / dấu hiệu cần xem lại</span>

- So sánh sai hoa/thường không chú ý; auth state không reset; lưu password thật không cần thiết; login logic rải rác.

## <span style="color:#7f6000">Tự kiểm tra trước khi sang bước tiếp theo</span>

- Controlled input là gì?
- State nào đổi khi login thành công?
- Nếu reload, auth state còn không? Vì sao?

## <span style="color:#2f5597">Bước 4. Tạo Header, logo AI và Admin Layout</span>

**<span style="color:#22527b">Mục tiêu:</span>** Có master layout dùng chung cho các trang quản trị.

## <span style="color:#2f5597">Thao tác cần thực hiện</span>

- Tạo logo bằng công cụ AI theo quy định; lưu asset.
- Tách Header và Sidebar/Menu.
- Tạo content region cho page hiện tại.
- Hiển thị tên hệ thống/current user nếu phù hợp.

## <span style="color:#385723">Kết quả mong đợi</span>

- Header/logo/menu hiển thị ổn; layout bám template.

## <span style="color:#385723">Cách kiểm tra</span>

- Resize cửa sổ cơ bản; kiểm tra asset; kiểm tra menu không che content.

## <span style="color:#9c0006">Lỗi thường gặp / dấu hiệu cần xem lại</span>

- Asset 404; CSS template áp sai scope; một page tự tạo lại Header làm lặp code.

## <span style="color:#7f6000">Tự kiểm tra trước khi sang bước tiếp theo</span>

- Props nào Header cần?
- Vì sao Header/Sidebar nên tái sử dụng?

<span style="color:#667085">Trang 8</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

## <span style="color:#2f5597">**Bước 5. Tạo menu và navigation**</span>

**<span style="color:#1f4e78">Mục tiêu:</span>** Dashboard/Category/News/Users/Settings chuyển đúng view.

### <span style="color:#2f5597">**Thao tác cần thực hiện**</span>

- Chọn state navigation hoặc React Router.
- Tạo cấu hình menu rõ ràng.
- Tô active menu.
- Nếu có auth guard, thử truy cập admin khi chưa login.

### <span style="color:#385723">**Kết quả mong đợi**</span>

- Bấm menu hiển thị đúng page; không full reload khi SPA.

### <span style="color:#385723">**Cách kiểm tra**</span>

- Click toàn bộ menu; back/forward nếu dùng Router; logout rồi thử admin.

### <span style="color:#9c0006">**Lỗi thường gặp / dấu hiệu cần xem lại**</span>

- Dùng &lt;a&gt; gây reload không chủ ý; route/path sai; active state không đồng bộ.

### <span style="color:#7f6000">**Tự kiểm tra trước khi sang bước tiếp theo**</span>

- Vì sao chọn navigation hiện tại?
- Nếu thêm Reports page, cần sửa ở đâu?

## <span style="color:#2f5597">**Bước 6. Tạo mock data và service/data layer**</span>

**<span style="color:#1f4e78">Mục tiêu:</span>** Có dữ liệu hợp lý cho Category, News, Users và đường thay thế API sau này.

### <span style="color:#2f5597">**Thao tác cần thực hiện**</span>

- Tạo data mẫu có id duy nhất, status/role hợp lệ.
- Tách data/service khỏi UI nếu có thể.
- Định nghĩa thao tác get/create/update/delete ở mức kiến trúc.
- Nếu dùng localStorage, định nghĩa quy trình load/save rõ ràng.

### <span style="color:#385723">**Kết quả mong đợi**</span>

- Các trang đọc được data; relation categoryId hợp lý.

### <span style="color:#385723">**Cách kiểm tra**</span>

- Kiểm tra id unique; News trỏ category tồn tại; role/status đúng miền giá trị.

### <span style="color:#9c0006">**Lỗi thường gặp / dấu hiệu cần xem lại**</span>

- Mutate mảng gốc; id trùng; categoryId không tồn tại; parse localStorage không kiểm tra null.

### <span style="color:#7f6000">**Tự kiểm tra trước khi sang bước tiếp theo**</span>

- Vì sao tách service?
- Sau này thay bằng Spring Boot API thì thay tầng nào?

## <span style="color:#2f5597">**Bước 7. Hoàn thiện READ cho 3 khu vực quản lý**</span>

**<span style="color:#1f4e78">Mục tiêu:</span>** Category, News, Users hiển thị dữ liệu có empty state.

### <span style="color:#2f5597">**Thao tác cần thực hiện**</span>

- Render list/table bằng map.
- Dùng key ổn định.
- Chuyển role/status số thành nhãn dễ hiểu.
- Thiết kế empty state.

### <span style="color:#385723">**Kết quả mong đợi**</span>

- Bảng/list hiển thị đúng record và field.

### <span style="color:#385723">**Cách kiểm tra**</span>

- Test có dữ liệu và mảng rỗng; kiểm tra console warning key.

<span style="color:#667085">Trang 9</span>

SBA301 • Assignment 01 • Working with ReactJS application

### <span style="color:#9c0006">Lỗi thường gặp / dấu hiệu cần xem lại</span>

- Dùng index làm key không cần thiết; lỗi field name; status hiển thị 0/1 khó đọc.

### <span style="color:#7f6000">Tự kiểm tra trước khi sang bước tiếp theo</span>

- Vì sao cần key?
- UI re-render khi data state đổi như thế nào?

## <span style="color:#2f5597">Bước 8. Hoàn thiện CREATE/UPDATE bằng popup dialog</span>

> **<span style="color:#22527b">Mục tiêu:</span>** Create/Update đúng yêu cầu và dùng dialog.

### <span style="color:#2f5597">Thao tác cần thực hiện</span>

- Thiết kế mode create/update hoặc tách hai flow rõ.
- Create mở form rỗng; Update prefill selected item.
- Validate field bắt buộc.
- Submit dùng immutable update.
- Reset/close dialog đúng lúc.

### <span style="color:#385723">Kết quả mong đợi</span>

- Create thêm đúng record; Update đúng item; invalid input không cập nhật.

### <span style="color:#385723">Cách kiểm tra</span>

- Test Create hợp lệ/thiếu field; Update từng item; Cancel; mở Edit liên tiếp 2 record.

### <span style="color:#9c0006">Lỗi thường gặp / dấu hiệu cần xem lại</span>

- State cũ còn trong Create; update nhầm id; mutate selected object; đóng modal trước khi validate.

### <span style="color:#7f6000">Tự kiểm tra trước khi sang bước tiếp theo</span>

- Create và Update khác nhau ở state nào?
- Vì sao không mutate trực tiếp array/object?

## <span style="color:#2f5597">Bước 9. Hoàn thiện DELETE với confirmation</span>

> **<span style="color:#22527b">Mục tiêu:</span>** Chỉ xóa sau khi user xác nhận.

### <span style="color:#2f5597">Thao tác cần thực hiện</span>

- Lưu selected id/item.
- Hiển thị confirmation prompt/dialog.
- Confirm → immutable remove; Cancel → không đổi data.
- Nếu entity có relation, xác định policy đơn giản và nhất quán.

### <span style="color:#385723">Kết quả mong đợi</span>

- Confirm xóa đúng item; cancel giữ nguyên.

### <span style="color:#385723">Cách kiểm tra</span>

- Test first/middle/last/only record; cancel; xóa item vừa tạo.

### <span style="color:#9c0006">Lỗi thường gặp / dấu hiệu cần xem lại</span>

- Xóa nhầm do index; không reset selected item; UI chưa cập nhật; relation trở nên invalid.

### <span style="color:#7f6000">Tự kiểm tra trước khi sang bước tiếp theo</span>

- filter và splice khác nhau gì với React state?
- Nếu xóa Category đang được News dùng thì bạn xử lý thế nào?

## <span style="color:#2f5597">Bước 10. Hoàn thiện SEARCH</span>

> **<span style="color:#22527b">Mục tiêu:</span>** Search không phá source data và hoạt động cho các entity yêu cầu.

### <span style="color:#2f5597">Thao tác cần thực hiện</span>

- Tạo keyword state riêng từng page hoặc logic tái sử dụng.
- Lọc theo field phù hợp; normalize keyword.

<span style="color:#667085">Trang 10</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

- <span style="color:#000000">Hiển thị no-result state; hỗ trợ clear search nếu phù hợp.</span>
- Đảm bảo CRUD sau search vẫn cập nhật source list đúng.

## <span style="color:#385723">**Kết quả mong đợi**</span>

- Keyword thay đổi → result đúng; clear → full list.

## <span style="color:#385723">**Cách kiểm tra**</span>

- Test chữ hoa/thường, khoảng trắng, no result, create/update trong khi đang search.

## <span style="color:#9c0006">**Lỗi thường gặp / dấu hiệu cần xem lại**</span>

- Ghi đè source list; search trên filtered list cũ; null field gây lỗi toLowerCase.

## <span style="color:#7f6000">**Tự kiểm tra trước khi sang bước tiếp theo**</span>

- Source data và displayed data khác nhau như thế nào?
- Nếu có API thật, search sẽ thay đổi ra sao?

## <span style="color:#2f5597">**Bước 11. Hoàn thiện UI/UX, README và evidence**</span>

**<span style="color:#1f4e78">**Mục tiêu:**</span>** Project ở trạng thái có thể nộp và có thể bảo vệ.

## <span style="color:#2f5597">**Thao tác cần thực hiện**</span>

- Kiểm tra responsive cơ bản, label/button/dialog consistency.
- Loại console.log thừa nhưng giữ debug evidence riêng nếu cần.
- Viết README với setup/run/test credential/features/limitations/AI usage.
- Tạo screenshot/evidence và test matrix.
- Commit/tag phiên bản nộp nếu dùng Git.

## <span style="color:#385723">**Kết quả mong đợi**</span>

- Người khác clone/copy source, npm install và chạy được theo README.

## <span style="color:#385723">**Cách kiểm tra**</span>

- Thử chạy từ terminal mới; đọc README như người chưa biết project; chạy full smoke test.

## <span style="color:#9c0006">**Lỗi thường gặp / dấu hiệu cần xem lại**</span>

- Thiếu README; dependencies không khớp; hard-coded path máy cá nhân; screenshot không chứng minh chức năng.

## <span style="color:#7f6000">**Tự kiểm tra trước khi sang bước tiếp theo**</span>

- Một người khác cần mấy bước để chạy project?
- Giới hạn nào của bài cần nêu rõ?

## <span style="color:#1f4e78">**4.12 Bảng milestone và bằng chứng**</span>


<table>
<thead>
<tr><th>Milestone</th><th>Gate đạt</th><th>Evidence nên lưu</th></tr>
</thead>
<tbody>
<tr><td>M1</td><td>Project chạy</td><td>Screenshot terminal + UI</td></tr>
<tr><td>M2</td><td>Template decomposition</td><td>Component sketch</td></tr>
<tr><td>M3</td><td>Login</td><td>3–5 login tests</td></tr>
<tr><td>M4</td><td>Layout</td><td>Admin screenshot</td></tr>
<tr><td>M5</td><td>Navigation</td><td>Menu demo</td></tr>
<tr><td>M6</td><td>Data/service</td><td>Data model note</td></tr>
<tr><td>M7</td><td>Read</td><td>3 management lists</td></tr>
<tr><td>M8</td><td>Create/Update</td><td>Modal tests</td></tr>
<tr><td>M9</td><td>Delete</td><td>Confirm/cancel evidence</td></tr>
<tr><td>M10</td><td>Search</td><td>Search cases</td></tr>
<tr><td>M11</td><td>Release candidate</td><td>README + full test matrix + Git tag/zip</td></tr>
</tbody>
</table>

<span style="color:#667085">Trang 11</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

## <span style="color:#1f4e78">**5. HƯỚNG DẪN KIỂM THỬ – TESTING & VERIFICATION**</span>

Rubric không chỉ hỏi “chạy được chưa?” mà còn đánh giá chất lượng test. Sinh viên nên chuẩn bị test theo 3 lớp: normal case, negative case và edge case.

### <span style="color:#1f4e78">**5.1 Test Matrix bắt buộc**</span>

<table>
<thead>
<tr><th>#</th><th>Nhóm</th><th>Case</th><th>Thao tác</th><th>Kết quả mong đợi</th><th>Actual/Pass</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Login</td><td>Empty</td><td>Submit khi username/password rỗng</td><td>Không login; hiển thị validation</td><td></td></tr>
<tr><td>2</td><td>Login</td><td>Wrong credential</td><td>Nhập sai username hoặc password</td><td>Không vào admin page</td><td></td></tr>
<tr><td>3</td><td>Login</td><td>Valid Admin</td><td>Admin/Admin</td><td>Vào admin page</td><td></td></tr>
<tr><td>4</td><td>Auth</td><td>Logout</td><td>Logout sau khi login</td><td>Về login; admin không còn truy cập được</td><td></td></tr>
<tr><td>5</td><td>Layout</td><td>Menu completeness</td><td>Quan sát sidebar/menu</td><td>Có đủ 5 mục theo đề</td><td></td></tr>
<tr><td>6</td><td>Navigation</td><td>All menus</td><td>Bấm từng menu</td><td>Đúng nội dung; không full reload nếu SPA</td><td></td></tr>
<tr><td>7</td><td>Category</td><td>Read</td><td>Mở Category Management</td><td>Danh sách hiển thị đúng</td><td></td></tr>
<tr><td>8</td><td>Category</td><td>Create valid</td><td>Mở Add dialog, nhập hợp lệ, submit</td><td>Record mới xuất hiện</td><td></td></tr>
<tr><td>9</td><td>Category</td><td>Create invalid</td><td>Bỏ trống field bắt buộc</td><td>Không thêm; có feedback</td><td></td></tr>
<tr><td>10</td><td>Category</td><td>Update</td><td>Edit record, đổi field, save</td><td>Đúng record được cập nhật</td><td></td></tr>
<tr><td>11</td><td>Category</td><td>Delete cancel</td><td>Delete → Cancel</td><td>Record vẫn còn</td><td></td></tr>
<tr><td>12</td><td>Category</td><td>Delete confirm</td><td>Delete → Confirm</td><td>Đúng record bị xóa</td><td></td></tr>
<tr><td>13</td><td>Category</td><td>Search hit</td><td>Nhập keyword tồn tại</td><td>Danh sách lọc đúng</td><td></td></tr>
<tr><td>14</td><td>Category</td><td>Search miss</td><td>Nhập keyword không tồn tại</td><td>No-result state</td><td></td></tr>
<tr><td>15</td><td>News</td><td>Read</td><td>Mở News Management</td><td>Danh sách hiển thị đúng</td><td></td></tr>
<tr><td>16</td><td>News</td><td>Create valid</td><td>Mở Add dialog, nhập hợp lệ, submit</td><td>Record mới xuất hiện</td><td></td></tr>
<tr><td>17</td><td>News</td><td>Create invalid</td><td>Bỏ trống field bắt buộc</td><td>Không thêm; có feedback</td><td></td></tr>
<tr><td>18</td><td>News</td><td>Update</td><td>Edit record, đổi field, save</td><td>Đúng record được cập nhật</td><td></td></tr>
<tr><td>19</td><td>News</td><td>Delete cancel</td><td>Delete → Cancel</td><td>Record vẫn còn</td><td></td></tr>
<tr><td>20</td><td>News</td><td>Delete confirm</td><td>Delete → Confirm</td><td>Đúng record bị xóa</td><td></td></tr>
<tr><td>21</td><td>News</td><td>Search hit</td><td>Nhập keyword tồn tại</td><td>Danh sách lọc đúng</td><td></td></tr>
<tr><td>22</td><td>News</td><td>Search miss</td><td>Nhập keyword không tồn tại</td><td>No-result state</td><td></td></tr>
<tr><td>23</td><td>Users</td><td>Read</td><td>Mở Users Management</td><td>Danh sách hiển thị đúng</td><td></td></tr>
<tr><td>24</td><td>Users</td><td>Create valid</td><td>Mở Add dialog, nhập hợp lệ, submit</td><td>Record mới xuất hiện</td><td></td></tr>
<tr><td>25</td><td>Users</td><td>Create invalid</td><td>Bỏ trống field bắt buộc</td><td>Không thêm; có feedback</td><td></td></tr>
<tr><td>26</td><td>Users</td><td>Update</td><td>Edit record, đổi field, save</td><td>Đúng record được cập nhật</td><td></td></tr>
<tr><td>27</td><td>Users</td><td>Delete cancel</td><td>Delete → Cancel</td><td>Record vẫn còn</td><td></td></tr>
<tr><td>28</td><td>Users</td><td>Delete confirm</td><td>Delete → Confirm</td><td>Đúng record bị xóa</td><td></td></tr>
</tbody>
</table>

<span style="color:#667085">Trang 12</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

<table>
<thead>
<tr><th>#</th><th>Nhóm</th><th>Case</th><th>Thao tác</th><th>Kết quả mong đợi</th><th>Actual/Pass</th></tr>
</thead>
<tbody>
<tr><td>29</td><td>Users</td><td>Search hit</td><td>Nhập keyword tồn tại</td><td>Danh sách lọc đúng</td><td></td></tr>
<tr><td>30</td><td>Users</td><td>Search miss</td><td>Nhập keyword không tồn tại</td><td>No-result state</td><td></td></tr>
<tr><td>31</td><td>News</td><td>Relation</td><td>Create/Update news chọn category</td><td>categoryId hợp lệ</td><td></td></tr>
<tr><td>32</td><td>User</td><td>Role</td><td>Hiển thị role 1/2</td><td>Hiển thị Admin/Staff hợp lý</td><td></td></tr>
<tr><td>33</td><td>Status</td><td>Display</td><td>Record status 0/1</td><td>Hiển thị Inactive/Active</td><td></td></tr>
<tr><td>34</td><td>Data</td><td>Empty state</td><td>Tạo mảng rỗng hoặc xóa hết</td><td>UI không crash; có thông báo</td><td></td></tr>
<tr><td>35</td><td>Persistence</td><td>Reload</td><td>Reload nếu dùng localStorage</td><td>Dữ liệu/session theo đúng design decision</td><td></td></tr>
</tbody>
</table>

### <span style="color:#1f4e78">**5.2 Test quality – cách đạt điểm cao**</span>

- Không chỉ test happy path; phải có invalid form, cancel delete, empty list và no-result search.
- Expected result phải cụ thể, có thể quan sát; tránh ghi “hoạt động đúng”.
- Nếu bug được phát hiện, ghi defect → fix → retest.
- Nếu dùng localStorage, test cả first-run khi storage chưa có và reload sau CRUD.
- Nếu dùng Router, test direct URL/back-forward nếu nằm trong design.

### <span style="color:#1f4e78">**5.3 Evidence package**</span>

<table>
<thead>
<tr><th>Evidence</th><th>Nội dung</th><th>Dùng để chứng minh</th></tr>
</thead>
<tbody>
<tr><td>E01</td><td>Screenshot login success/error</td><td>Problem understanding + implementation</td></tr>
<tr><td>E02</td><td>CRUD screenshots hoặc demo trực tiếp</td><td>Implementation</td></tr>
<tr><td>E03</td><td>Test matrix có Actual/Pass</td><td>Testing</td></tr>
<tr><td>E04</td><td>Debug log 2–3 lỗi thật</td><td>Debugging</td></tr>
<tr><td>E05</td><td>Component/data/state sketch</td><td>Design</td></tr>
<tr><td>E06</td><td>AI log nếu có</td><td>AI Usage</td></tr>
<tr><td>E07</td><td>Git history (nếu dùng)</td><td>Engineering process</td></tr>
<tr><td>E08</td><td>README</td><td>Reproducibility</td></tr>
</tbody>
</table>

## <span style="color:#1f4e78">**6. HƯỚNG DẪN DEBUG – DEBUGGING & PROBLEM SOLVING**</span>

### <span style="color:#1f4e78">**6.1 Quy trình debug 5 bước**</span>

1. Mô tả triệu chứng bằng hành vi quan sát được, không đoán nguyên nhân ngay.
2. Khoanh vùng component/state/event liên quan.
3. Kiểm tra dữ liệu vào: props, state, selected item, form values.
4. Kiểm tra điểm biến đổi: event handler, filter/map, setter, navigation.
5. Sửa thay đổi nhỏ nhất → chạy lại đúng test case → kiểm tra regression.

### <span style="color:#1f4e78">**6.2 Debug decision table**</span>

<table>
<thead>
<tr><th><b>Triệu chứng</b></th><th><b>Điểm kiểm tra đầu tiên</b></th><th><b>Câu hỏi dẫn đường</b></th></tr>
</thead>
<tbody>
<tr><td>Component không hiển thị</td><td>Import/export + console</td><td>Tên file/path đúng? Component có return JSX?</td></tr>
<tr><td>List rỗng bất thường</td><td>Data/state trước map</td><td>Data có thật? Field name đúng?</td></tr>
<tr><td>Modal không mở</td><td>show + onClick + props</td><td>Event có chạy? show có đổi?</td></tr>
<tr><td>Edit sai item</td><td>selected id + update condition</td><td>Dùng id hay index? selected có đúng?</td></tr>
<tr><td>Delete không cập nhật UI</td><td>new array + setter</td><td>Có mutate trực tiếp? setter được gọi?</td></tr>
</tbody>
</table>

<span style="color:#667085">Trang 13</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

<table>
<thead>
<tr>
<th><b>Triệu chứng</b></th>
<th><b>Điểm kiểm tra đầu tiên</b></th>
<th><b>Câu hỏi dẫn đường</b></th>
</tr>
</thead>
<tbody>
<tr>
<td>Search sai</td>
<td>keyword + source list</td>
<td>Có ghi đè source data? normalize chưa?</td>
</tr>
<tr>
<td>Login không vào admin</td>
<td>credential + auth state</td>
<td>Condition đúng? navigation/conditional render đúng?</td>
</tr>
<tr>
<td>Reload mất dữ liệu</td>
<td>storage strategy</td>
<td>Design có yêu cầu persistence? hydrate/save ở đâu?</td>
</tr>
</tbody>
</table>

<table>
<thead>
<tr><th>Lỗi</th><th>Giả thuyết</th><th>Cách kiểm tra</th><th>Root cause</th><th>Fix</th><th>Retest</th></tr>
</thead>
<tbody>
<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
</tbody>
</table>

### <span style="color:#1f4e78">6.3 Debug log mẫu để sinh viên tự ghi</span>


**<span style="color:#385723">**Trong buổi chấm:**</span>**  Nếu giảng viên đưa ra một bug mới, hãy nói thành tiếng: triệu chứng → giả thuyết → nơi kiểm tra → bằng chứng → sửa. Đây là cách chứng minh Debugging & Problem Solving.

## <span style="color:#1f4e78">7. HƯỚNG DẪN CHUẨN BỊ GIẢI THÍCH CODE – CODE EXPLANATION</span>


Sinh viên phải mở được code của mình và giải thích theo luồng thực thi. Không nên trả lời bằng định nghĩa thuộc lòng nếu không chỉ được vị trí code tương ứng.

### <span style="color:#1f4e78">7.1 Khung trả lời 5 tầng</span>

<table>
<thead>
<tr><th><b>Tầng</b></th><th><b>Cách giải thích</b></th></tr>
</thead>
<tbody>
<tr><td>1. Purpose</td><td>File/component này giải quyết trách nhiệm gì?</td></tr>
<tr><td>2. Input</td><td>Props/state/data/service nào đi vào?</td></tr>
<tr><td>3. Trigger</td><td>Event/useEffect/navigation nào kích hoạt?</td></tr>
<tr><td>4. Transform</td><td>Logic nào validate/filter/update dữ liệu?</td></tr>
<tr><td>5. Output</td><td>State/UI/navigation nào thay đổi và React render lại ra sao?</td></tr>
</tbody>
</table>

### <span style="color:#1f4e78">7.2 Các chủ đề phải giải thích được</span>


- Project structure và trách nhiệm các thư mục/component.
- JSX, component, props, state; props khác state.
- Re-render: điều gì làm state đổi và UI cập nhật.
- map + key; conditional rendering; empty/no-result state.
- onClick/onChange/onSubmit; preventDefault.
- Controlled form và validation.
- Immutable update cho create/update/delete.
- Modal state: show/mode/selected item/form data.
- CRUD flow và Search flow.
- Mock authentication/login/logout.
- Navigation nếu dùng state hoặc Router.
- localStorage/service layer nếu có.

### <span style="color:#1f4e78">7.3 “Mở file và chỉ code” – rehearsal checklist</span>

<table>
<thead>
<tr><th><b>Yêu cầu rehearsal</b></th><th><b>Tôi có thể làm trong ≤ 30 giây?</b></th></tr>
</thead>
<tbody>
<tr><td>Mở file xử lý login và chỉ condition Admin/Admin</td><td>□</td></tr>
</tbody>
</table>

<span style="color:#667085">Trang 14</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

<table>
<thead>
<tr><th>Yêu cầu rehearsal</th><th>Tôi có thể làm trong ≤ 30 giây?</th></tr>
</thead>
<tbody>
<tr><td>Mở nơi lưu auth state / logout</td><td>□</td></tr>
<tr><td>Mở Category create/update logic</td><td>□</td></tr>
<tr><td>Mở News relation với categoryId</td><td>□</td></tr>
<tr><td>Mở User role mapping</td><td>□</td></tr>
<tr><td>Mở delete confirmation logic</td><td>□</td></tr>
<tr><td>Mở search logic và chỉ source list vs displayed list</td><td>□</td></tr>
<tr><td>Mở modal state và giải thích create/update mode</td><td>□</td></tr>
<tr><td>Mở nơi lưu/khởi tạo localStorage nếu có</td><td>□</td></tr>
<tr><td>Mở route/menu config nếu dùng Router</td><td>□</td></tr>
</tbody>
</table>

## <span style="color:#1f4e78">8. HƯỚNG DẪN XỬ LÝ YÊU CẦU THAY ĐỔI – MODIFICATION / TRANSFER TASK</span>

Mục tiêu: chứng minh sinh viên không chỉ nhớ code hiện tại mà có thể chuyển kiến thức sang yêu cầu mới. Khi luyện, không dùng AI trong lúc thực hiện modification nếu mô phỏng buổi đánh giá trực tiếp.

### <span style="color:#1f4e78">8.1 Bài luyện mức cơ bản</span>

- Thêm nút Reset trong Create/Update dialog.
- Thêm validation email cho User.
- Thêm field status cho News nếu hiện chưa có UI.
- Thêm filter Active/Inactive.
- Thêm success message sau Create/Update/Delete.

### <span style="color:#1f4e78">8.2 Bài luyện mức trung bình</span>

- Thêm role Staff: đăng nhập được; không thấy Users; chỉ truy cập News/Category theo yêu cầu giả định.
- Thêm pagination cho News.
- Thêm sort theo title hoặc createdAt.
- Kết hợp search + category filter.
- Cảnh báo khi đóng dialog có form đang thay đổi.

### <span style="color:#1f4e78">8.3 Bài luyện nâng cao</span>

- Thay mock array bằng json-server/mock API.
- Tách service layer để sẵn sàng gọi Spring Boot.
- Thêm tags cho News và cập nhật form/list/search.
- Dashboard thống kê số News/Category/User và active/inactive.
- Dark mode có persistent preference.

### <span style="color:#1f4e78">8.4 Impact Analysis Worksheet</span>


<table>
<thead>
<tr><th>Change request</th><th>Component ảnh hưởng</th><th>State/data ảnh hưởng</th><th><b>UI ảnh hưởng</b></th><th><b>Test mới/cũ phải sửa</b></th></tr>
</thead>
<tbody>
<tr><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td><td></td></tr>
</tbody>
</table>

<span style="color:#385723">**Cách trả lời tốt:**</span> Trước khi code modification, hãy nói ngắn: “Yêu cầu này ảnh hưởng data model → form → list rendering → validation → test cases”. Sau đó mới sửa.

<span style="color:#667085">Trang 15</span>

<span style="color:#646e83">SBA301 • Assignment 01 • Working with ReactJS application</span>

## <span style="color:#1f4e78">9. HƯỚNG DẪN SỬ DỤNG AI CÓ KIỂM SOÁT – AI USAGE & ENGINEERING PRACTICE</span>


### <span style="color:#1f4e78">9.1 AI có thể hỗ trợ</span>


- Giải thích concept hoặc một đoạn code do sinh viên đã viết.
- Gợi ý component structure hoặc state model.
- Đưa giả thuyết debug và checklist kiểm tra.
- Sinh test case/edge case để sinh viên chọn và kiểm chứng.
- Review naming, accessibility, form validation, README outline.
- Tạo prompt hình ảnh/logo cho FUNewsManagementSystem.


### <span style="color:#1f4e78">9.2 AI không được thay thế năng lực</span>


- Không yêu cầu AI tạo toàn bộ assignment để nộp.
- Không copy source trọn bộ mà không hiểu.
- Không dùng AI để che giấu việc không giải thích được state/event/data flow.
- Không coi output AI là đúng nếu chưa chạy/test/đối chiếu yêu cầu.


### <span style="color:#1f4e78">9.3 Quy trình AI → Verify → Adopt</span>


```text
1) Ask: đặt câu hỏi cụ thể
2) Inspect: đọc và xác định giả định của AI
3) Adapt: chỉnh cho project của mình
4) Run: chạy đúng test case
5) Explain: tự giải thích được logic
6) Record: ghi prompt + thay đổi + cách kiểm chứng
```


### <span style="color:#1d4d77">9.4 AI usage log</span>

<table>
<thead>
<tr>
<th>#</th>
<th>Prompt</th>
<th>Mục đích</th>
<th>Gợi ý AI</th>
<th>Tôi đã kiểm chứng thế nào?</th>
<th>Tôi đã sửa gì?</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>


## <span style="color:#1f4e78">10. RUBRIC ĐÁNH GIÁ – 10.0 ĐIỂM</span>


Rubric đánh giá năng lực thực chất, không chỉ đánh giá việc sản phẩm “có chạy”. Mỗi tiêu chí có dấu hiệu quan sát được qua sản phẩm, demo, interview, test/debug và modification task.

<table>
<thead>
<tr><th>#</th><th>Tiêu chí</th><th>Điểm tối đa</th><th>Bằng chứng chính</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Problem Understanding</td><td>1.0</td><td>Requirement map + trả lời<br />constraints/input/output</td></tr>
<tr><td>2</td><td>Solution Design &#x26; Reasoning</td><td>1.5</td><td>Component/data/state design +<br />design decisions</td></tr>
<tr><td>3</td><td>Implementation</td><td>2.0</td><td>Project chạy + core functions +<br />code structure</td></tr>
<tr><td>4</td><td>Testing &#x26; Verification</td><td>1.5</td><td>Test matrix + edge case +<br />evidence</td></tr>
<tr><td>5</td><td>Debugging &#x26; Problem Solving</td><td>1.5</td><td>Phân tích/sửa lỗi + debug log/live<br />task</td></tr>
<tr><td>6</td><td>Code Explanation</td><td>1.0</td><td>Interview + mở code và giải thích<br />flow</td></tr>
<tr><td>7</td><td>Modification / Transfer Task</td><td>1.0</td><td>Thay đổi requirement nhỏ và<br />kiểm thử lại</td></tr>
</tbody>
</table>

<span style="color:#667085">Trang 16</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

<table>
<thead>
<tr><th>#</th><th>Tiêu chí</th><th><b>Điểm tối đa</b></th><th><b>Bằng chứng chính</b></th></tr>
</thead>
<tbody>
<tr><td>8</td><td>AI Usage &#x26; Engineering Practice</td><td>0.5</td><td>AI log + verification + không phụ thuộc AI</td></tr>
</tbody>
</table>

<table>
<thead>
<tr><th>Tiêu chí</th><th>Excellent / Tối đa</th><th>Good / Khá</th><th>Fair / Trung bình</th><th>Poor / Chưa đạt</th></tr>
</thead>
<tbody>
<tr><td>1. Problem Understanding – 1.0</td><td>0.9–1.0: Nêu đúng toàn bộ scope; chỉ ra màn hình/entity/CRUD+Search/constraints; giải thích input-output và relation.</td><td>0.7–0.8: Hiểu phần lớn; thiếu 1–2 chi tiết nhỏ nhưng không sai core requirement.</td><td>0.4–0.6: Hiểu rời rạc; bỏ sót constraint quan trọng hoặc không rõ input/output.</td><td>0–0.3: Không mô tả được bài toán; nhầm core requirement hoặc chỉ dựa vào code đã có.</td></tr>
<tr><td>2. Solution Design &#x26; Reasoning – 1.5</td><td>1.35–1.5: Component/data/state/auth/navigation thiết kế hợp lý; nêu trade-off và impact khi thay đổi.</td><td>1.05–1.30: Thiết kế hợp lý, giải thích được phần chính; một số quyết định còn theo thói quen.</td><td>0.60–1.00: Cấu trúc chạy được nhưng state/component placement chưa rõ; khó giải thích design decision.</td><td>0–0.55: Thiết kế chắp vá; logic rải rác; không biết vì sao đặt code/state như vậy.</td></tr>
<tr><td>3. Implementation – 2.0</td><td>1.8–2.0: Project chạy ổn; login/layout/menu/CRUD+Search/dialog/confirm đầy đủ; code rõ, state update đúng.</td><td>1.4–1.75: Core functions hầu hết chạy; có lỗi nhỏ hoặc code quality chưa đều.</td><td>0.8–1.35: Chạy một phần; thiếu/mất ổn định ở một số CRUD/Search/dialog; code khó bảo trì.</td><td>0–0.75: Project không chạy hoặc thiếu nhiều core requirements; sao chép/không làm chủ code.</td></tr>
<tr><td>4. Testing &#x26; Verification – 1.5</td><td>1.35–1.5: Test matrix đầy đủ normal/negative/edge; có expected/actual/evidence; retest bug fix.</td><td>1.05–1.30: Test core functions và một số edge case; evidence tương đối rõ.</td><td>0.60–1.00: Test chủ yếu happy path; thiếu edge case/actual evidence.</td><td>0–0.55: Hầu như không có test case có cấu trúc; chỉ demo ngẫu nhiên.</td></tr>
<tr><td>5. Debugging &#x26; Problem Solving – 1.5</td><td>1.35–1.5: Khoanh vùng có hệ thống, dùng DevTools/log/debugger hợp lý, tìm root cause và retest.</td><td>1.05–1.30: Sửa được lỗi phổ biến, giải thích nguyên nhân tương đối rõ.</td><td>0.60–1.00: Thử-sai nhiều; cần gợi ý; sửa được nhưng chưa rõ root cause.</td><td>0–0.55: Không biết bắt đầu debug; phụ thuộc người khác/AI để sửa.</td></tr>
<tr><td>6. Code Explanation – 1.0</td><td>0.9–1.0: Mở đúng file và giải thích rõ purpose-input-trigger-transform-output; hiểu state/props/event/CRUD flow.</td><td>0.7–0.8: Giải thích được phần lớn code mình viết; còn một số chi tiết chưa sâu.</td><td>0.4–0.6: Giải thích cú pháp cơ bản nhưng không theo được luồng dữ liệu/thực thi.</td><td>0–0.3: Không giải thích được code quan trọng hoặc câu trả lời mâu thuẫn với source.</td></tr>
<tr><td>7. Modification / Transfer – 1.0</td><td>0.9–1.0: Phân tích impact, sửa requirement nhỏ đúng, test lại và giải thích thay đổi.</td><td>0.7–0.8: Thực hiện được thay đổi với ít gợi ý; test cơ bản.</td><td>0.4–0.6: Cần nhiều gợi ý; sửa được một phần hoặc gây regression.</td><td>0–0.3: Không thể sửa yêu cầu nhỏ nếu không có mẫu sẵn.</td></tr>
<tr><td>8. AI Usage &#x26; Engineering Practice – 0.5</td><td>0.45–0.5: Dùng AI minh bạch, prompt có mục tiêu, tự kiểm chứng/chỉnh sửa, giải thích được kết quả.</td><td>0.35–0.4: Dùng AI hợp lệ và có kiểm chứng nhưng log/giải trình chưa đầy đủ.</td><td>0.20–0.30: Có dùng AI nhưng kiểm chứng hạn chế; phụ thuộc gợi ý khá nhiều.</td><td>0–0.15: Không minh bạch hoặc phụ thuộc AI/source trọn bộ mà không hiểu.</td></tr>
</tbody>
</table>

## <span style="color:#1f4e78">10.1 Cách tính điểm</span>

Rubric Score = tổng điểm 8 tiêu chí, tối đa 10.0. Nếu lớp áp dụng hệ số nộp trễ đã công bố: Final Score = Rubric Score × Timeliness Coefficient.

**Không dùng “một lỗi = mất toàn bộ điểm” trừ khi quy định chính thức nói vậy:** Rubric nên phản ánh mức năng lực quan sát được ở từng tiêu chí. Ví dụ sản phẩm chạy nhưng không giải thích được code vẫn có thể có Implementation tương đối, nhưng Code Explanation/Modification/AI Usage sẽ thấp.

## <span style="color:#1f4e78">10.2 Scorecard dành cho sinh viên tự chấm trước buổi đánh giá</span>

<table>
<thead>
<tr><th>Tiêu chí</th><th><b>Max</b></th><th><b>Tự chấm</b></th><th><b>Evidence tôi sẽ mở</b></th></tr>
</thead>
<tbody>
<tr><td>Problem Understanding</td><td>1.0</td><td></td><td></td></tr>
<tr><td>Solution Design &#x26; Reasoning</td><td>1.5</td><td></td><td></td></tr>
<tr><td>Implementation</td><td>2.0</td><td></td><td></td></tr>
<tr><td>Testing &#x26; Verification</td><td>1.5</td><td></td><td></td></tr>
<tr><td>Debugging &#x26; Problem Solving</td><td>1.5</td><td></td><td></td></tr>
<tr><td>Code Explanation</td><td>1.0</td><td></td><td></td></tr>
<tr><td>Modification / Transfer</td><td>1.0</td><td></td><td></td></tr>
<tr><td>AI Usage &#x26; Engineering Practice</td><td>0.5</td><td></td><td></td></tr>
<tr><td>Tổng</td><td>10.0</td><td></td><td></td></tr>
</tbody>
</table>

<span style="color:#667085">Trang 17</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

## <span style="color:#1f4e78">**11. CHECKLIST TRƯỚC KHI NỘP BÀI VÀ TRƯỚC BUỔI ĐÁNH GIÁ**</span>

### <span style="color:#1f4e78">**11.1 Checklist yêu cầu bắt buộc**</span>

- □ Project Vite + ReactJS; tên StudentName_ClassCode.
- □ Login page; Admin/Admin vào admin page.
- □ Header và logo tạo bằng AI.
- □ Menu đủ Dashboard, Category, News, Users, Settings.
- □ CRUD + Search cho Category, News, Users/Account.
- □ Create/Update dùng dialog.
- □ Delete có confirmation.
- □ README có cách chạy và credential test.

### <span style="color:#1f4e78">**11.2 Checklist chất lượng kỹ thuật**</span>

- □ npm run dev chạy không lỗi.
- □ Không có console error nghiêm trọng.
- □ Component tách hợp lý.
- □ Không mutate trực tiếp state.
- □ Có empty/no-result state.
- □ Form có validation tối thiểu.
- □ Mock data có id, role/status/category relation hợp lý.
- □ Có test matrix và đã chạy smoke test cuối.

### <span style="color:#1f4e78">**11.3 Checklist sẵn sàng phỏng vấn**</span>

- □ Tôi giải thích được lệnh tạo/chạy project và package.json.
- □ Tôi mở đúng file login trong 30 giây.
- □ Tôi giải thích được CRUD flow cho ít nhất một entity.
- □ Tôi giải thích được selected item + modal mode.
- □ Tôi giải thích được search mà không đọc thuộc lòng.
- □ Tôi biết vì sao không mutate state.
- □ Tôi biết dữ liệu mất/còn gì sau reload.
- □ Tôi có thể phân tích một bug bằng state/props/event flow.
- □ Tôi đã luyện ít nhất một modification task.

### <span style="color:#1f4e78">**11.4 Checklist hồ sơ đánh giá**</span>

- □ Source/zip hoặc repo đúng phiên bản nộp.
- □ README final.
- □ Test matrix final.
- □ 2–3 debug log.
- □ Component/data/state sketch.
- □ AI usage log nếu có/yêu cầu.
- □ Không còn file secret hoặc asset path theo máy cá nhân.

### <span style="color:#1f4e78">**11.5 Kế hoạch chuẩn bị 60 phút trước buổi đánh giá**</span>

<table>
<thead>
<tr><th><b>Thời gian</b></th><th><b>Việc làm</b></th></tr>
</thead>
<tbody>
<tr><td>0–10 phút</td><td>Clone/mở bản nộp sạch; npm install; npm run dev; xác nhận đúng version.</td></tr>
<tr><td>10–25 phút</td><td>Chạy smoke test: login → menu → mỗi CRUD → search → delete cancel/confirm.</td></tr>
<tr><td>25–35 phút</td><td>Mở component tree/data/state design; luyện giải thích 3 flow: login, CRUD, search.</td></tr>
<tr><td>35–45 phút</td><td>Luyện 1 debug case và 1 modification case không dùng AI.</td></tr>
<tr><td>45–55 phút</td><td>Kiểm tra README/test matrix/AI log/evidence; đóng tab/file không cần thiết.</td></tr>
<tr><td>55–60 phút</td><td>Mở sẵn project + terminal; đảm bảo demo bắt đầu từ trạng thái ổn định.</td></tr>
</tbody>
</table>

<span style="color:#667085">Trang 18</span>

<span style="color:#667085">SBA301 • Assignment 01 • Working with ReactJS application</span>

# <span style="color:#1f4e78">**12. PHỤ LỤC – CÂU HỎI INTERVIEW, LỆNH VÀ QUY LUẬT THỰC THI**</span>

## <span style="color:#1f4e78">**12.1 Lệnh và môi trường**</span>


<table>
<thead>
<tr><th><b>Câu hỏi</b></th><th><b>Điểm cần trả lời</b></th></tr>
</thead>
<tbody>
<tr><td>Lệnh tạo project Vite React?</td><td>Nêu lệnh/cách theo môi trường lớp và giải thích template React.</td></tr>
<tr><td>npm install làm gì?</td><td>Đọc package.json/package-lock và cài dependencies vào node_modules.</td></tr>
<tr><td>npm run dev làm gì?</td><td>Chạy script dev trong package.json, khởi động dev server.</td></tr>
<tr><td>package.json chứa gì?</td><td>Metadata, scripts, dependencies/devDependencies.</td></tr>
<tr><td>node_modules là gì?</td><td>Dependencies cài cục bộ; thường không commit/nộp vì có thể tái tạo.</td></tr>
<tr><td>Dừng dev server?</td><td>Ctrl+C tại terminal đang chạy.</td></tr>
<tr><td>Port bận xử lý?</td><td>Dừng process cũ hoặc chạy port khác theo công cụ.</td></tr>
</tbody>
</table>

## <span style="color:#1f4e78">**12.2 React fundamentals**</span>

- Component là gì?
- JSX là gì?
- Props là gì? State là gì? Khác nhau thế nào?
- Khi nào component re-render?
- Vì sao không mutate trực tiếp state?
- Controlled input là gì?
- Vì sao map cần key?
- Conditional rendering là gì?
- preventDefault trong form dùng để làm gì?

## <span style="color:#1f4e78">**12.3 Luồng thực thi**</span>

- Khi mở ứng dụng, component nào quyết định Login hay Admin?
- Khi submit Admin/Admin, các bước state/event/render xảy ra thế nào?
- Khi bấm menu, component nào thay đổi?
- Khi bấm Add, state nào đổi để modal mở?
- Create: dữ liệu form đi từ input đến danh sách như thế nào?
- Update: selected item được prefill và thay thế theo id ra sao?
- Delete: confirmation bảo vệ thao tác như thế nào?
- Search: source list và displayed list khác nhau ra sao?
- Reload: state nào mất, dữ liệu nào có thể còn nếu dùng localStorage?

## <span style="color:#1f4e78">**12.4 Design & architecture**</span>

- Vì sao tách Header/Sidebar/Content?
- Vì sao đặt state danh sách ở component hiện tại?
- Vì sao dùng dialog cho Create/Update?
- Vì sao dùng mock data và giới hạn của nó?
- Nếu kết nối Spring Boot API, tầng nào cần đổi?
- Nếu thêm Staff role, cần sửa auth/menu/page nào?
- Nếu thêm pagination/search server-side, kiến trúc đổi gì?

## <span style="color:#1f4e78">**12.5 Debugging interview**</span>

- List không hiển thị: bạn kiểm tra gì đầu tiên?
- Modal không mở: kiểm tra state/event/props thế nào?
- Delete không re-render: dấu hiệu mutate state là gì?
- Login đúng nhưng không vào admin: khoanh vùng ở đâu?
- Search sai: kiểm tra keyword/source data/field nào?

<span style="color:#667085">Trang 19</span>

<span style="color:#656f84">SBA301 • Assignment 01 • Working with ReactJS application</span>

- Reload mất dữ liệu: đó là bug hay đúng design?


## <span style="color:#1f4e78">12.6 AI usage interview</span>


- Bạn dùng AI vào phần nào?
- Prompt cụ thể nào hữu ích nhất?
- Bạn đã kiểm chứng output bằng test nào?
- Bạn đã thay đổi gì so với gợi ý AI?
- Nếu AI đưa code sai hoặc dùng API không tồn tại, bạn phát hiện thế nào?
- Phần nào của project hoàn toàn do bạn tự thiết kế?


## <span style="color:#1e4d77">12.7 Mini interview cards – tự luyện</span>

<table>
<thead>
<tr>
<th>Card</th>
<th>Yêu cầu 2–4 phút</th>
</tr>
</thead>
<tbody>
<tr>
<td>A – Login</td>
<td>Mở login code; giải thích controlled inputs, validation, Admin/Admin<br />và state sau success.</td>
</tr>
<tr>
<td>B – Create/Update</td>
<td>Mở một CRUD dialog; chỉ show/mode/selected/form; giải thích<br />immutable update.</td>
</tr>
<tr>
<td>C – Delete</td>
<td>Giải thích selected id, confirmation, cancel/confirm và re-render.</td>
</tr>
<tr>
<td>D – Search</td>
<td>Giải thích keyword → filter → displayed list; chứng minh source list<br />không bị mất.</td>
</tr>
<tr>
<td>E – Debug</td>
<td>Giảng viên giả định “Edit cập nhật nhầm record”; nêu cách khoanh<br />vùng theo id/selected/update logic.</td>
</tr>
<tr>
<td>F – Transfer</td>
<td>Thêm validation email hoặc filter status; nêu impact trước khi sửa.</td>
</tr>
</tbody>
</table>


## <span style="color:#1e4e78">12.8 Final self-declaration</span>


<span style="color:#3e5b28">**Sinh viên tự xác nhận trước khi nộp:**</span> “Tôi đã tự kiểm tra project, có thể giải thích các phần chính, có thể thực hiện một thay đổi nhỏ và chịu trách nhiệm với mọi code/tài nguyên/AI output tôi sử dụng.”


## <span style="color:#1f4e78">KẾT LUẬN</span>


Assignment 01 không nên được xem là bài “làm UI cho chạy”. Muốn đạt điểm cao theo rubric, sinh viên cần chứng minh một chuỗi năng lực hoàn chỉnh: hiểu yêu cầu → thiết kế có lý do → triển khai đúng → kiểm thử → debug → giải thích → thích nghi khi thay đổi → sử dụng AI có trách nhiệm. Vì vậy, hãy chuẩn bị cả sản phẩm và bằng chứng về cách bạn xây dựng sản phẩm đó.


<span style="color:#3f5c29">**Checklist cuối cùng:**</span> Run được • Demo đủ core scope • Test có evidence • Giải thích được code • Debug có quy trình • Làm được modification nhỏ • AI có kiểm chứng.

<span style="color:#667085">Trang 20</span>