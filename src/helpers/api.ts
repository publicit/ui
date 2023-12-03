import instance from "./axios"
import {Campaign, toCampaign} from "../models/campaign";
import {Quiz, toQuiz} from "../models/quiz";
import {Question, toQuestion} from "../models/question";

async function CampaignList() {
    const res = await instance.get(`/v1/campaigns`)
    return (res.data || []).map((x: any) => toCampaign(x))
}

async function CampaignLoad(id: string) {
    const res = await instance.get(`/v1/campaigns/${id}`)
    return toCampaign(res.data)
}

async function CampaignPost(c: Campaign) {
    const res = await instance.post(`/v1/campaigns`, c)
    return toCampaign(res.data)
}

async function CampaignPut(c: Campaign) {
    const res = await instance.put(`/v1/campaigns/${c.id}`, c)
    return toCampaign(res.data)
}

async function CampaignDelete(c: Campaign) {
    const res = await instance.delete(`/v1/campaigns/${c.id}`)
    return toCampaign(res.data)
}

async function QuizList(c: Campaign) {
    const res = await instance.get(`/v1/quizs/${c.id}`)
    return toQuiz(res.data)
}

async function QuizPost(c: Campaign, q: Quiz) {
    const res = await instance.post(`v1/quizs/${c.id}`, q)
    return toQuiz(res.data)
}

async function QuizLoad(c: Campaign, id: string) {
    const res = await instance.get(`/v1/quizs/${c.id}/${id}`)
    return toQuiz(res.data)
}

async function QuizPut(c: Campaign, q: Quiz) {
    const res = await instance.put(`/v1/quizs/${c.id}/${q.id}`)
    return toQuiz(res.data)
}

async function QuizDelete(c: Campaign, id: string) {
    const res = await instance.delete(`/v1/quizs/${c.id}/${id}`)
    return toQuiz(res.data)
}

async function QuestionList(quiz: Quiz) {
    const res = await instance.get(`/v1/questions/${quiz.id}`)
    return (res.data || []).map((x: any) => toQuestion(x))
}

async function QuestionPost(quiz: Quiz, question: Question) {
    const res = await instance.post(`v1/quizs/${quiz.id}`, question)
    return toQuestion(res.data)
}

async function QuestionLoad(quiz: Quiz, id: string) {
    const res = await instance.get(`/v1/questions/${quiz.id}/${id}`)
    return toQuestion(res.data)
}

async function QuestionPut(quiz: Quiz, question: Question) {
    const res = await instance.put(`/v1/questions/${quiz.id}/${question.id}`, question)
    return toQuestion(res.data)
}

async function QuestionDelete(quiz: Quiz, id: string) {
    const res = await instance.delete(`/v1/questions/${quiz.id}/${id}`)
    return toQuestion(res.data)
}

export {
    CampaignLoad,
    CampaignList,
    CampaignPost,
    CampaignPut,
    CampaignDelete,

    QuestionLoad,
    QuestionPut,
    QuestionDelete,
    QuestionPost,
    QuestionList,

    QuizList,
    QuizPost,
    QuizLoad,
    QuizPut,
    QuizDelete,
}