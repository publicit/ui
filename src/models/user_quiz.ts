import {trimAll, truncateTime} from "../helpers/text_utils";
import {Quiz, toQuiz} from "./quiz";
import {toUser, User} from "./user";

export class UserQuiz {
    id: string
    created_at: Date
    updated_at: Date
    user: User
    quiz: Quiz
    status: string
    percent_completed: number

    constructor() {
        this.id = ""
        this.created_at = new Date()
        this.updated_at = new Date()
        this.user = new User()
        this.quiz = new Quiz()
        this.status = ""
        this.percent_completed = 0
    }
}

export function toUserQuiz(v: any): UserQuiz {
    if (!v) return new UserQuiz()
    return {
        ...v,
        created_at: truncateTime(new Date(v["created_at"])),
        updated_at: truncateTime(new Date(v["updated_at"])),
        user: toUser(v.user),
        quiz: toQuiz(v.quiz),
    }
}


// TODO: check if function ever is used
export function userQuizValidation() {
    return {
        name: (value: string) => trimAll(value).length === 0 ? "Nombre es mandatorio" : null,
    }
}
