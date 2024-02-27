import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {notifyErrResponse} from "../components/Errors";
import {UserQuiz, UserQuizStatus} from "../models/user_quiz";
import {GetUserQuizSummary, PostUserQuizRetry, UserQuizShareLink, UserQuizShareList} from "../helpers/api";
import {UserQuestion} from "../models/user_question";
import QuizSummary from "../components/QuizSummary";
import {ShowDialog} from "../components/UserQuizShareDialog"
import {quizTokenShareUrl} from "../helpers/user_quiz_utils";
import {ShareDialogBody} from "../components/ShareDialog";
import {UserQuizShareTable} from "../components/UserQuizShareTable";
import {UserQuizShare} from "../models/user_quiz_share";

export default function UserQuizSummaryView() {
    const navigate = useNavigate()
    const userQuizId = useParams().user_quiz_id || ""
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([])
    const [sharedUrl, setSharedUrl] = useState("")
    const [rows,setRows]=useState<UserQuizShare[]>([])

    async function loadData(id: string) {
        try {
            const res = await GetUserQuizSummary(userQuizId)
            setUserQuiz(res.user_quiz)
            setUserQuestions(res.user_questions)
            const sharedData = await UserQuizShareList(res.user_quiz.quiz.id)
            setRows(sharedData)
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    useEffect(() => {
        loadData(userQuizId)
    }, []);

    async function retryQuiz() {
        try {
            await PostUserQuizRetry(userQuizId)
            navigate(`/user/quizs/${userQuizId}`)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }

    async function shareQuiz() {
        try {
            const res = await UserQuizShareLink(userQuiz.quiz.id)
            const tokenUrl = quizTokenShareUrl(res)
            setSharedUrl(tokenUrl)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }


    return (
        <>
            <QuizSummary userQuiz={userQuiz} userQuestions={userQuestions} onRetry={retryQuiz}/>
            <br/>
            <h2>Con quien has compartido esta encuesta</h2>
            <UserQuizShareTable rows={rows} />
            <br/>
            {userQuiz.status === UserQuizStatus[UserQuizStatus.success] &&
                <ShowDialog
                    children={ShareDialogBody({
                        sharedUrl,
                        onClick:() => {},
                        text: "Se ha copiado la direccion de la invitacion",
                    })}
                    onClose={() => setSharedUrl("")} onOpen={shareQuiz}/>
            }
        </>
    )
}
