"use server"

import { callApi } from "@/lib/callApi";
import { ForgetPasswordType, UserAuthStateType } from "../types";

export const ForgetPasswordAction = async function ({ email }: ForgetPasswordType): Promise<UserAuthStateType> {
    try {
        // Call the forget password API
        const response = await callApi({
            endpoint: "authentication/forget-password",
            method: "POST",
            data: {
                email,
            }
        });

        // Function to set error message in the calling component
        if (!response.status) {
            return {
                success: false,
                error: "invalid_email",
                data: null
            };
        }
        
        // On successful forget password request, return user data
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