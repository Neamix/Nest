import { meAction } from "@/modules/Authentication/Actions/MeAction";
import { NextResponse,NextRequest } from "next/server";

export default async function AuthenticateMiddleware (request: NextRequest) {
    const token = request.cookies.get("__client_token")?.value;

    // If no token is present, continue without modification
    if (!token) {
        return NextResponse.next();
    }

    // If user data is already present in headers, skip fetching
    if (request.headers.get('x-user-data')) {
        return NextResponse.next();
    }

    // Fetch user data using the token
    const getUser = await meAction(request);
    if (getUser.success && getUser.data) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-data', JSON.stringify(getUser.data));

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            }
        });
    } 

    // If fetching user data failed, continue without modification
    return NextResponse.next();
}