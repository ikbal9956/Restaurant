const express = require("express");
const router = express.Router();
const create_user = require("../controller/user/create");
const login = require("../controller/user/login");


router.post("/create", create_user);
router.post("/login", login);




module.exports = router;