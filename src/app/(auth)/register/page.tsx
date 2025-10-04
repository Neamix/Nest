import Image from "next/image"
import TermsDialog from "@/components/blocks/Dialog/termsDialog"
import PrivacyDialog from "@/components/blocks/Dialog/privacyDialog"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import RegisterForm from "@/components/blocks/form/RegisterForm"

export default function RegisterPage() {
  const containerClasses = "flex flex-col justify-center items-center min-h-screen gap-6 container mx-auto font-lato px-4";
  const footerClasses = "text-muted-foreground text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary max-w-md";

  return (
    <Card className="overflow-hidden p-0 max-w-[700px] w-full">
      <CardContent className="p-0">
        <div className="px-6 pt-10">
          <div className="mb-4 flex items-center space-x-2">
            <Image 
              src="/branding/Nest.png" 
              alt="Nest Grocery Logo" 
              width={148} 
              height={45.67}
              priority
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">Sign Up Nest Grocery</h1>
          <p className="text-muted-foreground text-base mb-6">
            Find the best groceries and everyday essentials all in one place.
          </p>
        </div>
        
        <RegisterForm />
      </CardContent>
    </Card>
  )
}