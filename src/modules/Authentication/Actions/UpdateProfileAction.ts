"use server";
import { callApi } from "@/lib/callApi";
import { LoginActionResult, UpdateProfileType } from "../types";
import { ca } from "zod/v4/locales";
import { revalidateTag } from 'next/cache'

export async function UpdateProfileAction({ first_name, last_name, email, phone, country_code }: UpdateProfileType): Promise<LoginActionResult> {
   
    try {
        const response = await callApi({
            endpoint: "/api/profile/update",
            method: "POST",
            data: { first_name, last_name, phone, country_code },
        });

        // Revaldate the 'me' tag to update user data across the app
        revalidateTag('me');
        console.log("Revalidating 'me' tag");
        return {
            success: true,
            error: null,
            data: response.response.data
        };
    } catch (error) {
        return {
            success: false,
            error: { email: "Network error. Please try again." },
            data: null
        };
    }

}
