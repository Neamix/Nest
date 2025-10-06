import LoadingButton from "@/components/reactive-components/loading-btn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import zodValidateHandler from "@/lib/zod/zodValidateHandler";
import { OtpVerifyPasswordSchema } from "@/modules/Authentication/Schema/OtpVerifyPasswordSchema";
import { useActionState, useRef, useState } from "react";
import Counter from "@/components/reactive-components/counter";
import { ForgetPasswordAction } from "@/modules/Authentication/Actions/ForgetPasswordAction";

export default function OtpPasswordForm({className,email,...props}: { className?: string,email:string }) {
    const otpRef = useRef<HTMLInputElement | null>(null);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    
    async function handleOnResetOtp() {
        const response = await ForgetPasswordAction({ email });
    }

    return (
        <>
            <form className={cn("p-6 md:p-8",className)} {...props}>
                
                <fieldset className="form-field">
                    <InputOTP maxLength={6} className="w-full" name="otp" ref={otpRef} >
                        <InputOTPGroup className="w-full max-w-[250px] flex gap-y-3 h-[40px]">
                            <InputOTPSlot index={0} className="flex-1 h-full" />
                            <InputOTPSlot index={1} className="flex-1 h-full" />
                            <InputOTPSlot index={2} className="flex-1 h-full" />
                            <InputOTPSlot index={3} className="flex-1 h-full" />
                            <InputOTPSlot index={4} className="flex-1 h-full" />
                            <InputOTPSlot index={5} className="flex-1 h-full" />
                        </InputOTPGroup>
                    </InputOTP>

                    <p className="error max-w-[200px]">{errorMessages?.otp}</p>
                </fieldset>

                <Counter initialCount={5} onComplete={handleOnResetOtp} />

                <LoadingButton className="mt-4" loading={false}  >
                    Send Reset Otp
                </LoadingButton>
            </form>
        </>
    );
}