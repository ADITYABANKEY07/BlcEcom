const express = require("express");
const route = express.Router();
const productController = require("../controller/productController");

// Get Best Sellers
route.get("/bestseller", productController.BestSellerPage);

// Get single product
route.get("/products/:id", productController.SingleProductPage);

module.exports = route;