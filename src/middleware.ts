import { NextRequest } from "next/server";
import AuthenticateMiddleware from "./middlewares/AuthenticateMiddleware";

export default function middleware (request: NextRequest) {
    const kernel = [
        AuthenticateMiddleware
    ]

    // Run each middleware in the kernel
    kernel.forEach(middleware => {
        const response = middleware(request);
        if (response) {
            return response;
        }
    });
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};