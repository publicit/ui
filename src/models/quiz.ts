import {Campaign, toCampaign} from "./campaign";
import {trimAll} from "../helpers/text_utils";

export class Quiz {
    id: string
    name: string
    video_url: string
    campaign: Campaign
    number_of_questions: number

    constructor() {
        this.id = ""
        this.name = ""
        this.video_url = ""
        this.campaign = new Campaign()
        this.number_of_questions = 1
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
        number_of_questions: (value: number) => value <= 0 ? "Minimo numero de preguntas es 1" : 0,
    }
}
