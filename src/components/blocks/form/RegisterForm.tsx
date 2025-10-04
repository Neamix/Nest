"use client"

import InputPassword from "@/components/reactive-components/input-password";
import LoadingButton from "@/components/reactive-components/loading-btn";
import { Input } from "@/components/ui/input"
import formatErrorMessage from "@/lib/formateErrorMessage";
import { cn } from "@/lib/utils";
import validateFields from "@/lib/validation";
import { registerAction } from "@/modules/Authentication/Actions/RegisterAction";
import { RegisterSchema } from "@/modules/Authentication/Schema/RegisterSchema";
import useAuthStore from "@/modules/Authentication/Stores/store";
import { RegisterErrorType, UserAuthStateType, UserRegisterType } from "@/modules/Authentication/types";
import { Label } from "@radix-ui/react-label"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import z from "zod";

export default function RegisterForm({
    className,
}: { 
    className?: string
}) {
    const [registerErrorMsg, setRegisterErrorMsg] = useState<Record<string, string>>({});
    const router = useRouter();
    const authStore = useAuthStore();

    // Action handler for form submission
    const handleRegisterAction = async (previousState: UserRegisterType, formData: FormData) => {
        const { first_name, last_name, email, password, confirm_password } = Object.fromEntries(formData.entries());
        const device_token = formData.get("device_token")?.toString() || "";

        // Validate user data
        setRegisterErrorMsg({});
        const validationErrors = RegisterSchema.safeParse({ first_name, last_name, email, password,confirm_password });

        if (!validationErrors.success) {
            const tree = z.treeifyError(validationErrors.error);
            setRegisterErrorMsg({
                first_name: tree.properties?.first_name?.errors?.[0] || "",
                last_name: tree.properties?.last_name?.errors?.[0] || "",
                email: tree.properties?.email?.errors?.[0] || "",
                password: tree.properties?.password?.errors?.[0] || "",
                confirm_password: tree.properties?.confirm_password?.errors?.[0] || "",
            });

            return { 
                first_name,
                last_name,
                email,
                password,
                confirm_password,
            };
        }

        // Register action call
        const response = await registerAction({ first_name: first_name as string, last_name: last_name as string, email: email as string, password: password as string, device_token });
        if (response?.error) {
            setRegisterErrorMsg(Object.fromEntries(
                Object.entries(response.error).map(([key, value]) => [key, value?.toString() || ""])
            ));
            return { ...previousState};
        }

        // Save data to store
        if (response?.data) {
            setRegisterErrorMsg({});
            authStore.setUser(response.data);
            router.push("/");
        }

        return { ...previousState};
    }  

    const [state, formAction, isPending] = useActionState(handleRegisterAction, {first_name: "", last_name: "", email: "", password: "", confirm_password: "", device_token: "" });

    return (
        <form className={cn("p-6 md:p-8",className)} action={formAction}>

           <div className="flex flex-col gap-5">

                <div className="grid grid-cols-2 gap-2">

                    <div className="grid  gap-x-3 gap-y-1 relative">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="John"
                            onChange={() => registerErrorMsg?.first_name && setRegisterErrorMsg(prev => ({...prev, first_name: "" }))}
                        />
                    </div>

                    <div className="grid  gap-x-3 gap-y-1">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder="Doe"
                            defaultValue={state.last_name}
                            onChange={() => registerErrorMsg?.last_name && setRegisterErrorMsg(prev => ({...prev, last_name: "" }))}
                        />
                    </div>

                    <p id="first_name-error" className="text-sm text-red-500 error">{registerErrorMsg?.first_name}</p>
                    <p id="last_name-error" className="text-sm text-red-500 error">{registerErrorMsg?.last_name}</p>

                </div>

                <div className="grid gap-2 relative">

                        <div className="grid  gap-x-3 gap-y-1 relative">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="John@example.com"
                                defaultValue={state.email}
                                onChange={() => registerErrorMsg?.email && setRegisterErrorMsg(prev => ({...prev, email: "" }))}
                            />
                            {registerErrorMsg?.email && (
                                <p id="email-error" className="text-sm text-red-500 error">{registerErrorMsg.email}</p>
                            )}
                        </div>

                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1">

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <InputPassword
                            id="password"
                            name="password"
                            defaultValue=""
                            onChange={() => registerErrorMsg?.password && setRegisterErrorMsg(prev => ({...prev, password: "" }))}
                        />
                        
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <InputPassword
                            id="confirm_password"
                            name="confirm_password"
                            defaultValue=""
                            onChange={() => registerErrorMsg?.confirm_password && setRegisterErrorMsg(prev => ({...prev, confirm_password: "" }))}
                        />
                    </div>

                    {registerErrorMsg?.password && (
                        <p id="password-error" className="text-sm text-red-500 error">{registerErrorMsg.password}</p>
                    )}

                    {registerErrorMsg?.confirm_password && (
                        <p id="confirm_password-error" className="text-sm text-red-500 error">{registerErrorMsg.confirm_password}</p>
                    )}

                </div>

                <LoadingButton className="mt-4" loading={isPending}  >
                    Sign Up Nest Grocery
                </LoadingButton>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>

            </div> 
                           
        </form>
    )
}