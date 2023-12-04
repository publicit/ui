import instance from "./axios"
import {Campaign, toCampaign} from "../models/campaign";
import {Quiz, toQuiz} from "../models/quiz";
import {Question, toQuestion} from "../models/question";
import {Answer, toAnswer} from "../models/answer";

// Campaign
async function CampaignList() {
    const res = await instance.get(`/v1/campaigns`)
    return (res.data || []).map((x: any) => toCampaign(x))
}

async function CampaignLoad(id: string) {
    const res = await instance.get(`/v1/campaigns/${id}`)
    return toCampaign(res.data)
}

async function CampaignPost(campaign: Campaign) {
    const res = await instance.post(`/v1/campaigns`, campaign)
    return toCampaign(res.data)
}

async function CampaignPut(campaign: Campaign) {
    const res = await instance.put(`/v1/campaigns/${campaign.id}`, campaign)
    return toCampaign(res.data)
}

async function CampaignDelete(campaign: Campaign) {
    const res = await instance.delete(`/v1/campaigns/${campaign.id}`)
    return toCampaign(res.data)
}

// Quiz

async function QuizList(campaign: Campaign) {
    const res = await instance.get(`/v1/quizs/${campaign.id}`)
    return (res.data || []).map((x:any) => toQuiz(x))
}

async function QuizPost(campaign: Campaign, quiz: Quiz) {
    const res = await instance.post(`v1/quizs/${campaign.id}`, quiz)
    return toQuiz(res.data)
}

async function QuizLoad(id: string) {
    const res = await instance.get(`/v1/quizs/${id}`)
    return toQuiz(res.data)
}

async function QuizPut(campaign: Campaign, quiz: Quiz) {
    const res = await instance.put(`/v1/quizs/${campaign.id}/${quiz.id}`, quiz)
    return toQuiz(res.data)
}

async function QuizDelete(campaign: Campaign, id: string) {
    const res = await instance.delete(`/v1/quizs/${campaign.id}/${id}`)
    return toQuiz(res.data)
}

// Question

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

// Answer

async function AnswerList(question: Question) {
    const res = await instance.get(`/v1/answers/${question.id}`)
    return (res.data || []).map((x: any) => toAnswer(x))
}

async function AnswerPost(question: Question, answer: Answer) {
    const res = await instance.post(`v1/answers/${question.id}`, answer)
    return toAnswer(res.data)
}

async function AnswerLoad(quiz: Quiz, id: string) {
    const res = await instance.get(`/v1/questions/${quiz.id}/${id}`)
    return toAnswer(res.data)
}

async function AnswerPut(quiz: Quiz, question: Question) {
    const res = await instance.put(`/v1/questions/${quiz.id}/${question.id}`, question)
    return toAnswer(res.data)
}

async function AnswerDelete(quiz: Quiz, id: string) {
    const res = await instance.delete(`/v1/questions/${quiz.id}/${id}`)
    return toAnswer(res.data)
}

export {
    AnswerLoad,
    AnswerList,
    AnswerPost,
    AnswerPut,
    AnswerDelete,

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