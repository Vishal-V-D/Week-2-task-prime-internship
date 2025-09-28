import "reflect-metadata"
import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import fs from "fs"
import path from "path"
import { AppDataSource } from "./config/db"
import { requestLoggerMiddleware } from "./middleware/logger"
import { apiKeyCheck } from "./middleware/apiKeyCheck"
import cors from "cors"
import { AnalyticsController } from "./controllers/analytics.controller";

const app = express()
app.use(cors())
app.use(bodyParser.json())

const logStream = fs.createWriteStream(path.join(__dirname, "../logs/app.log"), { flags: "a" })
app.use(morgan("combined", { stream: logStream }))
app.use(morgan("dev"))

app.use(requestLoggerMiddleware)


app.get("/api/analytics", apiKeyCheck, AnalyticsController.getOverview);

export const initializeApp = async () => {
  await AppDataSource.initialize()
  return app
}

export default app
