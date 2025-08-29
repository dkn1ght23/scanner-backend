import morgan from "morgan";
import { logger } from "../logger.js";

const morganFormat = ":method :url :status :response-time ms";

const loggerMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logParts = message.trim().split(" ");
      const logObject = {
        method: logParts[0],
        url: logParts[1],
        status: logParts[2],
        responseTime: logParts[3] + " ms",
      };
      logger.info(JSON.stringify(logObject));
    },
  },
});

export { loggerMiddleware };
