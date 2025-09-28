import { Request, Response, NextFunction } from "express";

export function apiKeyCheck(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.query.apiKey;

  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }
}
