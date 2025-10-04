"use client"

import InputPassword from "@/components/reactive-components/input-password";
import LoadingButton from "@/components/reactive-components/loading-btn";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { LoginAction } from "@/modules/Authentication/Actions/LoginActions";
import { LoginSchema } from "@/modules/Authentication/Schema/LoginSchema";
import useAuthStore from "@/modules/Authentication/Stores/store";
import { UserType } from "@/modules/Authentication/types";
import { Label } from "@radix-ui/react-label"
import Link from "next/link";
import { useActionState, useState } from "react";
import z from "zod";
import { useRouter } from "next/navigation";
import { ForgetPasswordSchema } from "@/modules/Authentication/Schema/ForgetPasswordSchema";
import { ForgetPasswordAction } from "@/modules/Authentication/Actions/ForgetPasswordAction";

export default function ForgetPasswordForm({
    className,
}: { 
    className?: string
}) {
    const [forgetErrorMsg, setForgetErrorMsg] = useState<Record<string, string>>({});
    const router = useRouter();

    // Action handler for form submission
    const handleForgetAction = async (previousState: Pick<UserType, "email">, formData: FormData): Promise<Pick<UserType, "email">> => {
        // reset errors
        setForgetErrorMsg({});
        const { email } = Object.fromEntries(formData.entries());

        // Validate user data 
        const userDataValidation = ForgetPasswordSchema.safeParse({ email});
        if (!userDataValidation.success) {
            const tree = z.treeifyError(userDataValidation.error);
            setForgetErrorMsg({
                email: tree.properties?.email?.errors?.[0] || "",
            });
            return { email: email as string };
        }


        // Forget password action call
        const response = await ForgetPasswordAction({ email: email as string });
        if (response?.error) {

            if (response.error === "invalid_email") {
                setForgetErrorMsg({
                    email: "We can't find a user with that email address.",
                });
            } else if (typeof response.error === "object") {
                setForgetErrorMsg(Object.fromEntries(
                    Object.entries(response.error).map(([key, value]) => [key, value?.toString() || ""])
                ));
            }

            return { email: email as string };
        }

        // Save data to store
        if (response?.data) {
            setForgetErrorMsg({});
            useAuthStore.getState().setUser(response.data);
            router.push("/");
        }
            
        return { email: email as string };
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