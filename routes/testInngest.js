const express = require("express");
const router = express.Router();
const { inngest } = require("../inngest/client");

router.post("/test-inngest", async (req, res) => {
  const { alerts } = req.body;

  console.log("/test-inngest");

  if (!alerts || !Array.isArray(alerts)) {
    return res.status(400).json({ error: "Invalid alerts format" });
  }

  try {
    await inngest.send({
      name: "app/report", // MUST match function trigger
      data: { data: alerts }, // Structure matches event.data in function
    });

    res.json({
      message: "testing going on....",
    });
  } catch (error) {
    console.error("Error in upload-report:", error);
    res.status(500).json({
      error: error.message || "Something went wrong",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

module.exports = router;
