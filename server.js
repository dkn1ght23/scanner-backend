const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const scanRoutes = require("./routes/scanRoutes");
const fixRoutes = require("./routes/fixRoutes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please wait 10 minutes and try again.",
  },
});

app.use(limiter);

// Routes
app.use("/api", scanRoutes);
app.use("/api", fixRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
