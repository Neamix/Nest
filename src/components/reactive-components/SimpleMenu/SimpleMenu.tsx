import { cn } from "@/lib/utils";

export function SimpleMenu({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <ul className={cn('flex flex-col gap-2',className)}>
           {children}
        </ul>
    )
}