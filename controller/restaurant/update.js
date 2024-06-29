const uuid = require("uuid");
const restaurantModel = require("../../model/restaurant/restaurant.js");

const restaurant_update = (req, res) => {
  const { id } = req.params;
  const {
    restaurant_name,
    restaurant_full_address,
    email,
    mobile_number,
    google_map_link,
    owner_name,
    owner_mobile_number,
    is_active,
  } = req.body;

  const classData = {
    restaurant_name,
    restaurant_full_address,
    email,
    mobile_number,
    google_map_link,
    owner_name,
    owner_mobile_number,
    is_active,
    updated_at: new Date(),
  };

  restaurantModel.update_restaurant(id, classData, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    return res.status(200).json({ message: "Class updated successfully" });
  });
};
module.exports = restaurant_update;
