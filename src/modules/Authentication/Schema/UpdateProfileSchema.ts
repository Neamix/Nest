import z from "zod";

export const UpdateProfileSchema = z.object({
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    country_code: z.string().min(2).max(5),
    first_name: z.string().min(2).max(100),
    last_name: z.string().min(2).max(100),
});
