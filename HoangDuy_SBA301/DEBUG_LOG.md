# Nhật Ký Debug Lỗi Hệ Thống (Debug Log)

> **Dự án:** FUNews Management System (`HoangDuy_SBA301`)  
> **Người thực hiện:** Hoàng Duy  
> **Mục tiêu:** Đáp ứng tiêu chí đánh giá **Debugging & Problem Solving (1.5 điểm)** theo quy trình 5 bước chuẩn:
> 1. Mô tả triệu chứng quan sát được
> 2. Khoanh vùng component/state liên quan
> 3. Kiểm tra dữ liệu vào (props, state, form values)
> 4. Kiểm tra điểm biến đổi (handler, filter, setter)
> 5. Sửa thay đổi nhỏ nhất & kiểm tra hồi quy (Retest)

---

## Bảng Tổng Hợp Debug Log (Mục 6.3 Hướng dẫn Sinh viên)

| STT | Triệu chứng lỗi (Symptom) | Giả thuyết ban đầu (Hypothesis) | Cách kiểm tra (Inspection) | Nguyên nhân gốc rễ (Root Cause) | Giải pháp xử lý (Fix) | Kết quả kiểm thử lại (Retest) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG 01** | Khi tìm kiếm từ khóa có khoảng trắng thừa hoặc chữ hoa (vd: `" AI "`), kết quả không hiển thị bài viết. | Bộ lọc so sánh trực tiếp chuỗi không chuẩn hóa `keyword` và `item.title`. | Đặt `console.log({ keyword, title: item.title })` trong hàm lọc `newsService.search`. Thấy chuỗi có space `" AI "` so sánh với `"AI"`. | Chưa gọi `.trim()` và `.toLowerCase()` trên từ khóa trước khi kiểm tra `.includes()`. | Chuẩn hóa `const norm = keyword.trim().toLowerCase()` và áp dụng kiểm tra chữ thường cho cả title, content, author, tags. | Nhập `"  AI  "`, `"ai"`, `"Ai"` đều lọc chính xác bài viết chứa AI. **PASS** |
| **BUG 02** | Xóa một Thể loại (Category) thì các bài viết Tin tức thuộc thể loại đó bị mất tên danh mục, hiển thị rỗng hoặc lỗi giao diện. | Hệ thống cho phép xóa thể loại mà không kiểm tra ràng buộc khóa ngoại (Foreign key / Relation). | Mở danh sách News, kiểm tra trường `categoryId` của các bài viết sau khi xóa 1 category. Thấy ID vẫn còn nhưng không tìm thấy object category tương ứng trong mảng categories. | Thiếu kiểm tra ràng buộc toàn vẹn dữ liệu (Data Integrity Constraint) trước khi thực hiện xóa. | Bổ sung hàm kiểm tra trong `categoryService.delete(id)`: Lấy danh sách News, đếm số bài có `news.categoryId === id`. Nếu > 0 thì throw Error cảnh báo không cho xóa. | Bấm xóa thể loại đang có bài viết -> Hiển thị thông báo chặn rõ ràng kèm số bài viết liên quan -> Dữ liệu được bảo toàn. **PASS** |
| **BUG 03** | Mở Edit bản ghi A rồi đóng lại, sau đó bấm "Thêm Mới" thì form vẫn còn dữ liệu cũ của bản ghi A thay vì form trống. | State của modal form (`formData`) không được reset về giá trị mặc định khi chuyển mode hoặc đóng modal. | Quan sát state `formData` của Component khi bấm nút "Thêm Thể Loại" sau khi vừa click Edit. | Hàm `handleOpenCreate` không reset lại object `formData` về `{ name: '', description: '', status: 1 }`. | Thiết lập lại toàn bộ `formData` về giá trị rỗng/mặc định trong hàm `handleOpenCreate()`, đồng thời thêm nút **"Đặt lại (Reset)"** trực tiếp trên dialog. | Mở Edit bản ghi bất kỳ, đóng lại, bấm Thêm Mới -> Form hoàn toàn trống và sẵn sàng nhập mới. **PASS** |

---

## Chi tiết Quy trình Debug minh họa cho phỏng vấn

### Ví dụ phân tích BUG 02: Kiểm tra ràng buộc toàn vẹn khi Xóa (Category Relation)

1. **Mô tả triệu chứng:**
   - Khi xóa thể loại `"Công nghệ & AI"`, bài viết `"Hội thảo AI Agents"` vẫn còn trên danh sách News nhưng cột thể loại bị hiển thị `"Chưa phân loại"`.
2. **Khoanh vùng:**
   - File nghiệp vụ `src/services/categoryService.js`, hàm `delete(id)`.
3. **Kiểm tra dữ liệu:**
   - Dữ liệu `news` trong `localStorage` tham chiếu `categoryId = "CAT01"`. Khi `"CAT01"` bị xóa khỏi `fu_news_categories`, liên kết bị đứt gãy.
4. **Điểm biến đổi & Root Cause:**
   - Thao tác xóa `list.filter(item => item.id !== id)` diễn ra mà không tra cứu chéo bảng phụ thuộc.
5. **Cách sửa & Retest:**
   - Thêm đoạn code kiểm tra trước khi xóa:
     ```javascript
     const newsList = storageService.get(storageService.KEYS.NEWS, []);
     const linkedNews = newsList.filter(news => news.categoryId === id);
     if (linkedNews.length > 0) {
       throw new Error(`Không thể xóa thể loại "${target.name}" vì đang có ${linkedNews.length} bài viết liên kết!`);
     }
     ```
   - Chạy lại test case #12 và #31: Khi thể loại có bài viết liên kết, hệ thống báo lỗi an toàn; khi thể loại không có bài viết liên kết, thao tác xóa diễn ra thành công.
