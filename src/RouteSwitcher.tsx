import Root from "./pages/Root";
import {Route, Routes} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import CampaignList from "./pages/CampaignList";
import {UserProfile} from "./models/user";
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

type params = {
    profile: UserProfile | undefined
}

export default function RouteSwitcher({profile}: params) {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage/>}/>
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
            <Route path="/user/profile" element={<ProfileEdit/>}/>
            <Route path="/user/quizs" element={<UserQuizList/>}/>
            <Route path="/user/quizs/:id" element={<UserQuizFillForm/>}/>
            <Route path="/user/quizs/:user_quiz_id/summary" element={<UserQuizSummaryView/>}/>
            <Route path="/apis/quiz/token/:id" element={<ShareStart/>}/>
        </Routes>
    )
}
