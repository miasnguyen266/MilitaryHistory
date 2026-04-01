// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Không có token, vui lòng đăng nhập" });
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Token không hợp lệ" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key",
    );
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token lỗi:", err.message);
    return res.status(401).json({ error: "Token không hợp lệ hoặc hết hạn" });
  }
};
