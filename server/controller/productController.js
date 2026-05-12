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

const DisplayProduct = async (req, res) => {
  try {
    let { brand, model } = req.query;

    // ✅ CLEAN INPUT (IMPORTANT)
    brand = brand?.trim();
    model = model?.trim();

    let filter = {};

    if (brand) {
      filter.brand = new RegExp(`^${brand}$`, "i");
    }

    if (model) {
      filter.model = new RegExp(`^${model}$`, "i");
    }

    const products = await productModel.find(filter);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getMenuData = async (req, res) => {
  try {
    const products = await productModel.find({ isActive: true }, "brand model");

    const grouped = {};

    products.forEach((item) => {
      const brand = item.brand.toLowerCase();
      const model = item.model;

      if (!grouped[brand]) {
        grouped[brand] = new Set();
      }

      grouped[brand].add(model);
    });

    // convert Set → Array
    const result = {};
    Object.keys(grouped).forEach((brand) => {
      result[brand] = Array.from(grouped[brand]);
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  BestSellerPage,
  SingleProductPage,
  DisplayProduct,
  getMenuData,
};
