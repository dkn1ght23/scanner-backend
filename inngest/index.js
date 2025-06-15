const { serve } = require("inngest/express");
const { inngest } = require("./client");
const { onSearch } = require("./functions/on-search");
require("dotenv").config();

// Create function array with metadata
const functions = [onSearch];
const functionNames = functions.map((f) => f.name || f.config.id);

// Create handler with attached metadata
const handler = serve({
  client: inngest,
  functions,
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

// Attach debug info
handler.registeredFunctions = functionNames;

module.exports = handler;
