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
                // TODO: endpoint host should come from env vars
                const res = await fetch(`http://localhost:8000/v1/users`, {
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
