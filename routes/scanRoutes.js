const express = require("express");
const router = express.Router();
const zapAxios = require("../config/zapAxios");
const { checkZapStatus, waitForScanCompletion } = require("../utils/zapUtils");

router.post("/scan", async (req, res) => {
  const { targetUrl } = req.body;
  if (!targetUrl) return res.status(400).json({ error: "URL is required" });

  try {
    await checkZapStatus();

    console.log(`Scanning: ${targetUrl}`);

    const url = targetUrl.startsWith("http")
      ? targetUrl
      : `https://${targetUrl}`;

    // Start spider scan
    const spiderResponse = await zapAxios.get("/JSON/spider/action/scan/", {
      params: {
        url,
        maxChildren: 10,
        recurse: true,
        apikey: process.env.ZAP_API_KEY,
      },
      retry: 3,
    });

    if (!spiderResponse.data?.scan)
      throw new Error("Invalid response from ZAP spider scan");

    const spiderScanId = spiderResponse.data.scan;
    console.log("Spider scan started with ID:", spiderScanId);
    await waitForScanCompletion(spiderScanId, "spider");
    console.log("Spider scan completed");

    // Start active scan
    const ascanResponse = await zapAxios.get("/JSON/ascan/action/scan/", {
      params: {
        url,
        recurse: true,
        inScopeOnly: false,
        apikey: process.env.ZAP_API_KEY,
      },
      retry: 3,
    });

    if (!ascanResponse.data?.scan)
      throw new Error("Invalid response from ZAP active scan");

    const ascanId = ascanResponse.data.scan;
    console.log("Active scan started with ID:", ascanId);
    await waitForScanCompletion(ascanId, "ascan");
    console.log("Active scan completed");

    // Get alerts
    const alertsResponse = await zapAxios.get("/JSON/core/view/alerts", {
      params: { baseurl: url, apikey: process.env.ZAP_API_KEY },
      retry: 3,
    });

    res.json({ vulnerabilities: alertsResponse.data.alerts });
  } catch (error) {
    console.error("Error scanning:", error.message);
    res
      .status(500)
      .json({ error: "Failed to scan website", details: error.message });
  }
});

module.exports = router;
