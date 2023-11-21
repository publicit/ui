import {toUser, User} from "@/app/domain/user";

export class Campaign {
    id: string
    name: string
    start_date: Date
    end_date: Date
    user: User

    constructor() {
        this.id = ""
        this.name = ""
        this.start_date = new Date()
        this.end_date = new Date()
        this.user = new User()
    }
}

export function toCampaign(v: any): Campaign {
    return {
        ...v,
        start_date: new Date(v.start_date),
        end_date: new Date(v.end_date),
        user: toUser(v.user),
    }
}