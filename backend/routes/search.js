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
//Phân trang
router.get("/", async (req, res) => {
  let { q, page = 1, limit = 10 } = req.query;

  if (!q || q.trim() === "") {
    return res.json({ results: [], totalPages: 1, total: 0 });
  }

  // ✅ FIX
  page = parseInt(page);
  limit = parseInt(limit);

  q = q.trim();
  const normalizedQ = normalizeString(q);
  const searchTerm = `%${normalizedQ}%`;

  console.log(`Tìm kiếm từ khóa: "${q}" → "${normalizedQ}"`);

  try {
    // ❌ BỎ LIMIT ở đây
    const [events] = await pool.query(
      `SELECT 'event' AS type, id, title_vi, title_en, year_display_vi AS extra_vi, year_display_en AS extra_en, image_url 
       FROM TimelineEvents 
       WHERE LOWER(title_vi) LIKE ? OR LOWER(title_en) LIKE ?`,
      [searchTerm, searchTerm],
    );

    const [periods] = await pool.query(
      `SELECT 'period' AS type, id, period_name_vi, period_name_en, 
              CONCAT(start_year, ' - ', IFNULL(end_year, 'nay')) AS extra_vi,
              CONCAT(start_year, ' - ', IFNULL(end_year, 'present')) AS extra_en, image_url 
       FROM HistoryPeriods 
       WHERE LOWER(period_name_vi) LIKE ? OR LOWER(period_name_en) LIKE ?`,
      [searchTerm, searchTerm],
    );

    const [figures] = await pool.query(
      `SELECT 'figure' AS type, id, full_name_vi, full_name_en, birth_year, death_year, image_url 
       FROM HistoricalFigures 
       WHERE LOWER(full_name_vi) LIKE ? OR LOWER(full_name_en) LIKE ?`,
      [searchTerm, searchTerm],
    );

    const allResults = [...events, ...periods, ...figures];

    const total = allResults.length;

    // ✅ FIX: paginate sau khi merge
    const start = (page - 1) * limit;
    const paginatedResults = allResults.slice(start, start + limit);

    console.log(`Tổng: ${total} | Page: ${page}`);

    res.json({
      results: paginatedResults,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (err) {
    console.error("Lỗi tìm kiếm:", err.message);
    res.status(500).json({ error: "Lỗi tìm kiếm" });
  }
});

module.exports = router;
