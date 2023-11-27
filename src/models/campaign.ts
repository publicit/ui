import {User} from "./user";

export class Campaign {
    id: string
    name: string
    start_date: Date
    end_date: Date
    user: User
    image?: string
    description: string
    status: string

    constructor() {
        this.id = ""
        this.name = ""
        this.description = ""
        this.user = new User()
        this.start_date = new Date()
        this.end_date = new Date()
        this.status = ""
    }
}

function toCampaign(v: any): Campaign {
    return {
        ...v,
        start_date: new Date(),
        ned_date: new Date(),
    }
}