const adminModel = require("../models/adminModel");
const ProductModel = require("../models/productModel");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const LoginPage = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
      return res.status(400).send({ status: 400, msg: "Not admin" });
    }
const isMatch = await bcrypt.compare(password, admin.password);

if (!isMatch) {
  return res.status(400).json({ msg: "Invalid password" });
}
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send({ status: 200, msg: "Admin login successfully" });
  } catch (error) {
    return res.status(500).send({ status: 500, msg: "Error in server" });
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ msg: "Not logged in" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

const GetAdminDataPage = async (req, res) => {
  const admin = await adminModel.findById(req.admin.id);
  res.status(200).json({ admin });
};
const AdminLogoutPage = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logout successful" });
};

//********************************/ ✅ Cloudinary Storage********************************************
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "product_images",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage }).array("images", 10);

// ✅ Upload Product
const UploadProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(500).json({ message: err.message });
    }

    try {
      // 🔥 DEBUG FIRST
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      // ✅ Validate images
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Images are required" });
      }

      const {
        title,
        brand,
        model,
        price,
        discountPrice,
        description,
        category,
        subCategory,
        tags,
        stock,
        isBestSeller,
        isFeatured,
      } = req.body;

      // ✅ Validate required fields
      if (!title || !brand || !model || !price || !description || !category) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // ✅ Process images
      const imageUrls = req.files.map((file) => file.path);

      // ✅ Convert tags
      const tagArray =
        typeof tags === "string"
          ? tags.split(",").map((tag) => tag.trim())
          : [];

      // ✅ Create product
      const newProduct = new ProductModel({
        title,
        brand,
        model,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        description,
        category,
        subCategory,
        tags: tagArray,
        images: imageUrls,
        defaultImage: imageUrls.length > 0 ? imageUrls[0] : "",
        stock: stock ? Number(stock) : 0,
        isBestSeller: isBestSeller === "true",
        isFeatured: isFeatured === "true",
      });

      await newProduct.save();

      res.status(201).json({
        message: "Product uploaded successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error("SERVER ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  });
};

// ✅ Display Product
const DisplayProduct = async (req, res) => {
  try {
    const { brand, category, model, bestSeller } = req.query;

    let filter = {};

    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (model) filter.model = model;
    if (bestSeller) filter.isBestSeller = true;

    const products = await ProductModel.find(filter);

    res.json(products);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  LoginPage,
  UploadProduct,
  DisplayProduct,
  GetAdminDataPage,
  AdminLogoutPage,
  verifyAdmin,
};
