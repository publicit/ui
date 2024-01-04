import {trimAll, truncateTime} from "../helpers/text_utils";
import {FileItem} from "./file_item";

export enum UserSex {
    Hombre,
    Mujer,
    Otro,
}

export enum FileTypeNames {
    UNKNOWN_FILE_TYPE,
    INE_ID_BACK,
    INE_ID_FRONT,
    CURP_ID
}

export class UserProfile {
    id: string
    dob: Date
    first_name: string
    last_name: string
    phone_number: string
    sex: string
    user_id: string
    is_completed: boolean

    constructor() {
        this.id = ""
        this.dob = new Date()
        this.first_name = ""
        this.last_name = ""
        this.phone_number = ""
        this.user_id = ""
        this.sex = ""
        this.is_completed = false
    }
}

export function toUserProfile(v: any): UserProfile {
    if (!v) return new UserProfile()
    let sex: string = ""
    switch (v.sex) {
        case "MALE":
            sex = UserSex[UserSex.Hombre]
            break
        case "FEMALE":
            sex = UserSex[UserSex.Mujer]
            break
        default:
            sex = UserSex[UserSex.Otro]
            break
    }
    return {
        ...v,
        dob: truncateTime(new Date(v["dob"])),
        sex: sex,
    }
}

export function fromUserProfile(u: UserProfile): UserProfile {
    const clone = JSON.parse(JSON.stringify(u))
    switch (clone.sex) {
        case UserSex[UserSex.Hombre]:
            clone.sex = "MALE"
            break
        case UserSex[UserSex.Mujer]:
            clone.sex = "FEMALE"
            break
        default:
            clone.sex = "OTHER"
            break
    }
    return clone
}


export function userProfileValidation() {
    return {
        first_name: (value: string) => trimAll(value).length === 0 ? "Nombre es mandatorio" : null,
        last_name: (value: string) => trimAll(value).length === 0 ? "Apellidos es mandatorio" : null,
        phone_number: (value: string) => trimAll(value).length === 0 ? "Telefono es mandatorio" : null,
        sex: (value: string) => trimAll(value).length === 0 ? "Sexo es mandatorio" : null,
        dob: (value: Date) => !value ? "Fecha de nacimiento es mandatorio" : null,
    }
}

export type UserProfileFile = {
    id?: string
    file: FileItem
    profile?: UserProfile
    is_valid?: boolean
    type: FileTypeNames
}

export function toUserProfileFile(v: any): UserProfileFile {
    return {
        ...v,
    }
}
