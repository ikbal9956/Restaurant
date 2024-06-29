const express = require("express");
const router = express.Router();
const restaurant = require("./route/restaurant.js");
const order =require("./route/order.js")

router.use("/restaurant", restaurant);
router.use("/order", order);


module.exports = router;
