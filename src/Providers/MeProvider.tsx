"use client"
import useAuthStore from "@/modules/Authentication/Stores/store";
import { UserAuthStateType, UserType } from "@/modules/Authentication/types";
import { useEffect } from "react";

export default function MeProvider({children,userData}: {children: React.ReactNode,userData:UserType | null}) {
    const authStore = useAuthStore();
    useEffect(() => {
        if(userData){
            authStore.setUser(userData);
        }
    }, [userData]);

    return (
        <>
            {children}
        </>
    );
}