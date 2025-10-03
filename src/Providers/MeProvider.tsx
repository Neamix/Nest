"use client"
import useAuthStore from "@/modules/Authentication/Stores/store";
import { UserAuthStateType, UserType } from "@/modules/Authentication/types";
import { useEffect } from "react";

export default function MeProvider({children,userData}: {children: React.ReactNode,userData:UserType | null}) {
    const setUser = useAuthStore((state) => state.setUser);
    const id = useAuthStore((state) => state.user?.id);

    useEffect(() => {
        if(userData){
            setUser(userData);
        }
    }, [userData,id]);

    return (
        <>
            {children}
        </>
    );
}