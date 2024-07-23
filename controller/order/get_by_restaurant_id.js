// const uuid = require("uuid");
// const orderModel = require("../../model/order/order.js");

// const orderlist_by_restaurant_id = (req, res) => {
//   const restaurant_id = req.params.restaurant_id;

//   orderModel.orderlist_by_restaurant_id(restaurant_id, (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Internal server error", err });
//     }
//     if (!results || results.orders.length === 0) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     return res.status(200).json({
//       list: results.orders,
//     });
//   });
// };
// module.exports = orderlist_by_restaurant_id;


const uuid = require("uuid");
const orderModel = require("../../model/order/order.js");

const orderlist_by_restaurant_id = (req, res) => {
  const restaurant_id = req.params.restaurant_id;

  orderModel.orderlist_by_restaurant_id(restaurant_id, (err, results) => {
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

module.exports = orderlist_by_restaurant_id;
