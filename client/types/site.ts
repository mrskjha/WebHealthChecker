// types/site.ts
import { z } from "zod";

export const SiteSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  url: z.string().url(),
  status: z.enum(["up", "down", "unknown"]),
  responseTime: z.number(),
  failureCount: z.number().optional(),
  isActive: z.boolean().optional(),
  lastChecked: z.string().datetime().optional(),
  createdAt: z.string().datetime(), // Or z.date() if you transform it
  updatedAt: z.string().datetime(), // Ensure this line exists!
  __v: z.number().optional(),
});

export type Site = z.infer<typeof SiteSchema>;