import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default async function Token(request: NextRequest) {
    const token = await getToken({ req: request })
    return token
}