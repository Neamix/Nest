"use client"
import { Button } from "@/components/ui/button"

export default function LoadingButton({
    loading
}: {
    loading?: boolean
}) {
    return (
        <Button type="submit" className={"w-full font-semibold " + (loading ? "btn-inactive" : "")} disabled={loading} >
            Sign In Nest Grocery
        </Button>
    )
}