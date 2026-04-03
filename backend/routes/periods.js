const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Lấy danh sách thời kỳ với phân trang
router.get("/", async (req, res) => {
  let { page = 1, limit = 8 } = req.query;

  // ✅ FIX
  page = parseInt(page);
  limit = parseInt(limit);

  const offset = (page - 1) * limit;

  try {
    const [periods] = await pool.query(
      // ✅ FIX thêm ORDER BY
      "SELECT * FROM HistoryPeriods ORDER BY id DESC LIMIT ? OFFSET ?",
      [limit, offset],
    );

    const [[{ total }]] = await pool.query(
      "SELECT COUNT(*) as total FROM HistoryPeriods",
    );

    res.json({
      periods,
      totalPages: Math.ceil(total / limit), // ✅ giờ đúng
      currentPage: page,
      total,
    });
  } catch (err) {
    console.error("Lỗi lấy danh sách thời kỳ:", err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Chi tiết thời kỳ (giữ nguyên)
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM HistoryPeriods WHERE id = ?",
      [req.params.id],
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Không tìm thấy thời kỳ" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
