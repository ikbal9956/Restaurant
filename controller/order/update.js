const uuid = require("uuid");
const orderModel = require("../../model/order/order.js");

const order_update = (req, res) => {
  const { id } = req.params;
  const {
    customer_name,
    mobile_number,
    aadhar_number,
    food_time,
    table_number,
    restaurant_id,
    foods,
    is_active
  } = req.body;
  const foodsJSON = JSON.stringify(foods);
  const classData = {
    customer_name,
    mobile_number,
    aadhar_number,
    food_time,
    table_number,
    restaurant_id,
    foods:foodsJSON, 
    is_active,
    updated_at: new Date(),
  };

  orderModel.update_order(id, classData, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "order not found" });
    }
    return res.status(200).json({ message: "order updated successfully" });
  });
};
module.exports = order_update;
