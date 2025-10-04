import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import TermsDialog from "@/components/blocks/Dialog/termsDialog"
import PrivacyDialog from "@/components/blocks/Dialog/privacyDialog"
import ForgetPasswordForm from "@/components/blocks/form/FrogetPasswordForm"
export default async function LoginPage() {
    const containerClasses = "flex flex-col justify-center items-center min-h-screen gap-6 container mx-auto font-lato px-4";
    const footerClasses = "text-muted-foreground text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary max-w-md";

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
                        <h1 className="text-2xl font-bold">Forget Password</h1>
                        <p className="text-muted-foreground text-base">
                            Reset your password by entering your email below.
                        </p>
                    </div>

                    <ForgetPasswordForm />
                </div>
            </CardContent>
        </Card>
    )
}