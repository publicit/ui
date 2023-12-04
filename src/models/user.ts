export class User {
    email?: string
    image?: string | undefined
    name?: string

    constructor() {
        this.email = ""
        this.image = ""
        this.name = ""
    }
}

export function toUser(v: any): User {
    if (!v) return new User()
    return {
        ...v,
    }
}

export type UserProfile = {
    picture: string
    name: string
    email: string
}
