"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function LoadingButton({
    loading,
    className,
    children,
    ...props
}: {
    loading?: boolean,
    className?: string,
    children: React.ReactNode
}) {
    return (
        <Button type="submit" className={cn("w-full font-semibold btn", className, { "btn-inactive": loading })} disabled={loading} {...props}>
            {loading && (
                <div className="spinner-border">
                    <div className="inner-spin"></div>
                </div>
            )}

            {children}
        </Button>
    )
}