"use client"

import InputPassword from "@/components/modified/input-password";
import LoadingButton from "@/components/modified/loading-btn";
import { Input } from "@/components/ui/input"
import formatErrorMessage from "@/lib/formateErrorMessage";
import { cn } from "@/lib/utils";
import validateFields from "@/lib/validation";
import { registerAction } from "@/modules/Authentication/Actions/RegisterAction";
import useAuthStore from "@/modules/Authentication/Stores/store";
import { RegisterErrorType, UserAuthStateType, UserRegisterType } from "@/modules/Authentication/types";
import { Label } from "@radix-ui/react-label"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

export default function RegisterForm({
    className,
}: { 
    className?: string
}) {
    // Validate the form fields
    const validateRegisterForm = ({
        first_name,
        last_name,
        email,
        password,
        confirm_password
    }: UserRegisterType) => {
        return validateFields([
            { 
                name: "First name", 
                value: first_name, 
                rules: { required: true },
                messages: { required: "First name is required." }
            },
            { name: "Last name", value: last_name, rules: { required: false } },
            { name: "Email", value: email, rules: { required: true, email: true } },
            { name: "Password", value: password, rules: { required: true } },
            { name: "Confirm password", value: confirm_password, rules: { required: true, match: password },messages: { match: "Passwords do not match." } }
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

        setRegisterError({first_name: "", last_name: "", email: "", password: "", confirm_password: ""});
        const validationErrors = validateRegisterForm({first_name, last_name, email, password, confirm_password});

        if (Object.keys(validationErrors).length > 0) {
            setRegisterError({
                first_name: validationErrors["First name"]?.[0] || "",
                last_name: validationErrors["Last name"]?.[0] || "",
                email: validationErrors["Email"]?.[0] || "",
                password: validationErrors["Password"]?.[0] || "",
                confirm_password: validationErrors["Confirm password"]?.[0] || "",
            });

            return {
                first_name: first_name ?? previousState.first_name,
                last_name: last_name ?? previousState.last_name,
                email: email ?? previousState.email,
                password: "",
                confirm_password: "",
                device_token: device_token ?? "",
            };
        }

        const userData:UserAuthStateType = await registerAction({email,password,device_token,first_name,last_name});
        if (!userData.success) {
            const { error }: UserAuthStateType = userData;
            setRegisterError({
                email: formatErrorMessage(error?.email)
            });
           
            return {
                first_name: first_name ?? previousState.first_name,
                last_name: last_name ?? previousState.last_name,
                email: email ?? previousState.email,
                password: "",
                confirm_password: "",
                device_token: device_token ?? "",
            };
        } else if (userData.data && userData.success) {
            authStore.setUser(userData.data);
            router.push("/");
        }


        return {
            first_name: previousState.first_name,
            last_name: previousState.last_name,
            email: email ?? previousState.email,
            password: "",
            confirm_password: "",
            device_token: device_token ?? "",
        }
        
    }  

    const [state, formAction, isPending] = useActionState(handleRegisterAction, {first_name: "", last_name: "", email: "", password: "", confirm_password: "", device_token: "" });
    const [registerError, setRegisterError] = useState<Partial<RegisterErrorType>>({first_name: "", last_name: "", email: "", password: "", confirm_password: ""});
    const router = useRouter();
    const authStore = useAuthStore();

    return (
        <form className={cn("p-6 md:p-8",className)} action={formAction}>

           <div className="flex flex-col gap-5">

                <div className="grid grid-cols-2 gap-3">

                    <div className="grid  gap-x-3 gap-y-1 relative">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="John"
                            defaultValue={state.first_name ? state.first_name: ""}
                        />
                    </div>

                    <div className="grid  gap-x-3 gap-y-1">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder="Doe"
                            defaultValue={state.last_name ? state.last_name : ""}
                        />
                    </div>
                    
                    <span className="error">{registerError.first_name}</span>
                    <span className="error">{registerError.last_name}</span>
                </div>

                <div className="grid gap-3 relative">

                        <div className="grid  gap-x-3 gap-y-1 relative">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="John@example.com"
                                defaultValue={state.email ? state.email : ""}
                            />
                            <span className="error">{registerError.email}</span>
                        </div>

                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1">

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <InputPassword
                            id="password"
                            name="password"
                            defaultValue=""
                        />
                        
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <InputPassword
                            id="confirm_password"
                            name="confirm_password"
                            defaultValue=""
                        />
                    </div>

                    <span className="error block">{registerError.password}</span>
                    <span className="error block">{registerError.confirm_password}</span>

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