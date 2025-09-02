import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { registerApplicationRoutes } from "./routes/index.js";
import { logger } from "./logger.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middlware.js";
import { connectDB } from "./db/index.js";

dotenv.config({ silent: true });

const PORT = process.env.PORT;
const app = express();

app.use(loggerMiddleware);

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// const scanRoutes = require("./routes/scanRoutes");
// const fixRoutes = require("./routes/fixRoutes");
// const rateRoutes = require("./routes/rateRoutes");
// const pdfRoutes = require("./routes/pdfRoute");

// Apply rate limiting
// const limiter = rateLimit({
//   windowMs: 5000 * 60 * 1000,
//   max: 20,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: {
//     error: "Too many requests. Please wait 10 minutes and try again.",
//   },
// });

// app.use(limiter);

// Routes
// app.use("/api", scanRoutes);
// app.use("/api", fixRoutes);
// app.use("/api", rateRoutes);
// app.use("/api", pdfRoutes);
connectDB();

app.get("/", (req, res) => {
  res.send("The Server is running...");
});

registerApplicationRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});

export default app;
