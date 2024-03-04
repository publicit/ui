import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

// Mantine :
import {Grid, Progress} from "@mantine/core";

// Components :
import PreLoader from "../components/PreLoader";
import {QuizSummary} from "../components/QuizSummary";
import {notifyErrResponse} from "../components/Errors";
import {UserQuizShareTable} from "../components/UserQuizShareTable";

// Models :
import {UserQuiz} from "../models/user_quiz";
import {UserQuestion} from "../models/user_question";
import {UserQuizShare} from "../models/user_quiz_share";

// Helpers :
import {
    GetUserQuizSummary,
    PostUserQuizRetry,
    UserQuizShareDelete,
    UserQuizShareLink,
    UserQuizShareList
} from "../helpers/api";
import {quizTokenShareUrl} from "../helpers/user_quiz_utils";


export default function UserQuizSummaryView() {
    const navigate = useNavigate()
    const userQuizId = useParams().user_quiz_id || "";

    const [sharedUrl, setSharedUrl] = useState("")
    const [rows, setRows] = useState<UserQuizShare[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([])
    const [email, setEmail] = useState<string>("")

    useEffect(() => {
        loadData(userQuizId)
    }, []);

    async function loadData(id: string) {
        try {
            const res = await GetUserQuizSummary(userQuizId)
            setUserQuiz(res.user_quiz)
            setUserQuestions(res.user_questions)
            await loadShares(res.user_quiz?.quiz?.id)
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setIsLoading(false)
        }
    }

    async function loadShares(quizId: string) {
        const sharedData = await UserQuizShareList(quizId)
        setRows(sharedData)
    }

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

    async function shareQuizUsingEmail(uq: UserQuiz, email: string) {
        if (!email) return
        try {
            await UserQuizShareLink(uq.quiz.id, email)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }

    function EmailShareForm(uq: UserQuiz, email: string) {
        // TODO: this form needs love from an actual UI dev
        return (
            <>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    shareQuizUsingEmail(uq, email).then(() => console.log(`TODO: close dialog`))
                }}>
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="someone@example.com" value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </>
        )
    }

    return isLoading ? <PreLoader/> : (
        <div className="user-quiz-summary-container">
            <h1 className="quiz-name">{userQuiz.quiz.name}</h1>
            <Progress mt="lg" value={userQuiz.percent_completed * 100}/>

            <Grid gutter={15}>
                <Grid.Col span={{md: 12, lg: 6,}}>
                    <QuizSummary
                        userQuiz={userQuiz} shareQuiz={shareQuiz}
                        onRetry={retryQuiz} userQuestions={userQuestions}
                        sharedUrl={sharedUrl} setSharedUrl={setSharedUrl}
                        loadData={() => loadShares(userQuiz.quiz.id)}
                        emailShareDialog={EmailShareForm(userQuiz, email)}
                    />
                </Grid.Col>
                <Grid.Col span={{md: 12, lg: 6,}}>
                    <h1>Con quien compartes esta encuesta</h1>
                    <UserQuizShareTable
                        rows={rows} onDelete={onDelete}
                    />
                </Grid.Col>
            </Grid>
        </div>
    )
}
