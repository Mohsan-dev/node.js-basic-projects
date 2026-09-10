const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is rquired!" });
  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    reDirectUrl: body.url,
    visitedHistory: [],
    createdBy: req.user._id,       //it getting users from ../middlewares/auth from L10
  });
  return res.render("home",{id:shortID});
  
}

async function handleGetanalytics(req, res) {
  const shortId = req.params.shortid;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

async function handleRedirectShortUrl(req, res) {
  const shortId = req.params.shortId;

  console.log("Requested shortId:", shortId);

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true },
  );

  console.log("Found entry:", entry);

  if (!entry) {
    return res.status(404).send(`Short URL "${shortId}" not found`);
  }

  return res.redirect(entry.reDirectUrl);
}

module.exports = { handleGenerateNewShortUrl, handleGetanalytics ,handleRedirectShortUrl };
