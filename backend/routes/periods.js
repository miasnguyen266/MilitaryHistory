const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Lấy danh sách thời kỳ với phân trang
router.get("/", async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const [periods] = await pool.query(
      "SELECT * FROM HistoryPeriods LIMIT ? OFFSET ?",
      [parseInt(limit), offset],
    );

    const [[{ total }]] = await pool.query(
      "SELECT COUNT(*) as total FROM HistoryPeriods",
    );

    res.json({
      periods,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
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
