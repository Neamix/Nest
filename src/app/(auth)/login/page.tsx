"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import LoadingButton from "@/components/modified/loading-btn"
import InputPassword from "@/components/modified/input-password"
import { useActionState } from "react"

function LoginForm({
    className,
}: {
    className?: string
}) {
    // Submit form data
    let handleLoginAction = async (formData: FormData) => {
        let email = formData.get("email")?.toString();
        let password = formData.get("password")?.toString();

        console.log("Email:", email);
    }
    
    const [state, formAction, isPending] = useActionState(handleLoginAction, {})

    return (
        <div className={cn("flex flex-col justify-center h-screen gap-6 sm-container m-auto font-lato", className)}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-start text-start">
                                <div className="mb-4 flex items-center space-x-2">
                                    <Image src="/branding/Nest.png" alt="Logo" width={148} height={45.67} />
                                </div>
                                <h1 className="text-2xl font-bold">Sign in Nest Grocery</h1>
                                <p className="text-muted-foreground text-[16px]">
                                    Find the best groceries  and everyday essentials all in one place.
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <div className="relative w-full">
                                    <InputPassword />
                                </div>
                            </div>

                

                            <LoadingButton loading={true} />

                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block bg-gradient-to-t from-neutral-900 to-neutral-500">
                        <Image
                            src="/landscape/login.png"
                            alt="Login illustration"
                            fill
                            priority
                            sizes="(max-width: 768px) 0px, 50vw"
                            className="object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                        <div className="absolute h-full flex justify-end items-end bg-gradient-to-t from-neutral-900 via-black/30 to-transparent">
                            <div className="text-white p-6">
                                <h2 className="text-[20px] font-bold mb-4">Get All Your Groceries and Everyday Essentials</h2>
                                <p className="text-[15px] mb-2 text-gray-300">Get fresh produce, pantry staples, and essentials delivered to your door.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default function LoginPage() {
    return <LoginForm />
}
