const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },

    products: [
      {
        productId: String,
        title: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],

    contactInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
    },
    shippingInfo: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Razorpay",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    orderStatus: {
      type: String,
      default: "Processing",
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
