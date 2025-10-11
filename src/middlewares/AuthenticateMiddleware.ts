import { meAction } from "@/modules/Authentication/Actions/MeAction";
import { NextResponse, NextRequest } from "next/server";

export default async function AuthenticateMiddleware(request: NextRequest) {
    const protectedRoutes = ['/profile', '/dashboard', '/settings']; 
    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    const cookieStore = request.cookies;
    const token = cookieStore.get('__client_token')?.value;

    if (!isProtectedRoute) return NextResponse.next();

    if (!token && isProtectedRoute) {
        routing(request);
    }

    if (isProtectedRoute && !token) {
        routing(request);
    }

    try {
        const me  = await meAction();
        console.log("Authenticated user in middleware:", me);
    } catch (error) {
        console.error("Authentication failed in middleware:", error);
        return routing(request);
    }

    const response = NextResponse.next();
    return response;
}

function routing (request: NextRequest) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
}