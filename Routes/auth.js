const express = require("express");
const router = express.Router();

router.get("/check-auth", (req, res) => {
  console.log(req.user, "USER IN CHECK AUTH");
  if (!req.user) {
    return res
      .status(401)
      .json({ authenticated: false, message: "User not authenticated" });
  }
  res.status(200).json({ authenticated: true, user: req.user });
});

module.exports = router;
