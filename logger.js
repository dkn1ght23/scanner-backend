import winston from "winston";

const { createLogger, format, transports } = winston;

const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message} \t\t${timestamp}`;
  })
);

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({
      filename: "app.log",
    }),
  ],
});
