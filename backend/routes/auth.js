// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // nếu dùng DB

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra user (thay bằng query DB thật)
    // Ví dụ giả lập:
    if (username !== "admin" || password !== "admin123") {
      return res.status(401).json({ error: "Tài khoản hoặc mật khẩu sai" });
    }

    // Tạo token
    const token = jwt.sign(
      { username, role: "admin" },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "24h" },
    );

    res.json({ token }); // Trả token về frontend
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
