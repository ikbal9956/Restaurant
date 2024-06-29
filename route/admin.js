const express = require("express");
const router = express.Router();
const create_admin = require("../controller/admin/create");
const list = require("../controller/admin/list");

router.post("/create_admin", create_admin);
router.get("/list", list);

module.exports = router;