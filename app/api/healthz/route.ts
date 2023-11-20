import {NextRequest, NextResponse} from "next/server";
import {sessionHeaders} from "@/app/api/helpers/session-headers";
import ApiParams from "@/app/api/helpers/api-params";

export async function GET(req: NextRequest) {
    const params = ApiParams()
    try {
        const headers = await sessionHeaders()
        const uri = `${params.BaseURL}/v1/healthz`
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