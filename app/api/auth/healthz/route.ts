import { NextRequest, NextResponse } from "next/server";
import { BaseApiURL } from "../helpers/uri";
import Token from "../token";

export async function GET(req: NextRequest) {
    const token = await Token(req)
    const base = BaseApiURL()
    const res = await fetch(`${base}/v1/healthz`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer: ${token?.email}`
        }
    })
    const data = await res.json()
    return NextResponse.json(data)
}