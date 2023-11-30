import {User} from "./user";
import {trimAll, truncateTime} from "../helpers/text_utils";

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

    clone(): Campaign {
        return JSON.parse(JSON.stringify(this))
    }

    clean(): Campaign {
        const clone: Campaign = this.clone()
        clone.start_date = truncateTime(clone.start_date)
        clone.end_date = truncateTime(clone.end_date)
        return clone
    }
}

export function toCampaign(v: any): Campaign {
    return {
        ...v,
        start_date: new Date(v["start_date"]),
        end_date: new Date(v["end_date"]),
        image: v["image_url"],
    }
}

export function campaignValidation() {
    return {
        name: (value: string) => trimAll(value).length === 0 ? "Nombre es mandatorio" : null,
        start_date: (value: Date) => !value ? "Fecha de inicio es mandatorio" : null,
        end_date: (value: Date) => !value ? "Fecha de termino es mandatorio" : null,
    }
}