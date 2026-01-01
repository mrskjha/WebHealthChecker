import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(3),
  email: z.string().email(),
  role: z.enum(["user", "admin"]),
});

export type User = z.infer<typeof UserSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type LoginData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "admin"]),
});

export type SignupData = z.infer<typeof signupSchema>;