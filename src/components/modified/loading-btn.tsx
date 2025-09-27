"use client"
import { Button } from "@/components/ui/button"

export default function LoadingButton({
    loading
}: {
    loading?: boolean
}) {
    return (
        <Button type="submit" className="w-full font-semibold">
            Sign In Nest Grocery
            {loading && <span>loading...</span>}
        </Button>
    )
}