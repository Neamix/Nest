"use client"
import { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react"

export default function InputPassword({...props}: React.InputHTMLAttributes<HTMLInputElement>) {
    // Toggle password visibility
    let [passwordShow, setPasswordShow] = useState(false);
    let handlePasswordToggle = () => {
        setPasswordShow(!passwordShow);
    }
    return (
        <div className="relative w-full">
            <Input id="password" className="pr-10" type={passwordShow ? "text" : "password"} required {...props} />
            {
                !passwordShow ? 
                <EyeOff className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground" onClick={handlePasswordToggle} />
                : 
                <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground" onClick={handlePasswordToggle} />
            }
        </div>
    )
}