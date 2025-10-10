"use client";

import { usePathname } from "next/navigation";

export function useActiveClass(className: string) {
    const pathname = usePathname();
    
    return (path: string) => {
        return pathname === path ? className : "";
    };
}
