import instance from "./axios"
import {Campaign, toCampaign} from "../models/campaign";
import {Quiz, toQuiz} from "../models/quiz";
import {Question, toQuestion} from "../models/question";
import {Answer, toAnswer} from "../models/answer";
import {toUserProfile, toUserProfileFile, UserProfile, UserProfileFile} from "../models/user_profile";
import {toUser} from "../models/user";
import {toUserQuiz, UserQuiz, UserQuizSummary} from "../models/user_quiz";
import {UserNextQuestion} from "../models/user_question";
import {Role} from "../models/role";
import {FileItem, toFileItem} from "../models/file_item";

/////////////////////////////////////////////////////////////
// Answer
/////////////////////////////////////////////////////////////

async function AnswerList(questionId: string) {
    const res = await instance.get(`/v1/answers?question_id=${questionId}`)
    return (res.data || []).map((x: any) => toAnswer(x))
}

async function AnswerPost(answer: Answer) {
    const res = await instance.post(`v1/answers`, answer)
    return toAnswer(res.data)
}

async function AnswerLoad(id: string) {
    const res = await instance.get(`/v1/answers/${id}`)
    return toAnswer(res.data)
}

async function AnswerPut(answer: Answer) {
    const res = await instance.put(`/v1/answers/${answer.id}`, answer)
    return toAnswer(res.data)
}

async function AnswerDelete(id: string) {
    const res = await instance.delete(`/v1/answers/${id}`)
    return toAnswer(res.data)
}

/////////////////////////////////////////////////////////////
// Campaign
/////////////////////////////////////////////////////////////

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

async function CampaignDelete(id: string) {
    const res = await instance.delete(`/v1/campaigns/${id}`)
    return toCampaign(res.data)
}

/////////////////////////////////////////////////////////////
// File
/////////////////////////////////////////////////////////////

async function FileItemUpload(f: FileItem, file: File) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("json", JSON.stringify({
        ...f,
        type: file?.type,
    }))
    const res = await instance({
        data: formData,
        method: "post",
        url: `/v1/files`,
        headers: {
            'accept': 'application/json',
            'content-type': 'multipart/form-data',
        }
    })
    return toFileItem(res.data)
}

async function FileTypes() {
    const res = await instance.get(`/v1/user-profile/files/types`)
    return (res.data || [])
}


/////////////////////////////////////////////////////////////
// Question
/////////////////////////////////////////////////////////////

async function QuestionList(quizId: string) {
    const res = await instance.get(`/v1/questions?quiz_id=${quizId}`)
    return (res.data || []).map((x: any) => toQuestion(x))
}

async function QuestionPost(question: Question) {
    const res = await instance.post(`v1/questions`, question)
    return toQuestion(res.data)
}

async function QuestionLoad(id: string) {
    const res = await instance.get(`/v1/questions/${id}`)
    return toQuestion(res.data)
}

async function QuestionPut(question: Question) {
    const res = await instance.put(`/v1/questions/${question.id}`, question)
    return toQuestion(res.data)
}

async function QuestionDelete(id: string) {
    const res = await instance.delete(`/v1/questions/${id}`)
    return toQuestion(res.data)
}

/////////////////////////////////////////////////////////////
// Quiz
/////////////////////////////////////////////////////////////

async function QuizList(campaignId: string) {
    const res = await instance.get(`/v1/quizs?campaign_id=${campaignId}`)
    return (res.data || []).map((x: any) => toQuiz(x))
}

async function QuizPost(quiz: Quiz) {
    const res = await instance.post(`v1/quizs`, quiz)
    return toQuiz(res.data)
}

async function QuizLoad(id: string) {
    const res = await instance.get(`/v1/quizs/${id}`)
    return toQuiz(res.data)
}

async function QuizLoadByToken(token: string) {
    const res = await instance.get(`/v1/quizs/invitation/${token}`)
    return toQuiz(res.data)
}

async function QuizRegisterInvitation(token: string) {
    await instance.post(`/v1/quizs/invitation/${token}`)
    return {}
}

async function QuizPut(quiz: Quiz) {
    const res = await instance.put(`/v1/quizs/${quiz.id}`, quiz)
    return toQuiz(res.data)
}

async function QuizDelete(id: string) {
    const res = await instance.delete(`/v1/quizs/${id}`)
    return toQuiz(res.data)
}

async function QuizPublish(id: string) {
    const res = await instance.post(`/v1/quizs/${id}/publish`)
    return toQuiz(res.data)
}

/////////////////////////////////////////////////////////////
// Role
/////////////////////////////////////////////////////////////

async function RoleList() {
    const res = await instance.get(`/v1/roles`)
    return (res.data || []).map((x: any) => x as Role)
}

async function RolePut(role: Role) {
    const res = await instance.put(`/v1/roles/${role.id}`, role)
    return res.data as Role
}

async function RoleGet(id: string) {
    const res = await instance.get(`/v1/roles/${id}`)
    return res.data as Role
}

async function RoleDelete(id: string) {
    const res = await instance.delete(`/v1/roles/${id}`)
    return res.data as Role
}

async function RoleAddUser(roleId: string, userId: string) {
    const res = await instance.put(`/v1/roles/${roleId}/users/${userId}`)
    return res.data
}

async function RoleRemoveUser(roleId: string, userId: string) {
    const res = await instance.delete(`/v1/roles/${roleId}/users/${userId}`)
    return res.data
}

async function RolesInUser(userId: string) {
    const res = await instance.get(`/v1/users/${userId}/roles`)
    return (res.data || []).map((x: any) => x as Role)
}

async function UsersInRole(roleId: string) {
    const res = await instance.get(`/v1/roles/${roleId}/users`)
    return (res.data || []).map((x: any) => toUser(x))
}

/////////////////////////////////////////////////////////////
// User Profile
/////////////////////////////////////////////////////////////

async function UserProfilePost(profile: UserProfile) {
    const res = await instance.post(`/v1/user-profile`, profile)
    return toUserProfile(res.data)
}

async function UserProfileLoad() {
    const res = await instance.get(`/v1/user-profile`)
    return toUserProfile(res.data)
}

async function UserProfileFilesLoad() {
    const res = await instance.get(`/v1/user-profile/files`)
    return (res.data || []).map((x: any) => toUserProfileFile(x))
}

async function UserProfileFileSave(file: UserProfileFile){
    const res = await instance.put(`/v1/user-profile/files`,file)
    return toUserProfileFile(res.data)
}

/////////////////////////////////////////////////////////////
// User Quiz
/////////////////////////////////////////////////////////////

async function UserQuizList() {
    const res = await instance.get(`/v1/users/quizs`)
    return (res.data || []).map((x: UserQuiz) => toUserQuiz(x))
}

async function UserQuizNextQuestion(userQuiz: UserQuiz) {
    const res = await instance.get(`/v1/users/quizs/${userQuiz.id}/questions`)
    return res.data as UserNextQuestion
}

async function UserQuizRegister(quiz: Quiz) {
    const res = await instance.post(`/v1/users/quizs/${quiz.id}`)
    return res.data as UserNextQuestion
}

type UserQuestionSendAnswersParams = {
    quizId: string
    questionId: string
    answers: string[]
}

async function UserQuestionSendAnswers({questionId, quizId, answers}: UserQuestionSendAnswersParams) {
    const res = await instance.put(`/v1/users/quizs/${quizId}/questions/${questionId}/answers`, answers)
    return res.data as UserNextQuestion
}

async function GetUserQuizSummary(userQuizId: string) {
    const res = await instance.get(`/v1/users/quizs/${userQuizId}/summary`)
    return res.data as UserQuizSummary
}

async function PostUserQuizRetry(userQuizId: string) {
    const res = await instance.post(`/v1/users/quizs/${userQuizId}/retry`)
    return res.data
}

async function UserQuizShareLink(userQuizId: string) {
    const res = await instance.post(`/v1/users/quizs/${userQuizId}/share`)
    return res.data
}

/////////////////////////////////////////////////////////////
// User
/////////////////////////////////////////////////////////////

async function PostUserList() {
    const res = await instance.post(``)
    return (res.data || []).map((x: any) => toUser(x))
}

async function UserWhoAmi() {
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

    FileItemUpload,
    FileTypes,

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
    QuizPublish,
    QuizLoadByToken,
    QuizRegisterInvitation,

    RoleList,
    RolePut,
    RoleGet,
    RoleDelete,
    RoleAddUser,
    RoleRemoveUser,
    RolesInUser,
    UsersInRole,

    UserQuizList,
    UserQuizNextQuestion,
    UserQuestionSendAnswers,
    GetUserQuizSummary,
    PostUserQuizRetry,
    UserQuizShareLink,
    UserQuizRegister,

    UserProfilePost,
    UserProfileLoad,
    UserProfileFilesLoad,
    UserProfileFileSave,

    UserWhoAmi,
    PostUserList,
}