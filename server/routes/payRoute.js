const express = require("express")
const paymentController = require("../controller/paymentController");
const route = express.Router()

route.post("/createorder", paymentController.createOrder);
route.post("/verifypayment", paymentController.verifyPayment);

module.exports = route
