import { createLogger, transports, format } from "winston";
import winston from "winston";
// Define your severity levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

//* This method set the current severity based on
//* the current NODE_ENV: show all the log levels
//* if the environment is development otherwise
//* show only warn and error
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

//* Define different colors for each level
//* Colors make the log message more visible
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

//* Tell winston that you want to link the colors
//* defined above to the severity levels
winston.addColors(colors);

//* Chose the aspect of your log customizing the log format
const formatParams = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  format.colorize({ all: true }),
  format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

//* Define which transportss the logger must use to store your logs
const transportss = [
  //* Allow the use the console to print the logs
  new transports.Console(),
  //* Allow to print the logs in a file
  new transports.File({ filename: "logs/error.log", level: "error" }),
  new transports.File({ filename: "logs/info.log", level: "info" }),
  new transports.File({ filename: "logs/http.log", level: "http" }),
];

//* Create the logger instance that has to be exported
const Logger = createLogger({
  level: level(),
  levels,
  format: formatParams,
  transports: transportss,
});

export default Logger;
