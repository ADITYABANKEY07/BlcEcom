require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");
const payRoute = require("./routes/payRoute");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const analyticsRoute = require("./routes/analyticsRoute");


const passport = require("passport");

require("./config/passport");

const googleAuthRoute = require("./routes/googleAuthRoute");

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "somethingsecret", // Fallback if env is missing

    resave: false,

    saveUninitialized: false,

    cookie: {
      secure: false,
      httpOnly: true,

      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/payment", payRoute);
app.use("/user", userRoute);
app.use("/auth", googleAuthRoute);
app.use("/analytics",analyticsRoute);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Db connected successfully");
});

app.listen(process.env.PORT, () => {
  console.log(`Server connected successfully ${process.env.PORT}`);
});
