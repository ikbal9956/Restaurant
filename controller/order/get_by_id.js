const uuid = require("uuid");
const orderModel = require("../../model/order/order.js");

const get_by_id = (req, res) => {
  const id = req.params.id;

  orderModel.get_by_id(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error", err });
    }
    if (!results || results.orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      list: results.orders,
    });
  });
};
module.exports = get_by_id;
