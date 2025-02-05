import { configDotenv } from "dotenv";
configDotenv();

import server from "./server.js";
import connectToDatabase from "../backend/config/db.js";
import Logger from "./logger/winston.logger.js";

const startServer = async () => {
  try {
    const port = process.env.PORT || 8080;
    await connectToDatabase();
    server.listen(port, () => {
      Logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    Logger.error(`Error starting server: ${error.message}`);
  }
};

startServer();
