export class User {
    created: Date
    id: string
    name: string
    email: string
    image?: string | undefined
    last_login: Date

    constructor() {
        this.created = new Date()
        this.id = ""
        this.name = ""
        this.email = ""
        this.image = ""
        this.last_login = new Date()
    }
}


export function toUser(v: any): User {
    return {
        ...v,
        created: new Date(v.created),
        last_login: new Date(v.last_login),
    }
}