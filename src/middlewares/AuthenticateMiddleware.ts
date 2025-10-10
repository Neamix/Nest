import { NextResponse, NextRequest } from "next/server";

export default async function AuthenticateMiddleware(request: NextRequest) {
    const protectedRoutes = ['/profile', '/dashboard', '/settings']; 
    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    const cookieStore = request.cookies;
    const token = cookieStore.get('__client_token')?.value;

    if (!isProtectedRoute) return NextResponse.next();
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();
    return response;
}