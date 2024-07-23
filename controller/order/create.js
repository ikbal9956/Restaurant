// const { v4: uuidv4 } = require('uuid');
// const orderModel = require("../../model/order/order.js");

// const create_order = (req, res) => {
//   const {
//     customer_name,
//     mobile_number,
//     aadhar_number,
//     food_time,
//     table_number,
//     restaurant_id,
//     foods,
//   } = req.body;
//   const foodsJSON = JSON.stringify(foods);
//   const userData = {
//     id: uuidv4(),
//     customer_name,
//     mobile_number,
//     aadhar_number,
//     food_time,
//     table_number,
//     restaurant_id,
//     foods:foodsJSON,
//     is_active: true,
//     created_at: new Date(),
//     updated_at: new Date(),
//   };

//   orderModel.create_order(userData, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(201).json({ message: "order created successfully", data });
//   });
// };

// module.exports = create_order;

const { v4: uuidv4 } = require("uuid");
const orderModel = require("../../model/order/order.js");

const create_order = (req, res) => {
  const {
    customer_name,
    mobile_number,
    aadhar_number,
    food_time,
    table_number,
    restaurant_id,
    foods,
  } = req.body;
  const foodsJSON = JSON.stringify(foods);
  const userData = {
    id: uuidv4(),
    customer_name,
    mobile_number,
    aadhar_number,
    food_time,
    table_number,
    restaurant_id,
    foods: foodsJSON,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  orderModel.create_order(userData, (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(201)
      .json({ message: "Order created successfully", data });
  });
};

module.exports = create_order;
