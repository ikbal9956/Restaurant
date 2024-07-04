const uuid = require("uuid");
const orderModel = require("../../model/order/order.js");

const list = (req, res) => {
    orderModel.list((err, users) => {
    if (err)
      return res.status(500).json({ message: "Internal server error", err });

    return res.status(200).json({
      orders: users.order,
    });
  });
};

module.exports = list;
