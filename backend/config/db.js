require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "260603",
  database: process.env.DB_NAME || "MilitaryHistoryVN",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("MySQL Connection Failed:", err));

module.exports = pool;
