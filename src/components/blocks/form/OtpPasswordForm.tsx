import LoadingButton from "@/components/reactive-components/loading-btn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import zodValidateHandler from "@/lib/zod/zodValidateHandler";
import { OtpVerifyPasswordSchema } from "@/modules/Authentication/Schema/OtpVerifyPasswordSchema";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function OtpPasswordForm({className,...props}: { className?: string }) {
    const otpRef = useRef<HTMLInputElement | null>(null);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    function handleOtpVerifyAction(previousState: { otp: string }): Promise<{ otp: string }> {
        const  otp = otpRef.current?.value;

        // Set form data
        const formData = new FormData();
        formData.append("otp", otp || "");

        // Handle OTP verification logic here
        const [errorMessages,isValid] = zodValidateHandler(formData,OtpVerifyPasswordSchema);
        if (!isValid) {
           setErrorMessages(errorMessages);
        }
    }
    
    const [state, formAction, isPending] = useActionState(handleOtpVerifyAction, { otp: "" });

    return (
        <>
            <form className={cn("p-6 md:p-8",className)} {...props} action={formAction}>
                
                <fieldset className="form-field">
                    <InputOTP maxLength={6} className="w-full"  ref={otpRef}>
                        <InputOTPGroup className="w-full max-w-[250px] flex gap-y-3 h-[40px]">
                            <InputOTPSlot index={0} className="flex-1 h-full" />
                            <InputOTPSlot index={1} className="flex-1 h-full" />
                            <InputOTPSlot index={2} className="flex-1 h-full" />
                            <InputOTPSlot index={3} className="flex-1 h-full" />
                            <InputOTPSlot index={4} className="flex-1 h-full" />
                        </InputOTPGroup>
                    </InputOTP>

                    <p className="error max-w-[200px]">{errorMessages?.otp}</p>
                </fieldset>


                <LoadingButton className="mt-4" loading={isPending}  >
                    Send Reset Otp
                </LoadingButton>
            </form>
        </>
    );
}