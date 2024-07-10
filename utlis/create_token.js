const jwt = require("jsonwebtoken");
const config = require("./config");

const createToken = (userId) => {
  const token = jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.tokenExpiry,
  });

  return {
    token,
    expiresIn: config.tokenExpiry,
  };
};

module.exports = createToken;
