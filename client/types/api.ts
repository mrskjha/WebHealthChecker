import z from "zod";
import { SiteSchema } from "./site";

export const SiteListResponseSchema = z.object({
  sites: z.array(
    SiteSchema.pick({
      _id: true,
      name: true,
      url: true,
      status: true,
      createdAt: true,
      updatedAt: true, 
      responseTime: true,
    }).passthrough()
  ),
});