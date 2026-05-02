const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 IMPORTANT for your project (iPhone / Samsung filtering)
    model: {
      type: String,
      required: true, // e.g. "iPhone 16", "S25 Ultra"
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number, // optional
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true, // e.g. "Case", "Screen Protector"
    },

    subCategory: {
      type: String, // e.g. "MagSafe Case"
    },

    tags: {
      type: [String],
      default: [],
    },

images: {
  type: [String],
  default: [],
},

    defaultImage: {
      type: String,
    },

    // ✅ STOCK MANAGEMENT
    stock: {
      type: Number,
      default: 0,
    },

    // ✅ ADMIN CONTROL
    isFeatured: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isNew: {
      type: Boolean,
      default: true,
    },

    // ✅ RATING SYSTEM (future use)
    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    // ✅ STATUS
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);