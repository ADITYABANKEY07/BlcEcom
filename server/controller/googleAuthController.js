const jwt = require("jsonwebtoken");

const loginSuccess = (req, res) => {
  if (req.user) {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const user = JSON.stringify({
      _id: req.user._id,
      name: req.user.fullName || req.user.name,
      email: req.user.email,
      image: req.user.image,
    });

    // --- Dynamic Frontend URL from env ---
    const frontendUrl = process.env.FRONTEND_URL || 
      (process.env.NODE_ENV === "production" ? "https://blc-ecom.vercel.app" : "http://localhost:5173");

// GET REDIRECT PAGE
const redirectTo =
  req.query.state ||
  req.session.redirectTo ||
  "/";

// CLEAR SESSION
if (req.session) {
  delete req.session.redirectTo;
}

// REDIRECT
res.redirect(

  `${frontendUrl}/login-success?token=${token}&user=${encodeURIComponent(user)}&redirect=${encodeURIComponent(redirectTo)}`

);
    // --------------------------------------------------------

  } else {
    res.status(401).json({
      msg: "Not Authorized",
    });
  }
};

const logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.status(200).json({
        success: true,
        message: "Logout Successful",
      });
    });
  });
};

module.exports = {
  loginSuccess,
  logout,
};