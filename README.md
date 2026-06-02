Nicejob là một hệ thống tuyển dụng IT full-stack, gồm giao diện cho ứng viên tìm việc và trang quản trị cho admin hoặc nhà tuyển dụng quản lý công ty, tin tuyển dụng, người dùng, vai trò, quyền hạn và hồ sơ ứng tuyển.

## Mục tiêu dự án

nicejob mô phỏng một nền tảng job portal cơ bản nhưng có đủ các phần quan trọng của một hệ thống thực tế:

- Ứng viên có thể đăng ký, đăng nhập, xem danh sách công ty, xem danh sách việc làm và nộp CV.
- Admin có thể quản lý users, companies, jobs, resumes, roles và permissions.
- Hệ thống có phân quyền theo vai trò, không chỉ kiểm tra đăng nhập.
- Backend chuẩn hóa response API, hỗ trợ pagination, filter, sort, upload file, JWT authentication và refresh token.
- Dữ liệu được lưu bằng MongoDB với Mongoose schema và soft delete để hạn chế mất dữ liệu khi xóa.

## Kiến trúc tổng quan

```text
front-end
React + Vite + TypeScript
Ant Design + Ant Design Pro
Redux Toolkit
Axios interceptors
React Router

        |
        | REST API, JWT access token, refresh token cookie
        v

back-end
NestJS + TypeScript
Passport JWT + Local Strategy
Mongoose + MongoDB
Multer upload
RBAC guard
Swagger documentation

        |
        v

MongoDB
users, companies, jobs, resumes, roles, permissions, subscribers
```

## Công nghệ sử dụng

### Frontend

| Phần | Công nghệ | Vai trò |
| --- | --- | --- |
| Core UI | React 18, TypeScript, Vite | Xây dựng SPA, cấu trúc component, routing và build frontend |
| UI library | Ant Design, Ant Design Pro Components | Form, table, modal, drawer, upload, layout admin |
| State management | Redux Toolkit, React Redux | Lưu account, auth state, danh sách users, jobs, companies, roles, permissions, resumes |
| Routing | React Router DOM | Tách routes client và routes admin |
| HTTP client | Axios | Gọi REST API, gắn access token, xử lý refresh token tự động |
| Styling | SCSS modules | Tách style theo khu vực client, admin, auth và layout |
| Utility | Dayjs, Lodash, query-string | Format ngày, group permission, build query filter/sort |
| Rich text | React Quill | Nhập mô tả công việc trong admin job form |

### Backend

| Phần | Công nghệ | Vai trò |
| --- | --- | --- |
| Core API | NestJS 9, TypeScript | Xây dựng REST API theo module, controller, service |
| Database | MongoDB, Mongoose | Lưu dữ liệu người dùng, công ty, việc làm, CV, quyền hạn |
| Authentication | Passport Local, Passport JWT, bcryptjs | Đăng nhập bằng email/password, hash password, xác thực JWT |
| Token | @nestjs/jwt, cookie-parser | Access token trả về frontend, refresh token lưu ở httpOnly cookie |
| Authorization | Custom JwtAuthGuard, Reflector metadata | Kiểm tra permission theo method, apiPath và module |
| File upload | Multer | Upload logo công ty và CV ứng viên vào thư mục public |
| Validation | class-validator, ValidationPipe | Validate DTO và loại bỏ field không hợp lệ |
| Query | api-query-params | Parse filter, sort, pagination, populate từ query string |
| Security | Helmet, Throttler | Thêm HTTP security headers và rate limit login/API |
| API docs | Swagger | Sinh tài liệu API tại endpoint `api-docs` |
| Soft delete | soft-delete-plugin-mongoose | Xóa mềm document và lưu người thao tác |
| Mail scaffold | @nestjs-modules/mailer, nodemailer, handlebars | Chuẩn bị cấu hình gửi mail bằng template |

## Cấu trúc thư mục

```text
nicejob
+-- back-end
|   +-- src
|   |   +-- auth
|   |   +-- users
|   |   +-- companies
|   |   +-- jobs
|   |   +-- resumes
|   |   +-- roles
|   |   +-- permissions
|   |   +-- files
|   |   +-- subscribers
|   |   +-- databases
|   |   +-- core
|   |   +-- decorator
|   +-- public
|       +-- images
+-- front-end
    +-- src
    |   +-- components
    |   +-- pages
    |   +-- redux
    |   +-- config
    |   +-- styles
    |   +-- types
    +-- public
```

## Các module chính

### Auth

Auth xử lý đăng ký, đăng nhập, lấy thông tin tài khoản, refresh token và logout.

Luồng đăng nhập:

1. Frontend gọi `POST /api/v1/auth/login`.
2. Backend dùng `LocalAuthGuard` để validate email và password.
3. Password được so sánh bằng `bcryptjs`.
4. Nếu hợp lệ, backend tạo access token và refresh token.
5. Refresh token được lưu vào database trong user document.
6. Refresh token cũng được set vào cookie với `httpOnly`, `secure` và `sameSite: none`.
7. Frontend lưu access token vào localStorage để gắn vào các request tiếp theo.

Luồng refresh token:

1. Khi API trả `401`, Axios interceptor gọi `GET /api/v1/auth/refresh`.
2. Backend đọc refresh token từ cookie.
3. Nếu token hợp lệ và tồn tại trong database, backend cấp access token mới.
4. Refresh token cũ được thay bằng refresh token mới để giảm rủi ro dùng lại token cũ.
5. Request ban đầu được gọi lại với access token mới.

### Users

Module users quản lý thông tin người dùng:

- Tạo user trong admin.
- Đăng ký user thường.
- Hash password trước khi lưu.
- Tìm user theo email để login.
- Lấy danh sách user có pagination.
- Không trả password khi lấy chi tiết user.
- Không cho xóa admin email được cấu hình trong env.
- Lưu `createdBy`, `updatedBy`, `deletedBy` để audit thao tác.

### Companies

Module companies quản lý thông tin công ty:

- Tên công ty.
- Địa chỉ.
- Mô tả.
- Logo.
- Thông tin người tạo, sửa, xóa.

Logo công ty được upload qua module files, sau đó filename được lưu vào field `logo`.

### Jobs

Module jobs quản lý tin tuyển dụng:

- Tên job.
- Danh sách kỹ năng.
- Công ty liên kết.
- Lương.
- Số lượng tuyển.
- Level: `INTERN`, `FRESHER`, `JUNIOR`, `MIDDLE`, `SENIOR`.
- Mô tả công việc bằng rich text.
- Địa điểm.
- Ngày bắt đầu và ngày kết thúc.
- Trạng thái bật tắt bằng `isActive`.

Admin có thể tạo, sửa, xóa mềm job. Trang client hiển thị danh sách việc làm và chi tiết việc làm từ API jobs.

### Resumes

Module resumes là phần xử lý hồ sơ ứng tuyển.

Khi ứng viên nộp CV:

1. Ứng viên phải đăng nhập.
2. Frontend upload file CV qua `POST /api/v1/files/upload` với `folder_type=resume`.
3. Backend kiểm tra loại file và giới hạn dung lượng 5MB.
4. Nếu upload thành công, backend trả về `fileName`.
5. Frontend gọi `POST /api/v1/resumes` với `url`, `companyId`, `jobId`.
6. Backend lấy user hiện tại từ JWT.
7. Resume được tạo với status mặc định là `PENDING`.
8. Backend lưu thêm lịch sử đầu tiên vào `history`.

Admin có thể vào màn hình resume để xem hồ sơ, filter theo status và đổi trạng thái xử lý.

### Roles và Permissions

Hệ thống dùng RBAC theo role và permission.

Permission có 4 thông tin chính:

| Field | Ý nghĩa |
| --- | --- |
| `name` | Tên quyền, ví dụ `Update resume status` |
| `apiPath` | Đường dẫn API, ví dụ `/api/v1/resumes/:id` |
| `method` | HTTP method, ví dụ `GET`, `POST`, `PATCH`, `DELETE` |
| `module` | Nhóm chức năng, ví dụ `RESUMES`, `JOBS`, `USERS` |

Role chứa danh sách permission được phép sử dụng. Khi user đăng nhập, backend lấy role của user, populate permissions và trả về frontend. Frontend dùng permissions này để ẩn hoặc hiện các nút trong admin. Backend vẫn là nơi quyết định cuối cùng bằng guard.

## Cách xử lý phân quyền

Backend có `JwtAuthGuard` được gắn global trong `main.ts`.

Quy trình kiểm tra request:

1. Nếu route có decorator `@Public()`, request được bỏ qua bước xác thực.
2. Nếu không public, guard kiểm tra JWT access token.
3. `JwtStrategy` decode token, lấy role của user và load permissions từ database.
4. Guard lấy `request.method` và `request.route.path`.
5. Guard so sánh với danh sách permission của user.
6. Nếu không có permission phù hợp, backend trả `403 Forbidden`.

Điểm quan trọng là frontend không phải nơi bảo mật chính. Frontend chỉ hỗ trợ trải nghiệm bằng cách ẩn UI không được phép dùng, còn backend vẫn chặn request trái quyền.

## Bảng dữ liệu và status

Dự án dùng MongoDB nên các bảng dưới đây thực tế là collection. README vẫn mô tả theo cách "bảng/collection" để dễ đọc với người quen database quan hệ.

### users

| Field | Ý nghĩa |
| --- | --- |
| `name` | Tên người dùng |
| `email` | Email đăng nhập |
| `password` | Password đã hash bằng bcrypt |
| `age`, `gender`, `address` | Thông tin cá nhân |
| `company` | Công ty liên kết nếu user thuộc nhà tuyển dụng |
| `role` | ObjectId trỏ tới roles |
| `refreshToken` | Refresh token hiện tại |
| `createdBy`, `updatedBy`, `deletedBy` | Audit người thao tác |

### companies

| Field | Ý nghĩa |
| --- | --- |
| `name` | Tên công ty |
| `address` | Địa chỉ |
| `description` | Mô tả công ty |
| `logo` | Tên file logo đã upload |
| `createdBy`, `updatedBy`, `deletedBy` | Audit người thao tác |

### jobs

| Field | Ý nghĩa |
| --- | --- |
| `name` | Tên vị trí tuyển dụng |
| `skills` | Danh sách kỹ năng yêu cầu |
| `company` | Snapshot công ty gồm `_id`, `name`, `logo` |
| `salary` | Mức lương |
| `quantity` | Số lượng tuyển |
| `level` | Trình độ yêu cầu |
| `description` | Mô tả công việc |
| `location` | Địa điểm |
| `startDate`, `endDate` | Thời gian tuyển |
| `isActive` | Trạng thái hiển thị |
| `createdBy`, `updatedBy`, `deletedBy` | Audit người thao tác |

Status của jobs:

| Giá trị | Ý nghĩa | Cách xử lý |
| --- | --- | --- |
| `true` | ACTIVE | Job đang mở hoặc được phép hiển thị |
| `false` | INACTIVE | Job bị tắt, admin có thể dùng để tạm ngưng tin |

Frontend hiển thị `isActive` thành tag `ACTIVE` hoặc `INACTIVE`. Admin chỉnh bằng switch trong form tạo hoặc sửa job.

### resumes

| Field | Ý nghĩa |
| --- | --- |
| `email` | Email của ứng viên nộp CV |
| `userId` | ObjectId của ứng viên |
| `url` | Tên file CV đã upload |
| `status` | Trạng thái xử lý hồ sơ |
| `companyId` | ObjectId trỏ tới company |
| `jobId` | ObjectId trỏ tới job |
| `history` | Lịch sử thay đổi status |
| `createdBy`, `updatedBy`, `deletedBy` | Audit người thao tác |

Status của resumes:

| Status | Khi nào được gán | Ý nghĩa nghiệp vụ |
| --- | --- | --- |
| `PENDING` | Tự động khi ứng viên nộp CV | Hồ sơ đã được nhận, đang chờ xem xét |
| `REVIEWING` | Admin chọn trong màn hình chi tiết resume | Hồ sơ đang được kiểm tra hoặc đang trong quá trình review |
| `APPROVED` | Admin chọn sau khi hồ sơ đạt yêu cầu | Hồ sơ được chấp nhận cho bước tiếp theo |
| `REJECTED` | Admin chọn khi hồ sơ không phù hợp | Hồ sơ bị từ chối |

Cách backend xử lý status resume:

1. Khi tạo resume, service luôn set `status: 'PENDING'`.
2. Đồng thời service tạo `history` đầu tiên với status `PENDING`, thời gian hiện tại và user tạo.
3. Khi admin gọi `PATCH /api/v1/resumes/:id`, backend cập nhật field `status`.
4. Backend lưu `updatedBy` bằng user hiện tại.
5. Backend dùng `$push` để thêm một record mới vào `history`.
6. Nhờ vậy hệ thống giữ được lịch sử thay đổi trạng thái của từng CV.

Ví dụ record trong `history`:

```json
{
  "status": "APPROVED",
  "updatedAt": "2026-06-02T10:00:00.000Z",
  "UpdatedBy": {
    "_id": "user_id",
    "email": "admin@example.com"
  }
}
```

Ghi chú kỹ thuật: backend hiện đang nhận `status` dạng string và frontend giới hạn lựa chọn bằng select. Nếu phát triển tiếp, nên thêm enum validation trong DTO để backend chỉ nhận các giá trị hợp lệ như `PENDING`, `REVIEWING`, `APPROVED`, `REJECTED`.

### roles

| Field | Ý nghĩa |
| --- | --- |
| `name` | Tên role, ví dụ `super admin` hoặc `user` |
| `description` | Mô tả role |
| `isActive` | Trạng thái role |
| `permissions` | Danh sách ObjectId trỏ tới permissions |
| `createdBy`, `updatedBy`, `deletedBy` | Audit người thao tác |

Status của roles:

| Giá trị | Ý nghĩa |
| --- | --- |
| `true` | Role đang active |
| `false` | Role bị tắt hoặc không nên dùng |

### permissions

| Field | Ý nghĩa |
| --- | --- |
| `name` | Tên permission |
| `apiPath` | API path cần bảo vệ |
| `method` | HTTP method |
| `module` | Module nghiệp vụ |
| `createdBy`, `updatedBy`, `deletedBy` | Audit người thao tác |

Permission được dùng ở cả frontend và backend:

- Frontend dùng để kiểm tra có hiển thị nút thao tác hay không.
- Backend dùng để chặn request không đủ quyền.

### subscribers

| Field | Ý nghĩa |
| --- | --- |
| `email` | Email người đăng ký nhận thông báo |
| `name` | Tên người đăng ký |
| `skills` | Danh sách kỹ năng quan tâm |
| `createdBy`, `updatedBy`, `deletedBy` | Audit người thao tác |

Module này chuẩn bị cho tính năng theo dõi kỹ năng hoặc gửi job phù hợp qua email.

## Chuẩn response API

Backend dùng `TransformInterceptor` để chuẩn hóa response:

```json
{
  "statusCode": 200,
  "message": "Fetching all job with pagination",
  "data": {}
}
```

Lợi ích:

- Frontend xử lý response nhất quán.
- Mỗi controller có thể set message bằng `@ResponseMessage`.
- Dễ debug khi đọc network response.

## Pagination, filter, sort và populate

Các service như users, companies, jobs, resumes, roles và permissions đều có pattern lấy danh sách gần giống nhau:

1. Nhận `current`, `pageSize` và query string từ frontend.
2. Dùng `api-query-params` để parse filter, sort, projection và population.
3. Xóa `current` và `pageSize` khỏi filter.
4. Tính `offset = (current - 1) * pageSize`.
5. Query database bằng `skip`, `limit`, `sort`, `populate`.
6. Trả về `meta` và `result`.

Response phân trang:

```json
{
  "meta": {
    "current": 1,
    "pageSize": 10,
    "pages": 3,
    "total": 25
  },
  "result": []
}
```

Frontend build query bằng `query-string`, ví dụ:

```text
current=1&pageSize=10&sort=-updatedAt
```

Với resumes, frontend có thể populate company và job:

```text
populate=companyId,jobId&fields=companyId._id,companyId.name,companyId.logo,jobId._id,jobId.name
```

## Upload file

Module files dùng Multer để upload file vào thư mục public.

Cách xử lý:

1. Frontend gửi form-data với field `fileUpload`.
2. Frontend truyền header `folder_type`, ví dụ `resume` hoặc `company`.
3. Backend lưu file vào `public/images/{folder_type}`.
4. Tên file được đổi thành `{originalName}-{timestamp}.{ext}` để giảm trùng tên.
5. Backend chỉ trả về `fileName`, không lưu file vào database ở module files.
6. Module khác như companies hoặc resumes sẽ lưu filename này vào field riêng.

Rule upload hiện tại:

| Rule | Giá trị |
| --- | --- |
| Field name | `fileUpload` |
| Max size | 5MB |
| Folder | Theo header `folder_type` |
| File hợp lệ | png, jpg, jpeg, gif, txt, pdf, doc, docx |

## Soft delete và audit

Các collection chính dùng `soft-delete-plugin-mongoose`. Khi xóa, hệ thống không xóa cứng document khỏi database mà đánh dấu xóa mềm.

Trước khi soft delete, service cập nhật field `deletedBy` để biết ai thực hiện thao tác. Với update, service lưu `updatedBy`. Với create, service lưu `createdBy`.

Cách này giúp hệ thống có audit trail cơ bản:

- Ai tạo dữ liệu.
- Ai chỉnh sửa dữ liệu.
- Ai xóa dữ liệu.
- Dữ liệu bị xóa mềm vẫn có thể được kiểm tra lại trong database.

## Khởi tạo dữ liệu

Module databases chạy khi app start và có `SHOULD_INIT=true`.

Nếu database đang trống, hệ thống tự tạo:

- Danh sách permissions ban đầu.
- Role `super admin` với toàn bộ permissions.
- Role `user` không có quyền admin.
- Một số user mẫu gồm admin và user thường.

Điều này giúp môi trường development có dữ liệu để login và test phân quyền ngay.

## Các route chính

### Client

| Route | Chức năng |
| --- | --- |
| `/` | Trang chủ, search, danh sách công ty và job mới |
| `/job` | Danh sách việc làm |
| `/job/:id` | Chi tiết việc làm và nộp CV |
| `/company` | Danh sách công ty |
| `/company/:id` | Chi tiết công ty |
| `/login` | Đăng nhập |
| `/register` | Đăng ký |

### Admin

| Route | Chức năng |
| --- | --- |
| `/admin` | Dashboard |
| `/admin/company` | Quản lý công ty |
| `/admin/user` | Quản lý người dùng |
| `/admin/job` | Quản lý việc làm |
| `/admin/job/upsert` | Tạo hoặc sửa job |
| `/admin/resume` | Quản lý hồ sơ ứng tuyển |
| `/admin/permission` | Quản lý permissions |
| `/admin/role` | Quản lý roles |

## Cách chạy dự án

### Backend

```bash
cd back-end
npm install
npm run dev
```

Backend mặc định chạy theo biến `PORT` trong `.env.example`, ví dụ `6969`.

Các biến môi trường chính:

```env
PORT=6969
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>
JWT_TOKEN_SECRET=your_jwt_token_secret
JWT_TOKEN_EXPIRES_IN=1d
JWT_REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret
JWT_REFRESH_TOKEN_EXPIRES_IN=1d
CLIENT_URL=http://localhost:3000
ADMIN_EMAIL=your_admin_email@example.com
SHOULD_INIT=true
ADMIN_PASSWORD=your_admin_password
USER_PASSWORD=your_user_password
MAIL_AUTH_PASS=your_mail_password
MAIL_AUTH_USER=your_mail_user@example.com
MAIL_HOST=smtp.example.com
```

### Frontend

```bash
cd front-end
npm install
npm run dev
```

Frontend dùng `.env.development`:

```env
NODE_ENV=development
PORT=3000
VITE_BACKEND_URL=http://localhost:6969
```


