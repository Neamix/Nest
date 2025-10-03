"use server"

import { callApi } from "@/lib/callApi";
import { cookies } from "next/headers";
import { LoginCredentialsType, UserAuthStateType } from "../types";
import useAuthStore from "../Stores/store";

export const loginAction = async function ({ email,password,device_token}:LoginCredentialsType):Promise<UserAuthStateType> {
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

        // Update the auth store with user data
        const headers = new Headers();
        console.log("Login Action - Fetched User:", response.response.data.data);
        headers.set('x-user-data', JSON.stringify(response.response.data.data));

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