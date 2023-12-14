import {trimAll, truncateTime} from "../helpers/text_utils";

export enum UserSex {
    Hombre,
    Mujer,
    Otro,
}

export class UserRegistration {
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

export function toUserRegistration(v: any): UserRegistration {
    if (!v) return new UserRegistration()
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

export function fromUserRegistration(u: UserRegistration): UserRegistration {
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


export function userRegistrationValidation() {
    return {
        first_name: (value: string) => trimAll(value).length === 0 ? "Nombre es mandatorio" : null,
        last_name: (value: string) => trimAll(value).length === 0 ? "Apellidos es mandatorio" : null,
        phone_number: (value: string) => trimAll(value).length === 0 ? "Telefono es mandatorio" : null,
        sex: (value: string) => trimAll(value).length === 0 ? "Sexo es mandatorio" : null,
        dob: (value: Date) => !value ? "Fecha de nacimiento es mandatorio" : null,
    }
}
