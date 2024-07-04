const uuid = require("uuid");
const orderModel = require("../../model/order/order.js");

const customer_order = (req, res) => {
  const id = req.query.id;
  const restaurant_id = req.query.restaurant_id;

  if (!id || !restaurant_id) {
    return res
      .status(400)
      .json({ message: "Order ID and Restaurant ID are required" });
  }

  orderModel.customer_order(id, restaurant_id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error", err });
    }
    if (!results || results.order.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      order: results.order,
    });
  });
};
module.exports = customer_order;
