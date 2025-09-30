"use client"

import InputPassword from "@/components/modified/input-password";
import LoadingButton from "@/components/modified/loading-btn";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import validateFields from "@/lib/validation";
import { loginAction } from "@/modules/Authentication/Actions/LoginActions";
import useAuthStore from "@/modules/Authentication/Stores/store";
import { UserAuthStateType, UserLoginType } from "@/modules/Authentication/types";
import { Label } from "@radix-ui/react-label"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

export default function LoginForm({
    className,
}: { 
    className?: string
}) {
    // Validate the form fields
    const validateLoginForm = (email: string, password: string) => {
        return validateFields([
            { name: "Email", value: email, rules: { required: true, email: true } },
            { name: "Password", value: password, rules: { required: true } }
        ]);
    };

    // Action handler for form submission
    const handleLoginAction = async (previousState: UserLoginType, formData: FormData) => {
        const email:string = formData.get("email")?.toString() || "";
        const password:string = formData.get("password")?.toString() || "";
        const device_token:string = "test_token";

        // Reset previous errors
        setLoginError({email: "", password: ""});
        setLoginErrorMsg("");
        
        // Validate fields; returns an object like { Email: string[], Password: string[] }
        const validationErrors = validateLoginForm(email, password);

        // If any field has errors, return the current values
        if (Object.keys(validationErrors).length > 0) {
            setLoginError({
                email: validationErrors.Email?.[0] || "",
                password: validationErrors.Password?.[0] || ""
            });
            return previousState;
        }

        // Call the login action
        const userData:UserAuthStateType = await loginAction({email,password,device_token});
        
        // If login failed, set the error message
        if (!userData.success) {
            setLoginErrorMsg(userData.error || "Login failed. Please try again.");
            return {
                email: email ?? previousState.email,
                device_token: device_token ?? "",
            };
        } 
        
        // On successful login, redirect to home page
        if (userData.data && userData.success) {
            authStore.setUser(userData.data);
            router.push("/");
        }


        return {
            email: email ?? previousState.email,
            password: "",
            device_token: device_token ?? "",
        }
        
    }  

    const [state, formAction, isPending] = useActionState(handleLoginAction, { email: "", password: "",device_token: "" });
    const [loginError, setLoginError] = useState<UserLoginType>({email: "", password: ""});
    const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");
    const router = useRouter();
    const authStore = useAuthStore();

    return (
        <form className={cn("p-6 md:p-8",className)} action={formAction}>
            <div className="flex flex-col gap-2">
                
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="m@example.com"
                        aria-describedby={loginError.email ? "email-error" : undefined}
                        aria-invalid={!!loginError.email}
                        defaultValue={state.email ? String(state.email) : ""}
                    />

                    {loginError.email && <span className="error">{loginError.email}</span>}
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
                            defaultValue=""
                            aria-describedby={loginError.password ? "password-error" : undefined}
                            aria-invalid={!!loginError.password}
                        />

                        {loginError.password && <span className="error">{loginError.password}</span>}
                    </div>
                </div>

                <p>{ loginErrorMsg && <span className="error">{loginErrorMsg}</span> }</p>

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