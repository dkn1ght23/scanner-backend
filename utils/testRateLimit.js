const axios = require("axios");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const testRateLimit = async () => {
  const url = "http://localhost:5000/api/test-rate-limit";
  let success = 0,
    fail = 0;

  for (let i = 0; i < 50; i++) {
    try {
      const res = await axios.get(url);

      console.log(`Request ${i + 1} responded with status:`, res.status);
      console.log("Full response:", res.data);

      if (res.status >= 200 && res.status < 300) {
        console.log(`✅ Request ${i + 1} succeeded`);
        success++;
      } else {
        console.log(
          `⚠️ Request ${i + 1} returned unexpected status: ${res.status}`
        );
        fail++;
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 429) {
          console.log(`🚫 Rate limit hit at request: ${i + 1}`);
        } else {
          console.log(
            `❌ Request ${i + 1} failed with status: ${err.response.status}`
          );
          console.log("Error response:", err.response.data);
        }
        fail++;
      } else {
        console.error(`❌ Request ${i + 1} failed:`, err.message);
        fail++;
      }
    }

    await delay(200); // Optional: prevent instantly hitting the rate limit
  }

  console.log(
    `\n✅ Successful Requests: ${success}, ❌ Blocked/Failed Requests: ${fail}`
  );
};

testRateLimit();
