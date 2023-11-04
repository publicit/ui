import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const baseURL = process.env.BASE_API_URL
    try {
        const res = await fetch(`${baseURL}/v1/healthz`)
        const data = await res.json()
        return NextResponse.json(data)
    } catch (e) {
        return NextResponse.json(e)
    }
}