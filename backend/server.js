// Initiate the server and setup the middlewares
//* Third-party modules
import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";

//* Custom modules
import morganMiddleware from "./logger/morgan.logger.js";
import Logger from "./logger/winston.logger.js";
import { ApiError } from "./utils/ApiErrors.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import budgetRouter from "./routes/budget.routes.js";
import reportRouter from "./routes/reports.routes.js";
const server = express();

// Middleware setup
server.use(
  cors({
    origin:
      process.env.ENV === "production"
        ? "https://your-app-url.com"
        : process.env.CORS_ORIGIN === "*"
        ? "*"
        : process.env.CORS_ORIGIN.split(","),
    credentials: true,
  })
);
server.use(express.json());
server.use(morganMiddleware);

// Routes
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/categories", categoryRoutes);
//# This route hold both the expense and recurring expense routes
server.use("/api/v1/expense", expenseRouter);
server.use("/api/v1/budget", budgetRouter);
server.use("/api/v1/reports", reportRouter);

// Global error handler
server.use(errorHandler);

export default server;
