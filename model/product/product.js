const db = require("../../database/db.js");

// const create_product = (productData, callback) => {
//   const {
//     id,
//     name,
//     title,
//     category,
//     price,
//     rating,
//     thumbnail,
//     image1,
//     image2,
//     image3,
//     image4,
//     discountPercentage,
//     description,
//     recipe,
//     special,
//     is_active,
//     created_at,
//     updated_at,
//   } = productData;

//   const sql = `
//       INSERT INTO products (
//         id,
//         name,
//         title,
//         category,
//         price,
//         rating,
//         thumbnail,
//         image1,
//         image2,
//         image3,
//         image4,
//         discountPercentage,
//         description,
//         recipe,
//         special,
//         is_active,
//         created_at,
//         updated_at
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   db.query(
//     sql,
//     [
//       id,
//       name,
//       title,
//       category,
//       price,
//       rating,
//       thumbnail,
//       image1,
//       image2,
//       image3,
//       image4,
//       discountPercentage,
//       description,
//       recipe,
//       special,
//       is_active,
//       created_at,
//       updated_at,
//     ],
//     callback
//   );
// };

const create_product = (productData, callback) => {
  const {
    id,
    name,
    title,
    category,
    price,
    rating,
    thumbnail,
    image1,
    image2,
    image3,
    image4,
    discountPercentage,
    description,
    recipe,
    special,
    is_active,
    created_at,
    updated_at,
  } = productData;

  const sql = `
    INSERT INTO products (
      id,
      name,
      title,
      category,
      price,
      rating,
      thumbnail,
      image1,
      image2,
      image3,
      image4,
      discountPercentage,
      description,
      recipe,
      special,
      is_active,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    RETURNING *;
  `;

  const values = [
    id,
    name,
    title,
    category,
    price,
    rating,
    thumbnail,
    image1,
    image2,
    image3,
    image4,
    discountPercentage,
    description,
    recipe,
    special,
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

// const product_list = (pageNumber, pageLimit, callback) => {
//   const limit = pageLimit;
//   const offset = (pageNumber - 1) * limit;

//   const countSql =
//     "SELECT COUNT(*) AS totalCount FROM products WHERE is_active = TRUE";
//   db.query(countSql, (err, countResult) => {
//     if (err) return callback(err);

//     const totalCount = countResult[0].totalCount;

//     const sql = `SELECT * FROM products WHERE is_active = TRUE LIMIT ${limit} OFFSET ${offset}`;
//     db.query(sql, (err, results) => {
//       if (err) return callback(err);

//       return callback(null, { users: results, totalCount });
//     });
//   });
// };


const product_list = (pageNumber, pageLimit, callback) => {
  const limit = pageLimit;
  const offset = (pageNumber - 1) * limit;

  // Count total active products
  const countSql = `
    SELECT COUNT(*) AS totalCount 
    FROM products 
    WHERE is_active = TRUE
  `;

  db.query(countSql, (err, countResult) => {
    if (err) return callback(err);

    const totalCount = parseInt(countResult.rows[0].totalcount, 10);

    const sql = `
      SELECT * 
      FROM products 
      WHERE is_active = TRUE 
      LIMIT $1 
      OFFSET $2
    `;

    db.query(sql, [limit, offset], (err, results) => {
      if (err) return callback(err);

      return callback(null, { products: results.rows, totalCount });
    });
  });
};

// const product_delete = (id, callback) => {
//   const checkSql = `SELECT is_active FROM products WHERE id = ?`;
//   db.query(checkSql, [id], (err, results) => {
//     if (err) return callback(err);
//     if (results.length === 0) return callback(new Error("product not found"));

//     const isActive = results[0].is_active;
//     if (!isActive) {
//       return callback(new Error("product is already deleted"));
//     }

//     const updateSql = `UPDATE products SET is_active = FALSE WHERE id = ?`;
//     db.query(updateSql, [id], (err, results) => {
//       if (err) return callback(err);
//       return callback(null, results);
//     });
//   });
// };

const product_delete = (id, callback) => {
  // Check if the product exists and if it is active
  const checkSql = `
    SELECT is_active 
    FROM products 
    WHERE id = $1
  `;
  
  db.query(checkSql, [id], (err, results) => {
    if (err) return callback(err);

    if (results.rowCount === 0) {
      return callback(new Error("product not found"));
    }

    const isActive = results.rows[0].is_active;
    if (!isActive) {
      return callback(new Error("product is already deleted"));
    }

    // Update the product to mark it as deleted
    const updateSql = `
      UPDATE products 
      SET is_active = FALSE 
      WHERE id = $1
      RETURNING *
    `;
    
    db.query(updateSql, [id], (err, results) => {
      if (err) return callback(err);

      // If no rows were affected, it means the update did not succeed
      if (results.rowCount === 0) {
        return callback(new Error("product not found"));
      }

      return callback(null, results.rows);
    });
  });
};

// const update_product = (id, productData, callback) => {
//   const {
//     name,
//     title,
//     category,
//     price,
//     rating,
//     thumbnail,
//     images,
//     discountPercentage,
//     description,
//     recipe,
//     special,
//     updated_at,
//     is_active,
//   } = productData;

//   const sql = `
//       UPDATE products 
//       SET 
//         name = ?, 
//         title = ?, 
//         category = ?, 
//         price = ?, 
//         rating = ?, 
//         thumbnail = ?, 
//         images = ?, 
//         discountPercentage = ?, 
//         description = ?, 
//         recipe = ?, 
//         special = ?, 
//         updated_at = ?, 
//         is_active = ?
//       WHERE id = ?
//     `;

//   db.query(
//     sql,
//     [
//       name,
//       title,
//       category,
//       price,
//       rating,
//       thumbnail,
//       images,
//       discountPercentage,
//       description,
//       recipe,
//       special,
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

const update_product = (id, productData, callback) => {
  const {
    name,
    title,
    category,
    price,
    rating,
    thumbnail,
    images,
    discountPercentage,
    description,
    recipe,
    special,
    updated_at,
    is_active,
  } = productData;

  const sql = `
    UPDATE products
    SET 
      name = $1,
      title = $2,
      category = $3,
      price = $4,
      rating = $5,
      thumbnail = $6,
      images = $7,
      discountPercentage = $8,
      description = $9,
      recipe = $10,
      special = $11,
      updated_at = $12,
      is_active = $13
    WHERE id = $14
    RETURNING *
  `;

  db.query(
    sql,
    [
      name,
      title,
      category,
      price,
      rating,
      thumbnail,
      images,
      discountPercentage,
      description,
      recipe,
      special,
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


// const product_by_id = (id, callback) => {
//   const sql = "SELECT * FROM products WHERE id = ? AND is_active = TRUE";
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

const product_by_id = (id, callback) => {
  const sql = `
    SELECT * 
    FROM products 
    WHERE id = $1 
      AND is_active = TRUE
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.rowCount === 0) {
      return callback(null, null);
    }
    return callback(null, results.rows[0]);
  });
};



module.exports = {
  create_product,
  product_list,
  product_delete,
  update_product,
  product_by_id,
};
