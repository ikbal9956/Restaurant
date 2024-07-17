const userModel = require("../../model/user/user");
const db = require("../../database/db.js");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const createToken = require("../../utlis/create_token.js");

const login = (req, res) => {
  const { email, password } = req.body;

  userModel.login_user(email, password, (err, user) => {
    if (err) {
      if (err.message === "invalid password") {
        return res.status(401).json({ message: "invalid password" });
      } else if (err.message === "user not found") {
        return res.status(404).json({ message: "user not found" });
      } else {
        return res
          .status(500)
          .json({ error: "error finding user", details: err });
      }
    }

    const tokenData = createToken(user.id,user.is_admin);
    const token = tokenData.token;
    const expires_in = tokenData.expiresIn;

    return res.status(200).json({
      message: "login successful",
      token: tokenData.token,
      expires_in: tokenData.expiresIn,
      data: {
        user,
      },
    });
  });
};

module.exports = login;
