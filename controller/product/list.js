const uuid = require("uuid");
const productModel = require("../../model/product/product.js");

const list = (req, res) => {
  const pageNumber = parseInt(req.query.page) || 1;
  const pageLimit = parseInt(req.query.page_limit) || 5;

  productModel.product_list(pageNumber, pageLimit, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Internal server error", err });

    const { products, totalCount } = result;
    const totalPages = Math.ceil(totalCount / pageLimit);

    return res.status(200).json({
      products: products,
      page:pageNumber,
      page_limit: pageLimit,
      total_count: totalCount,
      total_pages: totalPages,
    });
  });
};

module.exports = list;
