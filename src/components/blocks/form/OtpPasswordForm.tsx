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
import { useRouter } from "next/navigation";
import { ResendOtpAction } from "@/modules/Authentication/Actions/ResendOtpAction";

export default function OtpPasswordForm({className,email,...props}: { className?: string,email:string }) {
    const otpRef = useRef<HTMLInputElement | null>(null);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const router = useRouter();

    async function handleOnResetOtp() {
        const response = await ForgetPasswordAction({ email });
    }

    async function handleOtpSubmit(prevState: { otp: string }, formData: FormData): Promise<{ otp: string }> {
        // Reset errors
        setErrorMessages({});

        // Handle form validation
        const [errorsReturn, isValid] = zodValidateHandler(formData, OtpVerifyPasswordSchema);
        if (!isValid) {
            setErrorMessages(errorsReturn);
            return { ...prevState, ...Object.fromEntries(formData) };
        }

        // Handle Backend OTP verification logic here
        const response = await ResendOtpAction({ otp: formData.get("otp") as string,email: email });
        if (response?.error) {
            setErrorMessages(response.error as Record<string, string>);
            return { ...prevState, ...Object.fromEntries(formData) };
        }
        
        // On successful OTP submission, you might want to redirect or clear the form
        setErrorMessages({});
        router.push("/reset-password?email=" + encodeURIComponent(email) + "&hash_token=" + response?.data?.hash_token);
        return {
            otp: "",
        };
    }

    const [state, formAction, isPending] = useActionState(handleOtpSubmit, { otp: "" });

    return (
        <>
            <form className={cn("p-6 md:p-8",className)} {...props} action={formAction}>
                
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

                    <p className="error max-w-[200px] mb-2 !flex-nowrap">{errorMessages?.otp}</p>
                </fieldset>

                <Counter initialCount={5} onComplete={handleOnResetOtp} />

                <LoadingButton className="mt-4" loading={isPending}  >
                    Send Reset Otp
                </LoadingButton>
            </form>
        </>
    );
}