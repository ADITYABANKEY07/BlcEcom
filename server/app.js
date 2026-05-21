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

// --- FIXED CORS CONFIGURATION ---
const allowedOrigins = [
  "http://localhost:5173",          // Local development
  "https://blc-ecom.vercel.app"     // Production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allows server-to-server requests or tools like Postman (where origin is undefined)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
    credentials: true,
  }),
);
// ---------------------------------

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express-Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "somethingsecret", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      // Render operates over HTTPS, so "secure: true" is needed for cookies to work in production
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      // SameSite attribute prevents cross-site tracking issues between your two domains
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
app.use("/analytics", analyticsRoute);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Db connected successfully");
});

app.listen(process.env.PORT, () => {
  console.log(`Server connected successfully ${process.env.PORT}`);
});