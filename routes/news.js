const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

router.get("/top-headlines", async (req, res) => {
  try {
    const getTopHeadlines = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.API_KEY_NEWSAPI}`
    );
    if (getTopHeadlines) {
      const response = getTopHeadlines.data;
      return res.status(200).json(response.articles); //only get 38 results
    }
  } catch (e) {
    res.status(500).json({
      error: "server_error",
      message: e.message,
    });
  }
});

router.get("/everything", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).send("Topic cannot be empty");
    }
    const topicEverything = await axios.get(
      `https://newsapi.org/v2/everything?q=${topic}&apiKey=${process.env.API_KEY_NEWSAPI}`
    ); //total results are 4787
    const response = topicEverything.data;

    res.status(200).json(response.articles);
  } catch (e) {
    res.status(500).json({
      error: "server_error",
      message: e.message,
    });
  }
});

module.exports = router;
