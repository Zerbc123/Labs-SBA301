// DuyDLH-CE200667
// Initial demo data for FUNewsManagementSystem
// Follows course rubric requirements:
// Category: id, name, status (1: Active, 0: Inactive)
// News: id, title, content, categoryId, createdBy, status (1: Active, 0: Inactive), tags, createdAt
// User: id, username, password, fullName, email, role (1: Admin, 2: Staff), status (1: Active, 0: Inactive)

export const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Công nghệ & AI",
    description: "Tin tức về nghiên cứu trí tuệ nhân tạo, công nghệ phần mềm và các dự án lab tại trường",
    status: 1
  },
  {
    id: 2,
    name: "Học thuật & Đào tạo",
    description: "Thông báo lịch thi, chương trình học kỳ mới, hội thảo khoa học và chính sách học bổng",
    status: 1
  },
  {
    id: 3,
    name: "Hoạt động Sinh viên",
    description: "Sự kiện các câu lạc bộ, giải đấu thể thao, cuộc thi lập trình và tình nguyện",
    status: 1
  },
  {
    id: 4,
    name: "Hợp tác Doanh nghiệp",
    description: "Ngày hội việc làm On-the-job training (OJT), thực tập doanh nghiệp và workshop tuyển dụng",
    status: 1
  },
  {
    id: 5,
    name: "Trao đổi Quốc tế",
    description: "Chương trình trao đổi sinh viên nước ngoài, học kỳ quốc tế và trại hè văn hóa",
    status: 0 // Inactive sample for testing status filters
  }
];

export const INITIAL_NEWS = [
  {
    id: 1,
    title: "FPT University ra mắt Trung tâm Nghiên cứu AI và Robotics thế hệ mới",
    content: "Trung tâm Nghiên cứu AI & Robotics được trang bị cụm máy chủ GPU hiệu năng cao hỗ trợ sinh viên nghiên cứu các mô hình Deep Learning và tự động hóa thông minh.",
    categoryId: 1,
    createdBy: "Admin",
    status: 1,
    tags: ["AI", "Robotics", "Technology"],
    createdAt: "2026-10-01"
  },
  {
    id: 2,
    title: "Phát động cuộc thi lập trình Hackathon 'SBA Code Sprint 2026'",
    content: "Cuộc thi lập trình thường niên dành cho sinh viên CNTT với tổng giải thưởng lên đến 100 triệu đồng. Đăng ký tham gia theo nhóm từ 3 đến 5 thành viên.",
    categoryId: 3,
    createdBy: "Staff",
    status: 1,
    tags: ["Hackathon", "Coding", "SinhVien"],
    createdAt: "2026-10-04"
  },
  {
    id: 3,
    title: "Thông báo lịch đăng ký môn học và xét học bổng kỳ Fall 2026",
    content: "Phòng Đào tạo thông báo cổng đăng ký tín chỉ chuyên ngành và hồ sơ học bổng tài năng sẽ mở từ ngày 15/10/2026 trên hệ thống EduNext/FAP.",
    categoryId: 2,
    createdBy: "Admin",
    status: 1,
    tags: ["HocBong", "DaoTao", "ThongBao"],
    createdAt: "2026-10-05"
  },
  {
    id: 4,
    title: "Ngày hội Tuyển dụng OJT kết nối hơn 40 tập đoàn công nghệ đa quốc gia",
    content: "Cơ hội phỏng vấn trực tiếp vị trí thực tập sinh Software Engineer, Data Analyst, Cloud DevOps tại hội trường Alpha.",
    categoryId: 4,
    createdBy: "Staff",
    status: 1,
    tags: ["OJT", "ViecLam", "DoanhNghiep"],
    createdAt: "2026-10-08"
  },
  {
    id: 5,
    title: "Chương trình Trao đổi Văn hóa và Du học ngắn hạn tại Nhật Bản 2027",
    content: "Sinh viên có chứng chỉ JLPT N3 hoặc IELTS 6.0 có thể đăng ký tham gia kỳ học mùa xuân tại Tokyo Institute of Technology.",
    categoryId: 5,
    createdBy: "Admin",
    status: 0,
    tags: ["Exchange", "NhatBan", "Global"],
    createdAt: "2026-10-10"
  }
];

export const INITIAL_USERS = [
  {
    id: 1,
    username: "Admin",
    fullName: "Quản trị viên Hệ thống",
    password: "Admin",
    email: "admin@funews.edu.vn",
    role: 1, // 1 = Admin
    status: 1,
    createdAt: "2026-09-01"
  },
  {
    id: 2,
    username: "Staff",
    fullName: "Nguyễn Văn Biên Tập",
    password: "Staff",
    email: "editor.staff@funews.edu.vn",
    role: 2, // 2 = Staff
    status: 1,
    createdAt: "2026-09-15"
  },
  {
    id: 3,
    username: "hoangduy",
    fullName: "Đào Lê Hoàng Duy",
    password: "123",
    email: "duydlh.ce200667@funews.edu.vn",
    role: 1,
    status: 1,
    createdAt: "2026-10-01"
  },
  {
    id: 4,
    username: "guest_writer",
    fullName: "Trần Thị Cộng Tác Viên",
    password: "123",
    email: "collaborator@funews.edu.vn",
    role: 2,
    status: 0, // Inactive
    createdAt: "2026-10-05"
  }
];
