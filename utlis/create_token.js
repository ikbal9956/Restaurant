// const jwt = require("jsonwebtoken");
// const config = require("./config");

// const createToken = (userId) => {
//   const token = jwt.sign({ userId }, config.jwtSecret, {
//     expiresIn: config.tokenExpiry,
//   });

//   return {
//     token,
//     expiresIn: config.tokenExpiry,
//   };
// };

// module.exports = createToken;


const jwt = require('jsonwebtoken');

const createToken = (userId, isAdmin) => {
  const expiresIn = '1h';
  const payload = { id: userId, is_admin: isAdmin };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

  return { token, expiresIn };
};

module.exports = createToken;
