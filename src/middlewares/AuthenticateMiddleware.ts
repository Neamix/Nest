import { meAction } from "@/modules/Authentication/Actions/MeAction";
import { NextResponse, NextRequest } from "next/server";

export default async function AuthenticateMiddleware(request: NextRequest) {
    const response = NextResponse.next();
    return response;
}