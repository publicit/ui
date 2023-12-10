import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {notifyErrResponse} from "../components/Errors";
import {UserQuiz} from "../models/user_quiz";
import {GetUserQuizSummary} from "../helpers/api";
import {UserQuestion} from "../models/user_question";
import QuizSummary from "../components/QuizSummary";


export default function UserQuizSummaryView() {
    const userQuizId = useParams().user_quiz_id || ""
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([])

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


    return (
        <QuizSummary userQuiz={userQuiz} userQuestions={userQuestions}/>
    )
}
