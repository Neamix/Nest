import z from "zod";

export const RegisterSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters long"),
  last_name: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirm_password: z.string(),
  device_token: z.string().optional().nullable(),
}).superRefine((data,ctx) => {
    if (data.password !== data.confirm_password) {
        ctx.addIssue({
            code: "custom",
            message: 'Password confirmation not matching your password',
            path: ['confirm_password']
        })
    }
})