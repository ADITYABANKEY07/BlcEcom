const productModel = require("../models/productModel");

const BestSellerPage = async (req, res) => {
  const { isBestSeller } = req.query;

  const filter = {};
  if (isBestSeller) filter.isBestSeller = true;

  const products = await productModel.find(filter);
  res.json(products);
};
const SingleProductPage = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.json(product);
};

module.exports = {
  BestSellerPage,
  SingleProductPage,
};
