const express = require("express");
const urlsRouter = express.Router();
const URL = require("../Models/url");
const { restrictToAuthorized } = require("../Middlewares/auth");

// Get all URLs for the authenticated user
urlsRouter.get(
  "/",
  restrictToAuthorized(["NORMAL", "ADMIN"]),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const allURLS = await URL.find({ createdBy: req.user._id });
    res.json(allURLS);
  }
);

// Get all URLs (admin only)
urlsRouter.get("/admin", restrictToAuthorized(["ADMIN"]), async (req, res) => {
  const allURLS = await URL.find({});
  res.json(allURLS);
});

module.exports = urlsRouter;
