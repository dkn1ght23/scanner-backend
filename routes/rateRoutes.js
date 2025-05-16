const express = require("express");
const router = express.Router();

router.get("/test-rate-limit", async (req, res) => {
  console.log("asdasdasd");
  res.status(200).json({ error: "Rate Limit API hit" });
});

module.exports = router;
