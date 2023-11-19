import {getServerSession} from "next-auth";

export async function sessionHeaders() {
    const session = await getServerSession()
    if (!session || !session?.user) {
        throw new Error("unauthorized")
    }
    const {user} = session
    return {
        'x-email': user.email,
    }
}