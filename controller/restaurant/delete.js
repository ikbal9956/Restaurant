const uuid = require("uuid");
const restaurantModel = require("../../model/restaurant/restaurant");

const delete_by_Id = (req, res) => {
  const { id } = req.params;

  restaurantModel.restaurant_delete(id, (err, results) => {
    if (err) {
      if (err.message === "restaurant is already deleted") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: "internal server error", err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    return res.status(200).json({ message: "restaurant deleted successfully" });
  });
};

module.exports = delete_by_Id;
