import z from "zod";

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirm_password: z.string(),
}).superRefine((data,ctx) => {
    if (data.password !== data.confirm_password) {
        ctx.addIssue({
            code: "custom",
            message: 'Password confirmation not matching your password',
            path: ['confirm_password']
        })
    }
})