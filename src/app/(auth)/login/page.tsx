import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import TermsDialog from "@/components/blocks/Dialog/termsDialog"
import PrivacyDialog from "@/components/blocks/Dialog/privacyDialog"
import LoginForm from "@/components/blocks/form/LoginForm"
import { headers } from "next/headers"
export default async function LoginPage() {
    const containerClasses = "flex flex-col justify-center items-center min-h-screen gap-6 container mx-auto font-lato px-4 py-8";
    const footerClasses = "text-muted-foreground text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary max-w-md";
    const headersList = await headers();
    const user = headersList.get('x-user-data');
    console.log("Login Page - User Data from Headers:", headersList.get('x-user-data'));
    return (
        <div className={containerClasses}>
            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="w-full max-w-6xl">
                    <Card className="overflow-hidden p-0 mb-6">
                        <CardContent className="grid p-0 md:grid-cols-2">
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
                                    <h1 className="text-2xl font-bold">Sign in Nest Grocery</h1>
                                    <p className="text-muted-foreground text-base">
                                        Find the best groceries and everyday essentials all in one place.
                                    </p>
                                </div>
                                {user}
                                <LoginForm />
                            </div>

                            <div className="relative hidden md:block">
                                <Image
                                    src="/landscape/login.png"
                                    alt="Grocery shopping illustration"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 0px, 50vw"
                                    className="object-cover dark:brightness-[0.2] dark:grayscale"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-black/30 to-transparent flex items-end">
                                    <div className="text-white p-6">
                                        <h2 className="text-xl font-bold mb-4">Get All Your Groceries and Everyday Essentials</h2>
                                        <p className="text-sm text-gray-300">Get fresh produce, pantry staples, and essentials delivered to your door.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className={footerClasses}>
                        By clicking continue, you agree to our{" "}
                        <TermsDialog /> and <PrivacyDialog />
                    </div>
                </div>
            </div>
        </div>
    )
}