"use client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import TermsDialog from "@/components/blocks/Dialog/termsDialog"
import PrivacyDialog from "@/components/blocks/Dialog/privacyDialog"
import ForgetPasswordForm from "@/components/blocks/form/FrogetPasswordForm"
import ResetPasswordForm from "@/components/blocks/form/ResetPasswdForm"
import { use } from "react"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"
export default  function LoginPage() {
    const params = useSearchParams();
    const email = params.get("email");
    const hash_token = params.get("hash_token");
    const router = useRouter();

    if (!email || !hash_token) {
        router.push("/login");
        return null;
    }

    return (
        <Card className="overflow-hidden p-0 mb-6">
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
                        <h1 className="text-2xl font-bold">Reset Password</h1>
                        <p className="text-muted-foreground text-base">
                            Enter the new password for your account
                        </p>
                    </div>

                    <ResetPasswordForm email={email} hash_token={hash_token} />
                </div>
            </CardContent>
        </Card>
    )
}