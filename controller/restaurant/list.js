const uuid = require("uuid");
const restaurantModel = require("../../model/restaurant/restaurant.js");

const list = (req, res) => {
  const pageNumber = parseInt(req.query.page) || 1;
  const pageLimit = parseInt(req.query.page_limit) || 2;

  restaurantModel.restaurant_list(pageNumber, pageLimit, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Internal server error", err });

    const { users, totalCount } = result;
    const totalPages = Math.ceil(totalCount / pageLimit);

    return res.status(200).json({
      list: users,
      pageNumber,
      page_limit: pageLimit,
      total_count: totalCount,
      total_pages: totalPages,
    });
  });
};

module.exports = list;
