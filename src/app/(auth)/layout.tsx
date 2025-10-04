import PrivacyDialog from "@/components/blocks/Dialog/privacyDialog";
import TermsDialog from "@/components/blocks/Dialog/termsDialog";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const containerClasses = "flex flex-col justify-center items-center min-h-screen gap-6 container mx-auto font-lato px-4 bg-muted-50";
    const footerClasses = "text-muted-foreground text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary max-w-md";
    return (
        <div className={containerClasses}>
            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="w-full max-w-6xl">
                    {children}
                    <div className={footerClasses}>
                        By clicking continue, you agree to our{" "}
                        <TermsDialog /> and <PrivacyDialog />
                    </div>
                </div>
            </div>
        </div>
    )
}