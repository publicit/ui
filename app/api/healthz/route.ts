import {NextRequest, NextResponse} from "next/server";
import {sessionHeaders} from "@/app/api/helpers/session-headers";

export async function GET(req: NextRequest) {
    const baseURL = process.env.BASE_API_URL
    try {
        const headers = await sessionHeaders()
        const uri = `${baseURL}/v1/healthz`
        const res = await fetch(uri, {
            method: "GET",
            headers,
        })
        const data = await res.json()
        return NextResponse.json(data)
    } catch (e) {
        const res = JSON.stringify(e, Object.getOwnPropertyNames(e))
        return NextResponse.json(JSON.parse(res))
    }
}