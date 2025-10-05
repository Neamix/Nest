import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  device_token: z.string().optional().nullable(),
});