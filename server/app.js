require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/admin", adminRoute);
app.use("/product", productRoute);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Db connected successfully");
});

app.listen(process.env.PORT, () => {
  console.log(`Server connected successfully ${process.env.PORT}`);
});
