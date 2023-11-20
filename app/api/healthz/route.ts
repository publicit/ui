import {NextRequest, NextResponse} from "next/server";
import {sessionHeaders} from "@/app/api/helpers/session-headers";
import ApiParams from "@/app/api/helpers/api-params";
import db from '../helpers/db'

export async function GET(req: NextRequest) {
    const params = ApiParams()
    try {
        // testing db connection from node
        const client = await db()
        await client.connect()
        const query = "SELECT email from users"
        const {rows} = await client.query(query)
        console.log("starting query from users table")
        rows.map(x => console.log(`email: ${JSON.stringify(x.email)}`))
        console.log("")
        await client.end()
        // end testing

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