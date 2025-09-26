import { Request, Response, NextFunction } from "express";
import winston from "winston";
import path from "path";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join("logs", "app.log") }),
    new winston.transports.Console()
  ],
});

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`[${req.method}] ${req.path} - ${new Date().toISOString()}`);
  next();
};

export default logger;
