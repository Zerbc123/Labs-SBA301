# SBA301 - Slot 22 - Chapter 15 Part A: Category CRUD Backend
**FUNewsManagementSystem - Spring Boot REST API & Spring Data JPA**

Hệ thống Backend RESTful Web Service xây dựng cho môn học **SBA301 (Integrate Single Page Application with Spring Boot)** theo đúng nội dung Section 6.1 tài liệu `SBA301_Slot22_Chapter15_PartA_CRUD_Backend.pdf`.

---

## 1. Yêu cầu môi trường (Prerequisites)
- **Java**: JDK 21 (LTS)
- **Build tool**: Apache Maven 3.6.3+ (kèm Maven Wrapper `mvnw` / `mvnw.cmd`)
- **Database**: Microsoft SQL Server 2019 / 2022
- **Framework**: Spring Boot 3.3.4
- **Dependencies chính**:
  - `spring-boot-starter-web`: Xây dựng REST Controller và API endpoints
  - `spring-boot-starter-data-jpa`: Tương tác cơ sở dữ liệu qua Hibernate ORM
  - `spring-boot-starter-validation`: Bean Validation (`@NotBlank`, `@Size`,...)
  - `mssql-jdbc`: Driver kết nối SQL Server
  - `spring-boot-starter-test`: JUnit 5, Mockito, MockMvc

---

## 2. Cấu trúc thư mục (Package Structure)

```
d:\File\KÌ 7\SBA301\fff/
├── pom.xml
├── mvnw
├── mvnw.cmd
├── sql/
│   └── FUNewsManagementSBA301.sql       # Script tạo DB & seed data Category
├── postman/
│   └── FUNewsManagement_Slot22.postman_collection.json # Bộ test Postman Category
├── src/
│   ├── main/
│   │   ├── java/com/fpt/sba301/slot22/
│   │   │   ├── Slot22Application.java
│   │   │   ├── controller/
│   │   │   │   └── CategoryController.java
│   │   │   ├── dto/
│   │   │   │   ├── ApiError.java
│   │   │   │   ├── CategoryRequest.java
│   │   │   │   └── CategoryResponse.java
│   │   │   ├── entity/
│   │   │   │   └── Category.java
│   │   │   ├── exception/
│   │   │   │   ├── ApiExceptionHandler.java
│   │   │   │   ├── BusinessConflictException.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   ├── repository/
│   │   │   │   └── CategoryRepository.java
│   │   │   └── service/
│   │   │       ├── CategoryService.java
│   │   │       └── CategoryServiceImpl.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/com/fpt/sba301/slot22/
│           ├── Slot22ApplicationTests.java
│           ├── controller/
│           │   └── CategoryControllerTest.java
│           └── service/
│               └── CategoryServiceTest.java
└── README.md
```

---

## 3. Khởi tạo Database và Seed Data

Script nằm tại file `sql/FUNewsManagementSBA301.sql` (theo đúng Bước 1 trang 17 của PDF):

```powershell
sqlcmd -S localhost -U sa -P 123456 -i sql/FUNewsManagementSBA301.sql
```

> **Lưu ý đặc biệt**: Cột mô tả của Category trong database gốc Assignment 02 được đặt là `CategoryDesciption` (thiếu chữ 'r'). Entity `Category.java` được map chính xác:
> `@Column(name = "CategoryDesciption", nullable = false, length = 250)`

---

## 4. Cấu hình kết nối (`application.properties`)

```properties
spring.application.name=demo-slot22-backend
server.port=8080

# Cấu hình SQL Server
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=FUNewsManagementSBA301;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=123456
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# Hibernate validation & SQL log
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
```

---

## 5. Hướng dẫn Biên dịch, Test và Khởi chạy

### 5.1. Biên dịch và chạy Unit/Slice Tests
```powershell
mvn test
# Hoặc với Maven Wrapper:
.\mvnw.cmd test
```

### 5.2. Khởi chạy Backend Application
```powershell
mvn spring-boot:run
# Hoặc chạy với Maven Wrapper:
.\mvnw.cmd spring-boot:run
```

---

## 6. Danh sách REST Endpoints (`/api/categories`)

| Method | Endpoint | Mô tả | Tham số / Body | Mã HTTP |
|---|---|---|---|---|
| `GET` | `/api/categories` | Lấy danh sách chuyên mục phân trang & tìm kiếm | `?keyword=...&page=0&size=10&sort=categoryName,asc` | `200 OK` |
| `GET` | `/api/categories/{id}` | Lấy chi tiết chuyên mục | `id` (short) | `200 OK` / `404 Not Found` |
| `POST` | `/api/categories` | Tạo chuyên mục mới | JSON `CategoryRequest` | `201 Created` / `400` / `409` |
| `PUT` | `/api/categories/{id}` | Cập nhật chuyên mục | `id` + JSON `CategoryRequest` | `200 OK` / `400` / `404` / `409` |
| `DELETE` | `/api/categories/{id}` | Xóa chuyên mục | `id` (short) | `204 No Content` / `404` |

---

## 7. Bảng Kiểm Thử Category CRUD (Test Matrix)

| Thao tác (Request) | Expected HTTP | Kết quả thực tế | DB Post-condition |
|---|---|---|---|
| `GET /api/categories?page=0&size=10` | 200 OK | **200 OK** | Trả về Page JSON gồm 3 seed categories |
| `GET /api/categories/1` | 200 OK | **200 OK** | Dữ liệu đúng ID 1: "Academic news" |
| `GET /api/categories/32767` | 404 Not Found | **404 Not Found** | Không thay đổi DB; `code: "NOT_FOUND"` |
| `POST /api/categories` (Hợp lệ) | 201 Created | **201 Created** | Sinh mới bản ghi ID 4: "Technology News" |
| `POST /api/categories` (Tên trống) | 400 Bad Request | **400 Bad Request** | Không tạo row mới; `fieldErrors` chi tiết |
| `POST /api/categories` (Tên trùng) | 409 Conflict | **409 Conflict** | Không tạo row mới; `code: "CONFLICT"` |
| `PUT /api/categories/1` (Hợp lệ) | 200 OK | **200 OK** | Cột trong DB cập nhật thành công |
| `PUT /api/categories/99` (ID không tồn tại) | 404 Not Found | **404 Not Found** | Không tạo row mới |
| `DELETE /api/categories/1` (Tồn tại) | 204 No Content | **204 No Content** | Row bị xóa khỏi DB |
| `GET /api/categories?keyword=academic` | 200 OK | **200 OK** | Lọc chính xác row có tên chứa keyword |
| `GET /api/categories?page=0&size=1` | 200 OK | **200 OK** | Trả về đúng 1 phần tử trên 1 trang (`size: 1`) |

---

## 8. Chi tiết Luồng Thực Thi (Execution Trace - CREATE Request)

Khi gọi `POST /api/categories`:
1. **HTTP Boundary**: Request JSON được `DispatcherServlet` định tuyến tới `CategoryController.create(@Valid @RequestBody CategoryRequest request)`.
2. **Bean Validation**: Spring kiểm tra các annotation `@NotBlank`, `@Size` trên DTO. Nếu vi phạm, `MethodArgumentNotValidException` được ném ra và `@RestControllerAdvice` trả về `400 Bad Request`.
3. **Service Layer**: Controller gọi `CategoryService.create(request)` nằm trong transaction `@Transactional`.
4. **Business Rule**: Service kiểm tra `repository.existsByCategoryNameIgnoreCase(request.categoryName())`. Nếu đã tồn tại, ném `BusinessConflictException` -> HTTP `409 Conflict`.
5. **Entity Mutation**: Khởi tạo `Category` mới, gán các trường hợp lệ từ DTO.
6. **Repository Persistence**: Gọi `CategoryRepository.save(c)`. Spring Data JPA ủy quyền cho `EntityManager.persist()` -> Hibernate phát sinh câu lệnh SQL `INSERT INTO Category ...`.
7. **Database Commit**: SQL Server cấp phát identity ID (`CategoryID`) và hoàn tất transaction commit.
8. **HTTP Response**: Trả về `201 Created` kèm `CategoryResponse` DTO chứa ID vừa sinh.
