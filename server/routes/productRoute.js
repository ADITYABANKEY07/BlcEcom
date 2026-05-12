const express = require("express");
const route = express.Router();
const productController = require("../controller/productController");

// Get Best Sellers
route.get("/bestseller", productController.BestSellerPage);
// Get single product
route.get("/products/:id", productController.SingleProductPage);
// Display product
route.get("/display", productController.DisplayProduct);
// Get Menu Data
route.get("/menu", productController.getMenuData);


module.exports = route;