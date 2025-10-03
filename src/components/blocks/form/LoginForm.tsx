"use client"

import InputPassword from "@/components/modified/input-password";
import LoadingButton from "@/components/modified/loading-btn";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { LoginAction } from "@/modules/Authentication/Actions/LoginActions";
import { LoginSchema } from "@/modules/Authentication/Schema/LoginSchema";
import useAuthStore from "@/modules/Authentication/Stores/store";
import { UserLoginType } from "@/modules/Authentication/types";
import { Label } from "@radix-ui/react-label"
import Link from "next/link";
import { useActionState, useState } from "react";
import z from "zod";
import { useRouter } from "next/navigation";

export default function LoginForm({
    className,
}: { 
    className?: string
}) {

    // Action handler for form submission
    const handleLoginAction = async (previousState: UserLoginType, formData: FormData): Promise<UserLoginType> => {
        // reset errors
        setLoginErrorMsg({});
        const { email, password } = Object.fromEntries(formData.entries());
        const device_token = typeof navigator !== "undefined" ? navigator.userAgent : "server";

        // Validate user data 
        const userDataValidation = LoginSchema.safeParse({ email, password, device_token });
        if (!userDataValidation.success) {
            const tree = z.treeifyError(userDataValidation.error);
            setLoginErrorMsg({
                email: tree.properties?.email?.errors?.[0] || "",
                password: tree.properties?.password?.errors?.[0] || "",
            });
            return { ...previousState };
        }


        // Login action call
        const response = await LoginAction({ email: email as string, password: password as string, device_token });
        if (response?.error) {
            setLoginErrorMsg(Object.fromEntries(
                Object.entries(response.error).map(([key, value]) => [key, value?.toString() || ""])
            ));
            return { ...previousState };
        }

        // Save data to store
        if (response?.data) {
            setLoginErrorMsg({});
            useAuthStore.getState().setUser(response.data);
            router.push("/");
        }
            
        return { ...previousState };
    }

    const [state, formAction, isPending] = useActionState(handleLoginAction, { email: "", password: "",device_token: "" });
    const [loginErrorMsg, setLoginErrorMsg] = useState<Record<string, string>>({});
    const router = useRouter();

    return (
        <form className={cn("p-6 md:p-8",className)} action={formAction}>
            <div className="flex flex-col gap-2">
                
                <div className="grid gap-3">
                    <Label htmlFor="email">Email {state.email}</Label>
                    <Input 
                        id="email"
                        type="email"
                        name="email"
                        placeholder="m@example.com"
                        defaultValue={state.email}
                        aria-describedby={loginErrorMsg?.email ? "email-error" : undefined}
                        aria-invalid={!!loginErrorMsg?.email}
                        onChange={() => loginErrorMsg?.email && setLoginErrorMsg(prev => ({ ...prev, email: "" }))}
                    />

                    {loginErrorMsg?.email && (
                        <p id="email-error" className="text-sm text-red-500">{loginErrorMsg.email}</p>
                    )}
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {/* <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                            Forgot your password?
                        </a> */}
                    </div>
                    <div className="relative w-full">
                        <InputPassword
                            id="password"
                            name="password"
                            aria-describedby={loginErrorMsg?.password ? "password-error" : undefined}
                            aria-invalid={!!loginErrorMsg?.password}
                            onChange={() => loginErrorMsg?.password && setLoginErrorMsg(prev => ({ ...prev, password: "" }))}
                        />
                        {loginErrorMsg?.password && (
                            <p id="password-error" className="text-sm text-red-500">{loginErrorMsg.password}</p>
                        )}
                    </div>
                </div>

                <LoadingButton className="mt-4" loading={isPending}  >
                    Sign In Nest Grocery
                </LoadingButton>

                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline">
                        Sign up
                    </Link>
                </div>
                
            </div>
        </form>
    )
}