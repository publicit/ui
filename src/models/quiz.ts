import {Campaign, toCampaign} from "./campaign";
import {trimAll} from "../helpers/text_utils";

export class Quiz {
    id: string
    name: string
    video_url: string
    campaign: Campaign

    constructor() {
        this.id = ""
        this.name = ""
        this.video_url = ""
        this.campaign = new Campaign()
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
    }
}
