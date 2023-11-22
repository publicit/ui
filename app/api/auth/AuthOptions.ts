import {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const baseApiUrl = process.env.BASE_API_URL

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    response_type: "code",
                }
            },
        })
    ],
    callbacks: {
        async redirect({url, baseUrl}) {
            // we simply return the base URL, which is home page for the time being
            return baseUrl
        },
        async signIn({user, account, profile, email, credentials}) {
            try {
                // we make a request to the backend on each login,
                // so we have the latest user information in database.
                const res = await fetch(`${baseApiUrl}/v1/users/login`, {
                    method: "POST",
                    body: JSON.stringify(user),
                })
                return true
            } catch (e) {
                console.log(e)
                return false
            }
        },
    },
    session: {
        strategy: "jwt",
    }
}
