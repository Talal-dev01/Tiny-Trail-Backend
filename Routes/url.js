const express = require("express");
const router = express.Router();
const {
  handleGenerateShortURL,
  handleGetRedirectURL,
  handleGetAnalytics,
} = require("../Controllers/url");

//ROUTES

router.post("/", handleGenerateShortURL);
router.get("/:shortId", handleGetRedirectURL);
router.get("/analytics/:url", handleGetAnalytics);

module.exports = router;
