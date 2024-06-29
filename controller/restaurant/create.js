const restaurantModel = require("../../model/restaurant/restaurant");
const { v4: uuidv4 } = require('uuid');

const create_restaurant = (req, res) => {
  const {
    restaurant_name,
    restaurant_full_address,
    email,
    mobile_number,
    google_map_link,
    owner_name,
    owner_mobile_number,
  } = req.body;

  const userData = {
    id: uuidv4(),
    restaurant_name,
    restaurant_full_address,
    email,
    mobile_number,
    google_map_link,
    owner_name,
    owner_mobile_number,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  restaurantModel.create_restaurant(userData, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "User created successfully", data });
  });
};

module.exports = create_restaurant;
