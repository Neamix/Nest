"use client"
import InputPassword from "@/components/reactive-components/input-password";
import LoadingButton from "@/components/reactive-components/loading-btn";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import zodValidateHandler from "@/lib/zod/zodValidateHandler";
import { LoginAction } from "@/modules/Authentication/Actions/LoginActions";
import { LoginSchema } from "@/modules/Authentication/Schema/LoginSchema";
import { UserLoginType } from "@/modules/Authentication/types";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({
    className,
}: { 
    className?: string
}) {

    async function handlerLoginAction(prevState: UserLoginType,formData: FormData): Promise<UserLoginType> {
        // Reset errors
        setErrorMessages({});

        // Handle form validation
        const [errorMessages,isValid] = zodValidateHandler(formData,LoginSchema);
        if (!isValid) {
            setErrorMessages(errorMessages);
            return {...prevState,...Object.fromEntries(formData)};
        }

        // Handle Backend login logic here
        const response = await LoginAction(Object.fromEntries(formData) as UserLoginType);
        if (response?.error) {
            setErrorMessages(response.error);
            return {...prevState,...Object.fromEntries(formData)};
        }

        // On successful login, you might want to redirect or clear the form
        setErrorMessages({});
        router.push("/");

        return {
            email: "",
            password: "",
        };
    }

    const [state, signInAction, isPending] = useActionState(handlerLoginAction,{
        email: "",
        password: "",
    });

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const router = useRouter();

    return (
        <form className={cn("p-6 md:p-8",className)} action={signInAction}>
           <div className="grid gap-6">

                <fieldset className="form-field">
                    <Label className="text-[14px]" htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        defaultValue={state.email}
                        aria-invalid={!!errorMessages?.email}

                    />

                    <p className="error">{errorMessages?.email}</p>

                </fieldset>

                <fieldset className="form-field">
                    <div className="flex items-center justify-between">
                        <Label className="text-[14px]" htmlFor="password">Password</Label>
                        <Link href="/forget-password" className="text-sm text-primary hover:underline transition-all">Forgot password?</Link>
                    </div>
                    <InputPassword
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="mb-2 text-[13px]"
                        aria-invalid={!!errorMessages?.password}
                        defaultValue= ""
                    />

                    <p className="error max-w-[200px]">{errorMessages?.password}</p>

                </fieldset>

                <fieldset className="form-field mx-1">
                    <p className="text-[14px] flex gap-1.5">
                        <span>Don&apos;t have an account?</span>
                        <Link href="/register" className=" text-primary hover:underline transition-all">Sign up</Link>
                    </p>

                    <LoadingButton className="mt-2" loading={isPending}  >
                        Sign In Nest Grocery
                    </LoadingButton>
                </fieldset>

           </div>
        </form>
    )
}