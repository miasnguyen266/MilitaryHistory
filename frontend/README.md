# HistoryArmyVN - Ứng dụng Lịch sử Quân đội Việt Nam

## Tổng quan dự án

HistoryArmyVN là một ứng dụng web cung cấp thông tin về lịch sử quân đội Việt Nam, bao gồm các nhân vật lịch sử, sự kiện, thời kỳ và timeline. Dự án được xây dựng với kiến trúc client-server, sử dụng React cho frontend và Node.js cho backend.

## Kiến trúc tổng quan

- **Frontend**: React + Vite, sử dụng Tailwind CSS cho styling
- **Backend**: Node.js với Express.js
- **Database**: MySQL
- **Authentication**: JWT-based authentication

## Luồng hoạt động của ứng dụng

### Backend (Server)

#### 1. Khởi động server
- Server được khởi tạo trong `server.js`
- Sử dụng Express.js framework
- Cấu hình middleware cho CORS, authentication, và file upload

#### 2. Kết nối database
- Kết nối đến MySQL database thông qua module `mysql2`
- Cấu hình kết nối được định nghĩa trong `config/db.js`
- Database chứa các bảng: users, figures, events, periods, artifacts

#### 3. API Routes
- **Authentication**: `/api/auth` - đăng nhập, đăng ký, xác thực token
- **Figures**: `/api/figures` - quản lý nhân vật lịch sử
- **Events**: `/api/events` - quản lý sự kiện lịch sử
- **Periods**: `/api/periods` - quản lý thời kỳ lịch sử
- **Timeline**: `/api/timeline` - dữ liệu timeline
- **Search**: `/api/search` - chức năng tìm kiếm
- **Upload**: `/api/upload` - upload file (hình ảnh artifacts)
- **Admin Dashboard**: Các route quản trị cho admin

#### 4. Middleware
- **Authentication**: Kiểm tra JWT token cho các route bảo mật
- **File Upload**: Xử lý upload hình ảnh sử dụng multer

### Frontend (Client)

#### 1. Khởi tạo ứng dụng
- Ứng dụng React được khởi tạo trong `main.jsx`
- Sử dụng React Router cho navigation
- Context API cho quản lý state toàn cục (AuthContext, LanguageContext)

#### 2. Component Services
- **API Services**: Các service để gọi API backend
  - `authService.js`: Xử lý authentication (login, register, logout)
  - `figureService.js`: Lấy dữ liệu nhân vật lịch sử
  - `eventService.js`: Lấy dữ liệu sự kiện
  - `periodService.js`: Lấy dữ liệu thời kỳ
  - `searchService.js`: Chức năng tìm kiếm
  - `uploadService.js`: Upload file

#### 3. Components chính
- **Navbar**: Navigation bar với menu và ngôn ngữ
- **Footer**: Footer của trang
- **Timeline**: Component hiển thị timeline lịch sử
- **ArtifactSlider**: Slider hiển thị artifacts
- **CarouselVideo**: Carousel video
- **Admin Components**: Dashboard, quản lý figures/events/periods

#### 4. Pages
- **Home**: Trang chủ
- **Figures**: Danh sách nhân vật lịch sử
- **FigureDetail**: Chi tiết nhân vật
- **Periods**: Danh sách thời kỳ
- **PeriodDetail**: Chi tiết thời kỳ
- **EventDetail**: Chi tiết sự kiện
- **Search**: Trang tìm kiếm
- **Admin Pages**: Các trang quản trị

#### 5. Context và State Management
- **AuthContext**: Quản lý trạng thái đăng nhập
- **LanguageContext**: Quản lý ngôn ngữ (Việt/Anh)

## Cài đặt và chạy

### Backend
```bash
cd backend
npm install
# Cấu hình database trong config/db.js
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Công nghệ sử dụng

### Backend
- Node.js
- Express.js
- MySQL2
- JWT
- Multer (file upload)
- Bcrypt (password hashing)

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios (HTTP client)
- i18next (internationalization)

## Database Schema

- **users**: Thông tin người dùng
- **figures**: Nhân vật lịch sử
- **events**: Sự kiện lịch sử
- **periods**: Thời kỳ lịch sử
- **artifacts**: Hiện vật lịch sử

## API Endpoints

### Authentication
- POST `/api/auth/login`
- POST `/api/auth/register`
- GET `/api/auth/verify`

### Figures
- GET `/api/figures`
- GET `/api/figures/:id`
- POST `/api/figures` (admin)
- PUT `/api/figures/:id` (admin)
- DELETE `/api/figures/:id` (admin)

### Events
- GET `/api/events`
- GET `/api/events/:id`
- POST `/api/events` (admin)
- PUT `/api/events/:id` (admin)
- DELETE `/api/events/:id` (admin)

### Periods
- GET `/api/periods`
- GET `/api/periods/:id`
- POST `/api/periods` (admin)
- PUT `/api/periods/:id` (admin)
- DELETE `/api/periods/:id` (admin)

### Search
- GET `/api/search?q=query`

### Upload
- POST `/api/upload` (admin)

## Bảo mật

- JWT token authentication
- Password hashing với bcrypt
- CORS configuration
- Input validation

## Phát triển

### Scripts
- `npm run dev`: Chạy development server
- `npm run build`: Build production
- `npm run preview`: Preview production build
- `npm run lint`: Chạy ESLint

### Environment Variables
- `DB_HOST`: Database host
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: JWT secret key
- `PORT`: Server port

## Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## License

MIT License