import { NextRequest, NextResponse } from "next/server";
import Token from "../token";

export async function GET(request: NextRequest) {
    const token = await Token(request)
    return NextResponse.json({ token })
}