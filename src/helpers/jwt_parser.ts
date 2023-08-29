import jwtDecode from "jwt-decode";

export function parseJWTToken(token: string | undefined): any {
    if (!token) return {}
    const decoded = jwtDecode(token)
    return decoded
}