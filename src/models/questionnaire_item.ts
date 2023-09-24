import {IUser, User} from "./user";

export class QuestionnaireItem {
    id: string
    created: Date
    user: IUser
    url?: string | undefined
    status: string

    constructor() {
        this.id = ""
        this.created = new Date()
        this.user = new User()
        this.status = ""
    }
}

