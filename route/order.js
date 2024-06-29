const express = require("express");
const router = express.Router();
const create_order = require("../controller/order/create");
const get = require("../controller/order/get");
const update = require("../controller/order/update");
const delete_by_id = require("../controller/order/delete");


router.post("/create", create_order);
router.get("/get/:restaurant_id", get);
router.put("/update/:id", update);
router.delete("/delete/:id", delete_by_id);

module.exports = router;