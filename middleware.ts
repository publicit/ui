export { default } from "next-auth/middleware";

export const config = {
    // here we can set which paths should be intercepted by our middleware at nextjs
    // *: zero or more
    // +: one or more
    // ?: zero or one
    matcher: [
        "/share",
        "/api/auth/hello",
    ]
}