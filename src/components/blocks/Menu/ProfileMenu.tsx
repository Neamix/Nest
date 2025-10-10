"use client";

import { SimpleMenu } from "@/components/reactive-components/SimpleMenu/SimpleMenu";
import { SimpleMenuItem } from "@/components/reactive-components/SimpleMenu/SimpleMenuItem";
import { useActiveClass } from "@/lib/url/activeUrl";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ProfileMenu() {
    const isActive = useActiveClass("active-link");
    return (
        <>
            <SimpleMenu className="max-w-[200px] w-full font-bold">
                <SimpleMenuItem >
                    <Link
                        href="/profile"
                        className={cn(isActive("/profile"), "flex items-center gap-2 px-2 py-2 w-full h-full rounded-md")}
                    >
                        <span>My Profile</span>
                    </Link>
                </SimpleMenuItem>
                <SimpleMenuItem className="p-0">
                    <Link
                        href="/profile/myorders"
                        className={cn(isActive("/profile/myorders"), "flex items-center gap-2 px-2 py-2 w-full h-full rounded-md")}
                    >
                        <span>My Orders</span>
                    </Link>
                </SimpleMenuItem>
            </SimpleMenu>
        </>
    )
}