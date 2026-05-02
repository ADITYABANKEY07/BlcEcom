const express = require("express");
const route = express.Router();
const adminController = require("../controller/adminController");

route.post("/login", adminController.LoginPage);
route.get(
  "/admin-data",adminController.verifyAdmin, adminController.GetAdminDataPage);
route.get("/adminlogout", adminController.AdminLogoutPage);
route.post("/upload", adminController.UploadProduct);
route.get("/display", adminController.DisplayProduct);

module.exports = route;
