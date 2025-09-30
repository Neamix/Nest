"use server"

import { callApi } from "@/lib/callApi";
import { cookies } from "next/headers";
import { RegisterCredentialsType, UserAuthStateType } from "../types";

export const registerAction = async function ({ email,password,device_token,first_name,last_name = ""}:RegisterCredentialsType):Promise<UserAuthStateType> {
    try {
        // Call the login API
        const response = await callApi({
            endpoint: "authentication/register",
            method: "POST",
            data: {
                first_name,
                last_name,
                email,
                password,
                device_token
            }
        });
        
        // Function to set error message in the calling component
        if (!response.status) {
            console.log(response);
            return {
                success: false,
                error: "Invalid credentials. Please check your email and password.",
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
            maxAge: 60 * 60 * 24 * 7 * 30 // 35 days
        });

        // On successful login, return user data
        return {
            success: true,
            error: null,
            data: response.response.data
        };
    } catch (error) {
        return {
            success: false,
            error: "Network error. Please check your connection and try again.",
            data: null
        };
    }
}