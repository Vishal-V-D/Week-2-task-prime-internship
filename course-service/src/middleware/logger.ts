import { Request, Response, NextFunction } from "express";
import winston from "winston";
import path from "path";

const logsPath = path.resolve(__dirname, "..", "..", "logs", "app.log");

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: logsPath }),
    new winston.transports.Console()
  ]
});

export function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on("finish", () => {
    const elapsed = Date.now() - start;
    logger.info({
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      ts: new Date().toISOString(),
      elapsed
    });
  });
  next();
}
