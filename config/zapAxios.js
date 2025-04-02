const axios = require("axios");

const zapAxios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  params: {
    apikey: process.env.ZAP_API_KEY,
  },
});

// Add retry logic
zapAxios.interceptors.response.use(null, async (error) => {
  const { config } = error;
  if (!config || !config.retry) return Promise.reject(error);

  config.retryCount = config.retryCount || 0;

  if (config.retryCount >= config.retry) {
    return Promise.reject(error);
  }

  config.retryCount += 1;
  console.log(
    `Retrying request (${config.retryCount}/${config.retry}): ${config.url}`
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return zapAxios(config);
});

module.exports = zapAxios;
