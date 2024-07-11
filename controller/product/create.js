const { v4: uuidv4 } = require('uuid');
const productModel = require("../../model/product/product.js");


const create_product = (req, res) => {
  const {
    name,
    title,
    category,
    price,
    rating,
    thumbnail,
    image1,
    image2,
    image3,
    image4,
    discountPercentage,
    description,
    recipe,
    special
  } = req.body;
 
  const productData = {
    id: uuidv4(),
    name,
    title,
    category,
    price,
    rating,
    thumbnail,
    image1,
    image2,
    image3,
    image4,
    discountPercentage,
    description,
    recipe,
    special,
    is_active:true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  productModel.create_product(productData, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Product created successfully", data });
  });
};

module.exports = create_product;