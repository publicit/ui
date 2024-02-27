import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {notifyErrResponse} from "../components/Errors";
import {UserQuiz, UserQuizStatus} from "../models/user_quiz";
import {
    GetUserQuizSummary,
    PostUserQuizRetry,
    UserQuizShareDelete,
    UserQuizShareLink,
    UserQuizShareList
} from "../helpers/api";
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
    const [rows, setRows] = useState<UserQuizShare[]>([])

    async function loadData(id: string) {
        try {
            const res = await GetUserQuizSummary(userQuizId)
            setUserQuiz(res.user_quiz)
            setUserQuestions(res.user_questions)
            await loadShares(res.user_quiz?.quiz?.id)
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    async function loadShares(quizId: string) {
        const sharedData = await UserQuizShareList(quizId)
        setRows(sharedData)
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
            await loadShares(userQuiz.quiz.id)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }

    async function onDelete(item: UserQuizShare) {
        if (!window.confirm(`Eliminar esta invitacion?`)) return
        try {
            await UserQuizShareDelete(item.id, item.quiz.id)
            await loadShares(userQuiz.quiz.id)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }


    return (
        <>
            <QuizSummary userQuiz={userQuiz} userQuestions={userQuestions} onRetry={retryQuiz}/>
            <br/>
            <h2>Con quien compartes esta encuesta</h2>
            <UserQuizShareTable rows={rows} onDelete={onDelete}/>
            <br/>
            {userQuiz.status === UserQuizStatus[UserQuizStatus.success] &&
                <ShowDialog
                    children={ShareDialogBody({
                        sharedUrl,
                        onClick: () => {
                        },
                        text: "Se ha copiado la direccion de la invitacion",
                    })}
                    onClose={() => setSharedUrl("")} onOpen={shareQuiz}/>
            }
        </>
    )
}
