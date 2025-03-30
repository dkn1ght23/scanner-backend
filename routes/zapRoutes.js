const express = require("express");
const router = express.Router();
const { checkZapStatus } = require("../utils/zapUtils");

router.get("/zap-status", async (req, res) => {
  try {
    await checkZapStatus();
    res.json({ status: "connected" });
  } catch (error) {
    res.status(500).json({ status: "disconnected", error: error.message });
  }
});

module.exports = router;
