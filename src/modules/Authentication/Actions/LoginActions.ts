"use server"

import { callApi } from "@/lib/callApi";
import { cookies } from "next/headers";
import { LoginCredentialsType, UserAuthStateType } from "../types";

export const LoginAction = async function ({ email,password,device_token}:LoginCredentialsType):Promise<UserAuthStateType> {
    try {
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
            return {
                success: false,
                error: "invalid_credentials",
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