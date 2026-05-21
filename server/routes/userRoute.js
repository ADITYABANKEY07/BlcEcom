const express = require("express")
const userController = require("../controller/userController");
const route = express.Router()

route.post("/signup", userController.signupUser);
route.post("/login", userController.loginUser);
route.get("/getmyorders/:userId", userController.GetMyOrders);

module.exports = route
