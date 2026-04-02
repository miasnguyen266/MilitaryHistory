const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const ACTION_MAP = {
  add: 1,
  edit: 2,
  delete: 3,
};

const TYPE_MAP = {
  event: 1,
  figure: 2,
  period: 3,
};

router.use(auth);

//
// ✅ GET ALL (có content vi/en)
//
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        f.*,
        MAX(CASE WHEN c.lang = 'vi' THEN c.bio END) AS bio_vi,
        MAX(CASE WHEN c.lang = 'en' THEN c.bio END) AS bio_en,
        MAX(CASE WHEN c.lang = 'vi' THEN c.contributions END) AS contributions_vi,
        MAX(CASE WHEN c.lang = 'en' THEN c.contributions END) AS contributions_en
      FROM HistoricalFigures f
      LEFT JOIN HistoricalFigureContents c 
        ON f.id = c.figure_id
      GROUP BY f.id
      ORDER BY f.birth_year DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

//
// ✅ CREATE FIGURE
//
router.post("/", async (req, res) => {
  const { full_name_vi, full_name_en, birth_year, death_year, image_url } =
    req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO HistoricalFigures 
      (full_name_vi, full_name_en, birth_year, death_year, image_url)
      VALUES (?, ?, ?, ?, ?)`,
      [
        full_name_vi,
        full_name_en,
        birth_year || null,
        death_year || null,
        image_url || null,
      ],
    );

    const newId = result.insertId;

    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) VALUES (?, ?, ?, ?)`,
      [TYPE_MAP.figure, ACTION_MAP.add, newId, full_name_vi || "Nhân vật mới"],
    );

    res.json({ message: "Thêm nhân vật thành công", insertId: newId });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi thêm" });
  }
});

//
// ✅ UPSERT CONTENT (VI + EN)
//
router.post("/:id/contents", async (req, res) => {
  const { id } = req.params;
  const { bio_vi, bio_en, contributions_vi, contributions_en } = req.body;

  try {
    // VI
    if (bio_vi || contributions_vi) {
      await pool.query(
        `
        INSERT INTO HistoricalFigureContents (figure_id, lang, bio, contributions)
        VALUES (?, 'vi', ?, ?)
        ON DUPLICATE KEY UPDATE
          bio = VALUES(bio),
          contributions = VALUES(contributions)
        `,
        [id, bio_vi || null, contributions_vi || null],
      );
    }

    // EN
    if (bio_en || contributions_en) {
      await pool.query(
        `
        INSERT INTO HistoricalFigureContents (figure_id, lang, bio, contributions)
        VALUES (?, 'en', ?, ?)
        ON DUPLICATE KEY UPDATE
          bio = VALUES(bio),
          contributions = VALUES(contributions)
        `,
        [id, bio_en || null, contributions_en || null],
      );
    }

    res.json({ message: "Saved contents" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi content" });
  }
});

//
// ✅ UPDATE FIGURE
//
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { full_name_vi, full_name_en, birth_year, death_year, image_url } =
    req.body;

  try {
    const [old] = await pool.query(
      "SELECT image_url FROM HistoricalFigures WHERE id = ?",
      [id],
    );

    const oldImageUrl = old[0]?.image_url;

    let finalImageUrl = image_url;
    if (image_url && oldImageUrl && oldImageUrl !== image_url) {
      const oldFilePath = path.join(__dirname, "..", "public", oldImageUrl);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    await pool.query(
      `UPDATE HistoricalFigures 
       SET full_name_vi=?, full_name_en=?, birth_year=?, death_year=?, image_url=?
       WHERE id=?`,
      [
        full_name_vi,
        full_name_en,
        birth_year || null,
        death_year || null,
        finalImageUrl || null,
        id,
      ],
    );

    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) VALUES (?, ?, ?, ?)`,
      [TYPE_MAP.period, ACTION_MAP.edit, id, full_name_vi || "Nhân vật đẵ sửa"],
    );

    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi update" });
  }
});

//
// ✅ DELETE
//
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [old] = await pool.query(
      "SELECT image_url, full_name_vi FROM HistoricalFigures WHERE id = ?",
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

    await pool.query("DELETE FROM HistoricalFigures  WHERE id = ?", [id]);

    // Log hoạt động
    await pool.query(
      `INSERT INTO AdminLogs (type, action, item_id, item_name) VALUES (?, ?, ?, ?)`,
      [
        TYPE_MAP.event,
        ACTION_MAP.delete,
        id,
        old[0].full_name_vi || "Nhân vật đã xóa",
      ],
    );

    res.json({ message: "Xóa nhân vật thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa" });
  }
});

module.exports = router;
