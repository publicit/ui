import {trimAll} from "../helpers/text_utils";
import {Quiz, toQuiz} from "./quiz";

export enum QuestionType {
    single,
    multiple,
}

export class Question {
    id: string
    body: string
    type: string
    quiz: Quiz

    constructor() {
        this.id = ""
        this.body = ""
        this.quiz = new Quiz()
        this.type = QuestionType[QuestionType.single]
    }
}

export function toQuestion(v: any): Question {
    if (!v) return new Question()
    return {
        ...v,
        quiz: toQuiz(v.quiz),
    }
}


export function questionValidation() {
    return {
        body: (value: string) => trimAll(value).length === 0 ? "Texto es mandatorio" : null,
        type: (value: string) => trimAll(value).length === 0 ? "Tipo es mandatorio" : null,
    }
}
