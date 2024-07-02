const express = require("express");
const router = express.Router();
const restaurant = require("./route/restaurant.js");
const order =require("./route/order.js");
const product =require("./route/product.js");


router.use("/restaurant", restaurant);
router.use("/order", order);
router.use("/product",product);


module.exports = router;
