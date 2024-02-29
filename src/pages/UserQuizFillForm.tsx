import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Mantine :
import { Text } from "@mantine/core";

// Components :
import PreLoader from "../components/PreLoader";
import UserQuizForm from "../components/UserQuizForm";
import { notifyErrResponse } from "../components/Errors";

// Helpers :
import { UserQuestionSendAnswers, UserQuizNextQuestion } from "../helpers/api";

// Models:
import { UserQuiz } from "../models/user_quiz";
import { QuestionType } from "../models/question";
import { UserAnswer } from "../models/user_answer";
import { UserNextQuestion, UserQuestion } from "../models/user_question";


export default function UserQuizFillForm() {
    const navigate = useNavigate()
    const userQuestionId = useParams().id || ""
    const returnUrl = `/user/quizs/${userQuestionId}/summary`

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
    const [selectedAnswer, setSelectedAnswer] = useState<string>("")
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [userQuestion, setUserQuestion] = useState<UserQuestion>(new UserQuestion())


    useEffect(() => {
        loadData(userQuestionId)
    }, []);

    function setData(data: UserNextQuestion) {
        if (!data.user_question || !data.user_answers) {
            navigate(returnUrl)
            return
        }
        setSelectedAnswers([])
        setSelectedAnswer("")
        setUserAnswers(data.user_answers)
        setUserQuestion(data.user_question)
        setUserQuiz(data.user_quiz)
    }

    async function loadData(id: string) {
        try {
            const userQuiz = new UserQuiz()
            userQuiz.id = userQuestionId
            const data: UserNextQuestion = await UserQuizNextQuestion(userQuiz)
            setData(data)
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit() {
        const answers = [
            selectedAnswer,
            ...[...selectedAnswers],
        ]
        try {
            const data = await UserQuestionSendAnswers({
                questionId: userQuestion.question.id,
                quizId: userQuiz.quiz.id,
                answers: answers.filter(x => x.length !== 0),
            })
            setData(data)
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setIsLoading(false)
        }
    }

    function selectMultiAnswer(e: any) {
        const id = e.target.value
        let s = [...selectedAnswers]
        if (selectedAnswers.find(x => x === id)) {
            s = s.filter(x => x !== id)
        } else {
            s.push(id)
        }
        setSelectedAnswers(s)
    }

    function isSubmitEnabled(): boolean {
        if (userQuestion.question.type === QuestionType[QuestionType.single]) {
            return !!selectedAnswer
        }
        return selectedAnswers.length !== 0
    }

    return isLoading ? <PreLoader /> : (
        <div className="form-wrapper user-quiz-form">
            <div className="flex-quiz-header">
                <Text className="quiz-name">{userQuiz.quiz.name}</Text>
                <Link to={userQuiz.quiz.video_url} target="_blank">
                    <img src={userQuiz.quiz.thumbnail_url} alt="thumbnail" />
                </Link>
            </div>
            <UserQuizForm
                userAnswers={userAnswers}
                userQuiz={userQuiz} userQuestion={userQuestion}
                onSubmit={onSubmit} isSubmitEnabled={isSubmitEnabled}
                selectedAnswers={selectedAnswers} selectMultiAnswer={selectMultiAnswer}
                selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer}
            />
        </div>
    )
}