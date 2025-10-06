"use client";
import zodValidateHandler from "@/lib/zod/zodValidateHandler";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { Label } from "@/components/ui/label";
import { ResetPasswordAction } from "@/modules/Authentication/Actions/ResetPassword";
import { ResetPasswordSchema } from "@/modules/Authentication/Schema/ResetPasswordSchema";
import LoadingButton from "@/components/reactive-components/loading-btn";
import { cn } from "@/lib/utils";
import InputPassword from "@/components/reactive-components/input-password";
import { ResetPasswordType } from "@/modules/Authentication/types";

export default function ResetPasswordForm({ className, email, hash_token, ...props }: { className?: string, email: string, hash_token: string }) {
    async function handleResetPasswordAction(prevState: ResetPasswordType, formData: FormData): Promise<ResetPasswordType> {
        // Reset errors
        setErrorMessages({});

        // Handle form validation
        const [errorsReturn, isValid] = zodValidateHandler(formData, ResetPasswordSchema);
        if (!isValid) {
            setErrorMessages(errorsReturn);
            return { ...prevState, ...Object.fromEntries(formData) };
        }

        // Handle Backend reset password logic here
        const response = await ResetPasswordAction({ password: formData.get("password") as string, hash_token:hash_token, email: email });
        if (response?.error) {
            setErrorMessages(response.error as Record<string, string>);
            return { ...prevState, ...Object.fromEntries(formData) };
        }   

        // On successful password reset, you might want to redirect or clear the form
        setErrorMessages({});
        router.push("/login");

        return {
            password: "",
            confirm_password: "",
        };
    }

    const [state, formAction, isPending] = useActionState(handleResetPasswordAction, { password: "", confirm_password: "" });
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const router = useRouter();

    return (
        <form className={cn("p-6 md:p-8", className)} {...props} action={formAction}>
            <div className="grid gap-6">
                <fieldset className="form-field">
                    <Label className="text-[14px]" htmlFor="password">New Password</Label>
                    <InputPassword
                        id="password"
                        name="password"
                        placeholder="New Password"
                        className="w-full"
                        defaultValue={state.password}
                        aria-invalid={!!errorMessages?.password}
                        onChange={() => errorMessages?.password && setErrorMessages(prev => ({ ...prev, password: "" }))}
                    />
                    <p className="error">{errorMessages?.password}</p>
                </fieldset>
                <fieldset className="form-field">
                    <Label className="text-[14px]" htmlFor="confirm_password">Confirm New Password</Label>
                    <InputPassword
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Confirm New Password"
                        className="w-full"
                        defaultValue={state.confirm_password}
                        aria-invalid={!!errorMessages?.confirm_password}
                        onChange={() => errorMessages?.confirm_password && setErrorMessages(prev => ({ ...prev, confirm_password: "" }))}
                    />
                    <p className="error">{errorMessages?.confirm_password}</p>
                </fieldset>
                <LoadingButton className="mt-4" loading={isPending}  >
                    Reset Password
                </LoadingButton>
            </div>
        </form>
    );
}