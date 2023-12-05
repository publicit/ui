import instance from "./axios"
import {Campaign, toCampaign} from "../models/campaign";
import {Quiz, toQuiz} from "../models/quiz";
import {Question, toQuestion} from "../models/question";
import {Answer, toAnswer} from "../models/answer";
import {toUserRegistration, UserRegistration} from "../models/user_registration";
import {toUser} from "../models/user";

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

async function CampaignDelete(id:string) {
    const res = await instance.delete(`/v1/campaigns/${id}`)
    return toCampaign(res.data)
}

// Quiz

async function QuizList(campaignId:string) {
    const res = await instance.get(`/v1/quizs?campaign_id=${campaignId}`)
    return (res.data || []).map((x:any) => toQuiz(x))
}

async function QuizPost(quiz: Quiz) {
    const res = await instance.post(`v1/quizs`, quiz)
    return toQuiz(res.data)
}

async function QuizLoad(id: string) {
    const res = await instance.get(`/v1/quizs/${id}`)
    return toQuiz(res.data)
}

async function QuizPut( quiz: Quiz) {
    const res = await instance.put(`/v1/quizs/${quiz.id}`, quiz)
    return toQuiz(res.data)
}

async function QuizDelete(id:string) {
    const res = await instance.delete(`/v1/quizs/${id}`)
    return toQuiz(res.data)
}

// Question

async function QuestionList(quizId: string) {
    const res = await instance.get(`/v1/questions?quiz_id=${quizId}`)
    return (res.data || []).map((x: any) => toQuestion(x))
}

async function QuestionPost( question: Question) {
    const res = await instance.post(`v1/questions`, question)
    return toQuestion(res.data)
}

async function QuestionLoad(id:string) {
    const res = await instance.get(`/v1/questions/${id}`)
    return toQuestion(res.data)
}

async function QuestionPut(question: Question) {
    const res = await instance.put(`/v1/questions/${question.id}`, question)
    return toQuestion(res.data)
}

async function QuestionDelete( id:string) {
    const res = await instance.delete(`/v1/questions/${id}`)
    return toQuestion(res.data)
}

// Answer

async function AnswerList(questionId:string) {
    const res = await instance.get(`/v1/answers?question_id=${questionId}`)
    return (res.data || []).map((x: any) => toAnswer(x))
}

async function AnswerPost(answer: Answer) {
    const res = await instance.post(`v1/answers`, answer)
    return toAnswer(res.data)
}

async function AnswerLoad(id:string) {
    const res = await instance.get(`/v1/answers/${id}`)
    return toAnswer(res.data)
}

async function AnswerPut(answer:Answer) {
    const res = await instance.put(`/v1/answers/${answer.id}`, answer)
    return toAnswer(res.data)
}

async function AnswerDelete(id:string) {
    const res = await instance.delete(`/v1/answers/${id}`)
    return toAnswer(res.data)
}

async function UserRegistrationPost(userRegistration:UserRegistration){
    const res = await instance.post(`/v1/user-registration`,userRegistration)
    return toUserRegistration(res.data)
}

async function UserRegistrationLoad(userId:string){
    const res = await instance.get(`/v1/user-registration/${userId}`)
    return toUserRegistration(res.data)
}

async function UserWhoAmi(){
    const res = await instance.get(`/v1/users/whoami`)
    return toUser(res.data)
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

    UserRegistrationPost,
    UserRegistrationLoad,
    UserWhoAmi,
}