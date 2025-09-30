"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function LoadingButton({
    loading,
    className,
    ...props
}: {
    loading?: boolean,
    className?: string,
}) {
    return (
        <Button type="submit" className={cn("w-full font-semibold btn", className, { "btn-inactive": loading })} disabled={loading} {...props}>
            Sign In Nest Grocery
        </Button>
    )
}