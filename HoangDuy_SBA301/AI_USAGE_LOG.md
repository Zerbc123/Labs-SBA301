# Nhật Ký Sử Dụng AI Minh Bạch (AI Usage Log)

> **Môn học:** SBA301 – Assignment 01: Working with ReactJS Application  
> **Sinh viên:** Hoàng Duy  
> **Mục tiêu:** Đáp ứng tiêu chí **AI Usage & Engineering Practice (0.5 điểm)** theo đúng quy định học thuật tại Mục 0.3 và Mục 9 trong tài liệu Hướng dẫn Sinh viên.

---

## Bảng Nhật Ký AI Usage (Mục 9.4 Hướng dẫn Sinh viên)

| # | Prompt (Câu lệnh gửi AI) | Mục đích sử dụng | Gợi ý của AI | Tôi đã kiểm chứng thế nào? | Tôi đã chỉnh sửa & hoàn thiện gì? |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | *"A sleek modern professional vector logo for FUNewsManagementSystem, stylized letter F with digital news paper, orange & blue gradient."* | Tạo logo thương hiệu độc quyền cho hệ thống FUNews (thỏa mãn yêu cầu R04). | Sinh ảnh logo đồ họa phong cách hiện đại với màu cam/xanh công nghệ đặc trưng của FPT. | Đưa ảnh vào thư mục `src/assets/`, chạy kiểm tra hiển thị trên thanh Header, Sidebar và trang Login. | Chuyển thành asset cục bộ, xử lý `onError` fallback và thêm nhãn nhỏ `AI` biểu thị nguồn gốc minh bạch. |
| **2** | *"Gợi ý kiến trúc thư mục cho ứng dụng quản trị ReactJS chuẩn bị kết nối Spring Boot REST API."* | Thiết kế phân tầng Clean Architecture, tách biệt rõ ràng giữa UI Components và Business Logic Service. | Gợi ý tách các tầng `components/`, `pages/`, `services/`, `context/`, `data/`. | Kiểm tra khả năng gọi độc lập của các hàm CRUD mà không bị dính chặt vào hook giao diện của React. | Đặt tên các hàm theo chuẩn REST (`getAll`, `getById`, `create`, `update`, `delete`, `search`), tích hợp lưu trữ `localStorage` làm mock database có thể thay thế bằng `fetch/axios` sau này. |
| **3** | *"Đưa ra các trường hợp edge case cần lưu ý khi thực hiện chức năng Xóa trong quan hệ Category và News."* | Phòng ngừa lỗi đứt gãy liên kết dữ liệu (Foreign key constraint/Orphaned data) khi xóa Category. | Gợi ý 2 phương án: hoặc xóa cascade tất cả News liên quan, hoặc chặn xóa nếu đang có News tham chiếu. | Phân tích bài toán thực tế: nếu vô tình xóa Category làm mất toàn bộ bài viết tin tức thì rất nguy hiểm; phương án chặn xóa an toàn hơn. | Tự code thêm hàm kiểm tra ràng buộc trong `categoryService.delete(id)`: đếm số bài viết liên quan và ném ngoại lệ thông báo số lượng bài viết bị ảnh hưởng nếu vi phạm. |
| **4** | *"Cách thiết kế bảng kiểm thử 35 test cases theo yêu cầu của đề bài SBA301 Assignment 01."* | Xây dựng ma trận kiểm thử chi tiết bao phủ đủ 3 lớp: Normal case, Negative case và Edge case. | Gợi ý khung ma trận gồm các cột Nhóm, Tình huống, Thao tác, Kết quả mong đợi và Kết quả thực tế. | Trực tiếp thao tác từng bước trên trình duyệt thông qua công cụ kiểm thử tự động và ghi nhận kết quả thực tế. | Bổ sung thêm các test case đặc thù của đề như kiểm tra tài khoản Admin mặc định không bị xóa, và reload trang bảo toàn dữ liệu. |

---

## Cam Kết Trung Thực Học Thuật (Academic Integrity Declaration)
- Tôi cam kết chịu trách nhiệm 100% với toàn bộ mã nguồn của dự án `HoangDuy_SBA301`.
- Tôi hoàn toàn hiểu rõ từng dòng lệnh, luồng di chuyển dữ liệu (Data Flow), vòng đời Component và sẵn sàng giải thích hoặc thực hiện thay đổi trực tiếp theo yêu cầu của giảng viên trong buổi đánh giá.
