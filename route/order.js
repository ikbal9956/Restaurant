const express = require("express");
const router = express.Router();
const create_order = require("../controller/order/create");
const get = require("../controller/order/get");
const update = require("../controller/order/update");
const delete_by_id = require("../controller/order/delete");
const customer_order=require("../controller/order/customer_order");
const customer_list=require("../controller/order/list");


router.post("/create", create_order);
router.get("/get/:restaurant_id", get);
router.get("/customer_order",customer_order);
router.get("/customer_list",customer_list);
router.put("/update/:id", update);
router.delete("/delete/:id", delete_by_id);

module.exports = router;