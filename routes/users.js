const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("GET/ all_users");
});

module.exports = router;
