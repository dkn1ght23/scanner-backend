const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const scanRoutes = require("./routes/scanRoutes");
const fixRoutes = require("./routes/fixRoutes");
const rateRoutes = require("./routes/rateRoutes");
const pdfRoutes = require("./routes/pdfRoute");
const inngestRoutes = require("./routes/testInngest");
const inngestHandler = require("./inngest");

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
app.use("/api", rateRoutes);
app.use("/api", pdfRoutes);
app.use("/api", inngestRoutes);

// Inngest endpoint
app.use(
  "/api/inngest",
  (req, res, next) => {
    console.log("Inngest request received");
    next();
  },
  inngestHandler
);

// Start the server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    "Inngest functions registered:",
    inngestHandler.registeredFunctions || []
  );
});
