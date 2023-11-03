import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default async function Session(req: NextRequest) {
    const session = await getToken({req})
    return session
}