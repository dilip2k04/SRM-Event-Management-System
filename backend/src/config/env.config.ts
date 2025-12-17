import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/srm-em_db",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};
