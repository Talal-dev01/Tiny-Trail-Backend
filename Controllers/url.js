const URL = require("../Models/url");
const { nanoid } = require("nanoid");

//CONTROLLERS

//1. A GET REQUEST HANDLER TO GENERATE SHORT_URL

const handleGenerateShortURL = async (req, res) => {
  if (!req.body.url) return res.status(400).json({ ERROR: "URL IS REQUIRED" });
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: req.body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  res.status(201).json({ shortId: shortId });
};

//2. A GET REQUEST HANDLER TO GET THE REDIRECT_URL(ORIGINAL_URL WHICH WAS SHORTENED) USING SHORT URL REDIRECTED TO THE ORIGINAL URL

const handleGetRedirectURL = async (req, res) => {
  if (!req.params.shortId)
    return res.status(400).json({ ERROR: "URL IS REQUIRED" });

  const urlDoc = await URL.findOne({ shortId: req?.params?.shortId });
  if (!urlDoc) {
    return res.status(404).json({ ERROR: "Short URL not found" });
  }

  await URL.findOneAndUpdate(
    { shortId: req.params.shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  res.json({ redirectURL: urlDoc.redirectURL });
  // res.redirect(urlDoc.redirectURL);
};

//3. A GET REQUEST HANDLER TO GET ANALYTICS OF THE GIVEN SHORT URL

const handleGetAnalytics = async (req, res) => {
  const urlDoc = await URL.findOne({ shortId: req.params.url });
  if (!urlDoc) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.json({
    totalClicks: urlDoc.visitHistory.length,
    shortId: urlDoc.shortId,
    redirectURL: urlDoc.redirectURL,
    createdAt: urlDoc.createdAt,
    visitHistory: urlDoc.visitHistory,
  });
};

module.exports = {
  handleGenerateShortURL,
  handleGetRedirectURL,
  handleGetAnalytics,
};
