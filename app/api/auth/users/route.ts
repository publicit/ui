import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
    const baseURL = process.env.BASE_API_URL
    const session = await getServerSession()
    if (!session || !session.user) {
        return NextResponse.json({
            error: "unauthorized",
        })
    }
    try {
        const res = await fetch(`${baseURL}/v1/users-list`, {
            method: "POST",
            cache: "no-cache",
        })
        const data = await res.json()
        return NextResponse.json(data)
    } catch (e) {
        return NextResponse.json(e)
    }
}