const uuid = require("uuid");
const productModel = require("../../model/product/product");

const product_by_id = (req, res) => {
  const { id } = req.params;

  productModel.product_by_id(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "internal server error", err });
    }
    if (!results || results.is_active===false) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.status(200).json({ results });
  });
};
module.exports = product_by_id;
