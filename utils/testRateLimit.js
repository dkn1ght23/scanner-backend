const axios = require("axios");

const testRateLimit = async () => {
  const url = "http://localhost:5000/api/fix-error";
  let success = 0,
    fail = 0;

  for (let i = 0; i < 30; i++) {
    try {
      await axios.get(url);
      success++;
    } catch (err) {
      if (err.response && err.response.status === 429) {
        console.log("Rate limit hit at request:", i + 1);
        fail++;
      }
    }
  }

  console.log(`Successful Requests: ${success}, Blocked Requests: ${fail}`);
};

testRateLimit();
