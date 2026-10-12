# Ma Trận Kiểm Thử Bắt Buộc (Test Matrix)

> **Dự án:** FUNews Management System (`HoangDuy_SBA301`)  
> **Người thực hiện:** Hoàng Duy  
> **Ngày kiểm thử:** 12/10/2026  
> **Tỷ lệ vượt qua:** 35 / 35 test cases (100% PASS)

---

| # | Nhóm chức năng | Tình huống (Case) | Thao tác thực hiện | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **1** | Login | Empty | Bấm đăng nhập khi để trống username hoặc password | Không đăng nhập; hiển thị thông báo validation | Báo lỗi "Vui lòng nhập tên đăng nhập và mật khẩu!" | **PASS** |
| **2** | Login | Wrong credential | Nhập username hoặc password sai (vd: `abc` / `xyz`) | Không vào admin page; hiển thị thông báo lỗi | Hiển thị thông báo "Tên đăng nhập hoặc mật khẩu không chính xác!" | **PASS** |
| **3** | Login | Valid Admin | Nhập `Admin` / `Admin` (hoặc bấm chip demo) | Đăng nhập thành công, chuyển hướng vào Admin Dashboard | Chuyển ngay sang Admin Layout, thông báo chào mừng | **PASS** |
| **4** | Auth | Logout | Bấm nút Đăng xuất tại Sidebar hoặc Header | Xóa session trong storage, quay về màn hình đăng nhập | Xóa session, giao diện quay lại Login, không thể xem admin | **PASS** |
| **5** | Layout | Menu completeness | Quan sát Sidebar điều hướng | Đủ 5 mục: Dashboard, Category, News, Users, Settings | Sidebar hiển thị đủ 5 mục kèm icon và nhãn tiếng Việt rõ ràng | **PASS** |
| **6** | Navigation | All menus | Bấm lần lượt từng mục menu trên Sidebar | Chuyển đúng nội dung từng trang; không full reload SPA | Chuyển trang mượt mà, URL và giao diện hiển thị ngay lập tức | **PASS** |
| **7** | Category | Read | Mở trang Quản lý Thể loại | Danh sách thể loại hiển thị đầy đủ ID, Tên, Mô tả, Trạng thái | Hiển thị đầy đủ bảng danh sách từ mock data / storage | **PASS** |
| **8** | Category | Create valid | Bấm "Thêm Thể Loại", nhập thông tin hợp lệ, submit | Thể loại mới xuất hiện đầu danh sách, modal đóng, có thông báo | Thể loại "Đổi Mới Sáng Tạo" xuất hiện trên đầu bảng, toast thông báo | **PASS** |
| **9** | Category | Create invalid | Mở dialog thêm mới nhưng để trống Tên thể loại | Form chặn submit, hiển thị lỗi validation dưới trường tên | Hiển thị "Tên thể loại không được để trống!", modal không đóng | **PASS** |
| **10** | Category | Update | Bấm Edit một thể loại, sửa tên hoặc mô tả, bấm Lưu | Bản ghi được cập nhật đúng thông tin, modal đóng | Bản ghi cập nhật chính xác nội dung mới, không bị mất ID | **PASS** |
| **11** | Category | Delete cancel | Bấm biểu tượng Xóa -> Hộp thoại xác nhận hiện ra -> Bấm "Hủy bỏ" | Bản ghi vẫn còn nguyên trong danh sách, không bị xóa | Đóng modal xác nhận, dữ liệu giữ nguyên không thay đổi | **PASS** |
| **12** | Category | Delete confirm | Bấm biểu tượng Xóa -> Bấm "Xác nhận xóa" trên hộp thoại | Đúng bản ghi được xóa khỏi danh sách, có toast thông báo | Bản ghi biến mất khỏi bảng, hiển thị thông báo xóa thành công | **PASS** |
| **13** | Category | Search hit | Nhập từ khóa tồn tại (vd: "Công nghệ") vào ô tìm kiếm | Bảng lọc đúng các thể loại có tên chứa từ khóa | Bảng chỉ hiển thị dòng chứa "Công nghệ & AI" | **PASS** |
| **14** | Category | Search miss | Nhập từ khóa không tồn tại (vd: "KhaongKhongCo123") | Hiển thị trạng thái rỗng (Empty State) kèm nút "Xóa bộ lọc" | Hiển thị thông báo "Không tìm thấy kết quả" + nút Reset | **PASS** |
| **15** | News | Read | Mở trang Quản lý Tin tức | Danh sách bài viết hiển thị tiêu đề, thể loại, tác giả, trạng thái | Bảng tin tức hiển thị đầy đủ kèm tags và tóm tắt nội dung | **PASS** |
| **16** | News | Create valid | Bấm "Tạo Bài Viết Mới", chọn Thể loại, nhập tiêu đề, nội dung | Bài viết mới xuất hiện trên đầu bảng, liên kết thể loại đúng | Bài viết mới xuất hiện ngay với đúng nhãn category pill | **PASS** |
| **17** | News | Create invalid | Để trống tiêu đề hoặc nội dung và bấm Đăng bài | Chặn submit, hiển thị thông báo lỗi trường bắt buộc | Hiển thị viền đỏ và text cảnh báo lỗi dưới ô input tương ứng | **PASS** |
| **18** | News | Update | Bấm Edit bài viết, thay đổi tiêu đề/nội dung, bấm Lưu | Đúng bài viết được cập nhật, dữ liệu phản ánh ngay trên bảng | Bài viết cập nhật chính xác, không thay đổi ID và ngày tạo | **PASS** |
| **19** | News | Delete cancel | Bấm icon thùng rác của bài viết -> Bấm "Hủy bỏ" trên popup | Bài viết không bị xóa, giữ nguyên trên danh sách | Đóng hộp thoại, danh sách bài viết giữ nguyên | **PASS** |
| **20** | News | Delete confirm | Bấm icon thùng rác -> Bấm "Xác nhận xóa" | Bài viết bị xóa khỏi danh sách, toast báo thành công | Bài viết bị loại khỏi bảng, tổng số bài viết giảm 1 | **PASS** |
| **21** | News | Search hit | Nhập từ khóa tin tức có thật (vd: "AI") | Danh sách chỉ hiển thị các bài viết liên quan đến AI | Hiển thị đúng các bài viết có title, content hoặc tag chứa "AI" | **PASS** |
| **22** | News | Search miss | Nhập từ khóa không có bài viết nào khớp | Hiển thị màn hình rỗng No-Result State | Hiển thị EmptyState thân thiện và nút xóa từ khóa | **PASS** |
| **23** | Users | Read | Mở trang Quản lý Tài khoản | Danh sách người dùng hiển thị username, email, role, status | Bảng người dùng hiển thị đầy đủ ID, họ tên, email, vai trò | **PASS** |
| **24** | Users | Create valid | Bấm "Thêm Tài Khoản", điền đầy đủ username, pass, họ tên, email | Tài khoản mới được thêm, hiển thị đúng vai trò và trạng thái | Tài khoản mới xuất hiện trên bảng, toast thông báo thành công | **PASS** |
| **25** | Users | Create invalid | Để trống username hoặc nhập email sai định dạng (vd: `abc`) | Chặn submit, hiển thị thông báo lỗi định dạng email/rỗng | Báo lỗi "Định dạng email không hợp lệ", form không gửi | **PASS** |
| **26** | Users | Update | Bấm Edit tài khoản, đổi họ tên/email, bấm Lưu | Bản ghi được cập nhật chính xác thông tin mới | Họ tên và email mới cập nhật ngay trên dòng tương ứng | **PASS** |
| **27** | Users | Delete cancel | Bấm biểu tượng Xóa -> Bấm "Hủy bỏ" trên hộp thoại | Bản ghi tài khoản vẫn còn nguyên | Đóng hộp thoại, tài khoản giữ nguyên | **PASS** |
| **28** | Users | Delete confirm | Bấm biểu tượng Xóa -> Bấm "Xác nhận xóa" | Đúng tài khoản bị xóa khỏi hệ thống | Bản ghi bị xóa khỏi bảng, toast báo thành công | **PASS** |
| **29** | Users | Search hit | Nhập từ khóa tìm kiếm (vd: "staff1" hoặc "admin") | Danh sách lọc chính xác tài khoản khớp từ khóa | Bảng hiển thị chính xác tài khoản cần tìm | **PASS** |
| **30** | Users | Search miss | Nhập từ khóa tài khoản không có trong hệ thống | Hiển thị trạng thái không tìm thấy kết quả | Hiển thị EmptyState thông báo rõ ràng | **PASS** |
| **31** | News Relation | Category Relation | Trong form Thêm/Sửa News, chọn thể loại từ dropdown | Dropdown lấy từ danh sách Category đang có; quan hệ categoryId chuẩn | Hiển thị danh sách tên category thực tế, hiển thị đúng pill | **PASS** |
| **32** | User Role | Role display | Quan sát cột Vai trò (Role) trong bảng Người dùng | Hiển thị nhãn "Admin (Quản trị)" hoặc "Staff (Nhân viên)" thay vì số 1/2 | Hiển thị RoleBadge màu tím cho Admin và màu xanh cho Staff | **PASS** |
| **33** | Status | Status display | Quan sát cột Trạng thái trong tất cả các bảng | Hiển thị "Hoạt động" hoặc "Tạm khóa / Ẩn" thay vì số 1/0 | Hiển thị StatusBadge màu xanh lục (Active) hoặc xám (Inactive) | **PASS** |
| **34** | Data | Empty state | Thử lọc từ khóa không có hoặc xóa hết dữ liệu | Giao diện không bị crash; hiển thị icon, text hướng dẫn và nút tạo mới | Giao diện xử lý mượt mà, hiển thị EmptyState đẹp mắt | **PASS** |
| **35** | Persistence | Reload | Thêm mới 1 bài viết/thể loại, sau đó nhấn F5 (Reload trang) | Dữ liệu vừa thêm vẫn còn nguyên vẹn, không bị mất trạng thái | Dữ liệu được đồng bộ từ localStorage, không mất khi reload | **PASS** |
