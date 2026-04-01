const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");
const fs = require("fs");
const path = require("path");

router.use(auth);

// GET all periods
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM HistoryPeriods ORDER BY start_year ASC",
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// POST thêm thời kỳ
router.post("/", async (req, res) => {
  const {
    period_name_vi,
    period_name_en,
    start_year,
    end_year,
    content_vi,
    content_en,
    image_url,
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO HistoryPeriods (period_name_vi, period_name_en, start_year, end_year, content_vi, content_en, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        period_name_vi,
        period_name_en,
        start_year,
        end_year || null,
        content_vi || null,
        content_en || null,
        image_url || null,
      ],
    );

    const newId = result.insertId;

    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) VALUES ('period', 'add', ?, ?)`,
      [newId, period_name_vi || "Thời kỳ mới"],
    );

    res.json({ message: "Thêm thời kỳ thành công", insertId: newId });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi thêm" });
  }
});

// PUT sửa thời kỳ (có xóa ảnh cũ)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    period_name_vi,
    period_name_en,
    start_year,
    end_year,
    content_vi,
    content_en,
    image_url,
  } = req.body;

  try {
    const [old] = await pool.query(
      "SELECT image_url FROM HistoryPeriods WHERE id = ?",
      [id],
    );
    const oldImageUrl = old[0]?.image_url;

    let finalImageUrl = image_url;
    if (image_url && oldImageUrl && oldImageUrl !== image_url) {
      const oldFilePath = path.join(__dirname, "..", "public", oldImageUrl);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    await pool.query(
      `UPDATE HistoryPeriods 
       SET period_name_vi = ?, period_name_en = ?, start_year = ?, end_year = ?, content_vi = ?, content_en = ?, image_url = ? 
       WHERE id = ?`,
      [
        period_name_vi,
        period_name_en,
        start_year,
        end_year || null,
        content_vi || null,
        content_en || null,
        finalImageUrl || null,
        id,
      ],
    );

    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) VALUES ('period', 'edit', ?, ?)`,
      [id, period_name_vi || "Thời kỳ đã sửa"],
    );

    res.json({ message: "Cập nhật thời kỳ thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật" });
  }
});

// DELETE thời kỳ
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [old] = await pool.query(
      "SELECT image_url, period_name_vi FROM HistoryPeriods WHERE id = ?",
      [id],
    );
    if (old.length === 0)
      return res.status(404).json({ error: "Không tìm thấy" });

    const oldImageUrl = old[0].image_url;
    if (oldImageUrl) {
      const oldFilePath = path.join(__dirname, "..", "public", oldImageUrl);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    await pool.query("DELETE FROM HistoryPeriods WHERE id = ?", [id]);

    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) VALUES ('period', 'delete', ?, ?)`,
      [id, old[0].period_name_vi || "Thời kỳ đã xóa"],
    );

    res.json({ message: "Xóa thời kỳ thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa" });
  }
});
router.get("/", async (req, res) => {
  try {
    console.log("Đang fetch danh sách thời kỳ...");
    const [rows] = await pool.query(
      "SELECT * FROM HistoryPeriods ORDER BY start_year ASC",
    );
    console.log("Fetch thành công, số bản ghi:", rows.length);
    res.json(rows);
  } catch (err) {
    console.error(
      "LỖI GET /api/admin/periods:",
      err.code,
      err.sqlMessage || err.message,
    );
    res.status(500).json({ error: "Lỗi server khi lấy danh sách thời kỳ" });
  }
});

module.exports = router;
