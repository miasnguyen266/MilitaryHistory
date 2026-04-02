const express = require("express");
const router = express.Router(); // ← THÊM DÒNG NÀY (bắt buộc)
const pool = require("../config/db");
const auth = require("../middleware/auth");

router.use(auth); // Bảo vệ tất cả route dashboard

const ACTION_MAP = {
  add: 1,
  edit: 2,
  delete: 3,
}

const TYPE_MAP = {
  event: 1,
  figure: 2,
  period: 3,
}

router.get("/stats", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        type,
        COALESCE(SUM(CASE WHEN action = ? THEN 1 ELSE 0 END), 0) as add_count,
        COALESCE(SUM(CASE WHEN action = ? THEN 1 ELSE 0 END), 0) as edit_count,
        COALESCE(SUM(CASE WHEN action = ? THEN 1 ELSE 0 END), 0) as delete_count
      FROM AdminLogs
      WHERE type IN (?, ?, ?)
      GROUP BY type
      `,
      [
        ACTION_MAP.add,
        ACTION_MAP.edit,
        ACTION_MAP.delete,
        TYPE_MAP.event,
        TYPE_MAP.figure,
        TYPE_MAP.period,
      ],
    );

    const result = {
      events: { add_count: 0, edit_count: 0, delete_count: 0 },
      figures: { add_count: 0, edit_count: 0, delete_count: 0 },
      periods: { add_count: 0, edit_count: 0, delete_count: 0 },
    };

    rows.forEach((row) => {
      if (row.type === TYPE_MAP.event) result.events = row;
      if (row.type === TYPE_MAP.figure) result.figures = row;
      if (row.type === TYPE_MAP.period) result.periods = row;
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi lấy thống kê" });
  }
});

// ==================== BIỂU ĐỒ THEO FILTER (ngày/tuần/tháng) ====================
router.get("/chart", async (req, res) => {
  const filter = req.query.filter || "day";

  let groupBy;
  let dateFormat;
  let orderBy;

  switch (filter) {
    case "week":
      groupBy = "YEARWEEK(created_at, 1)";
      orderBy = "YEARWEEK(created_at, 1) ASC";
      dateFormat = "Tuần %v (%Y)";
      break;
    case "month":
      groupBy = "YEAR(created_at), MONTH(created_at)";
      orderBy = "YEAR(created_at), MONTH(created_at) ASC";
      dateFormat = "%Y-%m";
      break;
    case "day":
    default:
      groupBy = "DATE(created_at)";
      dateFormat = "%Y-%m-%d";
      orderBy = "DATE(created_at) ASC";
  }

  try {
    const [data] = await pool.query(
      `
      SELECT 
        DATE_FORMAT(MIN(created_at), ?) AS label,
        SUM(CASE WHEN type = ? THEN 1 ELSE 0 END) AS events,
        SUM(CASE WHEN type = ? THEN 1 ELSE 0 END) AS figures,
        SUM(CASE WHEN type = ? THEN 1 ELSE 0 END) AS periods
      FROM AdminLogs
      GROUP BY ${groupBy}
      ORDER BY ${orderBy}
      LIMIT 30
    `,
      [dateFormat, TYPE_MAP.event, TYPE_MAP.figure, TYPE_MAP.period],
    );

    // Xử lý dữ liệu an toàn
    const safeData = data.map((row) => ({
      label: row.label || "Không xác định",
      events: Number(row.events) || 0,
      figures: Number(row.figures) || 0,
      periods: Number(row.periods) || 0,
    }));

    res.json({
      labels: safeData.map((row) => row.label),
      events: safeData.map((row) => row.events),
      figures: safeData.map((row) => row.figures),
      periods: safeData.map((row) => row.periods),
    });
  } catch (err) {
    console.error("Lỗi GET /api/admin/chart:", err);
    res.status(500).json({ error: "Lỗi server khi lấy dữ liệu biểu đồ" });
  }
});

// ==================== HOẠT ĐỘNG MỚI NHẤT ====================
router.get("/recent-activities", async (req, res) => {
  try {
    const [activities] = await pool.query(`
      SELECT 
        type,
        action,
        item_name,
        DATE_FORMAT(created_at, 
          CASE 
            WHEN TIMESTAMPDIFF(HOUR, created_at, NOW()) < 24 
            THEN '%H:%i' 
            ELSE '%d/%m/%Y' 
          END) as time
      FROM AdminLogs
      ORDER BY created_at DESC
      LIMIT 10
    `);

    const formatted = activities.map((act) => ({
      type: act.action,
      item: `${
        act.type === TYPE_MAP.event
          ? "Sự kiện"
          : act.type === TYPE_MAP.figure
            ? "Nhân vật"
            : "Thời kỳ"
      }: ${act.item_name}`,
      time: act.time,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi lấy hoạt động mới nhất" });
  }
});

module.exports = router;
