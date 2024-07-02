const express = require("express");
const router = express.Router();
const create_product = require("../controller/product/create");
const list = require("../controller/product/list");
const update = require("../controller/product/update");
const delete_by_id = require("../controller/product/delete");


router.post("/create", create_product);
router.get("/list", list);
router.put("/update/:id", update);
router.delete("/delete/:id", delete_by_id);

module.exports = router;