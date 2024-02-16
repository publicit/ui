import {Campaign, toCampaign} from "./campaign";
import {trimAll} from "../helpers/text_utils";

export enum QuizStatus {
    draft,
    published
}

export class Quiz {
    id: string
    name: string
    video_url: string
    campaign: Campaign
    number_of_questions: number
    status: string
    youtube_video_id: string
    thumbnail_url: string
    reward_amount:number

    constructor() {
        this.id = ""
        this.name = ""
        this.video_url = ""
        this.campaign = new Campaign()
        this.number_of_questions = 1
        this.status = ""
        this.youtube_video_id = ""
        this.thumbnail_url = ""
        this.reward_amount=0
    }
}

export function toQuiz(v: any): Quiz {
    if (!v) return new Quiz()
    return {
        ...v,
        campaign: toCampaign(v.campaign),
    }
}


export function quizValidation() {
    return {
        name: (value: string) => trimAll(value).length === 0 ? "Nombre es mandatorio" : null,
        video_url: (value: string) => trimAll(value).length === 0 ? "Video es mandatorio" : null,
        number_of_questions: (value: number) => value <= 0 ? "Minimo numero de preguntas es 1" : null,
        reward_amount: (value: number) => value <= 0 ? "El monto de recompensa debe ser mayor a cero" : null,
    }
}
