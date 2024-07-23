// const { v4: uuidv4 } = require("uuid");
// const userModel = require("../../model/user/user.js");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const createToken = require("../../utlis/create_token.js");


// const create_order = (req, res) => {
//   const { name, email, password, is_admin = false } = req.body;

//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) {
//       return res.status(500).json({ error: "Error hashing password" });
//     }

//     const userData = {
//       id: uuidv4(),
//       name,
//       email,
//       password: hashedPassword,
//       is_admin,
//       is_active: true,
//       created_at: new Date(),
//       updated_at: new Date(),
//     };

//     userModel.create_user(userData, (err, data) => {
//       if (err) return res.status(500).json(err);

//       const tokenData = createToken(userData.id, userData.is_admin);
//       return res.status(201).json({
//         message: "user created successfully",
//         token: tokenData.token,
//         expires_in: tokenData.expiresIn,
//         is_admin: userData.is_admin,
//         data: {
//           user: userData,
//         },
//       });
//     });
//   });
// };

// module.exports = create_order;


const { v4: uuidv4 } = require("uuid");
const userModel = require("../../model/user/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = require("../../utlis/create_token.js");

const createUser = (req, res) => {
  const { name, email, password, is_admin = false } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    const userData = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      is_admin,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    userModel.create_user(userData, (err, data) => {
      if (err) return res.status(500).json(err);

      const tokenData = createToken(userData.id, userData.is_admin);
      return res.status(201).json({
        message: "User created successfully",
        token: tokenData.token,
        expires_in: tokenData.expiresIn,
        is_admin: userData.is_admin,
        data: {
          user: userData,
        },
      });
    });
  });
};

module.exports = createUser;
