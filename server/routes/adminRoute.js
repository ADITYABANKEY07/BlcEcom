const express = require("express");
const route = express.Router();
const adminController = require("../controller/adminController");

route.post("/login", adminController.LoginPage);
route.get(
  "/admin-data",
  adminController.verifyAdmin,
  adminController.GetAdminDataPage,
);
route.get("/adminlogout", adminController.AdminLogoutPage);
route.post("/upload", adminController.UploadProduct);
route.get("/display", adminController.DisplayProduct);
// Display All product
route.get("/displayall", adminController.DisplayAllProduct);
// Display of Update product
route.get("/editdisplay", adminController.EditDisplay);
// Update product
route.post("/update", adminController.UpdateProduct);
// Update product
route.get("/delete", adminController.DeleteProduct);
// Save order 
route.post("/saveorder", adminController.saveOrder);
// Get orders
route.get("/orders", adminController.GetOrders);
// Update order status 
route.post("/orderstatus/:id", adminController.OrderStatus);

module.exports = route;
