import zapAxios from "../config/zapAxios.js";

// Check if ZAP is running
export async function checkZapStatus() {
  try {
    const response = await zapAxios.get("/JSON/core/view/version", {
      params: {
        apikey: process.env.ZAP_API_KEY,
      },
    });

    if (response.data && response.data.version) {
      console.log("✅ ZAP is running, version:", response.data.version);
      return true;
    }
    throw new Error("Invalid response from ZAP");
  } catch (error) {
    console.error("❌ ZAP is not running or not accessible:", error.message);
    throw error;
  }
}

// Wait for scan completion
export async function waitForScanCompletion(scanId, scanType = "ascan") {
  let status = 0;
  let retries = 0;
  const maxRetries = 5;

  do {
    try {
      const endpoint =
        scanType === "spider"
          ? "/JSON/spider/view/status"
          : "/JSON/ascan/view/status";
      const response = await zapAxios.get(endpoint, {
        params: { scanId, apikey: process.env.ZAP_API_KEY },
        retry: 2,
      });

      status = parseInt(response.data.status);
      console.log(`${scanType} scan ${scanId} progress: ${status}%`);
      retries = 0;

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error checking scan status: ${error.message}`);
      retries++;
      if (retries >= maxRetries) {
        throw new Error(
          `Failed to check scan status after ${maxRetries} attempts`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } while (status < 100);
}
