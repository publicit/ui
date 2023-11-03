import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    const data = { hello: "there" }
    return NextResponse.json(data, {
        status: 200,
    })
}