import { callApi } from "@/lib/callApi";

export async function ResetPasswordAction(data: { email: string, password: string, hash_token: string }) {
    try {
        const response = await callApi({
            endpoint: "authentication/reset-password",
            method: "POST",
            data: { 
                email: data.email,
                password: data.password,
                hash_token: data.hash_token
            }
        });

        if (!response.status) {
            return {
                success: false,
                error:  response.response.errors || { password: "Password reset failed. Please try again." },
                data: null
            };
        }

        return {
            success: true,
            error: null,
            data: response.response.data
        };
    } catch (error) {
        console.error("ResetPasswordAction error:", error);
        return {
            success: false,
            error: { password: "Password reset failed. Please try again." },
            data: null
        };
    }
}