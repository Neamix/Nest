"use client"

import InputPassword from "@/components/modified/input-password";
import LoadingButton from "@/components/modified/loading-btn";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import validateFields from "@/lib/validation";
import { registerAction } from "@/modules/Authentication/Actions/RegisterAction";
import useAuthStore from "@/modules/Authentication/Stores/store";
import { UserAuthStateType, UserRegisterType } from "@/modules/Authentication/types";
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
    const validateRegisterForm = (
        first_name: string,
        last_name: string,
        email: string, 
        password: string,
        confirm_password: string
    ) => {
        return validateFields([
            { name: "First Name", value: first_name, rules: { required: true } },
            { name: "Last Name", value: last_name, rules: { required: false } },
            { name: "Email", value: email, rules: { required: true, email: true } },
            { name: "Password", value: password, rules: { required: true } },
            { name: "Confirm Password", value: confirm_password, rules: { required: true, match: password } }
        ]);
    };

    // Action handler for form submission
    const handleRegisterAction = async (previousState: UserRegisterType, formData: FormData) => {
        const first_name: string = formData.get("first_name")?.toString() || "";
        const last_name: string = formData.get("last_name")?.toString() || "";
        const email: string = formData.get("email")?.toString() || "";
        const password: string = formData.get("password")?.toString() || "";
        const confirm_password: string = formData.get("confirm_password")?.toString() || "";
        const device_token: string = "test_token";

        // Reset previous errors

        // Validate fields; returns an object like { Email: string[], Password: string[] }
        const validationErrors = validateRegisterForm(first_name, last_name, email, password, confirm_password);

        // If any field has errors, return the current values
        if (Object.keys(validationErrors).length > 0) {
           
            return previousState;
        }

        // Call the register action
        const userData:UserAuthStateType = await registerAction({email,password,device_token,first_name,last_name});
        
        // If login failed, set the error message
        if (!userData.success) {
            setRegisterErrorMsg(userData.error || "Register failed. Please try again.");
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
            first_name: previousState.first_name,
            last_name: previousState.last_name,
            email: email ?? previousState.email,
            password: password ?? previousState.password,
            device_token: device_token ?? "",
        }
        
    }  

    const [state, formAction, isPending] = useActionState(handleRegisterAction, {first_name: "", last_name: "", email: "", password: "", device_token: "" });
    const [registerErrorMsg, setRegisterErrorMsg] = useState<string>("");
    const router = useRouter();
    const authStore = useAuthStore();

    return (
        <form className={cn("p-6 md:p-8",className)} action={formAction}>

           <div className="flex flex-col gap-5">

                <div className="grid grid-cols-2 gap-3">

                    <div className="grid gap-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="John"
                            defaultValue={state.first_name ? String(state.first_name) : ""}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder="Doe"
                            defaultValue={state.last_name ? String(state.last_name) : ""}
                        />
                    </div>

                </div>

                <div className="grid gap-3">

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                name="email"
                                placeholder="John"
                                defaultValue={state.email ? String(state.email) : ""}
                            />
                        </div>

                </div>

                <div className="grid grid-cols-2 gap-3">

                    <div className="grid gap-2">
                        <Label htmlFor="first_name">Password</Label>
                        <InputPassword
                            id="password"
                            name="password"
                            defaultValue={state.password ? String(state.password) : ""}
                        />
                        <span className="error">{registerErrorMsg}</span>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="last_name">Confirm Password</Label>
                        <InputPassword
                            id="confirm_password"
                            name="confirm_password"
                            defaultValue={state.confirm_password ? String(state.confirm_password) : ""}
                        />
                    </div>

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