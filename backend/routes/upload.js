// backend/routes/upload.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

console.log("Upload route được load");

// Tạo thư mục public/uploads
const uploadDir = path.join(__dirname, "..", "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Đã tạo thư mục uploads");
}

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ chấp nhận file ảnh jpg, jpeg, png, gif"));
    }
  },
});

// POST /upload
router.post("/", upload.single("image"), (req, res) => {
  console.log("Request upload nhận được:", req.file);

  if (!req.file) {
    console.log("Không có file");
    return res.status(400).json({ error: "Không có file ảnh" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  console.log("Upload thành công, URL:", imageUrl);

  res.json({ image_url: imageUrl });
});

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    console.error("Lỗi upload:", err);
    return res.status(500).json({ error: "Lỗi server khi upload" });
  }
  next();
});

module.exports = router;
