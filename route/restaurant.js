const express = require("express");
const router = express.Router();
const create_restaurant = require("../controller/restaurant/create");
const list = require("../controller/restaurant/list");
const get = require("../controller/restaurant/get");
const update = require("../controller/restaurant/update");
const delete_by_id = require("../controller/restaurant/delete");


router.post("/create", create_restaurant);
router.get("/list", list);
router.get("/get/:id", get);
router.put("/update/:id", update);
router.delete("/delete/:id", delete_by_id);




module.exports = router;