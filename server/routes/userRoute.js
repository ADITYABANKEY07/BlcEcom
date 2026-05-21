const express = require("express")
const userController = require("../controller/userController");
const adminController = require("../controller/adminController");
const route = express.Router()

route.post("/signup", userController.signupUser);
route.post("/login", userController.loginUser);
route.get("/getmyorders/:userId", userController.GetMyOrders);
// Save order 
route.post("/saveorder", adminController.saveOrder);

module.exports = route
