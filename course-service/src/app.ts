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


const app = express()
app.use(cors())
app.use(bodyParser.json())

const logStream = fs.createWriteStream(path.join(__dirname, "../logs/app.log"), { flags: "a" })
app.use(morgan("combined", { stream: logStream }))
app.use(morgan("dev"))

app.use(requestLoggerMiddleware)

app.get("/api/analytics", apiKeyCheck, (req, res) => {
  res.json({ message: "Analytics data visible only with valid apiKey" })
})

export const initializeApp = async () => {
  await AppDataSource.initialize()
  return app
}

export default app
