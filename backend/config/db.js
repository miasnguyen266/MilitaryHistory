const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "260603",
  database: "MilitaryHistoryVN",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("MySQL Connection Failed:", err));

module.exports = pool;
