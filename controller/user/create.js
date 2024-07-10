const { v4: uuidv4 } = require("uuid");
const userModel = require("../../model/user/user.js");
const bcrypt = require("bcrypt");

const create_order = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    const userData = {
      id: uuidv4(),
      name,
      email,
      password:hashedPassword,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    userModel.create_user(userData, (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(201)
        .json({ message: "user created successfully", data });
    });
  });
};

module.exports = create_order;
