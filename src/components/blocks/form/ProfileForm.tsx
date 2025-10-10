import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import CountrySelect from "./CountrySelect";

export default function ProfileForm() {
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
                            />
                        </div>
                    </fieldset>

                    <fieldset className="grid grid-cols-1 gap-5">
                        <div>
                            <Label className="mb-2 text-[13px] block" htmlFor="phone">Phone Number</Label>
                            <CountrySelect />
                            
                        </div>
                    </fieldset>

                </div>
            </form>
        </>
    )
}