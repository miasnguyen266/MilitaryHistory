const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Lấy danh sách nhân vật với phân trang
router.get("/", async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const [figures] = await pool.query(
      "SELECT * FROM HistoricalFigures LIMIT ? OFFSET ?",
      [parseInt(limit), offset],
    );

    const [[{ total }]] = await pool.query(
      "SELECT COUNT(*) as total FROM HistoricalFigures",
    );

    res.json({
      figures,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    });
  } catch (err) {
    console.error("Lỗi lấy danh sách nhân vật:", err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
});

router.get("/contents/:id/:lang", async (req, res) => {
  const { id, lang } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM HistoricalFigureContents WHERE figure_id = ? AND lang = ?",
      [id, lang],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy nội dung" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Lỗi lấy nội dung nhân vật:", err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Chi tiết nhân vật
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        f.*,
        MAX(CASE WHEN c.lang = 'vi' THEN c.bio END) AS bio_vi,
        MAX(CASE WHEN c.lang = 'en' THEN c.bio END) AS bio_en,
        MAX(CASE WHEN c.lang = 'vi' THEN c.contributions END) AS contributions_vi,
        MAX(CASE WHEN c.lang = 'en' THEN c.contributions END) AS contributions_en
      FROM HistoricalFigures f
      LEFT JOIN HistoricalFigureContents c 
        ON f.id = c.figure_id
      WHERE f.id = ?
      GROUP BY f.id
      `,
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Lỗi detail:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
