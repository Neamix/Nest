"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import CountrySelect from "./CountrySelect";
import useAuthStore from "@/modules/Authentication/Stores/store";
import LoadingButton from "@/components/reactive-components/loading-btn";
import { UpdateProfileType, UserType } from "@/modules/Authentication/types";
import { useState } from "react";
import zodValidateHandler from "@/lib/zod/zodValidateHandler";
import { UpdateProfileSchema } from "@/modules/Authentication/Schema/UpdateProfileSchema";
import { UpdateProfileAction } from "@/modules/Authentication/Actions/UpdateProfileAction";

export default function ProfileForm() {
    const user = useAuthStore((state) => state.user);
    const setUpdateError = useState<Record<string, string | string[]> | null>({})[1];
    async function handlerProfileUpdateAction (prevState: UpdateProfileType,formData: FormData) {
        // Reset errors
        setUpdateError({});

        // Handle form validation
        const [errorMessages,isValid] = zodValidateHandler(formData,UpdateProfileSchema);
        if (!isValid) {
            setUpdateError(errorMessages);
            return {...prevState,...Object.fromEntries(formData)};
        }

        // Handle Backend update profile logic here
        const response = await UpdateProfileAction(Object.fromEntries(formData) as UpdateProfileType);
        if (response?.error) {
            setUpdateError(response.error);
            return {...prevState,...Object.fromEntries(formData)};
        }
    }

    return (
        <>
            <form className="w-full max-w-lg">
                <div className="mb-4 flex flex-col gap-5">
                    <fieldset className="grid grid-cols-2 gap-5">
                        <div>
                            <Label className="mb-2 text-[13px] block" htmlFor="first_name">First name</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="First Name"
                                className="w-full"
                                defaultValue={user?.first_name || ""}
                            />
                        </div>

                        <div>
                            <Label className="mb-2 text-[13px] block" htmlFor="last_name">Last name</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Last Name"
                                className="w-full"
                                defaultValue={user?.last_name || ""}
                            />
                        </div>
                        
                    </fieldset>

                    <fieldset className="grid grid-cols-1 gap-5">
                        <div>
                            <Label className="mb-2 text-[13px] block" htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Email Address"
                                className="w-full"
                                defaultValue={user?.email || ""}
                                disabled
                            />
                        </div>
                    </fieldset>

                    <fieldset className="grid grid-cols-1 gap-5">
                        <div>
                            <Label className="mb-2 text-[13px] block" htmlFor="phone">Phone Number</Label>
                            <CountrySelect 
                                countryCode={user?.country_code || ""}
                                phoneNumber={user?.phone || ""}
                            />
                            
                        </div>
                    </fieldset>

                    <LoadingButton className="w-fit px-6" loading={false}>
                        Save Changes
                    </LoadingButton>

                </div>
            </form>
        </>
    )
}