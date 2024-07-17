const jwt = require("jsonwebtoken");
const config = require("./config");

const createToken = (userId,isAdmin) => {
  const token = jwt.sign({ userId,isAdmin }, config.jwtSecret, {
    expiresIn: config.tokenExpiry,
  });

  return {
    token,
    expiresIn: config.tokenExpiry,
  };
};

module.exports = createToken;

