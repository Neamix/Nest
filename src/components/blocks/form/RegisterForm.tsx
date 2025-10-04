"use client"

import InputPassword from "@/components/reactive-components/input-password";
import LoadingButton from "@/components/reactive-components/loading-btn";
import { Input } from "@/components/ui/input"
import { clearFieldError } from "@/lib/clearFiled";
import { formatBackendErrors } from "@/lib/formateBackendErrors";
import { cn } from "@/lib/utils";
import zodErrorHandler, { ZodErrorProperty } from "@/lib/zodErrorHandler";
import { registerAction } from "@/modules/Authentication/Actions/RegisterAction";
import { RegisterSchema } from "@/modules/Authentication/Schema/RegisterSchema";
import useAuthStore from "@/modules/Authentication/Stores/store";
import { RegisterCredentialsType, RegisterFormState,  } from "@/modules/Authentication/types";
import { Label } from "@radix-ui/react-label"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import z, { set } from "zod";

export default function RegisterForm({
    className,
}: { 
    className?: string
}) {
    

    return (
       <form className={cn("space-y-4", className)}>
        
       </form>
    )
}