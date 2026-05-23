const express = require("express");
const passport = require("passport");
const { loginSuccess, logout } = require("../controller/googleAuthController");

const router = express.Router();

// ✅ GOOGLE LOGIN
router.get(
  "/google",
  (req, res, next) => {
    const redirectTo = req.query.redirect || "/";
    req.session.redirectTo = redirectTo;
    req.session.save((err) => {
      if (err) return next(err);
      passport.authenticate("google", {
        scope: ["profile", "email"],
        state: redirectTo,
      })(req, res, next);
    });
  }
);

// ✅ CALLBACK (Modified)
router.get(
  "/google/callback",
  (req, res, next) => {
    const frontendUrl = process.env.NODE_ENV === "production"
      ? "https://blc-ecom.vercel.app"
      : "http://localhost:5173";

    if (req.query.state) {
      req.session.redirectTo = req.query.state;
    }

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