import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { countriesCollection } from "@/countries"
import { UserPhonePropsType } from "@/modules/Authentication/types";
import Flag from 'react-flagkit';
import { useState } from "react";

export default function CountrySelect({ countryCode, phoneNumber }: UserPhonePropsType) { 
    const countries = countriesCollection;
    const [selectedCountry, setSelectedCountry] = useState(countryCode || 'us');
    const currentCountry = countries.find(c => c.code === selectedCountry);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
    }

    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Select value={selectedCountry ?? 'us'} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="w-[110px] border-0 pointer-events-auto outline-none">
                        <SelectValue className="outline-none">
                            {currentCountry && (
                                <div className="flex items-center gap-2">
                                    <Flag country={currentCountry.code.toUpperCase()} className="w-5 h-4" />
                                    <span>+{currentCountry.phone}</span>
                                </div>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="w-[240px] z-50">
                        {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                <div className="flex items-center gap-2">
                                    <Flag country={country.code.toUpperCase()} className="w-5 h-4" />
                                    <span>{country.code}</span>
                                    <span className="ml-auto text-muted-foreground">+{country.phone}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="w-full pl-[130px]"
                defaultValue={phoneNumber}
                pattern="^[0-9]*$"
                onChange={handleChange}
            />

        </div>
    )
}