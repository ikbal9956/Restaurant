const db = require("../../database/db.js");

// const create_order = (userData, callback) => {
//   const {
//     id,
//     customer_name,
//     mobile_number,
//     aadhar_number,
//     food_time,
//     table_number,
//     restaurant_id,
//     foods,
//     is_active,
//     created_at,
//     updated_at,
//   } = userData;

//   const sql = `
//       INSERT INTO customer_orders (
//         id,
//         customer_name,
//         mobile_number,
//         aadhar_number,
//         food_time,
//         table_number,
//         restaurant_id,
//         foods, 
//         is_active,
//         created_at,
//         updated_at
        
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   db.query(
//     sql,
//     [
//       id,
//       customer_name,
//       mobile_number,
//       aadhar_number,
//       food_time,
//       table_number,
//       restaurant_id,
//       foods,
//       is_active,
//       created_at,
//       updated_at,
//     ],
//     callback
//   );
// };

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
    INSERT INTO customer_order (
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
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;

  const values = [
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
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rows[0]);
    }
  });
};




// const orderlist_by_restaurant_id = (restaurant_id,callback) => {
//   const sql = `
//       SELECT * 
//       FROM customer_orders 
//       WHERE restaurant_id = ? 
//       AND is_active = TRUE `;

//   db.query(sql, [restaurant_id], (err, results) => {
//     if (err) return callback(err);
//     return callback(null, { orders: results });
//   });
// };


const orderlist_by_restaurant_id = (restaurant_id, callback) => {
  const sql = `
    SELECT * 
    FROM customer_order 
    WHERE restaurant_id = $1 
    AND is_active = TRUE;
  `;

  db.query(sql, [restaurant_id], (err, results) => {
    if (err) return callback(err);
    return callback(null, { orders: results.rows });
  });
};


// const get_by_id = (id,callback) => {
//   const sql = `
//       SELECT * 
//       FROM customer_orders 
//       WHERE id = ? 
//       AND is_active = TRUE `;

//   db.query(sql, [id], (err, results) => {
//     if (err) return callback(err);
//     return callback(null, { orders: results });
//   });
// };

const get_by_id = (id, callback) => {
  const sql = `
    SELECT * 
    FROM customer_order 
    WHERE id = $1 
    AND is_active = TRUE;
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    return callback(null, { orders: results.rows });
  });
};


// const order_delete = (id, callback) => {
//   const checkSql = `SELECT is_active FROM customer_orders WHERE id = ?`;
//   db.query(checkSql, [id], (err, results) => {
//     if (err) return callback(err);
//     if (results.length === 0) return callback(new Error("order not found"));

//     const isActive = results[0].is_active;
//     if (!isActive) {
//       return callback(new Error("order is already deleted"));
//     }

//     const updateSql = `UPDATE customer_orders SET is_active = FALSE WHERE id = ?`;
//     db.query(updateSql, [id], (err, results) => {
//       if (err) return callback(err);
//       return callback(null, results);
//     });
//   });
// };

const order_delete = (id, callback) => {
  // Check if the order exists and is active
  const checkSql = 'SELECT is_active FROM customer_order WHERE id = $1';

  pool.query(checkSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.rows.length === 0) return callback(new Error("Order not found"));

    const isActive = results.rows[0].is_active;
    if (!isActive) {
      return callback(new Error("Order is already deleted"));
    }

    // Update the order to set is_active to FALSE
    const updateSql = 'UPDATE customer_order SET is_active = FALSE WHERE id = $1';

    pool.query(updateSql, [id], (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  });
};


// const update_order = (id, classData, callback) => {
//   const {
//     customer_name,
//     mobile_number,
//     aadhar_number,
//     food_time,
//     table_number,
//     restaurant_id,
//     foods,
//     updated_at,
//     is_active,
//   } = classData;

//   const sql =
//     "UPDATE customer_orders SET customer_name = ?, mobile_number = ?, aadhar_number = ?, food_time = ?, table_number = ?,restaurant_id = ?, foods = ?, updated_at = ?,is_active = ? WHERE id = ?";

//   db.query(
//     sql,
//     [
//       customer_name,
//       mobile_number,
//       aadhar_number,
//       food_time,
//       table_number,
//       restaurant_id,
//       foods,
//       updated_at,
//       is_active,
//       id,
//     ],
//     (err, results) => {
//       if (err) {
//         return callback(err);
//       }
//       return callback(null, results);
//     }
//   );
// };



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

  const sql = `
    UPDATE customer_order
    SET customer_name = $1, 
        mobile_number = $2, 
        aadhar_number = $3, 
        food_time = $4, 
        table_number = $5, 
        restaurant_id = $6, 
        foods = $7, 
        updated_at = $8, 
        is_active = $9 
    WHERE id = $10
  `;

  pool.query(
    sql,
    [
      customer_name,
      mobile_number,
      aadhar_number,
      food_time,
      table_number,
      restaurant_id,
      foods, // Ensure that foods is a valid JSON string or object
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


const customer_order = (id, restaurant_id, callback) => {
  const sql =
    "SELECT * FROM customer_order WHERE id = ? AND restaurant_id = ?";

  db.query(sql, [id, restaurant_id], (err, results) => {
    if (err) return callback(err);

    return callback(null, { order: results });
  });
};

const list = (callback) => {
  const sql = `SELECT * FROM customer_order WHERE is_active = TRUE`;

  db.query(sql, (err, results) => {
    if (err) return callback(err);

    return callback(null, { order: results.rows });
  });
};


module.exports = {
  get_by_id,
  create_order,
  orderlist_by_restaurant_id,
  order_delete,
  update_order,
  customer_order,
  list,
};
