import { callApi } from "@/lib/callApi";

export async function POST(request: Request) {
    const response = await callApi({
        endpoint: "/auth/login",
        method: "POST",
        data: await request.json()
    });
    
    return Response.json(response);
}