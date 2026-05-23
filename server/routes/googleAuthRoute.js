const express = require("express");
const passport = require("passport");
const { loginSuccess, logout } = require("../controller/googleAuthController");

const router = express.Router();

// ✅ GOOGLE LOGIN (No changes needed here)
router.get(

  "/google",

  (req, res, next) => {

    // SAVE REDIRECT
    req.session.redirectTo =
      req.query.redirect || "/";

    next();

  },

  passport.authenticate(
    "google",
    {
      scope: ["profile", "email"],
    }
  )

);

// ✅ CALLBACK (Modified)
router.get(
  "/google/callback",
  (req, res, next) => {
    const frontendUrl = process.env.NODE_ENV === "production"
      ? "https://blc-ecom.vercel.app"
      : "http://localhost:5173";

    passport.authenticate("google", {
      failureRedirect: `${frontendUrl}/login`,
    })(req, res, next);
  },
  loginSuccess // <--- This function will now handle the token generation and final redirect
);

// ✅ LOGIN SUCCESS (You can keep this if you want a separate check, but it's now handled above)
router.get("/login/success", loginSuccess);

// ✅ LOGOUT
router.get("/logout", logout);

module.exports = router;