"use client"

import LoadingButton from "@/components/reactive-components/loading-btn";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { UserType } from "@/modules/Authentication/types";
import { Label } from "@radix-ui/react-label"
import Link from "next/link";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { ForgetPasswordSchema } from "@/modules/Authentication/Schema/ForgetPasswordSchema";
import { ForgetPasswordAction } from "@/modules/Authentication/Actions/ForgetPasswordAction";
import zodValidateHandler from "@/lib/zod/zodValidateHandler";

export default function ForgetPasswordForm({
    className,
}: { 
    className?: string
}) {
    const [forgetErrorMsg, setForgetErrorMsg] = useState<Record<string, string>>({});
    const router = useRouter();

    // Action handler for form submission
    const handleForgetAction = async (previousState: Pick<UserType, "email">, formData: FormData): Promise<Pick<UserType, "email">> => {
        // Reset previous error messages
        setForgetErrorMsg({});

        // Validate form data using Zod schema
        const [errorsReturn, isValid] = zodValidateHandler(formData, ForgetPasswordSchema);
        if (!isValid) {
            setForgetErrorMsg(errorsReturn);
            return { ...previousState, ...Object.fromEntries(formData) } as Pick<UserType, "email">;
        }

        // Call the ForgetPasswordAction
        const response = await ForgetPasswordAction({ email: formData.get("email") as string });
        if (response?.error) {
            setForgetErrorMsg(response.error as Record<string, string>);
            return { ...previousState, ...Object.fromEntries(formData) } as Pick<UserType, "email">;
        }

        // On successful submission, clear the form and redirect if necessary
        setForgetErrorMsg({});
        router.push("/otp-password?email=" + formData.get("email"));

        return { email: "" };
    }

    const [state, formAction, isPending] = useActionState(handleForgetAction, { email: "" });

    return (
        <form className={cn("p-6 md:p-8",className)} action={formAction}>
            <div className="flex flex-col gap-2">
                
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email"
                        type="email"
                        name="email"
                        placeholder="m@example.com"
                        defaultValue={state.email}
                        aria-describedby={forgetErrorMsg?.email ? "email-error" : undefined}
                        aria-invalid={!!forgetErrorMsg?.email}
                        onChange={() => forgetErrorMsg?.email && setForgetErrorMsg(prev => ({ ...prev, email: "" }))}
                    />

                    {forgetErrorMsg?.email && (
                        <p id="email-error" className="text-sm text-red-500 error">
                            {forgetErrorMsg.email}
                            <Link href="/register" className="ml-1 underline text-blue-400 font-bold">Sign up?</Link>
                        </p>
                    )}
                </div>

                <LoadingButton className="mt-4" loading={isPending}  >
                   Send Reset Otp
                </LoadingButton>
                
            </div>
        </form>
    )
}