import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import ApiParams from "@/app/helpers/api-params";

// found that this approach makes no sense, better to make direct requests to backend api from the page itself, like campaigns do
export async function GET(req: NextRequest) {
    const url = ApiParams().BaseURL
    const session = await getServerSession()
    try {
        if (!session || !session.user) {
            throw new Error("unauthorized")
        }
        const res = await fetch(`${url}/v1/users-list`, {
            method: "POST",
            cache: "no-cache",
        })
        const data = await res.json()
        return NextResponse.json(data)
    } catch (e) {
        return NextResponse.json(e, {
            status: 401,
        })
    }
}