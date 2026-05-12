const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },

    pass: String,

    googleId: String,

    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);