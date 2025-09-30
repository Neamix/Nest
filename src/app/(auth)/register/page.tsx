import Image from "next/image"
import TermsDialog from "@/components/blocks/Dialog/termsDialog"
import PrivacyDialog from "@/components/blocks/Dialog/privacyDialog"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import RegisterForm from "@/components/blocks/form/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="bg-muted">
        <div className={cn("flex flex-col justify-center items-center h-screen gap-6 sm-container m-auto font-lato ")}>

            <Card className="overflow-hidden p-0 max-w-[700px] w-full">
                <CardContent className="grid p-0 md:grid-cols-1 ">
                    
                    <div className="">
                        <div className="flex flex-col items-start text-start px-6  pt-10">
                            <div className="mb-4 flex items-center space-x-2">
                                <Image src="/branding/Nest.png" alt="Logo" width={148} height={45.67} />
                            </div>
                            <h1 className="text-2xl font-bold">Sign Up Nest Grocery</h1>
                            <p className="text-muted-foreground text-[16px]">
                                Find the best groceries  and everyday essentials all in one place.
                            </p>
                        </div>
                        
                        <RegisterForm />

                    </div>
                    
                    
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking sign up, you agree to our 
                <TermsDialog/>
                {" "}
                and {" "}
                <PrivacyDialog/>
            </div>

        </div>
    </div>
  )
}