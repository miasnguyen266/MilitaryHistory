# 📚 Hướng dẫn Deployment lên Vercel

## 🎯 Kiến trúc Deploy

```
Frontend: Vercel (React + Vite)
Backend: Railway.app hoặc Render.com (Node.js + Express)
Database: MySQL cloud (PlanetScale, Railway, AWS RDS...)
```

---

## 🚀 STEP 1: Chuẩn bị GitHub

### 1.1 Đẩy code lên GitHub (nếu chưa)

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 1.2 Kiểm tra `.gitignore`

Đảm bảo `.env` file không được commit:

```bash
# backend/.gitignore
node_modules
.env
.env.local
uploads/*
!uploads/.gitkeep

# frontend/.gitignore (đã có sẵn)
```

---

## 📱 STEP 2: Deploy Frontend trên Vercel

### 2.1 Connect GitHub với Vercel

1. Truy cập https://vercel.com
2. Click "New Project" → "Import Git Repository"
3. Chọn repository của bạn
4. Chọn framework: **Next.js** hoặc **Vite**
5. Click "Deploy"

### 2.2 Cấu hình Environment Variables

Trong Vercel Dashboard:

1. Chọn project → Settings → Environment Variables
2. Thêm:
   ```
   VITE_API_URL = https://your-backend-domain.com
   ```
   (Thay `your-backend-domain.com` bằng URL backend của bạn)

### 2.3 Auto Deploy

Mỗi khi push code lên `main`, Vercel sẽ tự động deploy.

---

## 🔧 STEP 3: Deploy Backend trên Railway.app

> **⚠️ Lưu ý**: Nếu dùng Render.com, quy trình tương tự nhưng sẽ khác một chút

### 3.1 Tạo tài khoản Railway

1. Truy cập https://railway.app
2. Login với GitHub

### 3.2 Tạo Project

1. Click "New Project" → "Deploy from GitHub repo"
2. Chọn repository của bạn
3. Chọn root directory: `/backend`

### 3.3 Cấu hình Environment Variables

Trong Railway Dashboard → Settings → Variables:

```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=MilitaryHistoryVN
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
JWT_SECRET=your_strong_secret_key
```

### 3.4 Setup Database

**Option A: Sử dụng Railway MySQL**

1. Trong Railway → Add Services → MySQL
2. Copy connection string
3. Parse và cập nhật vào Environment Variables

**Option B: Sử dụng PlanetScale (MySQL Cloud)**

1. Tạo tài khoản tại https://planetscale.com
2. Tạo database mới
3. Copy connection string và cập nhật vào Railway

### 3.5 Deploy

Railway sẽ tự động detect `package.json` và chạy:

```bash
npm install
npm start
```

---

## 💾 STEP 4: Setup Database

### 4.1 Import SQL data

```bash
# Nếu dùng Railway MySQL
railway connect mysql

# Hoặc nếu dùng PlanetScale
pscale shell militaryhistory staging

# Rồi import từ file
source dumps/militaryhistory.sql;
```

### 4.2 Hoặc dùng GUI Tool

- **MySQL Workbench** hoặc **DBeaver**
- Connect tới cloud database
- Import file `dumps/militaryhistory.sql`

---

## ✅ STEP 5: Testing

### 5.1 Test Frontend

```bash
cd frontend
npm install
npm run build
npm run preview
```

### 5.2 Test Backend (Local)

```bash
cd backend
npm install
cp .env.example .env  # Chỉnh sửa .env
npm start
```

### 5.3 Test API calls

```bash
# Verify backend URL
curl https://your-backend-url.railway.app/api/figures
```

---

## 🔍 Troubleshooting

### ❌ Error: CORS issue

```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix**: Cập nhật `CORS_ORIGIN` trong backend environment variable

### ❌ Error: Database connection failed

**Fix**:

- Kiểm tra DB credentials
- Kiểm tra connection string format
- Whitelist IP (nếu dùng cloud DB)

### ❌ Error: `VITE_API_URL` undefined

**Fix**:

- Restart Vercel deployment
- Xác nhận .env.example đã được copy

---

## 📝 File Summary

Các file đã chuẩn bị:

- ✅ `backend/.env.example` - Template cho environment variables
- ✅ `backend/.gitignore` - Ignore node_modules, .env
- ✅ `backend/package.json` - Thêm dotenv, scripts
- ✅ `backend/server.js` - Dùng environment variables
- ✅ `backend/config/db.js` - Dùng environment variables
- ✅ `frontend/.env.example` - Template API URL
- ✅ `frontend/vite.config.js` - Support environment variables
- ✅ `frontend/src/api/axiosConfig.js` - Axios config với VITE_API_URL

---

## 🎉 Done!

Congratulations! Your app is now deployed.

- **Frontend**: https://your-project.vercel.app
- **Backend API**: https://your-backend-url.railway.app/api/*

**Next Steps**:

1. Monitor logs: Railway Dashboard → Runtime Logs
2. Setup auto-scaling (Railway Pro)
3. Add custom domain
