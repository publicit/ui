import { IUser, User } from "../models/user";

export function toUser(user: any): IUser {
  return Object.assign(new User(), user);
}
