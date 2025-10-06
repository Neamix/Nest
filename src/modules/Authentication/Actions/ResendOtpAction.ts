"use server"

import { callApi } from "@/lib/callApi";
import { ForgetPasswordType, UserAuthStateType } from "../types";

export const ResendOtpAction = async function ({ email }: ForgetPasswordType): Promise<UserAuthStateType> {
    try {
        const response = await callApi({
            endpoint: "authentication/forget-password",
            method: "POST",
            data: { email }
        });

        if (!response.status) {
            return {
                success: false,
                error:  { email: "Otp not correct" },
                data: null
            };
        }

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