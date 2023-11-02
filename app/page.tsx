import {getServerSession} from "next-auth";
import { authOptions } from "./api/auth/AuthOptions";

export default async function Home() {
    const session = await getServerSession(authOptions)
    return (
        <main className="p-3">
            <div>
                <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
            </div>
        </main>
    )
}
