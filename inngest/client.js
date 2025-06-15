const { Inngest } = require("inngest");
const crypto = require("crypto-browserify");
require("dotenv").config();

const inngest = new Inngest({
  id: "vulnerability-scanner",
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY,
  crypto,
  logger: {
    debug: (...args) => console.debug("[Inngest]", ...args),
  },
});

module.exports = { inngest };
