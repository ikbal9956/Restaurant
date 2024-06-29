const uuid = require("uuid");
const orderModel = require("../../model/order/order.js");

const orderlist_by_restaurant_id = (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const pageNumber = parseInt(req.query.page) || 1;
  const pageLimit = parseInt(req.query.page_limit) || 2;

  orderModel.orderlist_by_restaurant_id(
    restaurant_id,
    pageNumber,
    pageLimit,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error", err });
      }
      if (!results || results.orders.length === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
      const { orders, totalCount } = results;
      const totalPages = Math.ceil(totalCount / pageLimit);

      return res.status(200).json({
        list: orders,
        pageNumber,
        page_limit: pageLimit,
        total_count: totalCount,
        total_pages: totalPages,
      });
    }
  );
};
module.exports = orderlist_by_restaurant_id;
