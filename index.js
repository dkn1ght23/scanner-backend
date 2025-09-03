import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { registerApplicationRoutes } from "./routes/index.js";
import { logger } from "./logger.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middlware.js";
import { connectDB } from "./db/index.js";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import helmet from "helmet";
import "./config/passport.js";

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

// Session (needed for passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set true if HTTPS
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(helmet());

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
connectDB();

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// CSRF protection
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get("/", (req, res) => {
  res.send("The Server is running...");
});

registerApplicationRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});

export default app;
