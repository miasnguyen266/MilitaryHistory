# ✅ Checklist Deploy Nhanh

## 🚂 RAILWAY (Backend) - Làm trước

### Bước 1: Setup Railway

- [ ] Truy cập https://railway.app
- [ ] Login with GitHub
- [ ] New Project → Deploy from GitHub repo
- [ ] Chọn repo: **miasnguyen266/MilitaryHistory**
- [ ] Settings → Root Directory: `backend`

### Bước 2: Thêm MySQL

- [ ] Click "+ New" → Database → MySQL
- [ ] Copy các giá trị: MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE

### Bước 3: Environment Variables (Backend)

Thêm vào Backend service → Variables:

```
DB_HOST=<từ MySQL service>
DB_USER=<từ MySQL service>
DB_PASSWORD=<từ MySQL service>
DB_NAME=<từ MySQL service>
PORT=5000
NODE_ENV=production
JWT_SECRET=military_history_secret_2024
CORS_ORIGIN=*
```

### Bước 4: Import Database

- [ ] MySQL service → Data → Connect
- [ ] Import file: `dumps/militaryhistory.sql`

### Bước 5: Lấy Backend URL

- [ ] Backend service → Settings → Generate Domain
- [ ] Copy URL (ví dụ: `https://xxx.railway.app`)
- [ ] Test: Mở `https://xxx.railway.app/api/figures`

---

## ▲ VERCEL (Frontend) - Làm sau

### Bước 1: Setup Vercel

- [ ] Truy cập https://vercel.com
- [ ] Login with GitHub
- [ ] Add New → Project
- [ ] Import: **miasnguyen266/MilitaryHistory**

### Bước 2: Cấu hình

- [ ] Root Directory: `frontend`
- [ ] Framework: Vite (auto-detect)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Bước 3: Environment Variables

```
VITE_API_URL=<Railway Backend URL từ trên>
```

Ví dụ: `VITE_API_URL=https://xxx.railway.app`

### Bước 4: Deploy

- [ ] Click "Deploy"
- [ ] Đợi 2-3 phút
- [ ] Copy Vercel URL

### Bước 5: Cập nhật CORS

- [ ] Quay lại Railway → Backend → Variables
- [ ] Sửa `CORS_ORIGIN=<Vercel URL>`
- [ ] Ví dụ: `CORS_ORIGIN=https://your-project.vercel.app`

---

## 🎯 Test Final

- [ ] Mở Vercel URL
- [ ] Kiểm tra trang chủ load được
- [ ] Kiểm tra danh sách sự kiện/nhân vật
- [ ] Test admin login: `/admin/login`
- [ ] Mở F12 → Network → Không có lỗi CORS

---

## 📝 Ghi chú

**Backend URL**: ************\_\_\_************

**Frontend URL**: ************\_\_\_************

**Admin Username**: ************\_\_\_************

**Admin Password**: ************\_\_\_************

---

## 🆘 Lỗi thường gặp

### CORS Error

→ Kiểm tra `CORS_ORIGIN` trong Railway

### Database Connection Failed

→ Kiểm tra DB credentials và đã import SQL chưa

### 404 Not Found

→ Kiểm tra Root Directory đúng chưa

### VITE_API_URL undefined

→ Thêm lại Environment Variable và Redeploy
