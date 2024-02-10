import Root from "./pages/Root";
import {Route, Routes} from "react-router-dom";
import Error404 from "./pages/Error404";
import CampaignList from "./pages/CampaignList";
import {UserProfileResponse} from "./models/user";
import CampaignEdit from "./pages/CampaignEdit";
import CampaignNew from "./pages/CampaignNew";
import QuizNew from "./pages/QuizNew";
import QuizEdit from "./pages/QuizEdit";
import QuestionNew from "./pages/QuestionNew";
import QuestionEdit from "./pages/QuestionEdit"
import AnswerNew from "./pages/AnswerNew";
import AnswerEdit from "./pages/AnswerEdit";
import ProfileEdit from "./pages/UserProfileEdit"
import UserQuizList from "./pages/UserQuizList"
import UserQuizFillForm from "./pages/UserQuizFillForm";
import UserQuizSummaryView from "./pages/UserQuizSummaryView";
import ShareStart from "./pages/UserQuizSharedStart";
import {RolesList} from "./pages/RolesList";
import {RoleEdit} from "./pages/RoleEdit";
import {UsersList} from "./pages/UserList";
import {UserEdit} from "./pages/UserEdit";
import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";

type params = {
    profile: UserProfileResponse | undefined
}

export default function RouteSwitcher({profile}: params) {
    //  TODO: allow to access routes based on role membership
    console.info(`router user roles: ${profile?.roles}`)
    return (
        <Routes>
            <Route path="/" element={<Root/>}/>
            <Route path="/answers/new/:question_id" element={<AnswerNew/>}/>
            <Route path="/answers/:id" element={<AnswerEdit/>}/>
            <Route path="/campaigns" element={<CampaignList/>}/>
            <Route path="/campaigns/new" element={<CampaignNew/>}/>
            <Route path="/campaigns/:id" element={<CampaignEdit/>}/>
            <Route path="/questions/new/:quiz_id" element={<QuestionNew/>}/>
            <Route path="/questions/:id" element={<QuestionEdit/>}/>
            <Route path="/quizs/new/:campaign_id" element={<QuizNew/>}/>
            <Route path="/quizs/:id" element={<QuizEdit/>}/>
            <Route path="/roles" element={<RolesList/>}/>
            <Route path="/roles/:id" element={<RoleEdit/>}/>
            <Route path="/user/profile" element={<ProfileEdit/>}/>
            <Route path="/user/quizs" element={<UserQuizList/>}/>
            <Route path="/user/quizs/:id" element={<UserQuizFillForm/>}/>
            <Route path="/user/quizs/:user_quiz_id/summary" element={<UserQuizSummaryView/>}/>
            <Route path="/users" element={<UsersList/>}/>
            <Route path="/users/:id" element={<UserEdit/>}/>
            <Route path="/invitation/:token" element={<ShareStart/>}/>

            <Route path="/errors/unauthenticaed" element={<Error401/>}/>
            <Route path="/errors/unauthorized" element={<Error403/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    )
}
