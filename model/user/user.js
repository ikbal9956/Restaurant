const db = require("../../database/db.js");
const bcrypt = require("bcrypt");

// const create_user = (userData, callback) => {
//   const { id, name, email, password, is_admin, is_active, created_at, updated_at } =
//     userData;

//   const sql = `
//       INSERT INTO users (
//         id,
//         name,
//         email,
//         password,
//         is_admin,
//         is_active,
//         created_at,
//         updated_at
        
//       ) VALUES (?, ?, ?, ?,?, ?, ?, ?)
//     `;

//   db.query(
//     sql,
//     [id, name, email, password,is_admin, is_active, created_at, updated_at],
//     callback
//   );
// };

const create_user = (userData, callback) => {
  const { id, name, email, password, is_admin, is_active, created_at, updated_at } = userData;

  const sql = `
    INSERT INTO users (
      id,
      name,
      email,
      password,
      is_admin,
      is_active,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  db.query(sql, [id, name, email, password, is_admin, is_active, created_at, updated_at], callback);
};


// const login_user = (email, password, callback) => {
//     const sql =
//       "SELECT `id`, `password`,`is_admin` FROM users WHERE `email` =? AND is_active = TRUE";
//     db.query(sql, [email], (err, results) => {
//       if (err) return callback(err);
//       if (results.length === 0) return callback(new Error("user not found"));
  
//       const storedpassword = results[0].password;
//       const userID = results[0].id;
//       const isAdmin=results[0].is_admin;
//       bcrypt.compare(password, storedpassword, (err, isMatch) => {
//         if (err) return callback(err);
//         if (!isMatch) return callback(new Error("invalid password"));
  
//         return callback(null, { id: userID ,is_admin:isAdmin});
//       });
//     });
//   };

const login_user = (email, password, callback) => {
  const sql =
    'SELECT id, password, is_admin FROM users WHERE email = $1 AND is_active = TRUE';
  db.query(sql, [email], (err, res) => {
    if (err) return callback(err);
    if (res.rows.length === 0) return callback(new Error("user not found"));

    const storedPassword = res.rows[0].password;
    const userID = res.rows[0].id;
    const isAdmin = res.rows[0].is_admin;
    bcrypt.compare(password, storedPassword, (err, isMatch) => {
      if (err) return callback(err);
      if (!isMatch) return callback(new Error("invalid password"));

      return callback(null, { id: userID, is_admin: isAdmin });
    });
  });
};
module.exports = {
  create_user,
  login_user
};
