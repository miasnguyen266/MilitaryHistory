const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");
const fs = require("fs");
const path = require("path");

router.use(auth);

// GET all events
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM TimelineEvents ORDER BY event_year ASC",
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// POST thêm sự kiện
router.post("/", async (req, res) => {
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
    const [result] = await pool.query(
      `INSERT INTO TimelineEvents (event_year, year_display_vi, year_display_en, title_vi, title_en, description_vi, description_en, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event_year || null,
        year_display_vi,
        year_display_en,
        title_vi,
        title_en,
        description_vi || null,
        description_en || null,
        image_url || null,
      ],
    );

    const newId = result.insertId;

    // Log hoạt động
    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) VALUES ('event', 'add', ?, ?)`,
      [newId, title_vi || "Sự kiện mới"],
    );

    res.json({ message: "Thêm sự kiện thành công", insertId: newId });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi thêm" });
  }
});

// PUT sửa sự kiện (có xóa ảnh cũ)
router.put("/:id", async (req, res) => {
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
    // Lấy ảnh cũ
    const [old] = await pool.query(
      "SELECT image_url FROM TimelineEvents WHERE id = ?",
      [id],
    );
    const oldImageUrl = old[0]?.image_url;

    let finalImageUrl = image_url;

    // Nếu có ảnh mới → xóa ảnh cũ
    if (image_url && oldImageUrl && oldImageUrl !== image_url) {
      const oldFilePath = path.join(__dirname, "..", "public", oldImageUrl);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await pool.query(
      `UPDATE TimelineEvents 
       SET event_year = ?, year_display_vi = ?, year_display_en = ?, title_vi = ?, title_en = ?, 
           description_vi = ?, description_en = ?, image_url = ? 
       WHERE id = ?`,
      [
        event_year || null,
        year_display_vi,
        year_display_en,
        title_vi,
        title_en,
        description_vi || null,
        description_en || null,
        finalImageUrl || null,
        id,
      ],
    );

    // Log hoạt động
    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) VALUES ('event', 'edit', ?, ?)`,
      [id, title_vi || "Sự kiện đã sửa"],
    );

    res.json({ message: "Cập nhật sự kiện thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật" });
  }
});

// DELETE sự kiện
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [old] = await pool.query(
      "SELECT image_url, title_vi FROM TimelineEvents WHERE id = ?",
      [id],
    );
    if (old.length === 0)
      return res.status(404).json({ error: "Không tìm thấy" });

    const oldImageUrl = old[0].image_url;

    // Xóa file ảnh cũ
    if (oldImageUrl) {
      const oldFilePath = path.join(__dirname, "..", "public", oldImageUrl);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    await pool.query("DELETE FROM TimelineEvents WHERE id = ?", [id]);

    // Log hoạt động
    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) VALUES ('event', 'delete', ?, ?)`,
      [id, old[0].title_vi || "Sự kiện đã xóa"],
    );

    res.json({ message: "Xóa sự kiện thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa" });
  }
});

module.exports = router;
