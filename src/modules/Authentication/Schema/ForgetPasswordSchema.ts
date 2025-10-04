import z from "zod";

export const ForgetPasswordSchema = z.object({
    email: z.email().min(2).max(100),
});