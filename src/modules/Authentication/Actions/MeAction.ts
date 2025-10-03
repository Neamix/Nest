import { callApi } from "@/lib/callApi";
import { cookies } from "next/headers";
import { UserAuthStateType, UserType } from "../types";

export const meAction = async function (): Promise<UserAuthStateType> {
    const cookieStore = await cookies();
    const token = cookieStore.get("__client_token")?.value;

    if (!token) {
        return { success: false, data: null, error: "Unauthorized" };
    }

    const userResponse = await callApi({
        endpoint: "me",
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!userResponse.status) {
        return { success: false, data: null, error: "User not found" };
    }

    const user: UserType = userResponse.response.data;
    return { success: true, data: user, error: null };
}