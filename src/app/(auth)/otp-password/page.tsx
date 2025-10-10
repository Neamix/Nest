"use client";

import OtpPasswordForm from "@/components/blocks/form/OtpPasswordForm";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function OtpPasswordPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const router = useRouter();

    useEffect(() => {
        if (!email) {
            router.push("/login");
        }
    }, [email, router]);

    if (!email) return null;

    return (
        <Card className="overflow-hidden p-0 mb-6 w-full max-w-[400px]">
            <CardContent className="grid p-0 md:grid-cols-1">
                <div className="flex flex-col">
                    <div className="flex flex-col items-start px-6 pt-10">
                        <div className="mb-4 flex items-center space-x-2">
                            <Image 
                                src="/branding/Nest.png" 
                                alt="Nest Grocery Logo" 
                                width={148} 
                                height={45.67} 
                                priority
                            />
                        </div>
                        <h1 className="text-2xl font-bold">Verify OTP</h1>
                        <p className="text-muted-foreground text-base flex flex-wrap">
                            <span> Enter the OTP sent to your registered email</span> 
                            <span className="font-medium"> 
                                <b>{email}</b>
                            </span>
                        </p>
                    </div>

                    <OtpPasswordForm email={email} />
                    
                </div>
            </CardContent>
        </Card>
    );
}