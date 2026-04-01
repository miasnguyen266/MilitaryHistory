// backend/routes/search.js (thay toàn bộ file)
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Hàm normalize bỏ dấu tiếng Việt
function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

router.get("/", async (req, res) => {
  let { q, page = 1, limit = 9 } = req.query;
  if (!q || q.trim() === "") {
    return res.json({ results: [], totalPages: 1, total: 0 });
  }

  q = q.trim();
  const normalizedQ = normalizeString(q);
  const searchTerm = `%${normalizedQ}%`;
  const offset = (page - 1) * limit;

  console.log(`Tìm kiếm từ khóa: "${q}" → chuẩn hóa: "${normalizedQ}"`);

  try {
    // Tìm sự kiện: chỉ tiêu đề
    const [events] = await pool.query(
      `SELECT 'event' AS type, id, title_vi, title_en, year_display_vi AS extra_vi, year_display_en AS extra_en, image_url 
       FROM TimelineEvents 
       WHERE LOWER(title_vi) LIKE ? OR LOWER(title_en) LIKE ?
       LIMIT ? OFFSET ?`,
      [searchTerm, searchTerm, parseInt(limit), offset],
    );

    // Tìm thời kỳ: chỉ tên
    const [periods] = await pool.query(
      `SELECT 'period' AS type, id, period_name_vi, period_name_en, 
              CONCAT(start_year, ' - ', IFNULL(end_year, 'nay')) AS extra_vi,
              CONCAT(start_year, ' - ', IFNULL(end_year, 'present')) AS extra_en, image_url 
       FROM HistoryPeriods 
       WHERE LOWER(period_name_vi) LIKE ? OR LOWER(period_name_en) LIKE ?
       LIMIT ? OFFSET ?`,
      [searchTerm, searchTerm, parseInt(limit), offset],
    );

    // Tìm nhân vật: chỉ tên
    const [figures] = await pool.query(
      `SELECT 'figure' AS type, id, full_name_vi, full_name_en, birth_year, death_year, image_url 
       FROM HistoricalFigures 
       WHERE LOWER(full_name_vi) LIKE ? OR LOWER(full_name_en) LIKE ?
       LIMIT ? OFFSET ?`,
      [searchTerm, searchTerm, parseInt(limit), offset],
    );

    const allResults = [...events, ...periods, ...figures];

    console.log(`Kết quả tìm thấy: ${allResults.length} items`);

    // Tính tổng
    const [[{ totalEvents }]] = await pool.query(
      `SELECT COUNT(*) as total FROM TimelineEvents 
       WHERE LOWER(title_vi) LIKE ? OR LOWER(title_en) LIKE ?`,
      [searchTerm, searchTerm],
    );

    const [[{ totalPeriods }]] = await pool.query(
      `SELECT COUNT(*) as total FROM HistoryPeriods 
       WHERE LOWER(period_name_vi) LIKE ? OR LOWER(period_name_en) LIKE ?`,
      [searchTerm, searchTerm],
    );

    const [[{ totalFigures }]] = await pool.query(
      `SELECT COUNT(*) as total FROM HistoricalFigures 
       WHERE LOWER(full_name_vi) LIKE ? OR LOWER(full_name_en) LIKE ?`,
      [searchTerm, searchTerm],
    );

    const total = totalEvents + totalPeriods + totalFigures;

    res.json({
      results: allResults,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    });
  } catch (err) {
    console.error("Lỗi tìm kiếm:", err.message);
    res.status(500).json({ error: "Lỗi tìm kiếm" });
  }
});

module.exports = router;
