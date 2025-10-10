import { cn } from "@/lib/utils";

export function SimpleMenuItem({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <li className={cn("simple-menu-item", className)}>{children}</li>
    );
}
