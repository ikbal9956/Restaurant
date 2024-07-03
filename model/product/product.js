const db = require("../../database/db.js");

const create_product = (productData, callback) => {
  const {
    id,
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
        images,
        discountPercentage,
        description,
        recipe,
        special,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      id,
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
      created_at,
      updated_at,
    ],
    callback
  );
};

const product_list = (pageNumber, pageLimit, callback) => {
  const limit = pageLimit;
  const offset = (pageNumber - 1) * limit;

  const countSql =
    "SELECT COUNT(*) AS totalCount FROM products WHERE is_active = TRUE";
  db.query(countSql, (err, countResult) => {
    if (err) return callback(err);

    const totalCount = countResult[0].totalCount;

    const sql = `SELECT * FROM products WHERE is_active = TRUE LIMIT ${limit} OFFSET ${offset}`;
    db.query(sql, (err, results) => {
      if (err) return callback(err);

      return callback(null, { users: results, totalCount });
    });
  });
};

const product_delete = (id, callback) => {
  const checkSql = `SELECT is_active FROM products WHERE id = ?`;
  db.query(checkSql, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(new Error("product not found"));

    const isActive = results[0].is_active;
    if (!isActive) {
      return callback(new Error("product is already deleted"));
    }

    const updateSql = `UPDATE products SET is_active = FALSE WHERE id = ?`;
    db.query(updateSql, [id], (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  });
};

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
        name = ?, 
        title = ?, 
        category = ?, 
        price = ?, 
        rating = ?, 
        thumbnail = ?, 
        images = ?, 
        discountPercentage = ?, 
        description = ?, 
        recipe = ?, 
        special = ?, 
        updated_at = ?, 
        is_active = ?
      WHERE id = ?
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

const product_by_id = (id, callback) => {
  const sql = "SELECT * FROM products WHERE id = ? AND is_active = TRUE";
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

module.exports = {
  create_product,
  product_list,
  product_delete,
  update_product,
  product_by_id
};
