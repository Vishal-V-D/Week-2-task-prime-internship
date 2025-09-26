import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db";
import { requestLogger } from "./middleware/logger";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(requestLogger);


AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(" DB connection failed:", err));

export default app;
