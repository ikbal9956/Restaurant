const productModel = require("../../model/product/product.js");

const product_update = (req, res) => {
  const { id } = req.params;
  const {
    name,
    title,
    category,
    price,
    rating,
    thumbnail,
    images,
    discountPercentage,
    description,
    recipe,
    special,
    is_active
  } = req.body;
  const imagesJSON = JSON.stringify(images);
  const productData = {
    name,
    title,
    category,
    price,
    rating,
    thumbnail,
    images: imagesJSON,
    discountPercentage,
    description,
    recipe,
    special,
    updated_at: new Date(),
    is_active
  };

  productModel.update_product(id, productData, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product updated successfully" });
  });
};

module.exports = product_update;
