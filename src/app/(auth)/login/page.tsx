"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import TermsDialog from "@/components/blocks/Dialog/termsDialog"
import PrivacyDialog from "@/components/blocks/Dialog/privacyDialog"
import LoginForm from "@/components/blocks/form/LoginForm"

export default function LoginPage() {


    return (
        <div className="bg-muted">
            <div className={cn("flex flex-col justify-center h-screen gap-6 sm-container m-auto font-lato ")}>

                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        
                        <div className="">
                            <div className="flex flex-col items-start text-start px-6  pt-10">
                                <div className="mb-4 flex items-center space-x-2">
                                    <Image src="/branding/Nest.png" alt="Logo" width={148} height={45.67} />
                                </div>
                                <h1 className="text-2xl font-bold">Sign in Nest Grocery</h1>
                                <p className="text-muted-foreground text-[16px]">
                                    Find the best groceries  and everyday essentials all in one place.
                                </p>
                            </div>
                            
                            <LoginForm />
                        </div>

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
                    By clicking continue, you agree to our 
                    <TermsDialog/>
                    {" "}
                    and {" "}
                    <PrivacyDialog/>
                </div>

            </div>
        </div>
    )
}

