import z from "zod";

export const OtpVerifyPasswordSchema = z.object({
    otp: z.string().length(6, "OTP must be 5 digits only").regex(/^\d+$/, "OTP must contain only digits"),
});