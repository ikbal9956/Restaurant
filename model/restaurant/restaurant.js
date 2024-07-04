const db = require("../../database/db.js");

const create_restaurant = (userData, callback) => {
  const {
    id,
    restaurant_name,
    restaurant_full_address,
    email,
    mobile_number,
    google_map_link,
    owner_name,
    owner_mobile_number,
    is_active,
    created_at,
    updated_at,
  } = userData;

  const sql = `
      INSERT INTO restaurants (
        id,
        restaurant_name,
        restaurant_full_address,
        email,
        mobile_number,
        google_map_link,
        owner_name,
        owner_mobile_number,
        is_active,
        created_at,
        updated_at
        
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      id,
      restaurant_name,
      restaurant_full_address,
      email,
      mobile_number,
      google_map_link,
      owner_name,
      owner_mobile_number,
      is_active,
      created_at,
      updated_at,
    ],
    callback
  );
};


const restaurant_list = (callback) => {
  const sql = `SELECT * FROM restaurants WHERE is_active = TRUE`;
  db.query(sql, (err, results) => {
    if (err) return callback(err);

    return callback(null, { restaurants: results });
  });
};



const restaurant_by_id = (id, callback) => {
  const sql = "SELECT * FROM restaurants WHERE id = ? AND is_active = TRUE";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    return callback(null, results[0]);
  });
};

const restaurant_delete = (id, callback) => {
  const checkSql = `SELECT is_active FROM restaurants WHERE id = ?`;
  db.query(checkSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0)
      return callback(new Error("restaurant not found"));

    const isActive = results[0].is_active;
    if (!isActive) {
      return callback(new Error("restaurant is already deleted"));
    }

    const updateSql = `UPDATE restaurants SET is_active = FALSE WHERE id = ?`;
    db.query(updateSql, [id], (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  });
};

const update_restaurant = (id, classData, callback) => {
  const {
    restaurant_name,
    restaurant_full_address,
    email,
    mobile_number,
    google_map_link,
    owner_name,
    owner_mobile_number,
    updated_at,
    is_active,
  } = classData;

  const sql =
    "UPDATE restaurants SET restaurant_name = ?, restaurant_full_address = ?, email = ?, mobile_number = ?, google_map_link = ?,owner_name = ?, owner_mobile_number = ?, updated_at = ?,is_active = ? WHERE id = ?";

  db.query(
    sql,
    [
      restaurant_name,
      restaurant_full_address,
      email,
      mobile_number,
      google_map_link,
      owner_name,
      owner_mobile_number,
      updated_at,
      is_active,
      id,
    ],
    (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    }
  );
};

module.exports = {
  create_restaurant,
  restaurant_list,
  restaurant_delete,
  restaurant_by_id,
  update_restaurant,
};
