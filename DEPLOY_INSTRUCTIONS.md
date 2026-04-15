# 🚀 Hướng dẫn Deploy Chi Tiết

## 📦 Dự án của bạn

- **Frontend**: React + Vite + Tailwind
- **Backend**: Node.js + Express + MySQL
- **GitHub**: https://github.com/miasnguyen266/MilitaryHistory

---

## 🎯 BƯỚC 1: Deploy Backend lên Railway (Làm trước)

### 1.1 Đăng nhập Railway

1. Truy cập: https://railway.app
2. Click **"Login"** → Chọn **"Login with GitHub"**
3. Authorize Railway truy cập GitHub của bạn

### 1.2 Tạo Project mới

1. Click **"New Project"**
2. Chọn **"Deploy from GitHub repo"**
3. Chọn repository: **miasnguyen266/MilitaryHistory**
4. Railway sẽ hỏi bạn muốn deploy folder nào

### 1.3 Cấu hình Root Directory

1. Trong Railway Dashboard → Settings
2. Tìm **"Root Directory"**
3. Nhập: `backend`
4. Click **"Save"**

### 1.4 Thêm MySQL Database

1. Trong Railway Project → Click **"+ New"**
2. Chọn **"Database"** → **"Add MySQL"**
3. Railway sẽ tự động tạo database
4. Click vào MySQL service → Tab **"Variables"**
5. Copy các giá trị:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`

### 1.5 Cấu hình Environment Variables cho Backend

1. Click vào Backend service → Tab **"Variables"**
2. Click **"+ New Variable"** và thêm từng cái:

```
DB_HOST=<MYSQLHOST từ bước 1.4>
DB_USER=<MYSQLUSER từ bước 1.4>
DB_PASSWORD=<MYSQLPASSWORD từ bước 1.4>
DB_NAME=<MYSQLDATABASE từ bước 1.4>
PORT=5000
NODE_ENV=production
JWT_SECRET=military_history_secret_key_2024
CORS_ORIGIN=*
```

**Lưu ý**: Sau khi deploy frontend, bạn sẽ quay lại đổi `CORS_ORIGIN` thành URL Vercel

### 1.6 Deploy Backend

1. Railway sẽ tự động deploy sau khi bạn thêm variables
2. Đợi 2-3 phút
3. Kiểm tra **"Deployments"** tab → Status phải là **"Success"**
4. Click vào deployment → Copy **"Domain"** (ví dụ: `military-history-production.up.railway.app`)

### 1.7 Import Database

1. Click vào MySQL service → Tab **"Data"**
2. Click **"Connect"** → Chọn **"MySQL Workbench"** hoặc **"TablePlus"**
3. Hoặc dùng Railway CLI:

```bash
# Cài Railway CLI
npm i -g @railway/cli

# Login
railway login

# Connect database
railway connect mysql

# Import file SQL
source dumps/militaryhistory.sql;
```

**Hoặc dùng MySQL Workbench**:

- Host: `<MYSQLHOST>`
- Port: `<MYSQLPORT>`
- Username: `<MYSQLUSER>`
- Password: `<MYSQLPASSWORD>`
- Database: `<MYSQLDATABASE>`
- Import file: `dumps/militaryhistory.sql`

### 1.8 Test Backend

Mở trình duyệt, truy cập:

```
https://<your-backend-domain>.railway.app/api/figures
```

Nếu thấy JSON data → **Thành công!** ✅

---

## 🌐 BƯỚC 2: Deploy Frontend lên Vercel

### 2.1 Đăng nhập Vercel

1. Truy cập: https://vercel.com
2. Click **"Sign Up"** hoặc **"Login"**
3. Chọn **"Continue with GitHub"**
4. Authorize Vercel

### 2.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Tìm repository: **miasnguyen266/MilitaryHistory**
3. Click **"Import"**

### 2.3 Cấu hình Project

1. **Framework Preset**: Vercel sẽ tự detect **"Vite"**
2. **Root Directory**: Click **"Edit"** → Chọn `frontend`
3. **Build Command**: `npm run build` (mặc định)
4. **Output Directory**: `dist` (mặc định)

### 2.4 Thêm Environment Variables

Click **"Environment Variables"** → Thêm:

```
VITE_API_URL=https://<your-backend-domain>.railway.app
```

**Thay `<your-backend-domain>` bằng domain Railway từ Bước 1.6**

Ví dụ:

```
VITE_API_URL=https://military-history-production.up.railway.app
```

### 2.5 Deploy

1. Click **"Deploy"**
2. Đợi 2-3 phút
3. Vercel sẽ hiển thị URL: `https://your-project.vercel.app`

### 2.6 Cập nhật CORS_ORIGIN trên Railway

1. Quay lại Railway → Backend service → Variables
2. Sửa `CORS_ORIGIN`:

```
CORS_ORIGIN=https://your-project.vercel.app
```

3. Backend sẽ tự động redeploy

---

## ✅ BƯỚC 3: Kiểm tra

### 3.1 Test Frontend

Truy cập: `https://your-project.vercel.app`

### 3.2 Test API Connection

1. Mở trang web
2. Mở DevTools (F12) → Tab **"Network"**
3. Reload trang
4. Kiểm tra các request tới backend có thành công không

### 3.3 Test Admin Login

1. Truy cập: `https://your-project.vercel.app/admin/login`
2. Đăng nhập với tài khoản admin từ database

---

## 🔧 Troubleshooting

### ❌ Lỗi: "CORS policy blocked"

**Nguyên nhân**: `CORS_ORIGIN` chưa đúng

**Fix**:

1. Railway → Backend → Variables
2. Sửa `CORS_ORIGIN=https://your-vercel-domain.vercel.app`
3. Hoặc tạm thời dùng `CORS_ORIGIN=*` (không khuyến khích production)

### ❌ Lỗi: "Cannot connect to database"

**Fix**:

1. Kiểm tra MySQL service đang chạy
2. Kiểm tra DB credentials trong Variables
3. Kiểm tra database đã import SQL chưa

### ❌ Lỗi: "404 Not Found" trên Vercel

**Fix**:

1. Vercel → Project Settings → General
2. Kiểm tra Root Directory = `frontend`
3. Redeploy

### ❌ Lỗi: "VITE_API_URL is undefined"

**Fix**:

1. Vercel → Project Settings → Environment Variables
2. Thêm `VITE_API_URL`
3. Redeploy (Deployments → ... → Redeploy)

---

## 📱 Custom Domain (Tùy chọn)

### Vercel

1. Project Settings → Domains
2. Add domain của bạn
3. Cập nhật DNS records theo hướng dẫn

### Railway

1. Backend service → Settings → Domains
2. Add custom domain
3. Cập nhật DNS

---

## 🎉 Hoàn thành!

**URLs của bạn:**

- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.railway.app`

**Auto Deploy:**

- Mỗi khi push code lên GitHub branch `main`
- Vercel và Railway sẽ tự động deploy

**Monitoring:**

- Railway: Xem logs tại Deployments → View Logs
- Vercel: Xem logs tại Deployments → Function Logs

---

## 📞 Cần hỗ trợ?

Nếu gặp lỗi, cung cấp:

1. Screenshot lỗi
2. Logs từ Railway/Vercel
3. URL của project
