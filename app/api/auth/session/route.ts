import { NextRequest, NextResponse } from "next/server";
import Session from "../session";

export async function GET(req: NextRequest) {
    const session = await Session(req)
    return NextResponse.json({ session })
}