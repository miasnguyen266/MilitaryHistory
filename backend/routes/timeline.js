const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth"); // Nếu bạn có middleware auth

// GET all events - đã sắp xếp theo event_date tăng dần
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);

    let query = "SELECT * FROM TimelineEvents ORDER BY event_year ASC";
    let params = [];

    if (!isNaN(limit) && limit > 0) {
      query += " LIMIT ?";
      params.push(limit);
    }

    const [rows] = await pool.query(query, params);

    // ✅ trả về array như cũ
    res.json(rows);
  } catch (err) {
    console.error("Lỗi GET all events:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// GET event by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM TimelineEvents WHERE id = ?",
      [id],
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Sự kiện không tồn tại" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Lỗi GET event by ID:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// UPDATE event (sửa sự kiện)
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const {
    event_year,
    year_display_vi,
    year_display_en,
    title_vi,
    title_en,
    description_vi,
    description_en,
    image_url,
  } = req.body;

  try {
    // Kiểm tra sự kiện có tồn tại không
    const [existing] = await pool.query(
      "SELECT * FROM TimelineEvents WHERE id = ?",
      [id],
    );
    if (existing.length === 0) {
      return res.status(404).json({ error: "Sự kiện không tồn tại" });
    }

    // Cập nhật dữ liệu
    await pool.query(
      `UPDATE TimelineEvents 
       SET event_year = ?, 
           year_display_vi = ?, 
           year_display_en = ?, 
           title_vi = ?, 
           title_en = ?, 
           description_vi = ?, 
           description_en = ?, 
           image_url = ?
       WHERE id = ?`,
      [
        event_year || null,
        year_display_vi || null,
        year_display_en || null,
        title_vi || null,
        title_en || null,
        description_vi || null,
        description_en || null,
        image_url || null,
        id,
      ],
    );

    // Log hoạt động vào AdminLogs
    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) 
       VALUES ('event', 'edit', ?, ?)`,
      [id, title_vi || "Sự kiện đã sửa"],
    );

    // Trả về dữ liệu đã cập nhật (tùy chọn)
    const [updated] = await pool.query(
      "SELECT * FROM TimelineEvents WHERE id = ?",
      [id],
    );

    res.json({
      message: "Cập nhật sự kiện thành công",
      updatedEvent: updated[0],
    });
  } catch (err) {
    console.error("Lỗi UPDATE event:", err);
    res.status(500).json({ error: "Lỗi server khi cập nhật sự kiện" });
  }
});

module.exports = router;
