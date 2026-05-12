const express = require("express");
const passport = require("passport");
const { loginSuccess, logout } = require("../controller/googleAuthController");

const router = express.Router();

// ✅ GOOGLE LOGIN (No changes needed here)
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// ✅ CALLBACK (Modified)
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    // We removed successRedirect so we can handle it in the next function
  }),
  loginSuccess // <--- This function will now handle the token generation and final redirect
);

// ✅ LOGIN SUCCESS (You can keep this if you want a separate check, but it's now handled above)
router.get("/login/success", loginSuccess);

// ✅ LOGOUT
router.get("/logout", logout);

module.exports = router;