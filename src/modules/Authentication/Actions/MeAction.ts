import { callApi } from "@/lib/callApi";
import { NextRequest } from "next/server"

export const meAction = async function (request: NextRequest) {
    const token = request.cookies.get("__client_token")?.value;

    if (!token) {
        return { success: false, data: null, error: "Unauthorized" };
    }

    const user = await callApi({
        endpoint: "me",
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    
    if (!user) {
        return { success: false, data: null, error: "User not found" };
    }

    return { success: true, data: user, error: null };
}