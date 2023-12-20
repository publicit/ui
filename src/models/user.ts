export class User {
    email?: string
    image?: string | undefined
    name?: string
    id?: string
    last_login_date: Date

    constructor() {
        this.email = ""
        this.image = ""
        this.name = ""
        this.id = ""
        this.last_login_date = new Date()
    }
}

export function toUser(v: any): User {
    if (!v) return new User()
    return {
        ...v,
        last_login_date: new Date(),
    }
}

export type UserProfile = {
    picture: string
    name: string
    email: string
}
