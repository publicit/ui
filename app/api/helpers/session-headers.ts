import {getServerSession} from "next-auth";

type SessionHeader = {
    'x-user-email'?: string | undefined
}

export async function sessionHeaders():Promise<SessionHeader>{
    const session = await getServerSession()
    if (!session || !session?.user) {
        // we don't want to force any route to be authenticated at this point
        return {}
    }
    const {user} = session
    return {
        'x-user-email': user?.email || '',
    }
}