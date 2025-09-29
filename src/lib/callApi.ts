import { stat } from "fs";

export async function callApi({endpoint, store = {type: "ssr"}, headers = {}, method = "POST", data = {}}: 
    {endpoint: string, store?: {type: "isr" | "ssr" | "static", revalidate?: number}, headers?: Record<string, string>, method?: string, data?: unknown}) {
    const { type, revalidate } = store;

    // Get API URL - prefer server-side, fallback to client-side
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
        throw new Error("API_URL is not defined in environment variables");
    }

    // Build fetch options based on store type'
    const fetchOptions : RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(data),
    };

    // Handle different store types
    if (type === "isr" && revalidate) {
        fetchOptions.next = { revalidate: revalidate };
    } else if (type === "ssr") {
        fetchOptions.cache = "no-store";
    } else if (type === "static") {
        fetchOptions.cache = "force-cache";
    }
    
    // Make the API call
    const response = await fetch(`${apiUrl}${endpoint}`, fetchOptions);
    if (!response.ok) {
        return {
            status: false,
            statusCode: response.status,
            response: await response.json()
        }
    }

    else {
        return {
            status: true,
            statusCode: response.status,
            response: await response.json()
        }
    }
}