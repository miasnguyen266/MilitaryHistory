const express = require("express");
const router = express.Router(); // ← THÊM DÒNG NÀY (bắt buộc)
const pool = require("../config/db");
const auth = require("../middleware/auth");

router.use(auth); // Bảo vệ tất cả route dashboard

// ==================== THỐNG KÊ SỐ LẦN THÊM/SỬA/XÓA ====================
router.get("/stats", async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT 
        SUM(CASE WHEN action = 'add' THEN 1 ELSE 0 END) as add_count,
        SUM(CASE WHEN action = 'edit' THEN 1 ELSE 0 END) as edit_count,
        SUM(CASE WHEN action = 'delete' THEN 1 ELSE 0 END) as delete_count
      FROM AdminLogs WHERE type = 'events'
    `);

    const [figures] = await pool.query(`
      SELECT 
        SUM(CASE WHEN action = 'add' THEN 1 ELSE 0 END) as add_count,
        SUM(CASE WHEN action = 'edit' THEN 1 ELSE 0 END) as edit_count,
        SUM(CASE WHEN action = 'delete' THEN 1 ELSE 0 END) as delete_count
      FROM AdminLogs WHERE type = 'figures'
    `);

    const [periods] = await pool.query(`
      SELECT 
        SUM(CASE WHEN action = 'add' THEN 1 ELSE 0 END) as add_count,
        SUM(CASE WHEN action = 'edit' THEN 1 ELSE 0 END) as edit_count,
        SUM(CASE WHEN action = 'delete' THEN 1 ELSE 0 END) as delete_count
      FROM AdminLogs WHERE type = 'periods'
    `);

    res.json({
      events: events[0],
      figures: figures[0],
      periods: periods[0],
    });
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
      groupBy = "YEARWEEK(created_at, 1)"; // Tuần bắt đầu từ Thứ 2
      dateFormat = "Tuần %x%v"; // Năm + số tuần
      orderBy = "YEARWEEK(created_at, 1) ASC";
      break;
    case "month":
      groupBy = "DATE_FORMAT(created_at, '%Y-%m')";
      dateFormat = "%Y-%m"; // Năm-tháng
      orderBy = "DATE_FORMAT(created_at, '%Y-%m') ASC";
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
        SUM(CASE WHEN type = 'event' THEN 1 ELSE 0 END) AS events,
        SUM(CASE WHEN type = 'figure' THEN 1 ELSE 0 END) AS figures,
        SUM(CASE WHEN type = 'period' THEN 1 ELSE 0 END) AS periods
      FROM AdminLogs
      GROUP BY ${groupBy}
      ORDER BY ${orderBy}
      LIMIT 30
    `,
      [dateFormat],
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
      item: `${act.type === "event" ? "Sự kiện" : act.type === "figure" ? "Nhân vật" : "Thời kỳ"}: ${act.item_name}`,
      time: act.time,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi lấy hoạt động mới nhất" });
  }
});

module.exports = router;
