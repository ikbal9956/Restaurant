const mysql = require("mysql");

const db = mysql.createConnection({
  host: "database-4.cz84u0u4ey3h.eu-north-1.rds.amazonaws.com",
  port:"3306",
  user: "admin",
  password: "Abhishek123",
  database: "project",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

module.exports = db;
