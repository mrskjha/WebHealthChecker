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
  createdAt: z.string().datetime(), 
  updatedAt: z.string().datetime(), 
  __v: z.number().optional(),
});

export const SiteCreateSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});


export type Site = z.infer<typeof SiteSchema>;
export type SiteCreate = z.infer<typeof SiteCreateSchema>;