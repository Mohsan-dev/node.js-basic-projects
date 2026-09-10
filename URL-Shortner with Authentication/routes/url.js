const express = require("express");
const router = express.Router();

const {
  handleGenerateNewShortUrl,
  handleGetanalytics,
  handleRedirectShortUrl,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortid", handleGetanalytics);

router.get("/:shortId",handleRedirectShortUrl )
 


module.exports = router;
