"use server"

import { callApi } from "@/lib/callApi";
import { cookies } from "next/headers";

export const loginAction = async function ({ email,password,device_token,fn}: {
    email: string,
    password: string,
    device_token: string,
    fn: (value: string) => void
}) {
    // Call the login API
    const response = await callApi({
        endpoint: "authentication/login",
        method: "POST",
        data: {
            email,
            password,
            device_token
        }
    });
    
    // Function to set error message in the calling component
    if (!response.status) {
        fn("Login failed. Please try again.");
        return;
    }
    
    // Save token to cookie
    const cookieStore = await cookies();
    cookieStore.set("token", response.response.data.token, { path: '/' });
    
    // On successful login, return user data
    return response.response.data;
}