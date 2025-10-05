"use client"

import InputPassword from "@/components/reactive-components/input-password"
import LoadingButton from "@/components/reactive-components/loading-btn"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import zodValidateHandler from "@/lib/zod/zodValidateHandler"
import { registerAction } from "@/modules/Authentication/Actions/RegisterAction"
import { RegisterSchema } from "@/modules/Authentication/Schema/RegisterSchema"
import { RegisterCredentialsType } from "@/modules/Authentication/types"
import { useRouter } from "next/navigation"
import { useActionState, useState } from "react"

export default function RegisterForm({
    className,
}: { 
    className?: string
}) {
    async function handlerRegisterAction(prevState:RegisterCredentialsType,formData: FormData): Promise<RegisterCredentialsType> {
        // Reset errors
        setErrorMessages({});
        
        // Handle form validation
        const [errorsReturn,isValid] = zodValidateHandler(formData,RegisterSchema);
        if (!isValid) {
            setErrorMessages(errorsReturn);
            return {...prevState,...Object.fromEntries(formData)};
        }

        // Handle Backend registration logic here
        const formValues = Object.fromEntries(formData.entries());
        const registerResponse = await registerAction(formValues as RegisterCredentialsType);

        // if backend returns error
        if (registerResponse?.error) {
            setErrorMessages(registerResponse.error as Record<string, string>);
            return {...prevState,...Object.fromEntries(formData)};
        }

        // On successful registration, you might want to redirect or clear the form
        setErrorMessages({});
        router.push("/");

        return {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
        };
    }

    const [state, signUpAction, isPending] = useActionState(handlerRegisterAction,{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    const router = useRouter();
    return (
        <form className={cn("p-6 md:p-8", className)} action={signUpAction}>
            <div className="grid gap-6">
                <fieldset className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="sr-only" htmlFor="first_name">First name</label>
                        <Input
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="First Name"
                            className="w-full"
                            defaultValue={state.first_name}
                            aria-invalid={!!errorMessages?.first_name}
                        />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="last_name">Last name</label>
                        <Input
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                            className="w-full"
                            defaultValue={state.last_name}
                            aria-invalid={!!errorMessages?.last_name}
                        />

                    </div>

                    <p className="error max-w-[200px]">{errorMessages?.first_name}</p>
                    <p className="error max-w-[200px]">{errorMessages?.last_name}</p>

                </fieldset>

                <fieldset className="grid grid-cols-1 gap-2">
                    <label className="sr-only" htmlFor="email">Email</label>
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

                <fieldset className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="sr-only" htmlFor="password">Password</label>
                        <InputPassword
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="w-full"
                            aria-invalid={!!errorMessages?.password}
                            defaultValue= ""
                        />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="confirm_password">Confirm password</label>
                        <InputPassword
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            className="w-full"
                            aria-invalid={!!errorMessages?.confirm_password}
                            defaultValue= ""
                        />
                    </div>

                    <p className="error max-w-[200px]">{errorMessages?.password}</p>
                    <p className="error max-w-[200px]">{errorMessages?.confirm_password}</p>

                </fieldset>

                <div className="flex justify-end">
                   <LoadingButton className="mt-4" loading={isPending}  >
                        Sign Up Nest Grocery
                    </LoadingButton>
                </div>
            </div>
        </form>
    )
}