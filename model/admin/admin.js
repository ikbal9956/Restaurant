const db = require("../../database/db.js");

const createAdmin = (userData, callback) => {
  const {
    id,
    name,
    display_name,
    short_name,
    is_active,
    created_at,
    updated_at,
    email,
    email_verified,
    mobile_country_code,
    mobile_number,
    mobile_verified,
    password,
    picture,
    location_id,
    role_id,
    reporting_manager_id,
  } = userData;

  const sql = `
      INSERT INTO admin_user (
        id,
        name,
        display_name,
        short_name,
        is_active,
        created_at,
        updated_at,
        email,
        email_verified,
        mobile_country_code,
        mobile_number,
        mobile_verified,
        password,
        picture,
        location_id,
        role_id,
        reporting_manager_id
        
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;

  db.query(
    sql,
    [
      id,
      name,
      display_name,
      short_name,
      is_active,
      created_at,
      updated_at,
      email,
      email_verified,
      mobile_country_code,
      mobile_number,
      mobile_verified,
      password,
      picture,
      location_id,
      role_id,
      reporting_manager_id,
    ],
    callback
  );
};

const listAdmin = (pageNumber, callback) => {
  const limit = 2;
  const offset = (pageNumber - 1) * limit;
  const sql = `SELECT * FROM playground.admin_user LIMIT ${limit} OFFSET ${offset}`;
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

module.exports = {
  createAdmin,
  listAdmin,
};
