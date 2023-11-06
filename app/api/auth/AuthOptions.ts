import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // we simply return the base URL, which is home page for the time being
            return baseUrl
        },
        async signIn({ user, account, profile, email, credentials }) {
            try {
                console.log(`incoming payload: ${JSON.stringify(user, null, 2)}`)
                // TODO: POST the user to /v1/users
                const res = await fetch(`http://localhost:8000/v1/users`, {
                    method: "POST",
                    body: JSON.stringify(user),
                })
                const data = await res.json()
                console.log(`data: ${JSON.stringify(data, null, 2)}`)
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
