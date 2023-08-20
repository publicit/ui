import { IUser } from "../models/user";

export function userFullName(u: IUser | undefined): string {
  return !!u ? `${u.first_name} ${u.last_name}` : "";
}
