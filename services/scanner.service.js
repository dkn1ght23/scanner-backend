import zapAxios from "../config/zapAxios.js";
import { checkZapStatus, waitForScanCompletion } from "../utils/zapUtils.js";

export const scannerService = async (targetUrl) => {
  console.log(targetUrl, "targetUrl");
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
      return {
        message: "Invalid response from ZAP spider scan",
        statusCode: 400,
      };

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
      return {
        message: "Invalid response from ZAP active scan",
        statusCode: 400,
      };

    const ascanId = ascanResponse.data.scan;
    console.log("Active scan started with ID:", ascanId);
    await waitForScanCompletion(ascanId, "ascan");
    console.log("Active scan completed");

    // Get alerts
    const alertsResponse = await zapAxios.get("/JSON/core/view/alerts", {
      params: { baseurl: url, apikey: process.env.ZAP_API_KEY },
      retry: 3,
    });

    return {
      message: "Scan Completed",
      statusCode: 200,
      vulnerabilities: alertsResponse.data.alerts,
    };
  } catch (error) {
    console.error("Error scanning:", error.message);
    return {
      message: `Failed to scan website: ${error.message}`,
      statusCode: 500,
    };
  }
};
