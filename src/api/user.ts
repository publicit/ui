import {toUser} from "../adapters/user";
import instance from "./axios";

export async function getUsers(params?: any) {
    const r = await instance.get(`/v1/users`, params);
    const data = r.data || [];
    return data.map((x: any) => toUser(x));
}

export async function getUser(id: string) {
    const r = await instance.get(`/v1/users/${id}`);
    return r.data || {};
}
