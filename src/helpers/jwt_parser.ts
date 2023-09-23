import jwtDecode from "jwt-decode";

export function parseJWTToken(token: string | undefined): any {
  return token ? jwtDecode(token) : {};
}
