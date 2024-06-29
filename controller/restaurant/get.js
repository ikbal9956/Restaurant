const uuid = require("uuid");
const restaurantModel = require("../../model/restaurant/restaurant");

const restaurant_by_id = (req, res) => {
  const { id } = req.params;

  restaurantModel.restaurant_by_id(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "internal server error", err });
    }
    if (!results || results.is_active===false) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    return res.status(200).json({ results });
  });
};
module.exports = restaurant_by_id;
