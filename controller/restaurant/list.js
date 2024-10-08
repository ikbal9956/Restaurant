const uuid = require("uuid");
const restaurantModel = require("../../model/restaurant/restaurant.js");

const list = (req, res) => {
  restaurantModel.restaurant_list((err, users) => {
    if (err)
      return res.status(500).json({ message: "Internal server error", err });

    return res.status(200).json({
      restaurants: users.restaurants,
    });
  });
};

module.exports = list;
