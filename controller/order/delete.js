const uuid = require("uuid");
const orderModel = require("../../model/order/order.js");

const delete_by_Id = (req, res) => {
  const {id}  = req.params;
  orderModel.order_delete(id, (err, results) => {
    if (err) {
      if (err.message === "order is already deleted") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: "internal server error", err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "order not found" });
    }
    return res.status(200).json({ message: "order deleted successfully" });
  });
};

module.exports = delete_by_Id;
