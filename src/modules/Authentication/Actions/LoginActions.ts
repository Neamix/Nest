"use server"

import { callApi } from "@/lib/callApi";
import { cookies } from "next/headers";
import { UserLoginType,LoginActionResult } from "../types";

export const LoginAction = async function ({ email, password }: UserLoginType): Promise<LoginActionResult> {
    try {
        const device_token = "test_device_token"; // Replace with actual device token logic if needed
        const response = await callApi({
            endpoint: "authentication/login",
            method: "POST",
            data: { email, password, device_token }
        });

        if (!response.status) {
            return {
                success: false,
                error:  { email: "Invalid email or password" },
                data: null
            };
        }

        // Validate response shape
        if (!response.response?.data?.token) {
            console.error("Invalid API response shape:", response);
            return {
                success: false,
                error: { general: "Server error occurred" },
                data: null
            };
        }
        
        // Save token to cookie
        const cookieStore = await cookies();
        cookieStore.set("__client_token", response.response.data.token, { 
            path: '/',
            httpOnly: true,
            secure: process.env.APP_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30 // 30 days
        });

        return {
            success: true,
            error: null,
            data: response.response.data
        };
    } catch (error) {
        console.error("Login action error:", error);
        return {
            success: false,
            error: { email: "Network error. Please try again." },
            data: null
        };
    }
}