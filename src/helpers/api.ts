import instance from './axios';

// Models :
import { Role } from '../models/role';
import { toUser } from '../models/user';
import { Quiz, toQuiz } from '../models/quiz';
import { toAddress } from '../models/address';
import { Answer, toAnswer } from '../models/answer';
import { toUserReward } from '../models/user_reward';
import { Question, toQuestion } from '../models/question';
import { Location, toLocation } from '../models/location';
import { UserNextQuestion } from '../models/user_question';
import { FileItem, toFileItem } from '../models/file_item';
import { toUserQuizShare } from '../models/user_quiz_share';
import { Campaign, notTrunCampaign } from '../models/campaign';
import { toUserQuiz, UserQuiz, UserQuizSummary } from '../models/user_quiz';
import {
  toUserProfile,
  toUserProfileFile,
  UserProfile,
  UserProfileFile,
} from '../models/user_profile'; /////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
// Answer
/////////////////////////////////////////////////////////////

async function AnswerList(questionId: string) {
  const res = await instance.get(`/v1/answers?question_id=${questionId}`);
  return (res.data || []).map((x: any) => toAnswer(x));
}

async function AnswerPost(answer: Answer) {
  const res = await instance.post(`v1/answers`, answer);
  return toAnswer(res.data);
}

async function AnswerLoad(id: string) {
  const res = await instance.get(`/v1/answers/${id}`);
  return toAnswer(res.data);
}

async function AnswerPut(answer: Answer) {
  const res = await instance.put(`/v1/answers/${answer.id}`, answer);
  return toAnswer(res.data);
}

async function AnswerDelete(id: string) {
  const res = await instance.delete(`/v1/answers/${id}`);
  return toAnswer(res.data);
}

/////////////////////////////////////////////////////////////
// Campaign
/////////////////////////////////////////////////////////////

async function CampaignList() {
  const res = await instance.get(`/v1/campaigns`);
  return (res.data || []).map((x: any) => notTrunCampaign(x));
}

async function CampaignLoad(id: string) {
  const res = await instance.get(`/v1/campaigns/${id}`);
  return notTrunCampaign(res.data);
}

async function CampaignPost(campaign: Campaign) {
  const res = await instance.post(`/v1/campaigns`, campaign);
  return notTrunCampaign(res.data);
}

async function CampaignPut(campaign: Campaign) {
  const res = await instance.put(`/v1/campaigns/${campaign.id}`, campaign);
  return notTrunCampaign(res.data);
}

async function CampaignDelete(id: string) {
  const res = await instance.delete(`/v1/campaigns/${id}`);
  return notTrunCampaign(res.data);
}

/////////////////////////////////////////////////////////////
// File
/////////////////////////////////////////////////////////////

async function FileItemUpload(f: FileItem, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'json',
    JSON.stringify({
      ...f,
      type: file?.type,
    })
  );
  const res = await instance({
    data: formData,
    method: 'post',
    url: `/v1/files`,
    headers: {
      accept: 'application/json',
      'content-type': 'multipart/form-data',
    },
  });
  return toFileItem(res.data);
}

async function FileTypes() {
  const res = await instance.get(`/v1/user-profile/files/types`);
  return res.data || [];
}

async function FileImportQuiz(f: FileItem, file: File, campaignId: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'json',
    JSON.stringify({
      ...f,
      type: file?.type,
    })
  );
  const res = await instance({
    data: formData,
    method: 'post',
    url: `/v1/imports/campaigns/${campaignId}/quizs`,
    headers: {
      accept: 'application/json',
      'content-type': 'multipart/form-data',
    },
  });
  return res.data;
}

async function FileExportQuiz(id: string) {
  const res = await instance.get(`/v1/exports/quizs/${id}`);
  return res.data;
}

/////////////////////////////////////////////////////////////
// Location
/////////////////////////////////////////////////////////////

async function AddressFromLocation(l: Location) {
  const res = await instance.post(`/v1/locations/address`, l);
  return toAddress(res.data);
}

/////////////////////////////////////////////////////////////
// Question
/////////////////////////////////////////////////////////////

async function QuestionList(quizId: string) {
  const res = await instance.get(`/v1/questions?quiz_id=${quizId}`);
  return (res.data || []).map((x: any) => toQuestion(x));
}

async function QuestionPost(question: Question) {
  const res = await instance.post(`v1/questions`, question);
  return toQuestion(res.data);
}

async function QuestionLoad(id: string) {
  const res = await instance.get(`/v1/questions/${id}`);
  return toQuestion(res.data);
}

async function QuestionPut(question: Question) {
  const res = await instance.put(`/v1/questions/${question.id}`, question);
  return toQuestion(res.data);
}

async function QuestionDelete(id: string) {
  const res = await instance.delete(`/v1/questions/${id}`);
  return toQuestion(res.data);
}

/////////////////////////////////////////////////////////////
// Quiz
/////////////////////////////////////////////////////////////

async function QuizLocations(quizId: string) {
  const res = await instance.get(`/v1/quizs/${quizId}/locations`);
  return (res.data || []).map((x: any) => toLocation(x));
}

async function QuizList(campaignId: string) {
  const res = await instance.get(`/v1/quizs?campaign_id=${campaignId}`);
  return (res.data || []).map((x: any) => toQuiz(x));
}

async function QuizPost(quiz: Quiz, locations: Location[]) {
  const res = await instance.post(`v1/quizs`, {
    quiz,
    locations,
  });
  return toQuiz(res.data);
}

async function QuizLoad(id: string) {
  const res = await instance.get(`/v1/quizs/${id}`);
  return toQuiz(res.data);
}

async function QuizLoadByToken(token: string) {
  const res = await instance.get(`/v1/quizs/invitation/${token}`);
  return toQuiz(res.data);
}

async function QuizRegisterInvitation(token: string) {
  await instance.post(`/v1/quizs/invitation/${token}`);
  return {};
}

async function QuizPut(quiz: Quiz) {
  const res = await instance.put(`/v1/quizs/${quiz.id}`, quiz);
  return toQuiz(res.data);
}

async function QuizDelete(id: string) {
  const res = await instance.delete(`/v1/quizs/${id}`);
  return toQuiz(res.data);
}

async function QuizDeleteAll(id: string) {
  const res = await instance.delete(`/v1/quizs/${id}/all`);
  return toQuiz(res.data);
}

async function QuizPublish(id: string) {
  const res = await instance.post(`/v1/quizs/${id}/publish`);
  return toQuiz(res.data);
}

/////////////////////////////////////////////////////////////
// Role
/////////////////////////////////////////////////////////////

async function RoleList() {
  const res = await instance.get(`/v1/roles`);
  return (res.data || []).map((x: any) => x as Role);
}

async function RolePut(role: Role) {
  const res = await instance.put(`/v1/roles/${role.id}`, role);
  return res.data as Role;
}

async function RoleGet(id: string) {
  const res = await instance.get(`/v1/roles/${id}`);
  return res.data as Role;
}

async function RoleDelete(id: string) {
  const res = await instance.delete(`/v1/roles/${id}`);
  return res.data as Role;
}

async function RoleAddUser(roleId: string, userId: string) {
  const res = await instance.put(`/v1/roles/${roleId}/users/${userId}`);
  return res.data;
}

async function RoleRemoveUser(roleId: string, userId: string) {
  const res = await instance.delete(`/v1/roles/${roleId}/users/${userId}`);
  return res.data;
}

async function RolesInUser(userId: string) {
  const res = await instance.get(`/v1/users/${userId}/roles`);
  return (res.data || []).map((x: any) => x as Role);
}

async function UsersInRole(roleId: string) {
  const res = await instance.get(`/v1/roles/${roleId}/users`);
  return (res.data || []).map((x: any) => toUser(x));
}

/////////////////////////////////////////////////////////////
// User Profile
/////////////////////////////////////////////////////////////

async function UserProfilePost(profile: UserProfile) {
  const res = await instance.post(`/v1/user-profile`, profile);
  return toUserProfile(res.data);
}

async function UserProfileLoad() {
  const res = await instance.get(`/v1/user-profile`);
  return toUserProfile(res.data);
}

async function UserProfileFilesLoad() {
  const res = await instance.get(`/v1/user-profile/files`);
  return (res.data || []).map((x: any) => toUserProfileFile(x));
}

async function UserProfileFileSave(file: UserProfileFile) {
  const res = await instance.put(`/v1/user-profile/files`, file);
  return toUserProfileFile(res.data);
}

/////////////////////////////////////////////////////////////
// User Quiz
/////////////////////////////////////////////////////////////

async function UserQuizList() {
  const res = await instance.get(`/v1/users/quizs`);
  return (res.data || []).map((x: UserQuiz) => toUserQuiz(x));
}

async function UserQuizNextQuestion(userQuiz: UserQuiz) {
  const res = await instance.get(`/v1/users/quizs/${userQuiz.id}/questions`);
  return res.data as UserNextQuestion;
}

async function UserQuizRegister(quiz: Quiz, token: string) {
  const res = await instance.post(`/v1/users/quizs/${quiz.id}?token=${token}`);
  return res.data as UserNextQuestion;
}

type UserQuestionSendAnswersParams = {
  quizId: string;
  questionId: string;
  answers: string[];
};

async function UserQuestionSendAnswers({
  questionId,
  quizId,
  answers,
}: UserQuestionSendAnswersParams) {
  const res = await instance.put(
    `/v1/users/quizs/${quizId}/questions/${questionId}/answers`,
    answers
  );
  return res.data as UserNextQuestion;
}

async function GetUserQuizSummary(userQuizId: string) {
  const res = await instance.get(`/v1/users/quizs/${userQuizId}/summary`);
  return res.data as UserQuizSummary;
}

async function PostUserQuizRetry(userQuizId: string) {
  const res = await instance.post(`/v1/users/quizs/${userQuizId}/retry`);
  return res.data;
}

async function UserQuizShareLink(quizId: string, email?: string) {
  const payload = {
    email,
  };
  const res = await instance.post(`/v1/users/quizs/${quizId}/share`, payload);
  return res.data;
}

async function userRewardsList() {
  const res = await instance.get(`/v1/users/rewards`);
  return (res.data || []).map((x: any) => toUserReward(x));
}

async function UserQuizShareList(quizId: string) {
  const res = await instance.get(`/v1/users/quizs/${quizId}/share`);
  return (res.data || []).map((x: any) => toUserQuizShare(x));
}

async function UserQuizShareDelete(id: string, quizId: string) {
  const res = await instance.delete(`/v1/users/quizs/${quizId}/share/${id}`);
  return toUserQuizShare(res.data);
}

/////////////////////////////////////////////////////////////
// User
/////////////////////////////////////////////////////////////

export type UserListParams = {
  offset: number;
  limit: number;
  emails: string[];
};

async function PostUserList(params: UserListParams) {
  const res = await instance.post(`/v1/users`, params);
  return (res.data || []).map((x: any) => toUser(x));
}

async function UserWhoAmi() {
  const res = await instance.get(`/v1/users/whoami`);
  return toUser(res.data);
}

async function UserLoad(id: string) {
  const res = await instance.get(`/v1/user/${id}`);
  return toUser(res.data);
}

/////////////////////////////////////////////////////////////
// Webhook
/////////////////////////////////////////////////////////////

async function WebhookTest(q: Quiz) {
  const { webhook_url, webhook_token_header_name, webhook_token } = q;
  return await instance.post(`/v1/webhooks/test`, {
    webhook_url,
    webhook_token_header_name,
    webhook_token,
  });
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
  FileImportQuiz,
  FileExportQuiz,
  AddressFromLocation,
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
  QuizDeleteAll,
  QuizPublish,
  QuizLoadByToken,
  QuizRegisterInvitation,
  QuizLocations,
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
  userRewardsList,
  UserQuizShareList,
  UserQuizShareDelete,
  UserProfilePost,
  UserProfileLoad,
  UserProfileFilesLoad,
  UserProfileFileSave,
  UserWhoAmi,
  PostUserList,
  UserLoad,
  WebhookTest,
};
