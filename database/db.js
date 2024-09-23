const { Client } = require('pg');

const client = new Client({
  host: "online123-5483.7s5.aws-ap-south-1.cockroachlabs.cloud",
  port: 26257,
  database: "project",
  user: "ikbal",
  password: "Oodt-i1TB7RI9ea8fZgXBA",
  ssl: {
    rejectUnauthorized: true
  }
});

client.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to CockroachDB.");
});

module.exports = client;
