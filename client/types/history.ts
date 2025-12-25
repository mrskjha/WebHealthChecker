import { z } from "zod";

export const HistorySchema = z.object({
  _id: z.string(),
  siteId: z.string(),
  status: z.enum(["up", "down"]),
  responseTime: z.number(),
  checkedAt: z.string(),
});

export type MonitorHistory = z.infer<typeof HistorySchema>;
