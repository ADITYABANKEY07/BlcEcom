const express = require("express");

const router = express.Router();

const {
  GetAnalytics,
} = require("../controller/analyticsController");

router.get("/analytics", GetAnalytics);

module.exports = router;