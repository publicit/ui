import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {notifyErrResponse} from "../components/Errors";
import {UserQuiz} from "../models/user_quiz";
import {GetUserQuizSummary, PostUserQuizRetry} from "../helpers/api";
import {UserQuestion} from "../models/user_question";
import QuizSummary from "../components/QuizSummary";
import {useDisclosure} from "@mantine/hooks";
import UserQuizShareDialog from "../components/UserQuizShareDialog"

export default function UserQuizSummaryView() {
    const navigate = useNavigate()
    const userQuizId = useParams().user_quiz_id || ""
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([])
    const [opened, {open, close}] = useDisclosure(false)

    async function loadData(id: string) {
        try {
            const res = await GetUserQuizSummary(userQuizId)
            setUserQuiz(res.user_quiz)
            setUserQuestions(res.user_questions)
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
            alert('TODO: share')
            // await PostUserQuizRetry(userQuizId)
            // navigate(`/user/quizs/${userQuizId}`)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }


    return (
        <>
            <QuizSummary userQuiz={userQuiz} userQuestions={userQuestions} onRetry={retryQuiz} />
            <br/>
            <UserQuizShareDialog children={null} />
        </>
    )
}
