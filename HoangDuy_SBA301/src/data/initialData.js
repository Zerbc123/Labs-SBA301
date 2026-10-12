/**
 * initialData.js - Dữ liệu mẫu chuẩn cho FUNewsManagementSystem
 * Gồm: Categories, News Articles, Users/Accounts
 * Tuân thủ quy định:
 * - Status: 1 = Active, 0 = Inactive
 * - Role: 1 = Admin, 2 = Staff
 * - Category relation: categoryId của News phải trỏ tới Category có thật
 */

export const INITIAL_CATEGORIES = [
  {
    id: 'CAT01',
    name: 'Công nghệ & AI',
    description: 'Tin tức xu hướng trí tuệ nhân tạo, công nghệ phần mềm và điện toán đám mây.',
    status: 1, // 1: Active
    createdAt: '2026-03-01'
  },
  {
    id: 'CAT02',
    name: 'Đời sống Sinh viên',
    description: 'Các hoạt động câu lạc bộ, sự kiện văn hóa, phong trào thanh niên FPT.',
    status: 1,
    createdAt: '2026-03-05'
  },
  {
    id: 'CAT03',
    name: 'Thông báo Học vụ',
    description: 'Lịch thi, quy chế đào tạo, đăng ký môn học và các thủ tục hành chính.',
    status: 1,
    createdAt: '2026-03-10'
  },
  {
    id: 'CAT04',
    name: 'Cơ hội Việc làm',
    description: 'Tin tuyển dụng thực tập sinh, ngày hội việc làm và kết nối doanh nghiệp.',
    status: 1,
    createdAt: '2026-03-15'
  },
  {
    id: 'CAT05',
    name: 'Văn hóa & Thể thao',
    description: 'Giải đấu bóng đá, giải thể thao điện tử, phong trào nghệ thuật sinh viên.',
    status: 0, // 0: Inactive
    createdAt: '2026-03-20'
  }
];

export const INITIAL_NEWS = [
  {
    id: 'NEWS01',
    title: 'Hội thảo AI Agents & Tương lai của Lập trình viên 2026',
    content: 'Tại hội trường A, ĐH FPT đã diễn ra buổi tọa đàm chuyên sâu về kỷ nguyên Trợ lý AI và sự chuyển dịch kỹ năng cho kỹ sư phần mềm tương lai.',
    categoryId: 'CAT01',
    createdBy: 'Admin',
    createdAt: '2026-04-01',
    status: 1, // 1: Active
    tags: ['AI', 'Tech', 'Workshop']
  },
  {
    id: 'NEWS02',
    title: 'Đăng ký tham gia Giải bóng đá FPT Cup Mùa Xuân 2026',
    content: 'Ban thể thao chính thức mở cổng đăng ký giải bóng đá nam nữ dành cho sinh viên tất cả các khóa. Hạn chót nộp danh sách vào ngày 25/04.',
    categoryId: 'CAT05',
    createdBy: 'staff1',
    createdAt: '2026-04-03',
    status: 0, // 0: Inactive
    tags: ['Sport', 'Football', 'FPT Cup']
  },
  {
    id: 'NEWS03',
    title: 'Thông báo lịch thi chuyển tiếp kỳ Summer 2026',
    content: 'Phòng Đào tạo xin thông báo lịch thi kết thúc môn cho các lớp học phần Spring 2026 và kế hoạch ôn tập chuẩn bị kỳ học mới.',
    categoryId: 'CAT03',
    createdBy: 'Admin',
    createdAt: '2026-04-05',
    status: 1,
    tags: ['Academic', 'Exam', 'Schedule']
  },
  {
    id: 'NEWS04',
    title: 'FPT Software tuyển dụng 50 Thực tập sinh Frontend ReactJS & Java Spring Boot',
    content: 'Chương trình Fresher Academy mở đợt tuyển lớn cho sinh viên năm 3 và năm cuối với cơ hội làm việc trong các dự án quốc tế.',
    categoryId: 'CAT04',
    createdBy: 'staff1',
    createdAt: '2026-04-07',
    status: 1,
    tags: ['Career', 'Internship', 'ReactJS', 'SpringBoot']
  },
  {
    id: 'NEWS05',
    title: 'Đêm nhạc hội FPT Acoustic Club: Giai điệu mùa xuân',
    content: 'Sự kiện âm nhạc thường niên quy tụ hơn 500 sinh viên tham dự tại khuôn viên campus với nhiều tiết mục acoustic đặc sắc.',
    categoryId: 'CAT02',
    createdBy: 'hoangduy',
    createdAt: '2026-04-08',
    status: 1,
    tags: ['Music', 'Club', 'Event']
  }
];

export const INITIAL_USERS = [
  {
    id: 'USR01',
    username: 'Admin',
    password: 'Admin', // Phục vụ mock login theo yêu cầu đề bài
    fullName: 'Quản trị viên Hệ thống',
    email: 'admin@funews.edu.vn',
    role: 1, // 1: Admin
    status: 1, // 1: Active
    createdAt: '2026-01-01'
  },
  {
    id: 'USR02',
    username: 'staff1',
    password: '123',
    fullName: 'Nguyễn Văn Staff',
    email: 'staff1@funews.edu.vn',
    role: 2, // 2: Staff
    status: 1,
    createdAt: '2026-02-15'
  },
  {
    id: 'USR03',
    username: 'hoangduy',
    password: '123',
    fullName: 'Hoàng Duy (Sinh viên)',
    email: 'duyhvse@fpt.edu.vn',
    role: 1,
    status: 1,
    createdAt: '2026-03-01'
  },
  {
    id: 'USR04',
    username: 'reporter_locked',
    password: '123',
    fullName: 'Trần Thị Thảo (Bị khóa)',
    email: 'thaott@funews.edu.vn',
    role: 2,
    status: 0, // 0: Inactive
    createdAt: '2026-03-20'
  }
];
