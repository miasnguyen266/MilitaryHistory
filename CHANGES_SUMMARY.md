# 📋 Tóm tắt các thay đổi cho Deployment

## ✅ Các file đã sửa:

### Backend
1. **`backend/server.js`**
   - ✅ Import `dotenv`
   - ✅ Thay hardcoded CORS origin thành `process.env.CORS_ORIGIN`
   - ✅ Thay hardcoded PORT thành `process.env.PORT`

2. **`backend/config/db.js`**
   - ✅ Import `dotenv`
   - ✅ Thay hardcoded DB config thành environment variables
   - ✅ Thêm fallback values cho development

3. **`backend/package.json`**
   - ✅ Thêm `dotenv` dependency
   - ✅ Thêm `"start": "node server.js"` script
   - ✅ Thêm `"dev": "node server.js"` script
   - ✅ Thêm name, version, description

4. **`backend/.gitignore`** (New)
   - ✅ Ignore node_modules, .env, uploads/*

5. **`backend/.env.example`** (New)
   - ✅ Template cho environment variables

### Frontend
1. **`frontend/vite.config.js`**
   - ✅ Sử dụng `process.env.VITE_API_URL` trong proxy

2. **`frontend/.env.example`** (New)
   - ✅ Template cho environment variables

3. **`frontend/src/api/axiosConfig.js`** (New)
   - ✅ Axios instance sử dụng `import.meta.env.VITE_API_URL`

4. **`frontend/vercel.json`** (New)
   - ✅ Vercel configuration

### Root
1. **`DEPLOYMENT_GUIDE.md`** (New)
   - ✅ Hướng dẫn chi tiết deploy lên Vercel + Railway

---

## 🔑 Environment Variables cần thiết:

### Backend (Railway / Render)
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=MilitaryHistoryVN
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.vercel.app
JWT_SECRET=your_secret_key
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.railway.app
```

---

## 🚀 Tiếp theo:

1. **Setup .env files locally** (copy from .env.example)
2. **Test locally**:
   ```bash
   cd backend
   npm install
   npm start
   
   # Terminal khác
   cd frontend
   npm install
   npm run dev
   ```
3. **Push lên GitHub**
4. **Deploy trên Vercel (Frontend) + Railway (Backend)**
5. **Cấu hình Environment Variables trên Vercel/Railway Dashboards**

---

## 📚 Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Environment Variables Best Practices: https://12factor.net/config
