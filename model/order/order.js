const db = require("../../database/db.js");

const create_order = (userData, callback) => {
  const {
    id,
    customer_name,
    mobile_number,
    aadhar_number,
    food_time,
    table_number,
    restaurant_id,
    foods,
    is_active,
    created_at,
    updated_at,
  } = userData;

  const sql = `
      INSERT INTO customer_orders (
        id,
        customer_name,
        mobile_number,
        aadhar_number,
        food_time,
        table_number,
        restaurant_id,
        foods, 
        is_active,
        created_at,
        updated_at
        
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      id,
      customer_name,
      mobile_number,
      aadhar_number,
      food_time,
      table_number,
      restaurant_id,
      foods,
      is_active,
      created_at,
      updated_at,
    ],
    callback
  );
};

const orderlist_by_restaurant_id = (restaurant_id, pageNumber, pageLimit, callback) => {
  const limit = pageLimit;
  const offset = (pageNumber - 1) * limit;

  const countSql = `
    SELECT COUNT(*) AS totalCount 
    FROM customer_orders 
    WHERE restaurant_id = ? 
    AND is_active = TRUE
  `;

  db.query(countSql, [restaurant_id], (err, countResult) => {
    if (err) return callback(err);

    const totalCount = countResult[0].totalCount;

    const sql = `
      SELECT * 
      FROM customer_orders 
      WHERE restaurant_id = ? 
      AND is_active = TRUE 
      LIMIT ? OFFSET ?
    `;
    
    db.query(sql, [restaurant_id, limit, offset], (err, results) => {
      if (err) return callback(err);

      return callback(null, { orders: results, totalCount });
    });
  });
};


const order_delete = (id, callback) => {
  const checkSql = `SELECT is_active FROM customer_orders WHERE id = ?`;
  db.query(checkSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(new Error("order not found"));

    const isActive = results[0].is_active;
    if (!isActive) {
      return callback(new Error("order is already deleted"));
    }

    const updateSql = `UPDATE customer_orders SET is_active = FALSE WHERE id = ?`;
    db.query(updateSql, [id], (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  });
};

const update_order = (id, classData, callback) => {
  const {
    customer_name,
    mobile_number,
    aadhar_number,
    food_time,
    table_number,
    restaurant_id,
    foods,
    updated_at,
    is_active,
  } = classData;

  const sql =
    "UPDATE customer_orders SET customer_name = ?, mobile_number = ?, aadhar_number = ?, food_time = ?, table_number = ?,restaurant_id = ?, foods = ?, updated_at = ?,is_active = ? WHERE id = ?";

  db.query(
    sql,
    [
      customer_name,
      mobile_number,
      aadhar_number,
      food_time,
      table_number,
      restaurant_id,
      foods,
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
  create_order,
  orderlist_by_restaurant_id,
  order_delete,
  update_order,
};
