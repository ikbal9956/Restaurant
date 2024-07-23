const db = require("../../database/db.js");

// const create_restaurant = (userData, callback) => {
//   const {
//     id,
//     restaurant_name,
//     restaurant_full_address,
//     email,
//     mobile_number,
//     google_map_link,
//     owner_name,
//     owner_mobile_number,
//     is_active,
//     created_at,
//     updated_at,
//   } = userData;

//   const sql = `
//       INSERT INTO restaurants (
//         id,
//         restaurant_name,
//         restaurant_full_address,
//         email,
//         mobile_number,
//         google_map_link,
//         owner_name,
//         owner_mobile_number,
//         is_active,
//         created_at,
//         updated_at
        
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   db.query(
//     sql,
//     [
//       id,
//       restaurant_name,
//       restaurant_full_address,
//       email,
//       mobile_number,
//       google_map_link,
//       owner_name,
//       owner_mobile_number,
//       is_active,
//       created_at,
//       updated_at,
//     ],
//     callback
//   );
// };

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
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;

  const values = [
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
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rows[0]);
    }
  });
};


// const restaurant_list = (callback) => {
//   const sql = `SELECT * FROM restaurants WHERE is_active = TRUE`;
//   db.query(sql, (err, results) => {
//     if (err) return callback(err);

//     return callback(null, { restaurants: results });
//   });
// };

const restaurant_list = (callback) => {
  const sql = `SELECT * FROM restaurants WHERE is_active = TRUE`;
  db.query(sql, (err, results) => {
    if (err) return callback(err);

    return callback(null, { restaurants: results.rows });
  });
};



// const restaurant_by_id = (id, callback) => {
//   const sql = "SELECT * FROM restaurants WHERE id = ? AND is_active = TRUE";
//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       return callback(err);
//     }
//     if (results.length === 0) {
//       return callback(null, null);
//     }
//     return callback(null, results[0]);
//   });
// };


const restaurant_by_id = (id, callback) => {
  const sql = "SELECT * FROM restaurants WHERE id = $1 AND is_active = TRUE";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.rows.length === 0) {
      return callback(null, null);
    }
    return callback(null, results.rows[0]);
  });
};


// const restaurant_delete = (id, callback) => {
//   const checkSql = `SELECT is_active FROM restaurants WHERE id = ?`;
//   db.query(checkSql, [id], (err, results) => {
//     if (err) return callback(err);
//     if (results.length === 0)
//       return callback(new Error("restaurant not found"));

//     const isActive = results[0].is_active;
//     if (!isActive) {
//       return callback(new Error("restaurant is already deleted"));
//     }

//     const updateSql = `UPDATE restaurants SET is_active = FALSE WHERE id = ?`;
//     db.query(updateSql, [id], (err, results) => {
//       if (err) return callback(err);
//       return callback(null, results);
//     });
//   });
// };


const restaurant_delete = (id, callback) => {
  const checkSql = `SELECT is_active FROM restaurants WHERE id = $1`;
  db.query(checkSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.rows.length === 0) return callback(new Error("restaurant not found"));

    const isActive = results.rows[0].is_active;
    if (!isActive) {
      return callback(new Error("restaurant is already deleted"));
    }

    const updateSql = `UPDATE restaurants SET is_active = FALSE WHERE id = $1`;
    db.query(updateSql, [id], (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  });
};




// const update_restaurant = (id, classData, callback) => {
//   const {
//     restaurant_name,
//     restaurant_full_address,
//     email,
//     mobile_number,
//     google_map_link,
//     owner_name,
//     owner_mobile_number,
//     updated_at,
//     is_active,
//   } = classData;

//   const sql =
//     "UPDATE restaurants SET restaurant_name = ?, restaurant_full_address = ?, email = ?, mobile_number = ?, google_map_link = ?,owner_name = ?, owner_mobile_number = ?, updated_at = ?,is_active = ? WHERE id = ?";

//   db.query(
//     sql,
//     [
//       restaurant_name,
//       restaurant_full_address,
//       email,
//       mobile_number,
//       google_map_link,
//       owner_name,
//       owner_mobile_number,
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
    "UPDATE restaurants SET restaurant_name = $1, restaurant_full_address = $2, email = $3, mobile_number = $4, google_map_link = $5, owner_name = $6, owner_mobile_number = $7, updated_at = $8, is_active = $9 WHERE id = $10";

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
