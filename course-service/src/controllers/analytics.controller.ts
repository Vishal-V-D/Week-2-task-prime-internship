
import { Request, Response } from "express";
import { AnalyticsService } from "../services/analytics.service";

export const AnalyticsController = {
  async getOverview(req: Request, res: Response) {
    try {
      const data = await AnalyticsService.getOverview();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch analytics", details: err });
    }
  },
};
