import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { countriesCollection } from "@/countries"
import Flag from 'react-flagkit';

export default function CountrySelect() { 
    let countries = countriesCollection;

    return (
        <div className="relative">
            
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Select defaultValue="us">
                    <SelectTrigger className="w-[110px] border-0 pointer-events-auto">
                        <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent className="w-[240px] z-50">
                        {
                            countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                    <Flag country={country.code.toUpperCase()} />
                                    <span>+{country.phone}</span>
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>

            <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="w-full pl-[130px]"
            />
        </div>
    )
}