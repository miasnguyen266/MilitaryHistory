// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const pool = require("./config/db");
const app = express();

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // hỗ trợ form data nếu cần sau này

// Upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Không có file được upload" });
  }
  res.json({ image_url: `/uploads/${req.file.filename}` });
});

// Serve thư mục uploads (ảnh tĩnh)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Tách routes
const timelineRouter = require("./routes/timeline");
const periodsRouter = require("./routes/periods");
const figuresRouter = require("./routes/figures");
const searchRouter = require("./routes/search");
const authRouter = require("./routes/auth");
const adminEventsRouter = require("./routes/adminEvents");
const adminFiguresRouter = require("./routes/adminFigures");
const adminPeriodsRouter = require("./routes/adminPeriods");
const adminDashboardRouter = require("./routes/adminDashboard");
const uploadRouter = require("./routes/upload");

app.use("/api/timeline", timelineRouter);
app.use("/api/periods", periodsRouter);
app.use("/api/figures", figuresRouter);
app.use("/api/search", searchRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin/events", adminEventsRouter);
app.use("/api/admin/figures", adminFiguresRouter);
app.use("/api/admin/periods", adminPeriodsRouter);
app.use("/api/admin", adminDashboardRouter);
app.use("/api/upload", uploadRouter);
app.use(express.static(path.join(__dirname, "public")));

// Trang chủ API (test server chạy)
app.get("/", (req, res) => {
  res.json({ message: "Backend đang chạy tại http://localhost:5000" });
});

// Xử lý lỗi 404 cho các route không tồn tại
app.use((req, res, next) => {
  res.status(404).json({ error: "Không tìm thấy route" });
});

// Xử lý lỗi server chung
app.use((err, req, res, next) => {
  console.error("Lỗi server:", err.stack);
  res.status(500).json({ error: "Lỗi server nội bộ" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server chạy tại ${process.env.NODE_ENV === "production" ? "production" : "http://localhost:" + PORT}`,
  );
});
