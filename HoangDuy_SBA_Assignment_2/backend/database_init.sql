-- DuyDLH-CE200667
-- Script khởi tạo CSDL và nạp dữ liệu mẫu cho SBA301 Assignment 02
-- Database: DuyDLH_CE200667_FUNewsManagementSBA301

USE master;
GO

IF DB_ID('DuyDLH_CE200667_FUNewsManagementSBA301') IS NULL
BEGIN
    CREATE DATABASE DuyDLH_CE200667_FUNewsManagementSBA301;
END;
GO

USE DuyDLH_CE200667_FUNewsManagementSBA301;
GO

-- 1. Xóa các bảng cũ nếu đã tồn tại (theo đúng thứ tự khóa ngoại)
IF OBJECT_ID('dbo.NewsTag', 'U') IS NOT NULL DROP TABLE dbo.NewsTag;
IF OBJECT_ID('dbo.NewsArticle', 'U') IS NOT NULL DROP TABLE dbo.NewsArticle;
IF OBJECT_ID('dbo.Tag', 'U') IS NOT NULL DROP TABLE dbo.Tag;
IF OBJECT_ID('dbo.Category', 'U') IS NOT NULL DROP TABLE dbo.Category;
IF OBJECT_ID('dbo.SystemAccount', 'U') IS NOT NULL DROP TABLE dbo.SystemAccount;
GO

-- 2. Tạo Bảng SystemAccount (Tài khoản người dùng)
-- Role: 1 = Admin, 2 = Staff
CREATE TABLE dbo.SystemAccount (
    AccountID SMALLINT PRIMARY KEY,
    AccountName NVARCHAR(100) NOT NULL,
    AccountEmail VARCHAR(70) UNIQUE NOT NULL,
    AccountRole INT NOT NULL,
    AccountPassword VARCHAR(70) NOT NULL
);
GO

-- 3. Tạo Bảng Category (Danh mục tin tức)
-- IsActive: 1 = Hoạt động, 0 = Không hoạt động
CREATE TABLE dbo.Category (
    CategoryID SMALLINT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryDesciption NVARCHAR(250) NOT NULL,
    ParentCategoryID SMALLINT NULL,
    IsActive BIT NOT NULL DEFAULT 1
);
GO

-- 4. Tạo Bảng Tag (Thẻ bài viết)
CREATE TABLE dbo.Tag (
    TagID INT PRIMARY KEY,
    TagName NVARCHAR(50) NOT NULL,
    Note NVARCHAR(400) NULL
);
GO

-- 5. Tạo Bảng NewsArticle (Tin tức / Bài viết)
-- NewsStatus: 1 = Active (Công khai), 0 = Inactive (Nháp)
CREATE TABLE dbo.NewsArticle (
    NewsArticleID VARCHAR(20) PRIMARY KEY,
    NewsTitle NVARCHAR(400) NOT NULL,
    Headline NVARCHAR(150) NOT NULL,
    CreatedDate DATETIME NOT NULL DEFAULT GETDATE(),
    NewsContent NVARCHAR(4000) NOT NULL,
    NewsSource NVARCHAR(400) NULL,
    CategoryID SMALLINT NULL CONSTRAINT FK_NewsArticle_Category REFERENCES dbo.Category(CategoryID),
    NewsStatus BIT NOT NULL DEFAULT 1,
    CreatedByID SMALLINT NULL CONSTRAINT FK_NewsArticle_SystemAccount REFERENCES dbo.SystemAccount(AccountID),
    UpdatedByID SMALLINT NULL,
    ModifiedDate DATETIME NULL
);
GO

-- 6. Tạo Bảng NewsTag (Liên kết Nhiều - Nhiều giữa NewsArticle và Tag)
CREATE TABLE dbo.NewsTag (
    NewsArticleID VARCHAR(20) NOT NULL CONSTRAINT FK_NewsTag_NewsArticle REFERENCES dbo.NewsArticle(NewsArticleID) ON DELETE CASCADE,
    TagID INT NOT NULL CONSTRAINT FK_NewsTag_Tag REFERENCES dbo.Tag(TagID) ON DELETE CASCADE,
    PRIMARY KEY (NewsArticleID, TagID)
);
GO

-- =====================================================================
-- NẠP DỮ LIỆU MẪU (SEED DATA)
-- =====================================================================

-- 1. Nạp Tài khoản (SystemAccount)
INSERT INTO dbo.SystemAccount (AccountID, AccountName, AccountEmail, AccountRole, AccountPassword)
VALUES
    (1, N'Steve Paris (Admin)', 'SteveParis@FUNewsManagement.org', 1, '@1'),
    (2, N'Emma William (Staff)', 'EmmaWilliam@FUNewsManagement.org', 2, '@1'),
    (3, N'Olivia James (Staff)', 'OliviaJames@FUNewsManagement.org', 2, '@1'),
    (4, N'Đào Lê Hoàng Duy', 'duydlh.ce200667@funews.edu.vn', 1, '123'),
    (5, N'Quản trị viên Hệ thống', 'admin@funews.edu.vn', 1, 'Admin'),
    (6, N'Nguyễn Văn Biên Tập', 'editor.staff@funews.edu.vn', 2, 'Staff'),
    (7, N'Trần Thị Cộng Tác Viên', 'collaborator@funews.edu.vn', 2, '123');
GO

-- 2. Nạp Danh mục (Category)
SET IDENTITY_INSERT dbo.Category ON;
INSERT INTO dbo.Category (CategoryID, CategoryName, CategoryDesciption, ParentCategoryID, IsActive)
VALUES
    (1, N'Công nghệ & AI', N'Tin tức về nghiên cứu trí tuệ nhân tạo, phần mềm và đổi mới sáng tạo', NULL, 1),
    (2, N'Học thuật & Đào tạo', N'Thông báo lịch thi, chương trình học kỳ mới, hội thảo và chính sách học bổng', NULL, 1),
    (3, N'Hoạt động Sinh viên', N'Sự kiện các câu lạc bộ, giải đấu thể thao, hackathon và tình nguyện', NULL, 1),
    (4, N'Hợp tác Doanh nghiệp', N'Ngày hội việc làm On-the-job training (OJT), thực tập và workshop tuyển dụng', NULL, 1),
    (5, N'Trao đổi Quốc tế', N'Chương trình trao đổi sinh viên nước ngoài, học kỳ quốc tế và trại hè văn hóa', NULL, 0),
    (6, N'Cơ sở Vật chất & Đời sống', N'Danh mục thử nghiệm độc lập (không chứa bài viết) dùng để test xóa thành công', NULL, 1);
SET IDENTITY_INSERT dbo.Category OFF;
GO

-- 3. Nạp Thẻ Tag (Tag)
INSERT INTO dbo.Tag (TagID, TagName, Note)
VALUES
    (1, N'AI', N'Trí tuệ nhân tạo và Machine Learning'),
    (2, N'Robotics', N'Tự động hóa và Robot thông minh'),
    (3, N'Technology', N'Công nghệ phần mềm và hệ thống'),
    (4, N'Hackathon', N'Cuộc thi lập trình thực chiến'),
    (5, N'Coding', N'Kỹ năng lập trình và thuật toán'),
    (6, N'SinhVien', N'Đời sống và hoạt động sinh viên'),
    (7, N'HocBong', N'Chính sách và học bổng khuyến học'),
    (8, N'DaoTao', N'Chương trình đào tạo và đăng ký tín chỉ'),
    (9, N'OJT', N'Thực tập doanh nghiệp On-the-job training'),
    (10, N'ViecLam', N'Cơ hội nghề nghiệp và tuyển dụng'),
    (11, N'Global', N'Hội nhập quốc tế và ngoại ngữ'),
    (12, N'Cloud', N'Điện toán đám mây và hạ tầng mạng');
GO

-- 4. Nạp Bài viết Tin tức (NewsArticle)
INSERT INTO dbo.NewsArticle (NewsArticleID, NewsTitle, Headline, CreatedDate, NewsContent, NewsSource, CategoryID, NewsStatus, CreatedByID, UpdatedByID, ModifiedDate)
VALUES
    (
        '1',
        N'FPT University ra mắt Trung tâm Nghiên cứu AI và Robotics thế hệ mới',
        N'Trung tâm Nghiên cứu AI và Robotics trang bị cụm GPU tiên tiến phục vụ đào tạo',
        '2026-10-01 08:30:00',
        N'Trung tâm Nghiên cứu AI & Robotics được trang bị cụm máy chủ GPU hiệu năng cao hỗ trợ sinh viên nghiên cứu các mô hình Deep Learning và tự động hóa thông minh. Sinh viên được trực tiếp tham gia các đề tài nghiên cứu cấp quốc tế và ứng dụng vào thực tiễn doanh nghiệp.',
        N'Phòng Khoa học & Đào tạo',
        1,
        1,
        2,
        2,
        '2026-10-01 08:30:00'
    ),
    (
        '2',
        N'Phát động cuộc thi lập trình Hackathon "SBA Code Sprint 2026"',
        N'Cuộc thi lập trình thường niên với tổng giải thưởng lên tới 100 triệu đồng',
        '2026-10-04 14:00:00',
        N'Cuộc thi lập trình thường niên dành cho sinh viên CNTT với tổng giải thưởng lên đến 100 triệu đồng. Đăng ký tham gia theo nhóm từ 3 đến 5 thành viên. Đề bài năm nay tập trung vào giải quyết các bài toán chuyển đổi số và ứng dụng thực tiễn.',
        N'CLB Lập trình & Đổi mới sáng tạo',
        3,
        1,
        2,
        2,
        '2026-10-04 14:00:00'
    ),
    (
        '3',
        N'Thông báo lịch đăng ký môn học và xét học bổng kỳ Fall 2026',
        N'Cổng đăng ký tín chỉ chuyên ngành và hồ sơ học bổng tài năng mở từ 15/10',
        '2026-10-05 09:15:00',
        N'Phòng Đào tạo thông báo cổng đăng ký tín chỉ chuyên ngành và hồ sơ học bổng tài năng sẽ mở từ ngày 15/10/2026 trên hệ thống EduNext/FAP. Sinh viên đạt GPA từ 8.5 trở lên đủ điều kiện nộp hồ sơ xét cấp học bổng khuyến khích học tập.',
        N'Phòng Đào tạo FPT University',
        2,
        1,
        6,
        6,
        '2026-10-05 09:15:00'
    ),
    (
        '4',
        N'Ngày hội Tuyển dụng OJT kết nối hơn 40 tập đoàn công nghệ đa quốc gia',
        N'Cơ hội phỏng vấn trực tiếp vị trí thực tập sinh Software Engineer và Cloud DevOps',
        '2026-10-08 10:45:00',
        N'Cơ hội phỏng vấn trực tiếp vị trí thực tập sinh Software Engineer, Data Analyst, Cloud DevOps tại hội trường Alpha. Hơn 40 doanh nghiệp đối tác hàng đầu đã sẵn sàng tiếp nhận sinh viên kỳ On-the-job training với mức trợ cấp hấp dẫn.',
        N'Phòng Quan hệ Doanh nghiệp',
        4,
        1,
        4,
        4,
        '2026-10-08 10:45:00'
    ),
    (
        '5',
        N'Bản thảo: Kế hoạch mở rộng phòng Lab Cloud Computing năm 2027',
        N'Dự thảo nâng cấp hạ tầng Cloud Lab đang trong quá trình lấy ý kiến chuyên môn',
        '2026-10-10 16:20:00',
        N'Dự thảo đề án trang bị hạ tầng máy chủ đám mây thế hệ mới phục vụ môn học SBA301 và các chuyên ngành kỹ thuật phần mềm. Bài viết đang ở chế độ Nháp/Inactive để ban biên tập thẩm định trước khi công bố chính thức.',
        N'Ban Quản lý Dự án Lab',
        1,
        0,
        4,
        4,
        '2026-10-10 16:20:00'
    );
GO

-- 5. Nạp Liên kết Thẻ bài viết (NewsTag)
INSERT INTO dbo.NewsTag (NewsArticleID, TagID)
VALUES
    ('1', 1), ('1', 2), ('1', 3),
    ('2', 4), ('2', 5), ('2', 6),
    ('3', 7), ('3', 8),
    ('4', 9), ('4', 10),
    ('5', 3), ('5', 12);
GO

